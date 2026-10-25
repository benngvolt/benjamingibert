import { hash01 } from './renderFrame';

// Mode « Irisation » : aucune note n'est dessinée. Une barre verticale fixe (la tête de lecture) ; chaque
// note jouée y libère une irisation qui se diffuse sur l'écran de façon organique, à la hauteur de sa
// hauteur musicale. Comme renderFrame, c'est une fonction pure du temps `t` (seuls des tampons de calcul
// sont gardés dans `cache`) : l'aperçu, le défilement et l'export donnent la même image pour un même instant.
//
// Principe : on calcule un champ lumineux à basse résolution (l'effet est diffus), puis on l'étire sur le
// canvas avec lissage. Pour chaque note, une onde part de la barre (source = segment vertical) et s'élargit ;
// une déformation par bruit lisse, commune à tout l'écran, rend les fronts irréguliers. La couleur suit une
// palette cyclique à la façon d'un film mince (savon, nacre) selon la distance parcourue.

const FIELD_LONG = 320; // plus grand côté du champ calculé, en pixels
const LUT_N = 1024;
const MAX_ACTIVE = 70;

const IRIDESCENT = (() => {
  const lut = new Float32Array(LUT_N * 3);
  const tau = Math.PI * 2;
  for (let i = 0; i < LUT_N; i++) {
    const p = i / LUT_N;
    // Trois cosinus décalés (arc-en-ciel) très tirés vers le blanc : une nacre, pas un arc-en-ciel saturé.
    lut[i * 3] = 0.6 * (0.5 + 0.5 * Math.cos(tau * p)) + 0.4;
    lut[i * 3 + 1] = 0.6 * (0.5 + 0.5 * Math.cos(tau * (p + 0.33))) + 0.4;
    lut[i * 3 + 2] = 0.6 * (0.5 + 0.5 * Math.cos(tau * (p + 0.67))) + 0.4;
  }
  return lut;
})();

// Palette personnalisée : dégradé cyclique (la dernière couleur revient vers la première) entre les
// couleurs choisies. Pas de mélange avec du blanc : les teintes restent celles qu'on a réglées.
const customLuts = new Map();
function customPalette(colors) {
  const key = colors.join(',');
  let lut = customLuts.get(key);
  if (lut) return lut;
  const rgb = colors.map((c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255));
  lut = new Float32Array(LUT_N * 3);
  const n = rgb.length;
  for (let i = 0; i < LUT_N; i++) {
    const f = (i / LUT_N) * n, k = Math.floor(f), m = f - k;
    const e = m * m * (3 - 2 * m);
    const a = rgb[k % n], b = rgb[(k + 1) % n];
    for (let c = 0; c < 3; c++) lut[i * 3 + c] = a[c] + (b[c] - a[c]) * e;
  }
  if (customLuts.size > 20) customLuts.clear();
  customLuts.set(key, lut);
  return lut;
}

