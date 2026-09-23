import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import './MidiVisualizer.scss';
import { useInView } from '../../utils/useInView';
import { loadMidiSources, prepareGroups, applyStyling, computeRange } from '../../lib/midi/song';
import { renderFrame } from '../../lib/midi/renderFrame';
import { loadCustomShapeImage } from '../../lib/midi/customSprite';

// Composant public minimal : aucune UI de réglage, aucun export. Se synchronise uniquement sur
// `audioRef.current.currentTime` (pas de synthé). Tous les réglages viennent des props.
// `midiSrc` accepte une URL, ou un tableau d'URLs / { src, label } pour combiner plusieurs .mid.
const MidiVisualizer = forwardRef(function MidiVisualizer(
  {
    midiSrc,
    audioRef,
    offset = 0,
    format = 'portrait',
    shape = 'circles',
    customShapeSrc,
    palette = 'aube',
    tracks,
    secondsVisible = 6,
    headPosition = 0.45,
    noteSize = 1,
    spread = 0.5,
    lines = true,
    steps = false,
    glow = true,
    tint = 0.35,
    ariaLabel,
    className,
    onReady,
  },
  forwardedRef
) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const songRef = useRef(null);
  const spriteCacheRef = useRef([]);
  const customImageRef = useRef(null);
  const onReadyRef = useRef(onReady);
  const [songVersion, setSongVersion] = useState(0);
  const [customImageVersion, setCustomImageVersion] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    typeof document === 'undefined' ? true : !document.hidden
  );
  const { ref: inViewRef, inView } = useInView({ once: false, threshold: 0, rootMargin: '0px' });

  useImperativeHandle(forwardedRef, () => canvasRef.current, []);

  const setContainerRef = useCallback((node) => {
    containerRef.current = node;
    inViewRef.current = node;
  }, [inViewRef]);

  useEffect(() => { onReadyRef.current = onReady; }, [onReady]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Clé stable pour dédupliquer les refetch : `midiSrc` peut être une URL, ou un tableau (potentiellement
  // recréé à chaque rendu par le parent) d'URLs / { src, label } à fusionner.
  const midiSrcKey = useMemo(() => {
    const list = Array.isArray(midiSrc) ? midiSrc : (midiSrc ? [midiSrc] : []);
    return list.map(s => (typeof s === 'string' ? s : `${s.src}::${s.label || ''}`)).join('\n');
  }, [midiSrc]);

  // Chargement + parsing du/des .mid : seul `midiSrcKey` doit déclencher un nouveau fetch.
  useEffect(() => {
    let cancelled = false;
    songRef.current = null;
    spriteCacheRef.current = [];
    if (!midiSrcKey) { setSongVersion(v => v + 1); return; }
    loadMidiSources(midiSrc)
      .then(raw => {
        if (cancelled) return;
        const prepared = prepareGroups(raw);
        songRef.current = prepared;
        if (onReadyRef.current) {
          onReadyRef.current({
            duration: prepared.duration,
            groups: prepared.groups.map(g => ({ name: g.name, drums: g.drums, noteCount: g.notes.length })),
          });
        }
        setSongVersion(v => v + 1);
      })
      .catch(() => { songRef.current = null; setSongVersion(v => v + 1); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [midiSrcKey]);

  // Chargement de la forme personnalisée (SVG) : rechargée seulement quand sa source change.
  useEffect(() => {
    let cancelled = false;
    customImageRef.current = null;
    if (!customShapeSrc) { setCustomImageVersion(v => v + 1); return; }
    loadCustomShapeImage(customShapeSrc)
      .then(img => { if (!cancelled) { customImageRef.current = img; setCustomImageVersion(v => v + 1); } })
      .catch(() => { customImageRef.current = null; setCustomImageVersion(v => v + 1); });
    return () => { cancelled = true; };
  }, [customShapeSrc]);

  const renderNow = useCallback(() => {
    const song = songRef.current;
    const canvas = canvasRef.current;
    if (!song || !canvas) return;
    const ctx = canvas.getContext('2d');
    const audio = audioRef && audioRef.current;
    const t = audio ? Math.max(0, audio.currentTime - offset) : 0;
    renderFrame(ctx, canvas.width, canvas.height, {
      groups: song.groups, notes: song.notes, t,
      lo: song.lo, hi: song.hi, secs: secondsVisible, head: headPosition,
      size: noteSize, spread, lines, steps, glow, shape, tint, customImage: customImageRef.current,
    }, spriteCacheRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef, offset, secondsVisible, headPosition, noteSize, spread, lines, steps, glow, shape, tint, customImageVersion]);

  // Couleurs/visibilité par piste : recalculées sans reparser le fichier.
  useEffect(() => {
    const song = songRef.current;
    if (!song) return;
    applyStyling(song.groups, palette, tracks);
    const range = computeRange(song.groups);
    song.lo = range.lo; song.hi = range.hi;
    renderNow();
  }, [songVersion, palette, tracks, renderNow]);

  // Résolution du canvas asservie à sa taille CSS réelle (DPR plafonné pour la performance).
  useEffect(() => {
    const wrap = containerRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      renderNow();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [renderNow]);

  // Boucle de rendu : active seulement à l'écran, onglet visible, et si le mouvement n'est pas réduit.
  useEffect(() => {
    if (!inView || !pageVisible) return;
    if (reducedMotion) { renderNow(); return; }
    let raf = requestAnimationFrame(function loop() {
      renderNow();
      raf = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, pageVisible, reducedMotion, renderNow, songVersion, customImageVersion]);

  return (
    <div
      ref={setContainerRef}
      className={`midiVisualizer midiVisualizer--${format}${className ? ' ' + className : ''}`}
    >
      <canvas
        ref={canvasRef}
        className="midiVisualizer_canvas"
        role="img"
        aria-label={ariaLabel || 'Visualisation animée des notes MIDI'}
      />
    </div>
  );
});

export default MidiVisualizer;
