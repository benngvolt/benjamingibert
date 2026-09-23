import { buildVoices } from './buildVoices';
import { PALETTES } from './palettes';
import { parseMidi } from './parseMidi';

// Charge et parse un ou plusieurs fichiers .mid, puis fusionne leurs pistes en une seule liste.
// `sources` accepte une URL, ou un tableau d'URLs / { src, label }. Quand un `label` est fourni
// (fichier parmi plusieurs), il préfixe le nom des pistes de ce fichier pour les distinguer.
export async function loadMidiSources(sources) {
  const list = Array.isArray(sources) ? sources : (sources ? [sources] : []);
  const normalized = list.map(s => (typeof s === 'string' ? { src: s, label: null } : s));
  const rawGroupsList = await Promise.all(
    normalized.map(({ src }) => fetch(src).then(r => r.arrayBuffer()).then(parseMidi))
  );
  return rawGroupsList.flatMap((groups, i) => {
    const label = normalized[i].label;
    return label ? groups.map(g => ({ ...g, name: label + ' — ' + g.name })) : groups;
  });
}

// Regroupe les notes brutes issues de parseMidi() en voix, et construit la liste plate de notes triées.
export function prepareGroups(rawGroups) {
  const groups = rawGroups.map(g => ({
    name: g.name,
    drums: g.drums,
    notes: g.notes,
    voices: buildVoices(g.notes),
  }));
  const notes = [];
  groups.forEach((g, gi) => g.notes.forEach(n => { n.g = gi; notes.push(n); }));
  notes.sort((a, b) => a.time - b.time);
  notes.forEach((n, i) => { n.id = i; n._spr = null; n._sk = null; });
  const duration = notes.length ? Math.max(...notes.map(n => n.end)) : 1;
  return { groups, notes, duration };
}

// Applique couleur/visibilité par piste : palette par défaut, avec surcharges optionnelles (`tracks[i]`).
export function applyStyling(groups, paletteName, tracks) {
  const pal = PALETTES[paletteName] || PALETTES.aube;
  groups.forEach((g, i) => {
    const override = tracks && tracks[i];
    g.color = (override && override.color) || pal[i % pal.length];
    g.visible = override && typeof override.visible === 'boolean' ? override.visible : !g.drums;
  });
}

export function computeRange(groups) {
  let lo = 127, hi = 0;
  for (const g of groups) if (g.visible && !g.drums) for (const n of g.notes) { if (n.pitch < lo) lo = n.pitch; if (n.pitch > hi) hi = n.pitch; }
  if (lo > hi) { lo = 48; hi = 84; }
  return { lo: lo - 1, hi: hi + 1 };
}