function hash2(ix, iy) {
  let h = (Math.imul(ix, 374761393) + Math.imul(iy, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Bruit de valeur lisse, dans [0, 1].
function vnoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy), b = hash2(ix + 1, iy), c = hash2(ix, iy + 1), d = hash2(ix + 1, iy + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function renderIris(ctx, W, H, state, cache) {
  const { groups, notes, t, lo, hi, head, spread = 0.85, life = 4, gain = 1.2, turbulence = 0.7, hue = 0, line = true, size = 1, colors } = state;
  const PALETTE = colors && colors.length ? customPalette(colors) : IRIDESCENT;
  const scale = FIELD_LONG / Math.max(W, H);
  const fw = Math.max(8, Math.round(W * scale)), fh = Math.max(8, Math.round(H * scale));
  if (cache.fw !== fw || cache.fh !== fh) {
    const c = document.createElement('canvas'); c.width = fw; c.height = fh;
    cache.canvas = c;
    cache.fctx = c.getContext('2d');
    cache.img = cache.fctx.createImageData(fw, fh);
    cache.wx = new Float32Array(fw * fh);
    cache.wy = new Float32Array(fw * fh);
    cache.nz = new Float32Array(fw * fh);
    cache.fw = fw; cache.fh = fh;
  }

  // --- Ondes en cours : toute note jouée depuis moins de `life` secondes (ou encore tenue) ---
  const span = Math.max(1, hi - lo);
  const ox = fw * head;
  const rMax = fw * spread;
  const core = fw * 0.04;
  const active = [];
  let flash = 0;
  for (const n of notes) {
    if (n.time > t) break;
    const age = t - n.time;
    if (age > life) continue;
    const g = groups[n.g]; if (!g.visible || g.drums) continue;
    const s = 0.45 + 0.55 * n.vel / 127;
    // Extinction douce sur les derniers 30 % de la vie de l'onde : elle atteint zéro sans coupure sèche.
    const k = Math.min(1, Math.max(0, (age - life * 0.7) / (life * 0.3)));
    const env = s * Math.exp(-age / (life * 0.3)) * Math.min(1, age / 0.05) * (1 - k * k * (3 - 2 * k));
    const hold = (t <= n.end ? 1 : Math.exp(-(t - n.end) / 0.5)) * s;
    if (env < 0.01 && hold < 0.02) continue;
    const seed = hash01(n.id, 5) * Math.PI * 2;
    const grow = rMax * (1 - Math.exp(-age * 1.3)) * (1 + 0.06 * Math.sin(age * 2.1 + seed));
    active.push({
      oy: fh * (0.08 + 0.84 * (hi - n.pitch) / span),
      L: fh * (0.035 + 0.07 * s) * size,
      age, env, hold, R: grow,
      w: fw * (0.012 + 0.024 * (grow / rMax)) * size,
      hx: 0.6 + 0.32 * hash01(n.id, 3), // < 1 : les distances horizontales comptent moins, l'onde va plus loin en largeur
      ph: hue + 0.17 * n.g + 0.35 * hash01(n.id, 4),
    });
    flash += env * Math.exp(-age / 0.2);
  }
  if (active.length > MAX_ACTIVE) active.splice(0, active.length - MAX_ACTIVE);

  const data = cache.img.data;
  if (!active.length) {
    data.fill(0);
    for (let i = 3; i < data.length; i += 4) data[i] = 255;
  } else {
    // --- Déformation organique : champ de bruit lisse qui évolue lentement avec le temps ---
    const { wx, wy, nz } = cache;
    const amp = turbulence * fw * 0.06;
    const tt = t * 0.22;
    if (turbulence > 0.001) {
      for (let iy = 0, idx = 0; iy < fh; iy++) {
        for (let ix = 0; ix < fw; ix++, idx++) {
          const nx = ix / fw * 4, ny = iy / fh * 6;
          const n1 = vnoise(nx + tt, ny - tt * 0.7);
          const n2 = vnoise(nx * 2.3 - tt * 0.5 + 17, ny * 2.3 + tt * 0.4 + 5);
          const n3 = vnoise(nx + 31 - tt * 0.6, ny + tt * 0.5 + 9);
          wx[idx] = (n1 - 0.5) * amp * 2 + (n2 - 0.5) * amp * 1.0;
          wy[idx] = (n3 - 0.5) * amp * 2 + (n2 - 0.5) * amp * 0.5;
          nz[idx] = n1;
        }
      }
    } else {
      wx.fill(0); wy.fill(0); nz.fill(0.5);
    }

    // --- Champ lumineux ---
    const nAct = active.length;
    for (let iy = 0, idx = 0, p = 0; iy < fh; iy++) {
      for (let ix = 0; ix < fw; ix++, idx++, p += 4) {
        const X = ix + 0.5 + wx[idx], Y = iy + 0.5 + wy[idx];
        let r = 0, g = 0, b = 0;
        for (let k = 0; k < nAct; k++) {
          const o = active[k];
          const dx = (X - ox) * o.hx;
          let dy = Math.abs(Y - o.oy) - o.L; if (dy < 0) dy = 0;
          const d = Math.sqrt(dx * dx + dy * dy);
          const u = (d - o.R) / o.w;
          let I = 0;
          if (u > -12.5 && u < 3.5) {
            I = o.env * Math.exp(-u * u);
            // Deux anneaux plus faibles derrière le front, comme les franges d'un film mince.
            const u2 = u + 4.2, u3 = u + 8.6;
            if (u2 > -3.5 && u2 < 3.5) I += 0.5 * o.env * Math.exp(-u2 * u2);
            if (u3 > -3.5 && u3 < 3.5) I += 0.25 * o.env * Math.exp(-u3 * u3);
          }
          if (o.hold > 0.02 && d < core * 7) I += 0.4 * o.hold * Math.exp(-d / core);
          if (I < 0.004) continue;
          const phase = o.ph + d / fw * 2.2 + nz[idx] * 0.5 + o.age * 0.1;
          const li = (((phase % 1) + 1) % 1 * LUT_N | 0) * 3;
          r += I * PALETTE[li]; g += I * PALETTE[li + 1]; b += I * PALETTE[li + 2];
        }
        // Courbe douce : les zones où plusieurs ondes se superposent s'éclaircissent sans écrêter.
        data[p] = 255 * (1 - Math.exp(-gain * r));
        data[p + 1] = 255 * (1 - Math.exp(-gain * g));
        data[p + 2] = 255 * (1 - Math.exp(-gain * b));
        data[p + 3] = 255;
      }
    }
  }
  cache.fctx.putImageData(cache.img, 0, 0);

  ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(cache.canvas, 0, 0, W, H);

  // --- Barre verticale fixe : un trait net, dont le halo s'avive à chaque attaque ---
  if (line) {
    const px = W * head, unit = Math.min(W, H) / 1080, lw = Math.max(1, 2 * unit);
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = Math.min(0.55, 0.12 + 0.2 * flash);
    ctx.fillRect(px - lw * 3, 0, lw * 6, H);
    ctx.globalAlpha = 0.92;
    ctx.fillRect(px - lw / 2, 0, lw, H);
    ctx.restore();
  }
}
