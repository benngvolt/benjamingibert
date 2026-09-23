// Sprites issus d'une forme SVG personnalisée, recolorés en silhouette pleine (comme un masque)
// dans la couleur de la piste — même principe de cache par note que les pommes de pin.
export function loadCustomShapeImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function getCustomSprite(cache, n, r, color, img) {
  const rq = Math.max(6, Math.round(r / 3) * 3);
  const side = rq * 2;
  const key = 'custom:' + side + ':' + color;
  if (n._sk !== key) {
    const c = document.createElement('canvas'); c.width = c.height = side;
    const x = c.getContext('2d');
    x.drawImage(img, 0, 0, side, side);
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
