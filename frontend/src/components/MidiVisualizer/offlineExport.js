// Export vidéo "hors-ligne" (image par image, pas de capture temps réel). Contrairement à
// videoExport.js (canvas.captureStream + MediaRecorder, qui capture de façon opportuniste et produit
// un fichier à frame rate variable), ici chaque frame est calculée pour un instant `t` précis, encodée
// via WebCodecs (mediabunny) et écrite à un timestamp exact : le fichier de sortie est donc à frame
// rate réellement constant, lisible sans réencodage dans un logiciel de montage comme After Effects.
// Module isolé, réservé à l'outil privé /midigen — jamais importé par MidiVisualizer.js.
import { Output, Mp4OutputFormat, BufferTarget, CanvasSource, AudioBufferSource, QUALITY_HIGH } from 'mediabunny';
import { loadMidiSources, prepareGroups, applyStyling, computeRange } from '../../lib/midi/song';
import { renderFrame } from '../../lib/midi/renderFrame';
import { loadCustomShapeImage } from '../../lib/midi/customSprite';
import { buildSynthGraph, scheduleNote } from '../../lib/midi/synth';

const FPS = 30;

export function offlineExportSupported() {
  return typeof window !== 'undefined' && !!window.VideoEncoder && !!window.AudioEncoder;
}

// Un morceau est "audible" par le synthé s'il a au moins une note sur une piste visible et non-percu.
function hasAudibleNotes(song, tracks) {
  return song.notes.some((n) => {
    const g = song.groups[n.g];
    const override = tracks && tracks[n.g];
    const visible = override ? override.visible : !g.drums;
    return visible && !g.drums;
  });
}

// Décode le fichier audio et en extrait exactement la fenêtre [offset, offset+duration] : l'export
// doit démarrer pile au même instant que l'aperçu (qui saute directement à `offset` avant de jouer).
async function decodeAudioWindow(audioFile, offset, duration) {
  const arrBuf = await audioFile.arrayBuffer();
  const actx = new (window.AudioContext || window.webkitAudioContext)();
  let decoded;
  try { decoded = await actx.decodeAudioData(arrBuf); } finally { actx.close(); }
  const sr = decoded.sampleRate;
  const startSample = Math.max(0, Math.floor(offset * sr));
  const frameCount = Math.max(1, Math.floor(duration * sr));
  const out = new AudioBuffer({ length: frameCount, numberOfChannels: decoded.numberOfChannels, sampleRate: sr });
  for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
    const src = decoded.getChannelData(ch).subarray(startSample, startSample + frameCount);
    out.getChannelData(ch).set(src);
  }
  return out;
}

// Rejoue le synthé dans un OfflineAudioContext, avec exactement la même planification que
// startLocalClock() dans Midigen.js (mêmes notes, même conversion temps MIDI -> temps réel via `rate`).
async function renderSynthOffline(song, tracks, rate, duration) {
  const sr = 44100;
  const octx = new OfflineAudioContext(2, Math.max(1, Math.ceil(duration * sr)), sr);
  const master = buildSynthGraph(octx);
  for (const n of song.notes) {
    const g = song.groups[n.g];
    const override = tracks && tracks[n.g];
    const visible = override ? override.visible : !g.drums;
    if (!visible || g.drums) continue;
    const when = n.time / (rate || 1);
    if (when >= duration) continue;
    scheduleNote(octx, master, n, when);
  }
  return octx.startRendering();
}

// `cancelRef` : objet { current: false } — le mettre à true depuis l'appelant annule l'export en cours.
export async function exportVideoOffline({
  midiSources, palette, tracks, format, width, height, fps = FPS,
  shape, customShapeSrc, tint, secondsVisible, headPosition, noteSize, spread, lines, steps, glow,
  rate, duration, offset, audioFile, synthEnabled,
  cancelRef, onProgress, onDone, onError,
}) {
  let output = null;
  try {
    const { groups: rawGroups } = await loadMidiSources(midiSources);
    const prepared = prepareGroups(rawGroups);
    applyStyling(prepared.groups, palette, tracks);
    const range = computeRange(prepared.groups);
    const song = { groups: prepared.groups, notes: prepared.notes, lo: range.lo, hi: range.hi };
    const customImage = customShapeSrc ? await loadCustomShapeImage(customShapeSrc).catch(() => null) : null;

    const willHaveAudio = !!audioFile || (synthEnabled && hasAudibleNotes(song, tracks));
    // Décodage/rendu de l'audio en parallèle du rendu vidéo (indépendants l'un de l'autre).
    const audioPromise = audioFile
      ? decodeAudioWindow(audioFile, offset, duration)
      : (willHaveAudio ? renderSynthOffline(song, tracks, rate, duration) : Promise.resolve(null));

    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d');
    const spriteCache = [];

    output = new Output({ format: new Mp4OutputFormat(), target: new BufferTarget() });
    const videoSource = new CanvasSource(canvas, { codec: 'avc', quality: QUALITY_HIGH });
    output.addVideoTrack(videoSource, { frameRate: fps });
    let audioSource = null;
    if (willHaveAudio) {
      // `transform` normalise vers un taux d'échantillonnage/nombre de canaux standard avant
      // l'encodage AAC : certains fichiers sources (mono, taux d'échantillonnage inhabituel comme
      // 16 kHz) font échouer l'encodeur si on les lui passe tels quels.
      audioSource = new AudioBufferSource({
        codec: 'aac',
        quality: QUALITY_HIGH,
        transform: { numberOfChannels: 2, sampleRate: 44100 },
      });
      output.addAudioTrack(audioSource);
    }
    await output.start();

    const totalFrames = Math.max(1, Math.round(duration * fps));
    const frameDur = 1 / fps;
    for (let i = 0; i < totalFrames; i++) {
      if (cancelRef && cancelRef.current) { await output.cancel(); onDone && onDone({ cancelled: true }); return; }
      const elapsedReal = i * frameDur;
      const t = elapsedReal * (rate || 1);
      renderFrame(ctx, width, height, {
        groups: song.groups, notes: song.notes, t,
        lo: song.lo, hi: song.hi, secs: secondsVisible, head: headPosition,
        size: noteSize, spread, lines, steps, glow, shape, tint, customImage,
      }, spriteCache);
      await videoSource.add(elapsedReal, frameDur);
      if (onProgress) onProgress(Math.min(0.9, (i + 1) / totalFrames * 0.9));
    }
    videoSource.close();

    if (audioSource) {
      const audioBuffer = await audioPromise;
      if (audioBuffer) await audioSource.add(audioBuffer);
      audioSource.close();
    }
    if (onProgress) onProgress(0.95);

    await output.finalize();
    const blob = new Blob([output.target.buffer], { type: 'video/mp4' });
    const filename = `visuel-midi-${format}.mp4`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    if (onProgress) onProgress(1);
    onDone && onDone({ cancelled: false });
  } catch (e) {
    if (output) { try { await output.cancel(); } catch (e2) { /* déjà arrêté */ } }
    onError && onError('Échec de l’export : ' + (e && e.message ? e.message : String(e)));
  }
}
