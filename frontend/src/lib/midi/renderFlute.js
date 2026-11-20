import { hash01 } from './renderFrame';

// Mode « Flûte » : un cylindre vertical doté d'une petite extrusion arrondie par note distincte du morceau (les plus
// graves en bas, les plus aiguës en haut), à gauche ou à droite au hasard, ouverte à son extrémité. Quand une note est
// jouée, son ouverture s'allume et laisse échapper un trait de lumière qui part sur le côté ; une fois la note relâchée, ce trait se
// détache du trou, file vers l'extérieur et s'éteint. Comme les autres rendus, c'est une fonction pure du temps
// `t` : l'aperçu, le défilement et l'export donnent la même image pour un même instant.

const rgbCache = {};
function hexToRgb(hex) {
  if (!rgbCache[hex]) {
    const h = hex.replace('#', '');
    const v = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    rgbCache[hex] = [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  return rgbCache[hex];
}

const mix = (c, k) => [c[0] + (255 - c[0]) * k, c[1] + (255 - c[1]) * k, c[2] + (255 - c[2]) * k];
const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.max(0, Math.min(1, a)).toFixed(3)})`;

// Nombre de trous et hauteur musicale -> trou. Les notes distinctes (hors percussions, pistes visibles) sont triées ;
// si elles dépassent `maxHoles`, des notes voisines se partagent un trou.
export function holeLayout(groups, notes, maxHoles) {
  const set = new Set();
  for (const n of notes) {
    const g = groups[n.g];
    if (g.visible && !g.drums) set.add(n.pitch);
  }
  const pitches = [...set].sort((a, b) => a - b);
  const holes = Math.max(1, Math.min(pitches.length, maxHoles));
  const map = new Map();
  pitches.forEach((p, i) => map.set(p, pitches.length <= maxHoles ? i : Math.floor((i * holes) / pitches.length)));
  return { holes: pitches.length ? holes : 0, map, distinct: pitches.length };
}

export function renderFlute(ctx, W, H, state, cache) {
  const {
    groups, notes, t,
    length = 0.86, width = 0.09, holeSize = 1, stub = 1, minSize = 1, minLen = 1, offMin = 0.15, offMax = 1, diffuse = 0.7, trail = 0.6, life = 1.2, gain = 1.2, maxHoles = 24,
    layout = 'random', seed = 1, trackColors = false, color = '#ffd39a', thickness = 1,
    stumps = false, stumpMin = 2, stumpGroup = 5, stumpThick = 0.8, stumpRandom = true, stumpBare = 0.25,
  } = state;

  // --- Trous (recalculés seulement quand la liste des notes, la visibilité des pistes ou les réglages changent) ---
  const vis = groups.map((g) => (g.visible && !g.drums ? 1 : 0)).join('');
  const key = [notes.length, vis, maxHoles].join('|');
  if (cache.key !== key) { cache.layout = holeLayout(groups, notes, maxHoles); cache.key = key; }
  const lay = cache.layout;

  const unit = Math.min(W, H) / 1080;
  const tubeH = H * length, tubeW = Math.max(8 * unit, tubeH * width);
  const cx = W / 2, top = (H - tubeH) / 2, bottom = top + tubeH;
  const capRy = tubeW * 0.14;
  const yTop = top + tubeH * 0.1, yBot = bottom - tubeH * 0.06;
  const spacing = lay.holes > 1 ? (yBot - yTop) / (lay.holes - 1) : tubeH;
  // Taille des extrusions : fixée par le curseur, mais réduite d'office quand les trous sont si serrés que deux
  // extrusions voisines se chevaucheraient.
  const holeR0 = tubeW * 0.16;
  const fit = Math.min(1, (spacing * 0.5) / (holeR0 * 2.4));
  const holeR = holeR0 * holeSize * fit;
  const stubLen = tubeW * 0.55 * stub;
  const side = (k) => (layout === 'alternate' ? (k % 2 ? 1 : -1) : (hash01(k, seed + 31) < 0.5 ? -1 : 1));
  const yOf = (k) => (lay.holes > 1 ? yBot - spacing * k : (yTop + yBot) / 2);
  const lw = Math.max(1, 1.4 * unit * thickness);
  const R = tubeW / 2;

  const off0 = Math.min(offMin, offMax), off1 = Math.max(offMin, offMax);

  // --- Souches : 2 à 5 trous voisins (réglable) partagent une souche, une sorte de premier étage posé sur le tronc :
  // une base régulière aux bords arrondis, dont le sommet est plat ; les trous partent de ce sommet. Vue de face, la
  // base dessine sur le tronc une empreinte (comme le rond où naissent les extrusions) ; l'épaisseur de la souche
  // (0 = simple plaque) la fait ressortir vers l'extérieur. Toutes les souches du morceau suivent le même rayon que
  // les trous : position `u` et côté tirés pour la souche, et non plus pour chaque trou. ---
  const gMin = Math.max(1, Math.min(stumpMin, stumpGroup)), gMax = Math.max(gMin, stumpGroup);
  const stumpList = [];
  if (stumps && lay.holes > 0) {
    for (let k = 0, g = 0; k < lay.holes; g++) {
      // Certains trous restent directement sur la flûte, entre deux souches (aucune souche ne leur est attribuée).
      if (hash01(g, seed * 7 + 443) < stumpBare) { k++; continue; }
      let size = gMin + Math.floor(hash01(g, seed * 7 + 401) * (gMax - gMin + 1));
      if (lay.holes - k < size + gMin) size = lay.holes - k; // pas de groupe trop petit en reste
      if (size < 2 && gMin >= 2) { k += size; continue; } // un trou seul : il reste sur la flûte
      const k1 = Math.min(lay.holes - 1, k + size - 1);
      const dir = hash01(g, seed * 7 + 409) < 0.5 ? -1 : 1;
      const u = off0 + (off1 - off0) * hash01(g, seed * 7 + 413);
      stumpList.push({
        k0: k, k1, dir, u, face: Math.sqrt(Math.max(0, 1 - u * u)),
        T: R * stumpThick * (stumpRandom ? 0.3 + 0.7 * hash01(g, seed * 7 + 419) : 1), // épaisseur (hauteur de la souche)
      });
      k = k1 + 1;
    }
  }
  const stumpOf = (k) => stumpList.find((st) => k >= st.k0 && k <= st.k1);
  const holeAt = (k) => {
    const st = stumpOf(k);
    const y = yOf(k);
    // Position sur le tube : on simule des extrusions qui rayonnent tout autour de l'axe, vues de face. Un trou à
    // l'angle θ part de x = R·sin θ ; son extrusion pointe vers l'extérieur, donc vers nous quand θ est proche de 0
    // (elle se raccourcit à l'écran) et sur le côté quand elle part du bord. `u` = sin θ (0 = milieu, 1 = bord).
    // Sur une souche, tous les trous partagent le côté et l'angle de la souche, et partent de son sommet (R + T).
    const dir = st ? st.dir : side(k);
    const u = st ? st.u : off0 + (off1 - off0) * hash01(k, seed * 7 + 307);
    const face = Math.sqrt(Math.max(0, 1 - u * u)); // à quel point l'extrusion est tournée vers le spectateur
    const xe = cx + dir * (R + (st ? st.T : 0)) * u;
    // Grosseur et longueur tirées au hasard pour chaque trou, entre le minimum choisi et le maximum (= les curseurs).
    const rt = holeR * (minSize + (1 - minSize) * hash01(k, seed * 7 + 101)); // demi-hauteur au bout
    const len = stubLen * (minLen + (1 - minLen) * hash01(k, seed * 7 + 211));
    return {
      xe, x: xe + dir * Math.max(len * u, rt * 0.8), u, face, y, dir,
      rt, rb: rt * 1.5, rf: rt * 2.4, // demi-hauteur au bout, à la base et au pied du raccord
    };
  };

  ctx.save();
  ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

  // --- Tube + souches : un cylindre ombré en travers pour donner du volume, avec les souches posées dessus. Ce
  // dessin ne dépend pas du temps : il est calculé une fois, puis recopié à chaque image tant que la géométrie
  // ne change pas. ---
  const bodyKey = [W, H, length, width, thickness, lay.holes, seed, holeSize, offMin, offMax, stumps ? [stumpMin, stumpGroup, stumpThick, stumpRandom ? 1 : 0, stumpBare].join(',') : 0].join('|');
  if (!cache.body || cache.bodyKey !== bodyKey) {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    const g = c.createLinearGradient(cx - R, 0, cx + R, 0);
    g.addColorStop(0, '#050506'); g.addColorStop(0.28, '#26262b'); g.addColorStop(0.5, '#1a1a1e'); g.addColorStop(0.78, '#0c0c0e'); g.addColorStop(1, '#040405');
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(cx - R, top); c.lineTo(cx - R, bottom);
    c.ellipse(cx, bottom, R, capRy, 0, Math.PI, 0, true);
    c.lineTo(cx + R, top);
    c.ellipse(cx, top, R, capRy, 0, 0, Math.PI, true);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(255,255,255,0.34)'; c.lineWidth = lw; c.lineJoin = 'round';
    c.stroke();
    c.beginPath(); c.ellipse(cx, top, R, capRy, 0, 0, Math.PI * 2); // ouverture du haut
    c.fillStyle = '#000'; c.fill(); c.stroke();

    // Souches. Chacune est une base arrondie (son empreinte sur le tronc) prolongée vers l'extérieur sur une
    // épaisseur T, et couronnée d'un sommet plat. À plat, la base est un rectangle aux coins arrondis : sa
    // largeur à l'écran est réduite par `face` (comme le rond des extrusions), sa hauteur couvre tout le groupe.
    const rfMax = holeR0 * holeSize * 2.4 * fit; // pied du raccord des extrusions les plus grosses
    const pad = rfMax * 1.15;
    const rrect = (x, y, hw, hh, rx, ry) => {
      c.beginPath();
      c.moveTo(x - hw + rx, y - hh); c.lineTo(x + hw - rx, y - hh);
      c.ellipse(x + hw - rx, y - hh + ry, rx, ry, 0, -Math.PI / 2, 0);
      c.lineTo(x + hw, y + hh - ry);
      c.ellipse(x + hw - rx, y + hh - ry, rx, ry, 0, 0, Math.PI / 2);
      c.lineTo(x - hw + rx, y + hh);
      c.ellipse(x - hw + rx, y + hh - ry, rx, ry, 0, Math.PI / 2, Math.PI);
      c.lineTo(x - hw, y - hh + ry);
      c.ellipse(x - hw + rx, y - hh + ry, rx, ry, 0, Math.PI, Math.PI * 1.5);
      c.closePath();
    };
    // Profil de la souche, de la base (s = 0) au sommet (s = 1). Elle s'évase en douceur au pied, comme le raccord
    // des extrusions, et son arrivée au sommet est un épaulement arrondi : ni marche ni angle vif.
    const FLARE = 0.3;
    const hf = (sv) => {
      let m = 1 + FLARE * Math.pow(1 - sv, 2.2);
      if (sv > 0.78) { const q = (sv - 0.78) / 0.22; m *= 1 - 0.1 * q * q; }
      return m;
    };
    const lerpHex = (c0, c1, f) => {
      const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
      const A = p(c0), B = p(c1);
      return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * f)).join(',')})`;
    };
    for (const st of [...stumpList].reverse()) {
      const yc = (yOf(st.k0) + yOf(st.k1)) / 2, hh0 = Math.abs(yOf(st.k0) - yOf(st.k1)) / 2 + pad;
      const hw0 = Math.max(1.5 * unit, pad * 1.3 * st.face);
      const xb = cx + st.dir * R * st.u, xt = cx + st.dir * (R + st.T) * st.u;
      const shape = (xc, m) => {
        const hh = hh0 * m, hw = Math.max(1.2 * unit, hw0 * m);
        const ry = Math.min(hh * 0.45, pad * 0.9 * m), rx = Math.min(hw * 0.95, ry * Math.max(st.face, 0.25) + 0.001);
        rrect(xc, yc, hw, hh, rx, ry);
      };
      // Flancs : l'empreinte déplacée pas à pas de la base au sommet, en rétrécissant et en s'éclaircissant.
      const steps = Math.max(8, Math.min(60, Math.ceil(Math.max(Math.abs(xt - xb), st.T * 0.6) / 1.5)));
      for (let i = 0; i <= steps; i++) {
        const sv = i / steps;
        c.fillStyle = lerpHex('#0b0b0e', '#202026', Math.pow(sv, 0.8));
        shape(xb + (xt - xb) * sv, hf(sv)); c.fill();
      }
      // Empreinte sur le tronc : un trait discret qui s'efface vers l'extérieur.
      c.strokeStyle = 'rgba(255,255,255,0.22)'; c.lineWidth = lw;
      shape(xb, hf(0)); c.stroke();
      // Sommet plat, un peu plus clair.
      const tg = c.createLinearGradient(xt - hw0, yc - hh0, xt + hw0, yc + hh0);
      tg.addColorStop(0, '#2c2c33'); tg.addColorStop(1, '#18181c');
      shape(xt, hf(1)); c.fillStyle = tg; c.fill();
      c.strokeStyle = 'rgba(255,255,255,0.4)'; c.stroke();
    }
    cache.body = cv; cache.bodyKey = bodyKey;
  }
  ctx.drawImage(cache.body, 0, 0);

  // --- Extrusions : chaque trou est au bout d'un petit tronc qui sort du tube, raccordé en douceur comme le début
  // d'une branche (large au pied, fin au bout, bout arrondi). Le haut et le bas sont symétriques. ---
  const stubPath = (h, closed) => {
    const d = h.dir, L = h.x - h.xe, xe = h.xe, y = h.y, rt = h.rt, rb = h.rb, rf = h.rf;
    ctx.beginPath();
    if (closed) { ctx.moveTo(xe - d * 2, y - rf); ctx.lineTo(xe, y - rf); } else ctx.moveTo(xe, y - rf);
    ctx.bezierCurveTo(xe, y - rb, xe + L * 0.25, y - rt * 1.2, xe + L * 0.55, y - rt * 1.12);
    ctx.bezierCurveTo(xe + L * 0.8, y - rt * 1.05, xe + L * 0.92, y - rt, h.x, y - rt);
    ctx.ellipse(h.x, y, rt * 0.36, rt, 0, -Math.PI / 2, Math.PI / 2, d < 0); // bout arrondi
    ctx.bezierCurveTo(xe + L * 0.92, y + rt, xe + L * 0.8, y + rt * 1.05, xe + L * 0.55, y + rt * 1.12);
    ctx.bezierCurveTo(xe + L * 0.25, y + rt * 1.2, xe, y + rb, xe, y + rf);
    if (closed) { ctx.lineTo(xe - d * 2, y + rf); ctx.closePath(); }
  };
  for (let k = 0; k < lay.holes; k++) {
    const h = holeAt(k);
    const sh = ctx.createLinearGradient(0, h.y - h.rf, 0, h.y + h.rf);
    sh.addColorStop(0, '#2b2b31'); sh.addColorStop(0.45, '#1a1a1f'); sh.addColorStop(1, '#070709');
    // Vue de face : le pied de l'extrusion est un disque (le raccord évasé autour de l'ouverture).
    if (h.face > 0.12) {
      ctx.beginPath(); ctx.ellipse(h.xe, h.y, h.rf * h.face, h.rf, 0, 0, Math.PI * 2);
      ctx.fillStyle = sh; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = lw; ctx.stroke();
    }
    stubPath(h, true); ctx.fillStyle = sh; ctx.fill();
    stubPath(h, false); ctx.strokeStyle = 'rgba(255,255,255,0.34)'; ctx.lineWidth = lw; ctx.stroke();
  }

  // --- Notes en cours : lueur du trou + trait de lumière ---
  const D = trail * Math.min(W / 2, H / 2); // distance maximale parcourue par le trait
  const speed = D / (life * 0.6);
  const glow = new Float32Array(lay.holes); // niveau de lumière de chaque trou
  const glowRgb = [];
  const beams = [];
  for (const n of notes) {
    if (n.time > t) break;
    const g = groups[n.g]; if (!g.visible || g.drums) continue;
    const k = lay.map.get(n.pitch); if (k === undefined) continue;
    const since = t - n.end; // temps écoulé depuis le relâchement (négatif tant que la note est tenue)
    if (since > life * 3) continue;
    const age = t - n.time;
    const s = 0.55 + 0.45 * n.vel / 127;
    const held = since <= 0;
    const att = Math.min(1, age / 0.02);
    const fade = held ? 1 : Math.exp(-since / (life * 0.45));
    const env = s * att * fade;
    if (env < 0.01) continue;
    const rgb = trackColors ? hexToRgb(g.color) : hexToRgb(color);
    const head = Math.min(D, speed * age);
    const tail = held ? 0 : Math.min(D, speed * since);
    if (tail >= D) continue;
    if (env > glow[k]) { glow[k] = env; glowRgb[k] = rgb; }
    beams.push({ k, env, rgb, head, tail });
  }

  // Ouverture au bout de chaque extrusion : un ovale noir cerné d'un fin trait.
  for (let k = 0; k < lay.holes; k++) {
    const h = holeAt(k);
    ctx.beginPath(); ctx.ellipse(h.x, h.y, h.rt * (0.36 + 0.64 * h.face), h.rt * 0.86, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#000'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.42)'; ctx.lineWidth = lw; ctx.stroke();
  }

  ctx.globalCompositeOperation = 'lighter';
  // La lumière remplit l'extrusion depuis son bout, avant de sortir : dégradé du bout vers le pied, limité à la forme.
  for (let k = 0; k < lay.holes; k++) {
    if (glow[k] < 0.01) continue;
    const h = holeAt(k), B = 1 - Math.exp(-gain * glow[k] * 1.6), rgb = glowRgb[k];
    ctx.save();
    stubPath(h, true); ctx.clip();
    const gr = ctx.createLinearGradient(h.x, 0, h.xe - h.dir * h.rf, 0);
    gr.addColorStop(0, rgba(mix(rgb, 0.4), 0.7 * B)); gr.addColorStop(0.6, rgba(rgb, 0.22 * B)); gr.addColorStop(1, rgba(rgb, 0));
    ctx.fillStyle = gr; ctx.fillRect(Math.min(h.x, h.xe) - h.rf * 2, h.y - h.rf * 2, Math.abs(h.x - h.xe) + h.rf * 4, h.rf * 4);
    ctx.restore();
    if (h.face > 0.12) { // le disque du pied s'éclaire aussi, depuis l'ouverture
      ctx.save();
      ctx.beginPath(); ctx.ellipse(h.xe, h.y, h.rf * h.face, h.rf, 0, 0, Math.PI * 2); ctx.clip();
      const rg = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.rf * 1.3);
      rg.addColorStop(0, rgba(mix(rgb, 0.4), 0.6 * B)); rg.addColorStop(1, rgba(rgb, 0));
      ctx.fillStyle = rg; ctx.fillRect(h.xe - h.rf * 2, h.y - h.rf * 2, h.rf * 4, h.rf * 4);
      ctx.restore();
    }
  }
  // Souffle de lumière : une série de taches douces posées le long du rayon de l'extrusion (le trou rayonne depuis
  // l'axe de la flûte). En perspective, plus le souffle s'éloigne du tube, plus il se rapproche de nous quand le trou
  // est tourné vers le spectateur : il grossit, se dilue, et son déplacement à l'écran se raccourcit (x = s·sin θ).
  // Un trou sur le bord donne donc un souffle horizontal qui s'élargit en cône ; un trou central, une lueur qui enfle.
  const smooth = (x) => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };
  const blob = (rgb) => {
    const key = (rgb[0] >> 3) + ',' + (rgb[1] >> 3) + ',' + (rgb[2] >> 3);
    let spr = (cache.blobs || (cache.blobs = {}))[key];
    if (!spr) {
      spr = document.createElement('canvas'); spr.width = spr.height = 128;
      const c = spr.getContext('2d'), g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, rgba(rgb, 1)); g.addColorStop(0.3, rgba(rgb, 0.55)); g.addColorStop(0.65, rgba(rgb, 0.13)); g.addColorStop(1, rgba(rgb, 0));
      c.fillStyle = g; c.fillRect(0, 0, 128, 128);
      cache.blobs[key] = spr;
    }
    return spr;
  };
  const r0 = (rt) => rt * (0.8 + 1.3 * diffuse);
  const spread = 0.04 + 0.22 * diffuse; // élargissement du souffle par unité de distance
  for (const b of beams) {
    const h = holeAt(b.k);
    const len = b.head - b.tail;
    if (len < 0.5) continue;
    const detached = b.tail > 0.5;
    const n = Math.max(6, Math.min(56, Math.round(len / (h.rt * 0.5))));
    const soft = blob(b.rgb), hot = blob(mix(b.rgb, 0.6));
    const ux = h.dir * h.u; // déplacement à l'écran par unité de distance le long du rayon
    for (let i = 0; i <= n; i++) {
      const f = i / n, s = b.tail + len * f;
      const persp = 1 + 0.9 * (s * h.face) / D; // grossit en s'approchant du spectateur
      const r = (r0(h.rt) + s * spread) * persp;
      const x = h.x + ux * s, y = h.y;
      // Nombre de taches qui se superposent en un point : on répartit l'intensité entre elles pour que le souffle
      // garde la même luminosité, qu'il s'étire sur le côté (peu de recouvrement) ou enfle sur place (beaucoup).
      const stepProj = Math.max(1e-3, (len / n) * h.u);
      const overlap = Math.max(1, Math.min(n + 1, r / stepProj));
      const w = (detached ? smooth(f / 0.25) : 1) * smooth((1 - f) / 0.3 + (b.head >= D ? 1 : 0)) * Math.pow(1 - s / D, 1.3);
      const a = Math.min(1, b.env * w * gain * 2.4 * (1 + 0.6 * h.face) / overlap * (0.6 + 0.4 * diffuse));
      if (a < 0.004) continue;
      ctx.globalAlpha = a; ctx.drawImage(soft, x - r, y - r, 2 * r, 2 * r);
      // Cœur plus petit et plus clair, qui garde un axe lisible sans durcir le souffle.
      ctx.globalAlpha = Math.min(1, a * (1.6 - 0.8 * diffuse)); const rc = r * 0.34; ctx.drawImage(hot, x - rc, y - rc * 0.75, 2 * rc, 1.5 * rc);
    }
    ctx.globalAlpha = 1;
  }
  // Lueur à l'ouverture : un disque doux et un cœur brillant, tant que la note sonne et un peu après.
  for (let k = 0; k < lay.holes; k++) {
    if (glow[k] < 0.01) continue;
    const h = holeAt(k), B = 1 - Math.exp(-gain * glow[k] * 1.6), rgb = glowRgb[k];
    const R = h.rt * (3 + 4 * B) * (1 + 0.8 * h.face);
    const gr = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, R);
    gr.addColorStop(0, rgba(mix(rgb, 0.5), 0.85 * B)); gr.addColorStop(0.35, rgba(rgb, 0.3 * B)); gr.addColorStop(1, rgba(rgb, 0));
    ctx.fillStyle = gr;
    ctx.beginPath(); ctx.arc(h.x, h.y, R, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(h.x, h.y, h.rt * (0.4 + 0.6 * h.face), h.rt * 0.86, 0, 0, Math.PI * 2);
    ctx.fillStyle = rgba(mix(rgb, 0.8), 0.95 * B); ctx.fill();
  }
  ctx.restore();
}
