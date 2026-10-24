// Sprites issus de formes SVG personnalisées, recolorés en silhouette pleine (comme un masque)
// dans la couleur de la piste — même principe de cache par note que les pommes de pin.
// Avec plusieurs formes, chaque note en reçoit une au hasard, mais toujours la même (tirage fixé par
// l'identifiant de la note) : l'aperçu, l'export et les images successives restent cohérents.
let uidCounter = 0;

export function loadCustomShapeImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { img._uid = ++uidCounter; resolve(img); };
    img.onerror = reject;
    img.src = src;
  });
}

// Charge toutes les formes ; celles qui ne se chargent pas (fichier invalide) sont simplement ignorées.
export function loadCustomShapeImages(srcs) {
  return Promise.all(srcs.map(s => loadCustomShapeImage(s).catch(() => null))).then(list => list.filter(Boolean));
}

function pickIndex(id, count) {
  let h = Math.imul(id + 1, 2654435761) >>> 0;
  h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0;
  h ^= h >>> 13;
  return (h >>> 0) % count;
}

export function getCustomSprite(cache, n, r, color, imgs) {
  const img = imgs[pickIndex(n.id, imgs.length)];
  const rq = Math.max(6, Math.round(r / 3) * 3);
  const side = rq * 2;
  const key = 'custom:' + img._uid + ':' + side + ':' + color;
  if (n._sk !== key) {
    const c = document.createElement('canvas'); c.width = c.height = side;
    const x = c.getContext('2d');
    // La forme est inscrite dans le carré en gardant ses proportions (sinon un jeu de formes aux
    // proportions différentes serait déformé) ; sans dimensions intrinsèques, on remplit le carré.
    const iw = img.naturalWidth, ih = img.naturalHeight;
    let dw = side, dh = side;
    if (iw > 0 && ih > 0) { const k = Math.min(side / iw, side / ih); dw = iw * k; dh = ih * k; }
    x.drawImage(img, (side - dw) / 2, (side - dh) / 2, dw, dh);
    x.globalCompositeOperation = 'source-atop';
    x.fillStyle = color;
    x.fillRect(0, 0, side, side);
    n._spr = { c, half: side / 2 };
    n._sk = key;
    cache.push(n);
    if (cache.length > 600) {
      const o = cache.shift();
      if (o !== n && cache.indexOf(o) === -1) { o._spr = null; o._sk = null; }
    }
  }
  return n._spr;
}
