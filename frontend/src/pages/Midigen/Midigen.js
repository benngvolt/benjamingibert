import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Midigen.scss';
import MidiVisualizer from '../../components/MidiVisualizer/MidiVisualizer';
import { recordCanvas, stopRecording } from '../../components/MidiVisualizer/videoExport';
import { PALETTES } from '../../lib/midi/palettes';
import { loadMidiSources, prepareGroups } from '../../lib/midi/song';
import { createSynth } from '../../lib/midi/synth';

const FORMAT_LABELS = { portrait: '9:16', carre: '1:1', paysage: '16:9' };

const fmt = (s) => {
  s = Math.max(0, s || 0);
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return m + ':' + String(r).padStart(2, '0');
};

const baseName = (name) => name.replace(/\.[^.]+$/, '');

function Midigen() {
  const audioElRef = useRef(null);
  const canvasRef = useRef(null);
  const audioUrlRef = useRef(null);
  const customShapeUrlRef = useRef(null);
  const recorderRef = useRef(null);
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
  const [secondsVisible, setSecondsVisible] = useState(6);
  const [headPosition, setHeadPosition] = useState(0.45);
  const [noteSize, setNoteSize] = useState(1);
  const [spread, setSpread] = useState(0.5);
  const [shape, setShape] = useState('circles');
  const [customShapeUrl, setCustomShapeUrl] = useState(null);
  const [customShapeName, setCustomShapeName] = useState(null);
  const [tint, setTint] = useState(0.35);
  const [palette, setPalette] = useState('aube');
  const [lines, setLines] = useState(true);
  const [steps, setSteps] = useState(false);
  const [glow, setGlow] = useState(true);
  const [offset, setOffset] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [synthEnabled, setSynthEnabled] = useState(true);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const scrubbingRef = useRef(false);

  const [recording, setRecording] = useState(false);
  const recordingRef = useRef(false);
  const [recInfo, setRecInfo] = useState('L’enregistrement se fait en temps réel, du début à la fin du morceau.');

  const canPlay = midiFiles.length > 0;
  const duration = audioUrl && audioDuration
    ? Math.max(midiDuration || 1, Math.max(0, audioDuration - offset))
    : (midiDuration || 1);

  const midiSources = useMemo(
    () => midiFiles.map((f) => ({ src: f.url, label: midiFiles.length > 1 ? baseName(f.name) : null })),
    [midiFiles]
  );

  useEffect(() => { midiFilesRef.current = midiFiles; }, [midiFiles]);
  useEffect(() => { tracksRef.current = tracks; }, [tracks]);
  // Le loop rAF de l'horloge locale capture ses closures une seule fois : il doit lire ces refs
  // (toujours à jour) plutôt que les états correspondants, qui seraient figés à leur valeur de départ.
  useEffect(() => { recordingRef.current = recording; }, [recording]);
  useEffect(() => { scrubbingRef.current = scrubbing; }, [scrubbing]);

  useEffect(() => () => {
    midiFilesRef.current.forEach((f) => URL.revokeObjectURL(f.url));
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    if (customShapeUrlRef.current) URL.revokeObjectURL(customShapeUrlRef.current);
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
      .then((raw) => { if (!cancelled) synthSongRef.current = prepareGroups(raw); })
      .catch(() => { synthSongRef.current = null; });
    return () => { cancelled = true; };
  }, [midiFiles]);

  const stopLocalClock = () => {
    if (clockRafRef.current) cancelAnimationFrame(clockRafRef.current);
    clockRafRef.current = null;
    synthRef.current.stopAll();
  };

  const startLocalClock = () => {
    stopLocalClock();
    let last = performance.now();
    let schedIdx = 0;
    let ctxAnchor = null;
    const song = synthSongRef.current;
    const useSynth = synthEnabled && !audioUrl && song && song.notes.length > 0;
    if (useSynth) {
      const ctx = synthRef.current.ensure();
      const ctxStart = ctx.currentTime + 0.05;
      const songStart = clockRef.current.currentTime;
      ctxAnchor = { ctxStart, songStart };
      schedIdx = song.notes.findIndex((n) => n.time >= songStart);
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
        const horizon = next + 0.2;
        while (schedIdx < song.notes.length && song.notes[schedIdx].time < horizon) {
          const n = song.notes[schedIdx++];
          const g = song.groups[n.g];
          const override = tracksRef.current && tracksRef.current[n.g];
          const visible = override ? override.visible : !g.drums;
          if (visible && !g.drums) synthRef.current.playNote(n, ctxAnchor.ctxStart + (n.time - ctxAnchor.songStart));
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
  };

  const handleAudioFile = (file) => {
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    const url = URL.createObjectURL(file);
    audioUrlRef.current = url;
    resetPlaybackState();
    setAudioUrl(url);
    setInfoText((t) => t.split(' + ')[0] + ' + audio : ' + file.name);
  };

  const handleCustomShapeFile = (file) => {
    if (customShapeUrlRef.current) URL.revokeObjectURL(customShapeUrlRef.current);
    const url = URL.createObjectURL(file);
    customShapeUrlRef.current = url;
    setCustomShapeUrl(url);
    setCustomShapeName(file.name);
    setShape('custom');
  };

  const handleReady = useCallback(({ duration: d, groups }) => {
    setMidiDuration(d);
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

  const startRecordingNow = () => {
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
      onStop: ({ ext }) => { setRecording(false); setRecInfo('Vidéo prête (' + ext.toUpperCase() + ').'); },
      onError: (msg) => { setRecording(false); setRecInfo(msg); },
    });
    recorderRef.current = recorder;
    if (recorder && audioUrl) audioElRef.current.play().catch(() => {});
  };

  const handleRecordClick = () => (recording ? stopRecording(recorderRef.current) : startRecordingNow());

  return (
    <main className="midigen">
      <Helmet>
        <title>Midigen — Benjamin Gibert</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="midigen_stage">
        <MidiVisualizer
          ref={canvasRef}
          midiSrc={midiSources}
          audioRef={audioUrl ? audioElRef : clockRef}
          offset={audioUrl ? offset : 0}
          format={format}
          shape={shape}
          customShapeSrc={customShapeUrl}
          palette={palette}
          tracks={tracks}
          secondsVisible={secondsVisible}
          headPosition={headPosition}
          noteSize={noteSize}
          spread={spread}
          lines={lines}
          steps={steps}
          glow={glow}
          tint={tint}
          onReady={handleReady}
          ariaLabel="Aperçu du visuel MIDI"
        />
        {recording && <div className="midigen_recbadge">Enregistrement</div>}
      </div>

      <section className="midigen_panel">
        <div>
          <h1>Visualiseur MIDI</h1>
          <p className="midigen_lede">Chaque note devient une forme, les lignes suivent les voix.</p>
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
          {recording ? 'Arrêter l’enregistrement' : 'Enregistrer la vidéo'}
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
            <label className="midigen_field">
              <span>Secondes visibles <b>{secondsVisible}</b></span>
              <input type="range" min="2" max="24" step="0.5" value={secondsVisible} onChange={(e) => setSecondsVisible(parseFloat(e.target.value))} />
            </label>
            <label className="midigen_field">
              <span>Position de la tête de lecture</span>
              <input type="range" min="0.15" max="0.85" step="0.01" value={headPosition} onChange={(e) => setHeadPosition(parseFloat(e.target.value))} />
            </label>
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
                {customShapeUrl && <option value="custom">Personnalisée ({customShapeName})</option>}
              </select>
            </label>
            <div className="midigen_row">
              <label className="midigen_btn">
                Importer une forme (SVG)
                <input
                  type="file"
                  accept="image/svg+xml,.svg"
                  hidden
                  onChange={(e) => { const f = e.target.files[0]; if (f) handleCustomShapeFile(f); e.target.value = ''; }}
                />
              </label>
            </div>
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
