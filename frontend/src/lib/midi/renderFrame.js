import { getConeSprite } from './coneSprite';
import { getCustomSprite } from './customSprite';

// Nombre pseudo-aléatoire stable dans [0, 1[ pour une note : il ne change ni d'une image à l'autre ni
// entre l'aperçu et l'export. `salt` permet d'en tirer plusieurs indépendants pour la même note.
function hash01(id, salt) {
  let h = Math.imul(id + 1, 2654435761) ^ Math.imul(salt + 1, 40503);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Dessine un sprite centré en (x, y), de côté `size`, tourné de `angle` radians (0 = sans rotation).
function drawSprite(ctx, spr, x, y, size, angle) {
  if (!angle) { ctx.drawImage(spr.c, x - size / 2, y - size / 2, size, size); return; }
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.drawImage(spr.c, -size / 2, -size / 2, size, size);
  ctx.restore();
}

const TRAIL_LIFE = 3; // secondes avant extinction complète de la traînée
const TRAIL_MAX_SECS = 1.6; // longueur maximale, exprimée en secondes de défilement
const TRAIL_LAYERS = 6; // couches superposées par traînée (bords doux)
const LINE_FADE = 0.3; // secondes de disparition de la ligne blanche après la fin de la note

function radius(n, unit, size) {
  return 16 * unit * size * (0.5 + 2.6 * Math.sqrt(Math.min(n.dur, 3))) * (0.8 + 0.4 * n.vel / 127);
}

const rgbCache = {};
function hexToRgb(hex) {
  if (!rgbCache[hex]) {
    const h = hex.replace('#', '');
    const v = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    rgbCache[hex] = [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  return rgbCache[hex];
}

// Silhouette d'une comète : tête arrondie en (x, y), qui s'effile vers la droite jusqu'à x + len.
function taperPath(ctx, x, y, half, len) {
  ctx.beginPath();
  ctx.moveTo(x, y - half);
  ctx.quadraticCurveTo(x + len * 0.45, y - half * 0.55, x + len, y);
  ctx.quadraticCurveTo(x + len * 0.45, y + half * 0.55, x, y + half);
  ctx.arc(x, y, half, Math.PI / 2, Math.PI * 1.5);
  ctx.closePath();
}

// Traînée lumineuse : une note déjà jouée s'éloigne du point de jeu vers la gauche et laisse derrière
// elle (côté tête de lecture) une comète qui s'allonge puis s'éteint avec le temps. Plusieurs couches
// de largeur décroissante, en mode additif ('lighter'), donnent des bords doux et un cœur plus clair ;
// ce même mode fait que les traînées qui se croisent s'éclairent au lieu de se masquer.
function drawTrail(ctx, x, y, r, px, pps, age, color, vel, unit) {
  const fade = 1 - age / TRAIL_LIFE;
  const len = Math.min(px - x, TRAIL_MAX_SECS * pps);
  if (fade <= 0 || len < 2) return;
  const [cr, cg, cb] = hexToRgb(color);
  const a = fade * (0.5 + 0.5 * vel / 127);
  const gradient = (rgb) => {
    const g = ctx.createLinearGradient(x, 0, x + len, 0);
    g.addColorStop(0, `rgba(${rgb},1)`);
    g.addColorStop(0.35, `rgba(${rgb},0.45)`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    return g;
  };
  const tinted = gradient(`${cr},${cg},${cb}`);
  const core = gradient(`${(cr + 510) / 3 | 0},${(cg + 510) / 3 | 0},${(cb + 510) / 3 | 0}`); // couleur tirée vers le blanc
  const maxHalf = Math.max(r * 0.95, 4 * unit);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.shadowBlur = 0;
  ctx.globalAlpha = a * 0.27;
  for (let k = 0; k < TRAIL_LAYERS; k++) {
    ctx.fillStyle = k < TRAIL_LAYERS - 2 ? tinted : core;
    taperPath(ctx, x, y, maxHalf * (1 - k / TRAIL_LAYERS), len);
    ctx.fill();
  }
  ctx.restore();
}

// Ligne blanche horizontale à la hauteur d'une note en train d'être jouée, la plus vive autour de la
// tête de lecture et qui s'estompe vers les bords. Éclat net à l'attaque, puis palier tant que la note tient.
function drawWhiteLine(ctx, W, y, px, alpha, unit) {
  const g = ctx.createLinearGradient(0, 0, W, 0);
  const at = Math.min(0.999, Math.max(0.001, px / W));
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(at, `rgba(255,255,255,${alpha})`);
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.fillStyle = g;
  const lw = Math.max(1, 2 * unit);
  ctx.fillRect(0, y - lw / 2, W, lw);
  ctx.globalAlpha = 0.25; // halo doux autour de la ligne
  ctx.fillRect(0, y - lw * 2.5, W, lw * 5);
  ctx.restore();
}

// Dessine une frame sur `ctx` (W×H px) pour l'instant `state.t`. Fonction pure : aucun état interne,
// hormis `spriteCache` (tableau) qui met en cache les sprites (pommes de pin ou forme personnalisée) par note.
export function renderFrame(ctx, W, H, state, spriteCache) {
  const { groups, notes, t, lo, hi, secs, head, size, spread, lines, steps, glow, trail, whiteLine, playheadLine, shape, tint, customImages, spin } = state;
  const unit = Math.min(W, H) / 1080;
  const pps = W / secs, px = W * head;
  ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  const band = H * spread, y0 = (H - band) / 2, span = Math.max(1, hi - lo);
  const yOf = p => Math.min(H + 200, Math.max(-200, y0 + (hi - p) / span * band));
  const xOf = n => t < n.time ? px + (n.time - t) * pps : (t <= n.end ? px : px - (t - n.end) * pps);
  const margin = 260 * unit * size;
  const tMin = t - (px + margin) / pps, tMax = t + (W - px + margin) / pps;

  if (lines) {
    ctx.lineWidth = 2 * unit; ctx.lineJoin = 'round';
    for (const g of groups) {
      if (!g.visible) continue;
      ctx.strokeStyle = g.color; ctx.globalAlpha = 0.6;
      ctx.beginPath();
      for (const v of g.voices) {
        for (let i = 1; i < v.length; i++) {
          const a = v[i - 1], b = v[i];
          if (b.end < tMin || a.time > tMax) continue;
          const ax = xOf(a), ay = yOf(a.pitch), bx = xOf(b), by = yOf(b.pitch);
          ctx.moveTo(ax, ay);
          if (steps && ay !== by) {
            const mx = bx - Math.min(Math.abs(bx - ax) * 0.35, 40 * unit);
            ctx.lineTo(mx, ay); ctx.lineTo(bx, by);
          } else ctx.lineTo(bx, by);
        }
      }
      ctx.stroke();
    }
  }

  // Ligne verticale fixe à la tête de lecture, c'est-à-dire là où les notes sont jouées. Sous les formes.
  if (playheadLine) {
    const lw = Math.max(1, 2 * unit);
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.22; // halo doux
    ctx.fillRect(px - lw * 2.5, 0, lw * 5, H);
    ctx.globalAlpha = 0.9;
    ctx.fillRect(px - lw / 2, 0, lw, H);
    ctx.restore();
  }

  if (whiteLine) {
    for (const n of notes) {
      if (n.time > t) break;
      const post = t - n.end;
      if (post > LINE_FADE) continue;
      const g = groups[n.g]; if (!g.visible) continue;
      const level = (0.55 + 0.45 * n.vel / 127);
      const alpha = post <= 0
        ? level * (0.35 + 0.65 * Math.exp(-(t - n.time) / 0.25))
        : level * 0.35 * (1 - post / LINE_FADE);
      drawWhiteLine(ctx, W, yOf(n.pitch), px, alpha, unit);
    }
  }

  const active = [];
  const useCustom = shape === 'custom' && customImages && customImages.length > 0;
  const useSprite = shape === 'cones' || useCustom;
  // Rotation lente : chaque note a sa phase de départ et son sens (horaire ou antihoraire) tirés au hasard ;
  // l'angle ne dépend que du temps, donc il évolue de façon continue tout au long du défilement.
  const spinAngle = (n) => (spin
    ? hash01(n.id, 1) * Math.PI * 2 + (hash01(n.id, 2) < 0.5 ? -1 : 1) * spin * (t - n.time)
    : 0);
  const spriteOf = (n, r, color) => (useCustom ? getCustomSprite(spriteCache, n, r, color, customImages) : getConeSprite(spriteCache, n, r, color, tint));
  for (const n of notes) {
    if (n.time > tMax) break;
    if (n.end < tMin) continue;
    const g = groups[n.g]; if (!g.visible) continue;
    if (t >= n.time && t <= n.end) { active.push(n); continue; }
    const r = radius(n, unit, size), x = xOf(n), y = yOf(n.pitch);
    if (trail && t > n.end) drawTrail(ctx, x, y, r, px, pps, t - n.end, g.color, n.vel, unit);
    if (useSprite) {
      const spr = spriteOf(n, r, g.color);
      ctx.globalAlpha = t < n.time ? 0.22 + 0.4 * Math.max(0, 1 - (n.time - t) / secs)
        : Math.max(0.18, 0.55 - (t - n.end) * 0.04);
      drawSprite(ctx, spr, x, y, spr.half * 2, spinAngle(n));
      continue;
    }
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    if (t < n.time) {
      const near = Math.max(0, 1 - (n.time - t) / secs);
      ctx.globalAlpha = 0.16 + 0.28 * near; ctx.fillStyle = g.color; ctx.fill();
    } else {
      const age = t - n.end;
      ctx.globalAlpha = Math.max(0.25, 0.75 - age * 0.05); ctx.strokeStyle = g.color; ctx.lineWidth = 2 * unit; ctx.stroke();
    }
  }
  for (const n of active) {
    const g = groups[n.g];
    const r = radius(n, unit, size), x = xOf(n), y = yOf(n.pitch), age = t - n.time;
    const pop = 1 + 0.12 * Math.max(0, 1 - age / 0.15);
    if (useSprite) {
      const spr = spriteOf(n, r, g.color);
      const ang = spinAngle(n);
      if (age < 0.4) {
        const k = 1 + age * 1.6, s = spr.half * 2 * k;
        ctx.globalAlpha = 0.45 * (1 - age / 0.4);
        drawSprite(ctx, spr, x, y, s, ang);
      }
      ctx.globalAlpha = 1;
      if (glow) { ctx.shadowColor = g.color; ctx.shadowBlur = 40 * unit; }
      const s = spr.half * 2 * pop;
      drawSprite(ctx, spr, x, y, s, ang);
      ctx.shadowBlur = 0;
      continue;
    }
    ctx.globalAlpha = 0.95; ctx.fillStyle = g.color;
    if (glow) { ctx.shadowColor = g.color; ctx.shadowBlur = 36 * unit; }
    ctx.beginPath(); ctx.arc(x, y, r * pop, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    if (age < 0.4) {
      ctx.globalAlpha = 0.7 * (1 - age / 0.4); ctx.strokeStyle = g.color; ctx.lineWidth = 2 * unit;
      ctx.beginPath(); ctx.arc(x, y, r * (1 + age * 2.4), 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}
