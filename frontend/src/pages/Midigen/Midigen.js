import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Midigen.scss';
import MidiVisualizer from '../../components/MidiVisualizer/MidiVisualizer';
import { recordCanvas, stopRecording } from '../../components/MidiVisualizer/videoExport';
import { exportVideoOffline, offlineExportSupported } from '../../components/MidiVisualizer/offlineExport';
import { PALETTES } from '../../lib/midi/palettes';
import { loadMidiSources, prepareGroups } from '../../lib/midi/song';
import { createSynth } from '../../lib/midi/synth';

const IRIS_MAX_COLORS = 6;
const IRIS_DEFAULT_COLORS = ['#ff4d6d', '#ffd166', '#4cc9f0', '#9b5de5', '#06d6a0', '#ffffff'];
const FORMAT_LABELS = { portrait: '3:5', carre: '1:1', paysage: '5:3' };
const FORMAT_RATIOS = { portrait: 3 / 5, carre: 1, paysage: 5 / 3 };

// Résolution d'export : le petit côté fait toujours 1080px, l'autre suit le ratio du format.
const EXPORT_SHORT_SIDE = 1080;
const exportDimensions = (ratio) => (
  ratio <= 1
    ? { width: EXPORT_SHORT_SIDE, height: Math.round(EXPORT_SHORT_SIDE / ratio) }
    : { width: Math.round(EXPORT_SHORT_SIDE * ratio), height: EXPORT_SHORT_SIDE }
);

const fmt = (s) => {
  s = Math.max(0, s || 0);
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return m + ':' + String(r).padStart(2, '0');
};

const baseName = (name) => name.replace(/\.[^.]+$/, '');

