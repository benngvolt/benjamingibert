// Génération procédurale de sprites "pomme de pin" pour chaque note, avec cache par note.
function rng(seed) {
  let a = (Math.imul(seed + 1, 2654435761) ^ 0x9E3779B9) >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0; let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const rgb = (c, k = 1) => 'rgb(' + c.map(v => Math.max(0, Math.min(255, Math.round(v * k)))).join(',') + ')';
const BROWNS = [[122, 78, 44], [98, 62, 36], [146, 100, 60], [86, 57, 35], [134, 88, 50], [110, 74, 48], [158, 112, 70]];

export function makeCone(r, seed, color, tint) {
  const R = rng(seed);
  const L = r * 2 * (0.95 + R() * 0.35);
  const Wm = L * (0.42 + R() * 0.28);
  const belly = 0.3 + R() * 0.25;
  const rows = Math.round(6 + R() * 6);
  const perRow = 3 + R() * 2.2;
  const open = 0.8 + R() * 0.6;
  const ang = (R() - 0.5) * 1.6 + (R() < 0.35 ? Math.PI : 0);
  const tr = hexRgb(color), br = BROWNS[Math.floor(R() * BROWNS.length)];
  const base = br.map((v, i) => v * (1 - tint) + tr[i] * tint);
  const side = Math.ceil(Math.hypot(L * 1.2, Wm * 1.3)) + 6;
  const c = document.createElement('canvas'); c.width = c.height = side;
  const x = c.getContext('2d');
  x.translate(side / 2, side / 2); x.rotate(ang);
  const top = -L / 2;
  const prof = u => Wm / 2 * Math.max(0.05, u < belly
    ? 0.4 + 0.6 * Math.sin(u / belly * Math.PI / 2)
    : Math.pow(Math.cos((u - belly) / (1 - belly) * Math.PI / 2), 0.8));

  x.strokeStyle = rgb(base, 0.45); x.lineWidth = Math.max(1.5, Wm * 0.07); x.lineCap = 'round';
  x.beginPath(); x.moveTo(0, top + L * 0.04); x.quadraticCurveTo((R() - 0.5) * Wm * 0.3, top - L * 0.06, (R() - 0.5) * Wm * 0.2, top - L * 0.12); x.stroke();

  x.fillStyle = rgb(base, 0.32);
  x.beginPath();
  for (let i = 0; i <= 24; i++) { const u = i / 24; x.lineTo(prof(u) * 1.02, top + u * L); }
  for (let i = 24; i >= 0; i--) { const u = i / 24; x.lineTo(-prof(u) * 1.02, top + u * L); }
  x.closePath(); x.fill();

  const sh = L / rows * 1.5;
  for (let i = rows - 1; i >= 0; i--) {
    const u = (i + 0.5) / rows, y = top + u * L, hw = prof(u);
    const m = Math.max(2, Math.round(perRow * hw / (Wm / 2)));
    const off = (i % 2) ? 0.5 : 0;
    const pts = [];
    for (let j = -1; j <= m; j++) {
      const px = -hw + (j + 0.5 + off - 0.25) * (2 * hw / m);
      if (Math.abs(px) > hw * 0.98) continue;
      pts.push(px);
    }
    pts.sort((a, b) => Math.abs(b) - Math.abs(a));
    for (const px of pts) {
      const fs = Math.sqrt(Math.max(0, 1 - (px / hw) ** 2));
      const w = (2 * hw / m) * (0.55 + 0.75 * fs) * open;
      const h2 = sh * (0.75 + 0.35 * fs) * (0.9 + R() * 0.2);
      const lum = 0.7 + 0.5 * fs + (R() - 0.5) * 0.25;
      const cx = px + (R() - 0.5) * w * 0.1, cy = y;
      const gr = x.createLinearGradient(cx, cy - h2 / 2, cx, cy + h2 / 2);
      gr.addColorStop(0, rgb(base, lum * 0.55));
      gr.addColorStop(0.7, rgb(base, lum));
      gr.addColorStop(1, rgb(base, lum * 1.15));
      x.fillStyle = gr;
      x.beginPath();
      x.moveTo(cx, cy - h2 * 0.45);
      x.quadraticCurveTo(cx + w * 0.62, cy - h2 * 0.12, cx + w * 0.14, cy + h2 * 0.44);
      x.quadraticCurveTo(cx, cy + h2 * 0.56, cx - w * 0.14, cy + h2 * 0.44);
      x.quadraticCurveTo(cx - w * 0.62, cy - h2 * 0.12, cx, cy - h2 * 0.45);
      x.fill();
      x.strokeStyle = rgb(base, 0.35); x.lineWidth = Math.max(0.6, r * 0.025); x.stroke();
      x.fillStyle = rgb(base, lum * 1.35);
      x.beginPath(); x.ellipse(cx, cy + h2 * 0.3, w * 0.12, h2 * 0.07, 0, 0, Math.PI * 2); x.fill();
    }
  }
  return { c, half: side / 2 };
}

// `cache` est un tableau simple, une instance par visualiseur pour éviter les fuites entre plusieurs canvases.
export function getConeSprite(cache, n, r, color, tint) {
  const rq = Math.max(6, Math.round(r / 3) * 3);
  const key = rq + color + tint;
  if (n._sk !== key) {
    n._spr = makeCone(rq, n.id, color, tint); n._sk = key;
    cache.push(n);
    if (cache.length > 600) {
      const o = cache.shift();
      if (o !== n && cache.indexOf(o) === -1) { o._spr = null; o._sk = null; }
    }
  }
  return n._spr;
}
