// Synthé minimal (oscillateur Web Audio) pour prévisualiser le son des notes sans fichier audio.
// Utilisé uniquement par l'outil privé /midigen — jamais par MidiVisualizer.
export function createSynth() {
  let ctx = null, master = null;
  const live = new Set();

  const ensure = () => {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0.7;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200;
      master.connect(lp); lp.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };

  const playNote = (note, when) => {
    const c = ensure();
    const o = c.createOscillator(); o.type = 'triangle';
    o.frequency.value = 440 * Math.pow(2, (note.pitch - 69) / 12);
    const gn = c.createGain();
    const peak = 0.02 + 0.13 * (note.vel / 127);
    const dur = Math.max(0.08, note.dur);
    gn.gain.setValueAtTime(0, when);
    gn.gain.linearRampToValueAtTime(peak, when + 0.008);
    gn.gain.setTargetAtTime(peak * 0.35, when + 0.01, 0.25);
    gn.gain.setTargetAtTime(0, when + dur, 0.08);
    o.connect(gn); gn.connect(master);
    o.start(when); o.stop(when + dur + 0.6);
    live.add(o); o.onended = () => live.delete(o);
  };

  const stopAll = () => { for (const o of live) { try { o.stop(); } catch (e) { /* déjà arrêté */ } } live.clear(); };
  const setVolume = (v) => { if (master) master.gain.value = v; };
  // Tape la sortie du synthé vers une destination additionnelle (ex. MediaStreamDestination pour l'export vidéo).
  const connectTap = (destNode) => { ensure(); master.connect(destNode); };

  return { ensure, playNote, stopAll, setVolume, connectTap };
}