function Midigen() {
  const audioElRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const audioUrlRef = useRef(null);
  const audioFileRef = useRef(null);
  const customShapesRef = useRef([]);
  const recorderRef = useRef(null);
  const cancelExportRef = useRef(false);
  const exportModeRef = useRef(null);
  const midiFilesRef = useRef([]);
  const tracksRef = useRef(null);
  const synthRef = useRef(null);
  if (!synthRef.current) synthRef.current = createSynth();
  // Source de temps silencieuse utilisée quand aucun audio n'est chargé : MidiVisualizer lit juste
  // `audioRef.current.currentTime`, qu'il s'agisse d'un vrai <audio> ou de cet objet simple.
  const clockRef = useRef({ currentTime: 0 });
  const clockRafRef = useRef(null);
  // Analyse séparée des .mid (indépendante de MidiVisualizer) pour la planification du synthé.
  const synthSongRef = useRef(null);

  const [midiFiles, setMidiFiles] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [midiDuration, setMidiDuration] = useState(1);
  const [audioDuration, setAudioDuration] = useState(0);
  const [trackMeta, setTrackMeta] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [infoText, setInfoText] = useState('Ajoute un ou plusieurs fichiers .mid pour prévisualiser. L’audio est optionnel.');

  const [format, setFormat] = useState('portrait');
  const [stageBoxSize, setStageBoxSize] = useState(null);
  const [secondsVisible, setSecondsVisible] = useState(6);
  const [headPosition, setHeadPosition] = useState(0.45);
  const [noteSize, setNoteSize] = useState(1);
  const [spread, setSpread] = useState(0.5);
  const [shape, setShape] = useState('circles');
  const [customShapes, setCustomShapes] = useState([]);
  const [tint, setTint] = useState(0.35);
  const [palette, setPalette] = useState('aube');
  const [lines, setLines] = useState(true);
  const [steps, setSteps] = useState(false);
  const [glow, setGlow] = useState(true);
  const [trail, setTrail] = useState(false);
  const [whiteLine, setWhiteLine] = useState(false);
  const [playheadLine, setPlayheadLine] = useState(false);
  // Deux « onglets » de visualisation : les notes, ou l'irisation (voir lib/midi/renderIris.js).
  const [mode, setMode] = useState('notes');
  const [irisSpread, setIrisSpread] = useState(0.85);
  const [irisLife, setIrisLife] = useState(3);
  const [irisGain, setIrisGain] = useState(1.3);
  const [irisTurbulence, setIrisTurbulence] = useState(0.7);
  const [irisHue, setIrisHue] = useState(0);
  const [irisLine, setIrisLine] = useState(true);
  const [irisSize, setIrisSize] = useState(1);
  // Couleurs : irisées par défaut, ou un jeu choisi (de 1 à IRIS_MAX_COLORS couleurs).
  const [irisPalette, setIrisPalette] = useState('iridescent');
  const [irisColorCount, setIrisColorCount] = useState(3);
  const [irisColors, setIrisColors] = useState(IRIS_DEFAULT_COLORS);
  const iris = useMemo(
    () => ({
      spread: irisSpread, life: irisLife, gain: irisGain, turbulence: irisTurbulence, hue: irisHue, line: irisLine, size: irisSize,
      colors: irisPalette === 'custom' ? irisColors.slice(0, irisColorCount) : null,
    }),
    [irisSpread, irisLife, irisGain, irisTurbulence, irisHue, irisLine, irisSize, irisPalette, irisColorCount, irisColors]
  );
  const [spinMode, setSpinMode] = useState('fixed');
  const [spinDegPerSec, setSpinDegPerSec] = useState(10);
  const spinSpeed = spinMode === 'spin' ? spinDegPerSec : 0;
  const [offset, setOffset] = useState(0);
  const [midiBpm, setMidiBpm] = useState(null);
  const [realBpm, setRealBpm] = useState(null);
  const [volume, setVolume] = useState(0.7);
  const [synthEnabled, setSynthEnabled] = useState(true);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const scrubbingRef = useRef(false);

  const [recording, setRecording] = useState(false);
  const recordingRef = useRef(false);
  const [recInfo, setRecInfo] = useState(() => (
    offlineExportSupported()
      ? 'L’export calcule chaque image séparément (pas en temps réel) : plus long que la durée du morceau, mais un fichier à frame rate constant, prêt pour le montage.'
      : 'L’enregistrement se fait en temps réel, du début à la fin du morceau.'
  ));

  const canPlay = midiFiles.length > 0;

  // Corrige un tempo mal détecté (ou différent de l'audio réel) : le MIDI encode son propre tempo,
  // `realBpm` permet de le corriger (ex. détecté à 120 mais le morceau est en fait à 123). S'applique
  // aussi bien en mode synthé (sans audio) qu'avec un fichier audio.
  const rate = useMemo(() => (
    midiBpm && realBpm ? realBpm / midiBpm : 1
  ), [midiBpm, realBpm]);

  // Le tempo réel par défaut suit le tempo détecté dans le MIDI (donc rate=1) à chaque nouveau
  // chargement, tant que l'utilisateur ne le corrige pas lui-même.
  useEffect(() => { setRealBpm(midiBpm); }, [midiBpm]);

  // Quand un audio est chargé, c'est lui qui fait autorité sur la durée réelle : le visuel (piloté
  // par `rate`) doit tenir dans cette fenêtre, pas la déborder. Sans audio, la durée (en secondes
  // réelles) dépend elle aussi de `rate` : à tempo corrigé plus rapide, tout va plus vite.
  const duration = audioUrl && audioDuration
    ? Math.max(0.1, audioDuration - offset)
    : (midiDuration || 1) / (rate || 1);

  const midiSources = useMemo(
    () => midiFiles.map((f) => ({ src: f.url, label: midiFiles.length > 1 ? baseName(f.name) : null })),
    [midiFiles]
  );

  // Calcule la taille exacte (en px) de la zone d'aperçu en JS plutôt qu'en CSS pur (aspect-ratio +
  // auto-sizing en flexbox a des incohérences connues entre navigateurs, notamment sur Safari, où le
  // format sélectionné peut ne pas être respecté visuellement malgré un CSS correct).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const target = FORMAT_RATIOS[format] || 1;
    let raf = null;
    let last = null;
    const compute = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      const boxW = Math.floor(w / h > target ? h * target : w);
      const boxH = Math.floor(w / h > target ? h : w / target);
      if (last && last.width === boxW && last.height === boxH) return;
      last = { width: boxW, height: boxH };
      setStageBoxSize(last);
    };
    compute();
    // Le calcul est reporté au frame suivant plutôt qu'exécuté directement dans le callback de
    // ResizeObserver, pour la même raison que dans MidiVisualizer.js (évite tout risque de boucle).
    const ro = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [format]);

  useEffect(() => { midiFilesRef.current = midiFiles; }, [midiFiles]);
  useEffect(() => { customShapesRef.current = customShapes; }, [customShapes]);
  const customShapeUrls = useMemo(() => customShapes.map((s) => s.url), [customShapes]);
  useEffect(() => { tracksRef.current = tracks; }, [tracks]);
  // Le loop rAF de l'horloge locale capture ses closures une seule fois : il doit lire ces refs
  // (toujours à jour) plutôt que les états correspondants, qui seraient figés à leur valeur de départ.
  useEffect(() => { recordingRef.current = recording; }, [recording]);
  useEffect(() => { scrubbingRef.current = scrubbing; }, [scrubbing]);

  useEffect(() => () => {
    midiFilesRef.current.forEach((f) => URL.revokeObjectURL(f.url));
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    customShapesRef.current.forEach((s) => URL.revokeObjectURL(s.url));
    if (clockRafRef.current) cancelAnimationFrame(clockRafRef.current);
  }, []);

  useEffect(() => {
    if (audioElRef.current) audioElRef.current.volume = volume;
    synthRef.current.setVolume(volume);
  }, [volume, audioUrl]);

  // Parsing indépendant des .mid chargés, uniquement pour la planification du synthé (le rendu
  // visuel, lui, est parsé et géré en interne par MidiVisualizer).
  useEffect(() => {
    let cancelled = false;
    synthSongRef.current = null;
    if (!midiFiles.length) return;
    loadMidiSources(midiFiles.map((f) => ({ src: f.url, label: midiFiles.length > 1 ? baseName(f.name) : null })))
      .then(({ groups: rawGroups }) => { if (!cancelled) synthSongRef.current = prepareGroups(rawGroups); })
      .catch(() => { synthSongRef.current = null; });
    return () => { cancelled = true; };
  }, [midiFiles]);

  const stopLocalClock = () => {
    if (clockRafRef.current) cancelAnimationFrame(clockRafRef.current);
    clockRafRef.current = null;
    synthRef.current.stopAll();
  };

  // `clockRef.current.currentTime` avance en secondes réelles brutes (non affectées par `rate`) :
  // MidiVisualizer applique déjà `* rate` lui-même pour en tirer le temps "visuel" (comme pour l'audio,
  // voir MidiVisualizer.renderNow). Ici, pour la planification du synthé, on doit donc convertir
  // explicitement entre les deux espaces (temps réel écoulé ↔ temps MIDI/visuel).
  const startLocalClock = () => {
    stopLocalClock();
    let last = performance.now();
    let schedIdx = 0;
    let ctxAnchor = null;
    const song = synthSongRef.current;
    const useSynth = synthEnabled && !audioUrl && song && song.notes.length > 0;
    const r = rate || 1;
    if (useSynth) {
      const ctx = synthRef.current.ensure();
      const ctxStart = ctx.currentTime + 0.05;
      const startVisual = clockRef.current.currentTime * r;
      ctxAnchor = { ctxStart, startVisual };
      schedIdx = song.notes.findIndex((n) => n.time >= startVisual);
      if (schedIdx === -1) schedIdx = song.notes.length;
    }
    const step = (ts) => {
      const dt = (ts - last) / 1000;
      last = ts;
      const next = clockRef.current.currentTime + dt;
      if (next >= duration) {
        clockRef.current.currentTime = duration;
        setCurrentTime(duration);
        handlePlaybackEnd();
        return;
      }
      clockRef.current.currentTime = next;
      if (!scrubbingRef.current) setCurrentTime(next);
      if (useSynth) {
        const horizonVisual = (next + 0.2) * r;
        while (schedIdx < song.notes.length && song.notes[schedIdx].time < horizonVisual) {
          const n = song.notes[schedIdx++];
          const g = song.groups[n.g];
          const override = tracksRef.current && tracksRef.current[n.g];
          const visible = override ? override.visible : !g.drums;
          if (visible && !g.drums) synthRef.current.playNote(n, ctxAnchor.ctxStart + (n.time - ctxAnchor.startVisual) / r);
        }
      }
      clockRafRef.current = requestAnimationFrame(step);
    };
    clockRafRef.current = requestAnimationFrame(step);
  };

  const handlePlaybackEnd = () => {
    stopLocalClock();
    setPlaying(false);
    if (recordingRef.current) stopRecording(recorderRef.current);
  };

  const resetPlaybackState = () => {
    stopLocalClock();
    clockRef.current.currentTime = 0;
    setPlaying(false);
    setCurrentTime(0);
  };

  const handleMidiFilesAdd = (files) => {
    const additions = files.map((file) => ({
      id: Date.now() + '-' + Math.random().toString(36).slice(2, 8),
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    resetPlaybackState();
    setTrackMeta(null);
    setTracks(null);
    setMidiBpm(null);
    setMidiFiles((prev) => [...prev, ...additions]);
  };

  const removeMidiFile = (id) => {
    setMidiFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.id !== id);
    });
    resetPlaybackState();
    setTrackMeta(null);
    setTracks(null);
    setMidiBpm(null);
  };

  const handleAudioFile = (file) => {
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    const url = URL.createObjectURL(file);
    audioUrlRef.current = url;
    audioFileRef.current = file;
    resetPlaybackState();
    setAudioUrl(url);
    setInfoText((t) => t.split(' + ')[0] + ' + audio : ' + file.name);
  };

  // Chaque note reçoit au hasard (de façon stable) l'une des formes importées.
  const handleCustomShapeFiles = (files) => {
    const additions = files.map((file) => ({
      id: Date.now() + '-' + Math.random().toString(36).slice(2, 8),
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setCustomShapes((prev) => [...prev, ...additions]);
    setShape('custom');
  };

  const removeCustomShape = (id) => {
    const target = customShapes.find((s) => s.id === id);
    if (target) URL.revokeObjectURL(target.url);
    const rest = customShapes.filter((s) => s.id !== id);
    setCustomShapes(rest);
    if (!rest.length && shape === 'custom') setShape('circles');
  };

  const handleReady = useCallback(({ duration: d, bpm, groups }) => {
    setMidiDuration(d);
    setMidiBpm(bpm);
    setTrackMeta(groups);
    setTracks((prev) => {
      const pal = PALETTES[palette] || PALETTES.aube;
      return groups.map((g, i) => ({
        visible: prev && prev[i] ? prev[i].visible : !g.drums,
        color: prev && prev[i] ? prev[i].color : pal[i % pal.length],
      }));
    });
    const total = groups.reduce((a, g) => a + g.noteCount, 0);
    const fileLabel = midiFiles.length > 1 ? midiFiles.length + ' fichiers MIDI' : (midiFiles[0] ? midiFiles[0].name : 'Fichier');
    setInfoText(fileLabel + ' : ' + total + ' notes, ' + groups.length + ' piste' + (groups.length > 1 ? 's' : ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette, midiFiles]);

  const handlePaletteChange = (e) => {
    const next = e.target.value;
    setPalette(next);
    setTracks((prev) => {
      if (!prev) return prev;
      const pal = PALETTES[next] || PALETTES.aube;
      return prev.map((t, i) => ({ ...t, color: pal[i % pal.length] }));
    });
  };

  const toggleTrackVisible = (i) => setTracks((prev) => prev.map((t, idx) => (idx === i ? { ...t, visible: !t.visible } : t)));
  const setTrackColor = (i, color) => setTracks((prev) => prev.map((t, idx) => (idx === i ? { ...t, color } : t)));

  const togglePlay = () => {
    if (!canPlay) return;
    if (playing) {
      if (audioUrl) audioElRef.current.pause();
      else { stopLocalClock(); setPlaying(false); }
    } else if (audioUrl) {
      audioElRef.current.play().catch(() => {});
    } else {
      if (currentTime >= duration) { clockRef.current.currentTime = 0; setCurrentTime(0); }
      setPlaying(true);
      startLocalClock();
    }
  };

  const handleTimeUpdate = () => {
    if (scrubbing) return;
    const audio = audioElRef.current;
    if (!audio) return;
    setCurrentTime(Math.max(0, audio.currentTime - offset));
  };

  const handleScrubInput = (e) => {
    const t = parseFloat(e.target.value);
    setCurrentTime(t);
    if (audioUrl) {
      const audio = audioElRef.current;
      if (audio) audio.currentTime = Math.max(0, t + offset);
    } else {
      clockRef.current.currentTime = t;
      synthRef.current.stopAll();
      if (playing) startLocalClock();
    }
  };

  // Ancien chemin, en secours pour les navigateurs sans WebCodecs (voir offlineExportSupported) :
  // capture temps réel du canvas (canvas.captureStream + MediaRecorder). Produit un frame rate variable
  // (voir offlineExport.js), donc à éviter dès que le nouveau chemin est disponible.
  const startRealtimeRecordingNow = () => {
    const canvas = canvasRef.current;
    if (!canvas || !canPlay) return;
    stopLocalClock();
    setCurrentTime(0);
    let extraAudioStream = null;
    if (audioUrl) {
      const audio = audioElRef.current;
      audio.pause();
      audio.currentTime = Math.max(0, offset);
    } else {
      clockRef.current.currentTime = 0;
      if (synthEnabled) {
        const ctx = synthRef.current.ensure();
        const dest = ctx.createMediaStreamDestination();
        synthRef.current.connectTap(dest);
        extraAudioStream = dest.stream;
      }
    }
    const recorder = recordCanvas(canvas, audioUrl ? audioElRef.current : null, {
      format,
      extraAudioStream,
      onStart: () => {
        setRecording(true);
        setPlaying(true);
        setRecInfo('Enregistrement en cours. Il s’arrête tout seul à la fin.');
        if (!audioUrl) startLocalClock();
      },
      onStop: ({ ext }) => {
        setRecording(false);
        setRecInfo(ext === 'webm'
          ? 'Vidéo prête (WEBM). Attention : After Effects lit mal le WebM (souvent sans le son) — convertis-la en MP4 avant import (ex. avec HandBrake) si besoin.'
          : 'Vidéo prête (MP4).');
      },
      onError: (msg) => { setRecording(false); setRecInfo(msg); },
    });
    recorderRef.current = recorder;
    if (recorder && audioUrl) audioElRef.current.play().catch(() => {});
  };

  // Export hors-ligne (image par image, pas de lecture en temps réel) : frame rate réellement
  // constant, lisible tel quel dans un logiciel de montage. Ne touche pas à l'aperçu en direct, qui
  // reste utilisable normalement pendant l'export.
  const startOfflineExportNow = () => {
    exportModeRef.current = 'offline';
    cancelExportRef.current = false;
    setRecording(true);
    // Rappel du tempo réellement appliqué : un facteur ×1.0000 alors qu'on croyait avoir corrigé le BPM se voit tout de suite.
    const tempoNote = midiBpm
      ? (Math.abs(rate - 1) < 1e-6 ? `tempo du MIDI non corrigé (${midiBpm.toFixed(0)} BPM)` : `tempo ${realBpm} BPM (×${rate.toFixed(4)})`)
      : '';
    setRecInfo(`Export en cours (0 %)${tempoNote ? ' — ' + tempoNote : ''}…`);
    const dims = exportDimensions(FORMAT_RATIOS[format] || 1);
    exportVideoOffline({
      midiSources,
      palette,
      tracks,
      format,
      width: dims.width,
      height: dims.height,
      fps: 30,
      shape,
      customShapeSrcs: customShapeUrls,
      tint,
      secondsVisible,
      headPosition,
      noteSize,
      spread,
      lines,
      steps,
      glow,
      trail,
      whiteLine,
      playheadLine,
      spinSpeed,
      mode,
      iris,
      rate,
      duration,
      offset: audioUrl ? offset : 0,
      audioFile: audioUrl ? audioFileRef.current : null,
      synthEnabled,
      cancelRef: cancelExportRef,
      onProgress: (p) => setRecInfo(`Export en cours (${Math.round(p * 100)} %)${tempoNote ? ' — ' + tempoNote : ''}…`),
      onDone: ({ cancelled }) => {
        setRecording(false);
        setRecInfo(cancelled ? 'Export annulé.' : `Vidéo prête (MP4, frame rate constant${tempoNote ? ' ; ' + tempoNote : ''}).`);
      },
      onError: (msg) => { setRecording(false); setRecInfo(msg); },
    });
  };

  const startRecordingNow = () => {
    if (!canPlay) return;
    if (offlineExportSupported()) startOfflineExportNow();
    else { exportModeRef.current = 'realtime'; startRealtimeRecordingNow(); }
  };

  const handleRecordClick = () => {
    if (!recording) return startRecordingNow();
    if (exportModeRef.current === 'offline') cancelExportRef.current = true;
    else stopRecording(recorderRef.current);
  };

  return (
    <main className="midigen">
      <Helmet>
        <title>Midigen — Benjamin Gibert</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="midigen_stage" ref={stageRef}>
        <div
          className="midigen_stageBox"
          style={stageBoxSize ? { width: stageBoxSize.width, height: stageBoxSize.height } : undefined}
        >
          <MidiVisualizer
            ref={canvasRef}
            midiSrc={midiSources}
            audioRef={audioUrl ? audioElRef : clockRef}
            offset={audioUrl ? offset : 0}
            rate={rate}
            format={format}
            shape={shape}
            customShapeSrcs={customShapeUrls}
            palette={palette}
            tracks={tracks}
            secondsVisible={secondsVisible}
            headPosition={headPosition}
            noteSize={noteSize}
            spread={spread}
            lines={lines}
            steps={steps}
            glow={glow}
            trail={trail}
            whiteLine={whiteLine}
            playheadLine={playheadLine}
            spinSpeed={spinSpeed}
            mode={mode}
            iris={iris}
            tint={tint}
            onReady={handleReady}
            ariaLabel="Aperçu du visuel MIDI"
          />
        </div>
        {recording && <div className="midigen_recbadge">Enregistrement</div>}
      </div>

      <section className="midigen_panel" data-mode={mode}>
        <div>
          <h1>Visualiseur MIDI</h1>
          <p className="midigen_lede">
            {mode === 'notes'
              ? 'Chaque note devient une forme, les lignes suivent les voix.'
              : 'Chaque note libère une irisation qui se diffuse depuis la barre.'}
          </p>
        </div>

        <div className="midigen_seg midigen_seg--tabs" role="tablist" aria-label="Mode de visualisation">
          <button type="button" role="tab" aria-selected={mode === 'notes'} onClick={() => setMode('notes')}>Notes</button>
          <button type="button" role="tab" aria-selected={mode === 'iris'} onClick={() => setMode('iris')}>Irisation</button>
        </div>

        <div className="midigen_transport">
          <button
            type="button"
            className="midigen_play"
            onClick={togglePlay}
            disabled={!canPlay}
            aria-label={playing ? 'Pause' : 'Lecture'}
          >
            {playing ? (
              <svg viewBox="0 0 20 20"><path d="M4 3h4v14H4zM12 3h4v14h-4z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 20 20"><path d="M5 3l12 7-12 7z" fill="currentColor" /></svg>
            )}
          </button>
          <div className="midigen_scrubwrap">
            <input
              type="range"
              min="0"
              max={duration.toFixed(2)}
              step="0.01"
              value={currentTime}
              disabled={!canPlay}
              aria-label="Position"
              onPointerDown={() => setScrubbing(true)}
              onPointerUp={() => setScrubbing(false)}
              onChange={handleScrubInput}
            />
            <span className="midigen_time">{fmt(currentTime)} / {fmt(duration)}</span>
          </div>
        </div>

        <div className="midigen_row">
          <label className="midigen_btn midigen_btn--primary">
            Ajouter un MIDI
            <input
              type="file"
              accept=".mid,.midi,audio/midi,audio/x-midi"
              multiple
              hidden
              onChange={(e) => { const files = [...e.target.files]; if (files.length) handleMidiFilesAdd(files); e.target.value = ''; }}
            />
          </label>
          <label className="midigen_btn">
            Ajouter l’audio (optionnel)
            <input
              type="file"
              accept="audio/*"
              hidden
              onChange={(e) => { const f = e.target.files[0]; if (f) handleAudioFile(f); e.target.value = ''; }}
            />
          </label>
        </div>
        {midiFiles.length > 0 && (
          <ul className="midigen_fileList">
            {midiFiles.map((f) => (
              <li key={f.id}>
                <span>{f.name}</span>
                <button type="button" onClick={() => removeMidiFile(f.id)} aria-label={'Retirer ' + f.name}>×</button>
              </li>
            ))}
          </ul>
        )}
        <p className="midigen_info">{infoText}</p>

        <button
          type="button"
          className={`midigen_btn midigen_btn--rec${recording ? ' midigen_btn--recOn' : ''}`}
          onClick={handleRecordClick}
          disabled={!canPlay}
        >
          {recording ? (exportModeRef.current === 'offline' ? 'Annuler l’export' : 'Arrêter l’enregistrement') : 'Enregistrer la vidéo'}
        </button>
        <p className="midigen_info">{recInfo}</p>

        <details open>
          <summary>Rendu</summary>
          <div className="midigen_fields">
            <div className="midigen_field">
              <span>Format</span>
              <div className="midigen_seg">
                {Object.keys(FORMAT_LABELS).map((f) => (
                  <button key={f} type="button" aria-pressed={format === f} onClick={() => setFormat(f)}>
                    {FORMAT_LABELS[f]}
                  </button>
                ))}
              </div>
            </div>
            {mode === 'notes' && (
              <label className="midigen_field">
                <span>Secondes visibles <b>{secondsVisible}</b></span>
                <input type="range" min="2" max="24" step="0.5" value={secondsVisible} onChange={(e) => setSecondsVisible(parseFloat(e.target.value))} />
              </label>
            )}
            <label className="midigen_field">
              <span>{mode === 'notes' ? 'Position de la tête de lecture' : 'Position de la barre'}</span>
              <input type="range" min="0.15" max="0.85" step="0.01" value={headPosition} onChange={(e) => setHeadPosition(parseFloat(e.target.value))} />
            </label>
            {mode === 'notes' && (<>
            <label className="midigen_field">
              <span>Taille des notes</span>
              <input type="range" min="0.3" max="2.5" step="0.05" value={noteSize} onChange={(e) => setNoteSize(parseFloat(e.target.value))} />
            </label>
            <label className="midigen_field">
              <span>Étalement vertical</span>
              <input type="range" min="0.15" max="0.95" step="0.01" value={spread} onChange={(e) => setSpread(parseFloat(e.target.value))} />
            </label>
            <label className="midigen_field">
              <span>Forme des notes</span>
              <select value={shape} onChange={(e) => setShape(e.target.value)}>
                <option value="circles">Cercles</option>
                <option value="cones">Pommes de pin</option>
                {customShapes.length > 0 && (
                  <option value="custom">
                    {customShapes.length === 1 ? `Personnalisée (${customShapes[0].name})` : `Personnalisées (${customShapes.length} formes, au hasard)`}
                  </option>
                )}
              </select>
            </label>
            <div className="midigen_row">
              <label className="midigen_btn">
                Importer des formes (SVG)
                <input
                  type="file"
                  accept="image/svg+xml,.svg"
                  multiple
                  hidden
                  onChange={(e) => { const files = [...e.target.files]; if (files.length) handleCustomShapeFiles(files); e.target.value = ''; }}
                />
              </label>
            </div>
            {customShapes.length > 0 && (
              <ul className="midigen_fileList">
                {customShapes.map((s) => (
                  <li key={s.id}>
                    <span>{s.name}</span>
                    <button type="button" onClick={() => removeCustomShape(s.id)} aria-label={'Retirer ' + s.name}>×</button>
                  </li>
                ))}
              </ul>
            )}
            <label className="midigen_field">
              <span>Mouvement des formes</span>
              <select value={spinMode} onChange={(e) => setSpinMode(e.target.value)}>
                <option value="fixed">Fixes</option>
                <option value="spin">Rotation lente (sens aléatoire)</option>
              </select>
            </label>
            {spinMode === 'spin' && (
              <>
                <label className="midigen_field">
                  <span>Vitesse de rotation <b>{spinDegPerSec}°/s</b></span>
                  <input type="range" min="2" max="45" step="1" value={spinDegPerSec} onChange={(e) => setSpinDegPerSec(parseInt(e.target.value, 10))} />
                </label>
                {shape === 'circles' && <p className="midigen_info">Sans effet visible sur les cercles : choisis les pommes de pin ou des formes importées.</p>}
              </>
            )}
            {shape === 'cones' && (
              <label className="midigen_field">
                <span>Couleur de la piste sur les pommes de pin</span>
                <input type="range" min="0" max="1" step="0.05" value={tint} onChange={(e) => setTint(parseFloat(e.target.value))} />
              </label>
            )}
            <label className="midigen_field">
              <span>Palette</span>
              <select value={palette} onChange={handlePaletteChange}>
                <option value="aube">Aube</option>
                <option value="glacier">Glacier</option>
                <option value="braise">Braise</option>
                <option value="craie">Craie</option>
              </select>
            </label>
            <label className="midigen_check">
              <input type="checkbox" checked={lines} onChange={(e) => setLines(e.target.checked)} /> Lignes entre les notes
            </label>
            <label className="midigen_check">
              <input type="checkbox" checked={steps} onChange={(e) => setSteps(e.target.checked)} /> Lignes en escalier
            </label>
            <label className="midigen_check">
              <input type="checkbox" checked={glow} onChange={(e) => setGlow(e.target.checked)} /> Halo sur les notes jouées
            </label>
            <label className="midigen_check">
              <input type="checkbox" checked={trail} onChange={(e) => setTrail(e.target.checked)} /> Traînée lumineuse
            </label>
            <label className="midigen_check">
              <input type="checkbox" checked={whiteLine} onChange={(e) => setWhiteLine(e.target.checked)} /> Ligne blanche horizontale sur la note jouée
            </label>
            <label className="midigen_check">
              <input type="checkbox" checked={playheadLine} onChange={(e) => setPlayheadLine(e.target.checked)} /> Ligne blanche verticale fixe (tête de lecture)
            </label>
            </>)}
            {mode === 'iris' && (<>
              <label className="midigen_field">
                <span>Étendue <b>{Math.round(irisSpread * 100)} %</b></span>
                <input type="range" min="0.2" max="2.5" step="0.01" value={irisSpread} onChange={(e) => setIrisSpread(parseFloat(e.target.value))} />
              </label>
              <label className="midigen_field">
                <span>Épaisseur <b>{Math.round(irisSize * 100)} %</b></span>
                <input type="range" min="0.4" max="3" step="0.05" value={irisSize} onChange={(e) => setIrisSize(parseFloat(e.target.value))} />
              </label>
              <label className="midigen_field">
                <span>Persistance <b>{irisLife.toFixed(1)} s</b></span>
                <input type="range" min="1" max="8" step="0.1" value={irisLife} onChange={(e) => setIrisLife(parseFloat(e.target.value))} />
              </label>
              <label className="midigen_field">
                <span>Intensité <b>{irisGain.toFixed(2)}</b></span>
                <input type="range" min="0.4" max="2.5" step="0.05" value={irisGain} onChange={(e) => setIrisGain(parseFloat(e.target.value))} />
              </label>
              <label className="midigen_field">
                <span>Turbulence <b>{irisTurbulence.toFixed(2)}</b></span>
                <input type="range" min="0" max="1.5" step="0.05" value={irisTurbulence} onChange={(e) => setIrisTurbulence(parseFloat(e.target.value))} />
              </label>
              <div className="midigen_field">
                <span>Couleurs</span>
                <div className="midigen_seg midigen_seg--tabs">
                  <button type="button" aria-pressed={irisPalette === 'iridescent'} onClick={() => setIrisPalette('iridescent')}>Irisées</button>
                  <button type="button" aria-pressed={irisPalette === 'custom'} onClick={() => setIrisPalette('custom')}>Jeu perso</button>
                </div>
              </div>
              {irisPalette === 'iridescent' ? (
                <label className="midigen_field">
                  <span>Teinte <b>{Math.round(irisHue * 360)}°</b></span>
                  <input type="range" min="0" max="1" step="0.01" value={irisHue} onChange={(e) => setIrisHue(parseFloat(e.target.value))} />
                </label>
              ) : (<>
                <label className="midigen_field">
                  <span>Nombre de couleurs <b>{irisColorCount}</b></span>
                  <input type="range" min="1" max={IRIS_MAX_COLORS} step="1" value={irisColorCount} onChange={(e) => setIrisColorCount(parseInt(e.target.value, 10))} />
                </label>
                <div className="midigen_palette">
                  {irisColors.slice(0, irisColorCount).map((c, i) => (
                    <input
                      key={i}
                      type="color"
                      value={c}
                      aria-label={'Couleur ' + (i + 1)}
                      onChange={(e) => { const v = e.target.value; setIrisColors((arr) => arr.map((x, j) => (j === i ? v : x))); }}
                    />
                  ))}
                </div>
              </>)}
              <label className="midigen_check">
                <input type="checkbox" checked={irisLine} onChange={(e) => setIrisLine(e.target.checked)} /> Barre verticale
              </label>
              <p className="midigen_info">À l’export, la vidéo se prolonge de la durée nécessaire pour que la dernière onde s’éteigne.</p>
            </>)}
          </div>
        </details>

        <details>
          <summary>Pistes</summary>
          {trackMeta && tracks ? (
            <ul className="midigen_tracks">
              {trackMeta.map((meta, i) => (
                <li key={i} className="midigen_tracks_item">
                  <input
                    type="checkbox"
                    checked={tracks[i].visible}
                    aria-label={'Afficher ' + meta.name}
                    onChange={() => toggleTrackVisible(i)}
                  />
                  <input
                    type="color"
                    value={tracks[i].color}
                    aria-label={'Couleur de ' + meta.name}
                    onChange={(e) => setTrackColor(i, e.target.value)}
                  />
                  <span>
                    {meta.name} <small>{meta.noteCount} notes{meta.drums ? ', percussions' : ''}</small>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="midigen_info">Aucun fichier MIDI chargé.</p>
          )}
        </details>

        <details>
          <summary>Son</summary>
          <div className="midigen_fields">
            {!audioUrl && (
              <label className="midigen_check">
                <input type="checkbox" checked={synthEnabled} onChange={(e) => setSynthEnabled(e.target.checked)} /> Prévisualiser le son (synthé)
              </label>
            )}
            <label className="midigen_field">
              <span>Décalage audio <b>{offset.toFixed(2)} s</b></span>
              <input type="range" min="-5" max="5" step="0.01" value={offset} onChange={(e) => setOffset(parseFloat(e.target.value))} />
            </label>
            {midiBpm && (
              <label className="midigen_field">
                <span>
                  <span>Tempo du MIDI (BPM) <small>détecté : {midiBpm.toFixed(2)}</small></span>
                  <b>×{rate.toFixed(4)}</b>
                </span>
                <input
                  type="number"
                  min="20"
                  max="400"
                  step="0.01"
                  value={realBpm ?? ''}
                  onChange={(e) => setRealBpm(parseFloat(e.target.value) || midiBpm)}
                />
              </label>
            )}
            <label className="midigen_field">
              <span>Volume</span>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} />
            </label>
          </div>
        </details>
      </section>

      <audio
        ref={audioElRef}
        src={audioUrl || undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setAudioDuration(audioElRef.current.duration)}
        onEnded={handlePlaybackEnd}
        hidden
      />
    </main>
  );
}

export default Midigen;
