import { getConeSprite } from './coneSprite';
import { getCustomSprite } from './customSprite';

function radius(n, unit, size) {
  return 16 * unit * size * (0.5 + 2.6 * Math.sqrt(Math.min(n.dur, 3))) * (0.8 + 0.4 * n.vel / 127);
}

// Dessine une frame sur `ctx` (W×H px) pour l'instant `state.t`. Fonction pure : aucun état interne,
// hormis `spriteCache` (tableau) qui met en cache les sprites (pommes de pin ou forme personnalisée) par note.
export function renderFrame(ctx, W, H, state, spriteCache) {
  const { groups, notes, t, lo, hi, secs, head, size, spread, lines, steps, glow, shape, tint, customImage } = state;
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

  const active = [];
  const useCustom = shape === 'custom' && customImage;
  const useSprite = shape === 'cones' || useCustom;
  const spriteOf = (n, r, color) => (useCustom ? getCustomSprite(spriteCache, n, r, color, customImage) : getConeSprite(spriteCache, n, r, color, tint));
  for (const n of notes) {
    if (n.time > tMax) break;
    if (n.end < tMin) continue;
    const g = groups[n.g]; if (!g.visible) continue;
    if (t >= n.time && t <= n.end) { active.push(n); continue; }
    const r = radius(n, unit, size), x = xOf(n), y = yOf(n.pitch);
    if (useSprite) {
      const spr = spriteOf(n, r, g.color);
      ctx.globalAlpha = t < n.time ? 0.22 + 0.4 * Math.max(0, 1 - (n.time - t) / secs)
        : Math.max(0.18, 0.55 - (t - n.end) * 0.04);
      ctx.drawImage(spr.c, x - spr.half, y - spr.half);
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
      if (age < 0.4) {
        const k = 1 + age * 1.6, s = spr.half * 2 * k;
        ctx.globalAlpha = 0.45 * (1 - age / 0.4);
        ctx.drawImage(spr.c, x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      if (glow) { ctx.shadowColor = g.color; ctx.shadowBlur = 40 * unit; }
      const s = spr.half * 2 * pop;
      ctx.drawImage(spr.c, x - s / 2, y - s / 2, s, s);
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
