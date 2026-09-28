// Export vidéo (MediaRecorder). Module isolé, réservé à l'outil privé /midigen — jamais importé
// par MidiVisualizer.js, pour ne rien envoyer au bundle du site public.

// H.264 + AAC en priorité (le couple le mieux supporté par des logiciels de montage comme After
// Effects) : sans préciser explicitement le codec audio, le navigateur peut choisir Opus même dans
// un conteneur .mp4, ce qu'After Effects ne sait souvent pas lire (vidéo importée, mais sans son).
function pickMime() {
  const list = [
    'video/mp4;codecs="avc1.42E01E,mp4a.40.2"',
    'video/mp4;codecs=avc1,mp4a.40.2',
    'video/mp4;codecs=avc1',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  if (!window.MediaRecorder) return null;
  for (const m of list) if (MediaRecorder.isTypeSupported(m)) return m;
  return '';
}

// Enregistre le canvas (+ l'audio de `audioEl` et/ou d'un `extraAudioStream`, ex. le synthé, si le
// navigateur le permet) et déclenche le téléchargement du fichier vidéo à l'arrêt. Retourne
// l'instance MediaRecorder, ou null si le navigateur ne supporte pas l'enregistrement.
export function recordCanvas(canvas, audioEl, { format = 'portrait', extraAudioStream, onStart, onStop, onError } = {}) {
  const mime = pickMime();
  if (mime === null || !canvas.captureStream) {
    onError && onError('Ce navigateur ne sait pas enregistrer de vidéo. Essaie Chrome, Firefox ou Safari récent.');
    return null;
  }
  // 30 plutôt que 60 im/s : moins de charge d'encodage en temps réel, donc moins de risque que
  // MediaRecorder produise des frames à intervalles irréguliers (frame rate variable), ce que des
  // logiciels de montage comme After Effects interprètent mal (dérive audio/image progressive à
  // l'import, même quand le fichier semble parfaitement synchro à la simple lecture).
  const stream = canvas.captureStream(30);
  if (audioEl && audioEl.captureStream) {
    try {
      audioEl.captureStream().getAudioTracks().forEach(track => stream.addTrack(track));
    } catch (e) { /* captureStream sur <audio> non supporté par ce navigateur */ }
  }
  if (extraAudioStream) {
    extraAudioStream.getAudioTracks().forEach(track => stream.addTrack(track));
  }
  let recorder;
  try {
    recorder = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 12e6 } : { videoBitsPerSecond: 12e6 });
  } catch (e) {
    onError && onError('Impossible de démarrer l’enregistrement dans ce navigateur.');
    return null;
  }
  const chunks = [];
  recorder.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  recorder.onstop = () => {
    const type = recorder.mimeType || 'video/webm';
    const ext = type.includes('mp4') ? 'mp4' : 'webm';
    const blob = new Blob(chunks, { type });
    const filename = `visuel-midi-${format}.${ext}`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    onStop && onStop({ ext });
  };
  recorder.start(250);
  onStart && onStart();
  return recorder;
}

export function stopRecording(recorder) {
  if (recorder && recorder.state !== 'inactive') recorder.stop();
}
