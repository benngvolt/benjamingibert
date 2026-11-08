import { hash01 } from './renderFrame';

// Mode « Snowflake » : un flocon de neige à N branches, dessiné en fines lignes. Chaque note fait briller et
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

// Les lignes sont découpées en petits segments : chaque point pourra ainsi être déplacé séparément quand
// la note le fait vibrer.
// Profil de largeur d'un cristal le long de sa branche (u = 0 au départ, 1 à la pointe ; résultat 0..1).
const PROFILES = {
  rect: () => 1,
  triangle: (u) => 1 - u,
  diamond: (u) => 1 - Math.abs(2 * u - 1),
  hexagon: (u) => Math.min(1, (1 - Math.abs(2 * u - 1)) / 0.28),
};
// Demi-largeur d'un cristal, en fraction de la longueur de sa branche (tronc, branche, sous-branche).
const WIDTH_RATIO = [0.06, 0.1, 0.12];

export function buildFlake({ arms, branches, angle, length, sub, rings, shape = 'line', crystal = 1 }) {
  const items = []; // { pts, ladder } : ladder = vrai pour un cristal (contour fermé, voir plus bas)
  const tips = [];
  const A = (angle * Math.PI) / 180;
  const sector = (2 * Math.PI) / arms;
  // Les branches ne doivent pas déborder sur le bras voisin quand il y en a beaucoup.
  const fit = Math.min(1, 1.9 * Math.sin(sector / 2));
  const profile = PROFILES[shape];

  const rot = (x, y, th) => [x * Math.cos(th) - y * Math.sin(th), x * Math.sin(th) + y * Math.cos(th)];
  const branchPos = (j) => (branches === 1 ? 0.55 : 0.2 + (0.7 * j) / (branches - 1));
  const branchLen = (s) => length * 0.38 * fit * Math.pow(Math.sin(Math.PI * (0.12 + 0.76 * s)), 0.8);

  // Un segment (a -> b) devient soit une ligne, soit un cristal : un contour fermé dont la largeur suit `profile`.
  // Les points gauche L_0..L_n puis droite R_n..R_0 sont rangés l'un après l'autre : R_i est à la position 2n+1-i,
  // ce qui permet de recoller les cellules (L_i, L_i+1, R_i+1, R_i) au moment de colorier.
  const segment = (a, b, level, th) => {
    const A0 = rot(a[0], a[1], th), B0 = rot(b[0], b[1], th);
    if (!profile) { items.push({ pts: [A0, B0], ladder: false }); return; }
    const dx = B0[0] - A0[0], dy = B0[1] - A0[1], len = Math.hypot(dx, dy);
    const nx = -dy / len, ny = dx / len, hw = crystal * len * WIDTH_RATIO[level];
    const n = Math.max(2, Math.ceil(len / STEP));
    const Ls = [], Rs = [];
    for (let i = 0; i <= n; i++) {
      const u = i / n, w = hw * profile(u);
      const cx = A0[0] + dx * u, cy = A0[1] + dy * u;
      Ls.push([cx + nx * w, cy + ny * w]); Rs.push([cx - nx * w, cy - ny * w]);
    }
    items.push({ pts: Ls.concat(Rs.reverse(), [Ls[0]]), ladder: true, n });
  };

  for (let k = 0; k < arms; k++) {
    const th = k * sector;
    segment([0, 0], [1, 0], 0, th);
    tips.push(rot(1, 0, th));
    for (let j = 0; j < branches; j++) {
      const s = branchPos(j), L = branchLen(s);
      for (const side of [1, -1]) {
        const dx = Math.cos(A), dy = side * Math.sin(A);
        const ex = s + L * dx, ey = L * dy;
        segment([s, 0], [ex, ey], 1, th);
        tips.push(rot(ex, ey, th));
        if (sub && L > 0.05) {
          for (const u of [0.5, 0.8]) {
            const bx = s + L * u * dx, by = L * u * dy, SL = L * 0.4 * (1.15 - u * 0.5);
            for (const sd of [1, -1]) {
              const a2 = Math.atan2(dy, dx) + sd * A * 0.85;
              const sx = bx + SL * Math.cos(a2), sy = by + SL * Math.sin(a2);
              segment([bx, by], [sx, sy], 2, th);
              tips.push(rot(sx, sy, th));
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
    for (let k = 0; k <= arms; k++) pts.push(rot(ringPos[r], 0, k * sector));
    items.push({ pts, ladder: false });
  }

  // Normalisation : le point le plus éloigné est à distance 1 du centre.
  let maxR = 0.0001;
  for (const it of items) for (const [x, y] of it.pts) maxR = Math.max(maxR, Math.hypot(x, y));
  const inv = 1 / maxR;

  // Découpage en petits segments (sauf pour les cristaux, déjà échantillonnés) ; `starts[i]`..`starts[i+1]`
  // délimite les points de la ligne i.
  const xs = [], ys = [], starts = [0], ladders = [];
  for (const it of items) {
    const pts = it.pts;
    if (it.ladder) {
      ladders.push({ start: xs.length, n: it.n });
      for (const [x, y] of pts) { xs.push(x * inv); ys.push(y * inv); }
    } else {
      for (let p = 0; p < pts.length - 1; p++) {
        const [x0, y0] = pts[p], [x1, y1] = pts[p + 1];
        const n = Math.max(1, Math.ceil((Math.hypot(x1 - x0, y1 - y0) * inv) / STEP));
        for (let q = 0; q < n; q++) { xs.push((x0 + ((x1 - x0) * q) / n) * inv); ys.push((y0 + ((y1 - y0) * q) / n) * inv); }
      }
      const last = pts[pts.length - 1];
      xs.push(last[0] * inv); ys.push(last[1] * inv);
    }
    starts.push(xs.length);
  }
  const nPts = xs.length;
  const x = Float32Array.from(xs), y = Float32Array.from(ys);
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
  return { x, y, rho, arm, starts, ladders, tips: tipsN, nPts };
}

// --- Rendu -------------------------------------------------------------------------------------

export function renderSnow(ctx, W, H, state, cache) {
  const {
    groups, notes, t, lo, hi,
    arms = 6, branches = 4, angle = 60, length = 1, sub = true, rings = 1,
    size = 1, band = 0.1, decay = 0.9, vibration = 1, gain = 1.4, spin = 0, perArm = false,
    trackColors = false, color = '#bfe8ff', thickness = 1, shape = 'line', crystal = 1,
  } = state;

  const key = [arms, branches, angle, length, sub ? 1 : 0, rings, shape, crystal].join('|');
  if (cache.key !== key) { cache.flake = buildFlake({ arms, branches, angle, length, sub, rings, shape, crystal }); cache.key = key; }
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
  if (fl.ladders.length) {
    ctx.fillStyle = `rgba(${baseRgb[0]},${baseRgb[1]},${baseRgb[2]},0.07)`;
    ctx.beginPath();
    for (const ld of fl.ladders) {
      const end = ld.start + 2 * ld.n + 2;
      for (let i = ld.start; i <= end; i++) { if (i === ld.start) ctx.moveTo(X(i), Y(i)); else ctx.lineTo(X(i), Y(i)); }
      ctx.closePath();
    }
    ctx.fill();
  }

  // Flocon au repos : trait fin, discret.
  ctx.strokeStyle = `rgba(${baseRgb[0]},${baseRgb[1]},${baseRgb[2]},${fl.ladders.length ? 0.4 : 0.26})`;
  ctx.lineWidth = lw;
  ctx.beginPath();
  for (let l = 0; l < fl.starts.length - 1; l++) {
    for (let i = fl.starts[l]; i < fl.starts[l + 1]; i++) {
      if (i === fl.starts[l]) ctx.moveTo(X(i), Y(i)); else ctx.lineTo(X(i), Y(i));
    }
  }
  ctx.stroke();

  // Parties éclairées : halo large + trait vif, en addition.
  if (active.length) {
    ctx.globalCompositeOperation = 'lighter';
    // Cristaux : chaque cellule du remplissage s'allume selon l'énergie locale.
    for (const ld of fl.ladders) {
      const s0 = ld.start, n1 = 2 * ld.n + 1;
      for (let i = 0; i < ld.n; i++) {
        const l0 = s0 + i, l1 = l0 + 1, r0 = s0 + n1 - i, r1 = r0 - 1;
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
