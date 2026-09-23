// Regroupe les notes d'une piste en voix (pour tracer les lignes de mélodie).
export function buildVoices(notes) {
  const voices = [];
  const sorted = [...notes].sort((a, b) => a.time - b.time || b.pitch - a.pitch);
  for (const n of sorted) {
    let best = null, bd = 1e9;
    for (const v of voices) {
      const last = v[v.length - 1];
      if (last.end <= n.time + 0.04 && n.time - last.end < 5) {
        const dd = Math.abs(last.pitch - n.pitch) + (n.time - last.end) * 2;
        if (dd < bd && !v._taken) { bd = dd; best = v; }
      }
    }
    if (best && bd <= 24) best.push(n); else voices.push([n]);
  }
  return voices;
}
