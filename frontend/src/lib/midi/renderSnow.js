import { hash01 } from './renderFrame';

// Mode « Snowflake » : un flocon de neige à N branches, dessiné en fines lignes ou en hexagones allongés. Chaque note fait briller et
// vibrer une bande du flocon : plus la note est grave, plus la bande est près du centre ; plus elle est aiguë,
// plus elle est vers l'extrémité des branches. Comme renderFrame/renderIris, c'est une fonction pure du temps
// `t` : l'aperçu, le défilement et l'export donnent la même image pour un même instant.

const STEP = 0.016; // pas de subdivision des lignes (rayon du flocon = 1) : c'est ce qui permet la vibration
const MAX_ACTIVE = 60;
const BAND_CUTOFF = 3.2; // au-delà de ce nombre d'écarts-types, une note n'influence plus le point

const rgbCache = {};
function hexToRgb(hex) {
  if (!rgbCache[hex]) {
    const h = hex.replace('#', '');
    const v = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    rgbCache[hex] = [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  return rgbCache[hex];
}

// --- Géométrie ---------------------------------------------------------------------------------

// Largeur d'un cristal le long de sa branche : un hexagone allongé, pointu aux deux bouts. Chaque côté est décrit
// par la moitié de son contour [u, w] (u = 0 au départ, 1 à la pointe ; w = largeur relative, 0..1).
// Position des « épaules » (là où le cristal atteint sa pleine largeur) selon la variante : plus elles sont loin
// de la pointe, plus la pointe est aiguë ; plus elles en sont près, plus elle est obtuse.
const HEX_SHOULDER = { hexagon: 0.14, 'hexagon-acute': 0.32, 'hexagon-obtuse': 0.05 };
// Demi-largeur d'un cristal, en fraction de la longueur de sa branche (tronc, branche, sous-branche) ; `crystal`
// donne un coefficient par degré de ramification, dans le même ordre.
const WIDTH_RATIO = [0.032, 0.07, 0.095];

// Largeur de la demi-silhouette `verts` à l'abscisse u (interpolation entre sommets).
function widthAt(verts, u) {
  for (let i = 0; i < verts.length - 1; i++) {
    const [u0, w0] = verts[i], [u1, w1] = verts[i + 1];
    if (u <= u1 || i === verts.length - 2) return u1 === u0 ? w1 : w0 + ((w1 - w0) * (u - u0)) / (u1 - u0);
  }
  return 0;
}

// Point (x, y) à l'intérieur du polygone `poly` (liste de [x, y]) : lancer de rayon.
function inside(poly, x, y) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

// `organic` (0..1) : l'irrégularité du cristal lui-même, jamais celle des proportions du flocon (bras, positions
// et angles des branches restent réguliers, comme l'épaisseur des hexagones, qui ne dépend que des curseurs).
// Selon l'élément : angles rognés, extrémité tronquée, fusion avec un hexagone voisin qu'il touche (le trait
// n'est alors tracé que sur le contour commun). Chaque tirage dépend de `seed` et de l'identité de l'élément (pas de l'ordre de
// construction) : faire varier `organic` modifie donc progressivement le même flocon au lieu d'en produire un autre.
export function buildFlake({ arms, branches, angle, length, sub, rings, shape = 'line', crystal = [1, 1, 1], organic = 0, seed = 1, base = 1, fuseAll = false }) {
  const items = []; // { pts, ladder, ... } : ladder = vrai pour un cristal (contour fermé, voir plus bas)
  const tips = [];
  const o = organic;
  const A = (angle * Math.PI) / 180;
  const sector = (2 * Math.PI) / arms;
  // Les branches ne doivent pas déborder sur le bras voisin quand il y en a beaucoup.
  const fit = Math.min(1, 1.9 * Math.sin(sector / 2));
  const hex = shape in HEX_SHOULDER;
  const shoulder = HEX_SHOULDER[shape];

  const rnd = (...ks) => {
    let h = Math.imul(seed + 17, 374761393);
    for (const k of ks) { h = Math.imul(h ^ k, 2654435761); h ^= h >>> 15; h = Math.imul(h, 2246822519); h ^= h >>> 13; }
    return (h >>> 0) / 4294967296;
  };

  const rot = (x, y, th) => [x * Math.cos(th) - y * Math.sin(th), x * Math.sin(th) + y * Math.cos(th)];
  const branchPos = (j) => (branches === 1 ? 0.4 : 0.2 + (0.7 * j) / (branches - 1));
  // Les ramifications rapetissent régulièrement vers l'extrémité du bras : de `base` × 0.55 près du centre
  // (s = 0.2) à 0.15 vers la pointe (s = 0.9). `base` règle donc l'écart entre la base et l'extrémité.
  const branchLen = (s) => length * fit * (0.148 + (0.55 * base - 0.148) * ((0.9 - s) / 0.7));

  // Demi-contour d'un côté : un angle (épaule) peut être rogné, c'est-à-dire remplacé par un petit pan coupé.
  const sideVerts = (id, side) => {
    const v = [[0, 0], [shoulder, 1], [1 - shoulder, 1], [1, 0]];
    const out = [v[0]];
    for (const i of [1, 2]) {
      if (rnd(id, 20 + side, i) < o * 0.8) {
        const c = 0.25 + 0.35 * rnd(id, 22 + side, i);
        const P = v[i - 1], N = v[i + 1], V = v[i];
        out.push([V[0] + c * (P[0] - V[0]), V[1] + c * (P[1] - V[1])], [V[0] + c * (N[0] - V[0]), V[1] + c * (N[1] - V[1])]);
      } else out.push(v[i]);
    }
    out.push(v[3]);
    return out;
  };

  // Un segment (a -> b) devient soit une ligne, soit un hexagone allongé : un contour fermé. Les points gauche
  // L_0..L_n puis droite R_n..R_0 sont rangés l'un après l'autre : R_i est à la position 2n+1-i, ce qui permet de
  // recoller les cellules (L_i, L_i+1, R_i+1, R_i) au moment de colorier.
  const segment = (a, b, level, th, id, armIdx) => {
    const A0 = rot(a[0], a[1], th);
    let B0 = rot(b[0], b[1], th);
    // Ramification rognée : coupée net avant sa pointe (jamais le tronc).
    const uEnd = level > 0 && rnd(id, 30) < o * 0.4 ? 0.55 + 0.35 * rnd(id, 31) : 1;
    const dx0 = B0[0] - A0[0], dy0 = B0[1] - A0[1], len = Math.hypot(dx0, dy0);
    if (len < 1e-6) return;
    const dx = dx0 * uEnd, dy = dy0 * uEnd;
    B0 = [A0[0] + dx, A0[1] + dy];
    const nx = -dy0 / len, ny = dx0 / len;
    const n = Math.max(2, Math.ceil((len * uEnd) / STEP));
    if (!hex) {
      const pts = [];
      for (let i = 0; i <= n; i++) pts.push([A0[0] + (dx * i) / n, A0[1] + (dy * i) / n]);
      items.push({ pts, ladder: false });
      tips.push(B0);
      return;
    }
    const hw = crystal[level] * len * WIDTH_RATIO[level];
    const vl = sideVerts(id, 0), vr = sideVerts(id, 1);
    // Abscisses échantillonnées : régulières, plus celles des sommets (pour que les angles restent nets).
    const us = new Set();
    for (let i = 0; i <= n; i++) us.add(+(uEnd * i / n).toFixed(5));
    for (const v of vl.concat(vr)) if (v[0] <= uEnd) us.add(+v[0].toFixed(5));
    const list = [...us].sort((p, q) => p - q);
    const Ls = [], Rs = [];
    for (const u of list) {
      const wl = hw * widthAt(vl, u), wr = hw * widthAt(vr, u);
      const cx = A0[0] + dx0 * u, cy = A0[1] + dy0 * u;
      Ls.push([cx + nx * wl, cy + ny * wl]); Rs.push([cx - nx * wr, cy - ny * wr]);
    }
    const poly = Ls.concat(Rs.slice().reverse());
    let area = 0;
    for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length]; area += p[0] * q[1] - q[0] * p[1]; }
    items.push({
      pts: Ls.concat(Rs.reverse(), [Ls[0]]), ladder: true, n: list.length - 1, rev: area < 0, poly, id, arm: armIdx,
      bb: [Math.min(...poly.map((p) => p[0])), Math.min(...poly.map((p) => p[1])), Math.max(...poly.map((p) => p[0])), Math.max(...poly.map((p) => p[1]))],
    });
    tips.push(B0);
  };

  for (let k = 0; k < arms; k++) {
    const th = k * sector;
    segment([0, 0], [1, 0], 0, th, k * 1000, k);
    tips.push(rot(1, 0, th));
    for (let j = 0; j < branches; j++) {
      const s = branchPos(j), L = branchLen(s);
      for (const side of [1, -1]) {
        const id = k * 1000 + j * 10 + (side > 0 ? 1 : 2);
        const dx = Math.cos(A), dy = side * Math.sin(A);
        segment([s, 0], [s + L * dx, L * dy], 1, th, id, k);
        if (sub && L > 0.05) {
          let q = 0;
          for (const u of [0.5, 0.8]) {
            const bx = s + L * u * dx, by = L * u * dy, SL = L * 0.4 * (1.15 - u * 0.5);
            for (const sd of [1, -1]) {
              const a2 = Math.atan2(dy, dx) + sd * A * 0.85;
              segment([bx, by], [bx + SL * Math.cos(a2), by + SL * Math.sin(a2)], 2, th, id * 10 + (q++) + 3, k);
            }
          }
        }
      }
    }
  }
  // Anneaux : polygone régulier reliant les bras, à des distances fixes du centre.
  const ringPos = [0.3, 0.52, 0.74];
  for (let r = 0; r < Math.min(3, rings); r++) {
    const pts = [];
    for (let k = 0; k <= arms; k++) pts.push(rot(ringPos[r], 0, (k % arms) * sector));
    items.push({ pts, ladder: false });
  }

  // Fusion : deux hexagones d'un même bras dont les silhouettes se recouvrent peuvent n'en former qu'un seul,
  // dont seul le contour extérieur est tracé (les points de l'un qui tombent dans l'autre sont masqués).
  // Avec `fuseAll`, tous ceux qui se recouvrent fusionnent, même d'un bras à l'autre : le flocon n'a plus
  // qu'une seule silhouette.
  const cryst = items.filter((it) => it.ladder);
  for (const it of cryst) it.hide = new Uint8Array(it.pts.length);
  if (o > 0 || fuseAll) {
    for (let p = 0; p < cryst.length; p++) {
      for (let q = p + 1; q < cryst.length; q++) {
        const A1 = cryst[p], B1 = cryst[q];
        if (!fuseAll && A1.arm !== B1.arm) continue;
        if (A1.bb[0] > B1.bb[2] || B1.bb[0] > A1.bb[2] || A1.bb[1] > B1.bb[3] || B1.bb[1] > A1.bb[3]) continue;
        if (!fuseAll && rnd(A1.id, B1.id, 40) >= o * 0.85) continue;
        for (const [X, Y] of [[A1, B1], [B1, A1]]) {
          for (let i = 0; i < X.pts.length; i++) if (inside(Y.poly, X.pts[i][0], X.pts[i][1])) X.hide[i] = 1;
        }
      }
    }
  }

  // Normalisation : le point le plus éloigné est à distance 1 du centre.
  let maxR = 0.0001;
  for (const it of items) for (const [x, y] of it.pts) maxR = Math.max(maxR, Math.hypot(x, y));
  const inv = 1 / maxR;

  // Découpage en petits segments (sauf pour les cristaux, déjà échantillonnés) ; `starts[i]`..`starts[i+1]`
  // délimite les points de la ligne i.
  const xs = [], ys = [], hides = [], starts = [0], ladders = [];
  for (const it of items) {
    const pts = it.pts;
    if (it.ladder) {
      ladders.push({ start: xs.length, n: it.n, rev: it.rev });
      pts.forEach(([x, y], i) => { xs.push(x * inv); ys.push(y * inv); hides.push(it.hide[i]); });
    } else {
      for (let p = 0; p < pts.length - 1; p++) {
        const [x0, y0] = pts[p], [x1, y1] = pts[p + 1];
        const n = Math.max(1, Math.ceil((Math.hypot(x1 - x0, y1 - y0) * inv) / STEP));
        for (let q = 0; q < n; q++) { xs.push((x0 + ((x1 - x0) * q) / n) * inv); ys.push((y0 + ((y1 - y0) * q) / n) * inv); hides.push(0); }
      }
      const last = pts[pts.length - 1];
      xs.push(last[0] * inv); ys.push(last[1] * inv); hides.push(0);
    }
    starts.push(xs.length);
  }
  const nPts = xs.length;
  const x = Float32Array.from(xs), y = Float32Array.from(ys), hide = Uint8Array.from(hides);
  const rho = new Float32Array(nPts), arm = new Uint8Array(nPts);
  for (let i = 0; i < nPts; i++) {
    rho[i] = Math.hypot(x[i], y[i]);
    const a = ((Math.atan2(y[i], x[i]) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    arm[i] = Math.round(a / sector) % arms;
  }
  const tipsN = tips.map(([tx, ty]) => {
    const r = Math.hypot(tx, ty) * inv;
    const a = ((Math.atan2(ty, tx) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    return { x: tx * inv, y: ty * inv, rho: r, arm: Math.round(a / sector) % arms };
  });
  return { x, y, rho, arm, hide, starts, ladders, tips: tipsN, nPts };
}

// --- Rendu -------------------------------------------------------------------------------------

export function renderSnow(ctx, W, H, state, cache) {
  const {
    groups, notes, t, lo, hi,
    arms = 6, branches = 4, angle = 60, length = 1, sub = true, rings = 1,
    size = 1, band = 0.1, decay = 0.9, vibration = 1, gain = 1.4, spin = 0, perArm = false,
    trackColors = false, color = '#bfe8ff', thickness = 1, shape = 'line', crystal = [1, 1, 1], organic = 0, seed = 1, base = 1, fuseAll = false, fill = true,
  } = state;

  const key = [arms, branches, angle, length, sub ? 1 : 0, rings, shape, crystal.join(','), organic, seed, base, fuseAll ? 1 : 0].join('|');
  if (cache.key !== key) { cache.flake = buildFlake({ arms, branches, angle, length, sub, rings, shape, crystal, organic, seed, base, fuseAll }); cache.key = key; }
  const fl = cache.flake;
  const n = fl.nPts;
  if (!cache.buf || cache.buf.n !== n) {
    cache.buf = { n, px: new Float32Array(n), py: new Float32Array(n), E: new Float32Array(n), r: new Float32Array(n), g: new Float32Array(n), b: new Float32Array(n) };
  }
  const { px, py, E, r: cr, g: cg, b: cb } = cache.buf;

  // --- Notes en cours ---
  const span = Math.max(1, hi - lo);
  const baseRgb = hexToRgb(color);
  const active = [];
  for (const nt of notes) {
    if (nt.time > t) break;
    const g = groups[nt.g]; if (!g.visible || g.drums) continue;
    if (t - nt.end > decay * 3) continue;
    const age = t - nt.time;
    const s = 0.5 + 0.5 * nt.vel / 127;
    const sus = t <= nt.end ? 1 : Math.exp(-(t - nt.end) / (decay * 0.6));
    const env = s * Math.min(1, age / 0.02) * (0.55 * Math.exp(-age / decay) + 0.45 * sus);
    if (env < 0.01) continue;
    const rho0 = 0.03 + 0.97 * (nt.pitch - lo) / span;
    active.push({
      rho0, env, age,
      arm: Math.floor(hash01(nt.id, 9) * arms),
      f: 3 + 6 * rho0, // les notes aiguës vibrent plus vite (reste sous la moitié du taux d'images)
      ph: hash01(nt.id, 7) * Math.PI * 2,
      rgb: trackColors ? hexToRgb(g.color) : baseRgb,
    });
  }
  if (active.length > MAX_ACTIVE) active.splice(0, active.length - MAX_ACTIVE);

  // --- Champ d'énergie + déplacement de chaque point ---
  const amp = vibration * 0.035;
  for (let i = 0; i < n; i++) {
    const rho = fl.rho[i], ar = fl.arm[i];
    let e = 0, r = 0, g = 0, b = 0, dt = 0, dr = 0;
    for (let k = 0; k < active.length; k++) {
      const o = active[k];
      const d = (rho - o.rho0) / band;
      if (d > BAND_CUTOFF || d < -BAND_CUTOFF) continue;
      let w = o.env * Math.exp(-d * d);
      if (perArm && ar !== o.arm) w *= 0.08;
      if (w < 0.003) continue;
      e += w; r += w * o.rgb[0]; g += w * o.rgb[1]; b += w * o.rgb[2];
      // Onde qui se propage le long du bras : le déplacement dépend de la distance au centre.
      const ph = 2 * Math.PI * o.f * o.age - 16 * (rho - o.rho0) + o.ph;
      dt += w * Math.sin(ph);
      dr += w * 0.6 * Math.cos(ph);
    }
    E[i] = e;
    if (e > 0) { cr[i] = r / e; cg[i] = g / e; cb[i] = b / e; } else { cr[i] = baseRgb[0]; cg[i] = baseRgb[1]; cb[i] = baseRgb[2]; }
    const x = fl.x[i], y = fl.y[i];
    const inv = rho > 1e-4 ? 1 / rho : 0;
    // tangent = (-y, x)/rho ; radial = (x, y)/rho
    px[i] = x + amp * (dt * -y * inv + dr * x * inv);
    py[i] = y + amp * (dt * x * inv + dr * y * inv);
  }

  // --- Dessin ---
  const R = Math.min(W, H) * 0.46 * size;
  const cx = W / 2, cy = H / 2;
  const unit = Math.min(W, H) / 1080;
  const lw = Math.max(1, 1.8 * unit * thickness);
  const ca = Math.cos(spin * t), sa = Math.sin(spin * t);
  const X = (i) => cx + (px[i] * ca - py[i] * sa) * R;
  const Y = (i) => cy + (px[i] * sa + py[i] * ca) * R;

  ctx.save();
  ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';

  // Cristaux au repos : remplissage très léger.
  if (fill && fl.ladders.length) {
    ctx.fillStyle = `rgba(${baseRgb[0]},${baseRgb[1]},${baseRgb[2]},0.07)`;
    ctx.beginPath();
    for (const ld of fl.ladders) {
      // Sens de parcours uniforme, pour que les cristaux qui se recouvrent se réunissent en une seule surface.
      const first = ld.start, last = ld.start + 2 * ld.n + 2;
      for (let k = 0; k <= last - first; k++) {
        const i = ld.rev ? last - k : first + k;
        if (k === 0) ctx.moveTo(X(i), Y(i)); else ctx.lineTo(X(i), Y(i));
      }
      ctx.closePath();
    }
    ctx.fill();
  }

  // Flocon au repos : trait fin, discret.
  ctx.strokeStyle = `rgba(${baseRgb[0]},${baseRgb[1]},${baseRgb[2]},${fl.ladders.length ? 0.4 : 0.26})`;
  ctx.lineWidth = lw;
  ctx.beginPath();
  const hide = fl.hide;
  for (let l = 0; l < fl.starts.length - 1; l++) {
    let down = false; // pinceau posé ? Les points masqués (cristaux fusionnés) interrompent le trait.
    for (let i = fl.starts[l]; i < fl.starts[l + 1]; i++) {
      if (hide[i]) { down = false; continue; }
      if (down) ctx.lineTo(X(i), Y(i)); else { ctx.moveTo(X(i), Y(i)); down = true; }
    }
  }
  ctx.stroke();

  // Parties éclairées : halo large + trait vif, en addition.
  if (active.length) {
    ctx.globalCompositeOperation = 'lighter';
    // Cristaux : chaque cellule du remplissage s'allume selon l'énergie locale.
    for (const ld of fill ? fl.ladders : []) {
      const s0 = ld.start, n1 = 2 * ld.n + 1;
      for (let i = 0; i < ld.n; i++) {
        const l0 = s0 + i, l1 = l0 + 1, r0 = s0 + n1 - i, r1 = r0 - 1;
        if (hide[l0] && hide[l1] && hide[r0] && hide[r1]) continue; // cellule absorbée par le cristal voisin
        const e = (E[l0] + E[l1] + E[r0] + E[r1]) * 0.25;
        if (e < 0.015) continue;
        const B = 1 - Math.exp(-gain * e);
        const m = 0.35 * B;
        ctx.fillStyle = `rgba(${(cr[l0] + (255 - cr[l0]) * m) | 0},${(cg[l0] + (255 - cg[l0]) * m) | 0},${(cb[l0] + (255 - cb[l0]) * m) | 0},${(0.55 * B).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(X(l0), Y(l0)); ctx.lineTo(X(l1), Y(l1)); ctx.lineTo(X(r1), Y(r1)); ctx.lineTo(X(r0), Y(r0));
        ctx.closePath(); ctx.fill();
      }
    }
    for (let l = 0; l < fl.starts.length - 1; l++) {
      const a = fl.starts[l], z = fl.starts[l + 1] - 1;
      for (let i = a; i < z; i++) {
        if (hide[i] || hide[i + 1]) continue;
        const e = (E[i] + E[i + 1]) * 0.5;
        if (e < 0.015) continue;
        const B = 1 - Math.exp(-gain * e);
        const x0 = X(i), y0 = Y(i), x1 = X(i + 1), y1 = Y(i + 1);
        const m = 0.55 * B;
        const rr = (cr[i] + (255 - cr[i]) * m) | 0, gg = (cg[i] + (255 - cg[i]) * m) | 0, bb = (cb[i] + (255 - cb[i]) * m) | 0;
        ctx.strokeStyle = `rgba(${cr[i] | 0},${cg[i] | 0},${cb[i] | 0},${(0.22 * B).toFixed(3)})`;
        ctx.lineWidth = lw * 5;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        ctx.strokeStyle = `rgba(${rr},${gg},${bb},${B.toFixed(3)})`;
        ctx.lineWidth = lw * (1 + 0.9 * B);
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      }
    }

    // Extrémités des branches : petites perles qui s'allument avec le reste.
    for (const tp of fl.tips) {
      let e = 0, r = 0, g = 0, b = 0, dt = 0, dr = 0;
      for (let k = 0; k < active.length; k++) {
        const o = active[k];
        const d = (tp.rho - o.rho0) / band;
        if (d > BAND_CUTOFF || d < -BAND_CUTOFF) continue;
        let w = o.env * Math.exp(-d * d);
        if (perArm && tp.arm !== o.arm) w *= 0.08;
        if (w < 0.003) continue;
        e += w; r += w * o.rgb[0]; g += w * o.rgb[1]; b += w * o.rgb[2];
        const ph = 2 * Math.PI * o.f * o.age - 16 * (tp.rho - o.rho0) + o.ph;
        dt += w * Math.sin(ph); dr += w * 0.6 * Math.cos(ph);
      }
      if (e < 0.02) continue;
      const B = 1 - Math.exp(-gain * e);
      const inv = tp.rho > 1e-4 ? 1 / tp.rho : 0;
      const qx = tp.x + amp * (dt * -tp.y * inv + dr * tp.x * inv), qy = tp.y + amp * (dt * tp.x * inv + dr * tp.y * inv);
      const sx = cx + (qx * ca - qy * sa) * R, sy = cy + (qx * sa + qy * ca) * R;
      ctx.fillStyle = `rgba(${(r / e) | 0},${(g / e) | 0},${(b / e) | 0},${(0.25 * B).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(sx, sy, lw * (2.5 + 5 * B), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${(0.9 * B).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(sx, sy, lw * (0.9 + 1.4 * B), 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.restore();
}
