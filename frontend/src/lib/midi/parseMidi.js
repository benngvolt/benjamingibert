// Parseur MIDI binaire minimal (format 0/1, tempo maps, division PPQN ou SMPTE).
export function parseMidi(buf) {
  const d = new DataView(buf);
  let p = 0;
  const str = (at, n) => {
    let s = '';
    for (let i = 0; i < n; i++) s += String.fromCharCode(d.getUint8(at + i));
    return s;
  };
  if (d.byteLength < 14 || str(0, 4) !== 'MThd') {
    throw new Error('Ce fichier n’est pas un MIDI standard (.mid).');
  }
  const hlen = d.getUint32(4), ntrk = d.getUint16(10), div = d.getUint16(12);
  p = 8 + hlen;
  const readVar = () => {
    let v = 0, b;
    do { b = d.getUint8(p++); v = (v << 7) | (b & 0x7f); } while (b & 0x80);
    return v;
  };
  const tempos = [], tracks = [];
  const dec = new TextDecoder('utf-8');
  let found = 0;
  while (found < ntrk && p + 8 <= d.byteLength) {
    const id = str(p, 4), len = d.getUint32(p + 4); p += 8;
    const end = Math.min(p + len, d.byteLength);
    if (id !== 'MTrk') { p = end; continue; }
    found++;
    let tick = 0, run = 0, name = ''; const evs = [];
    try {
      while (p < end) {
        tick += readVar();
        let st = d.getUint8(p);
        if (st < 0x80) st = run; else p++;
        if (st === 0xFF) {
          const type = d.getUint8(p++); const l = readVar();
          if (type === 0x51 && l >= 3) tempos.push({ tick, mpq: (d.getUint8(p) << 16) | (d.getUint8(p + 1) << 8) | d.getUint8(p + 2) });
          else if (type === 0x03 && !name) name = dec.decode(new Uint8Array(buf, p, l)).trim();
          p += l;
        } else if (st === 0xF0 || st === 0xF7) {
          p += readVar();
        } else {
          run = st;
          const hi = st & 0xF0, ch = st & 0x0F;
          const a = d.getUint8(p++);
          const b = (hi === 0xC0 || hi === 0xD0) ? 0 : d.getUint8(p++);
          if (hi === 0x90 || hi === 0x80) evs.push({ tick, on: hi === 0x90 && b > 0, ch, pitch: a, vel: b });
        }
      }
    } catch (e) { /* piste tronquée : on garde ce qui a été lu */ }
    p = end;
    tracks.push({ name, evs, last: tick });
  }

  let toSec;
  if (div & 0x8000) {
    const fps = 256 - ((div >> 8) & 0xff), tpf = div & 0xff;
    const spt = 1 / (fps * tpf); toSec = t => t * spt;
  } else {
    tempos.sort((a, b) => a.tick - b.tick);
    const segs = [{ tick: 0, sec: 0, spt: 0.5 / div }];
    for (const tp of tempos) {
      const last = segs[segs.length - 1];
      const spt = tp.mpq / 1e6 / div;
      if (tp.tick === last.tick) last.spt = spt;
      else segs.push({ tick: tp.tick, sec: last.sec + (tp.tick - last.tick) * last.spt, spt });
    }
    toSec = tick => {
      let lo = 0, hi = segs.length - 1;
      while (lo < hi) { const m = (lo + hi + 1) >> 1; if (segs[m].tick <= tick) lo = m; else hi = m - 1; }
      const s = segs[lo]; return s.sec + (tick - s.tick) * s.spt;
    };
  }

  const groups = [];
  tracks.forEach((tr, ti) => {
    const open = new Map(), byCh = new Map();
    const add = (ch, pitch, vel, t0, t1) => {
      if (!byCh.has(ch)) byCh.set(ch, []);
      const time = toSec(t0), end = Math.max(toSec(t1), time + 0.03);
      byCh.get(ch).push({ time, end, dur: end - time, pitch, vel });
    };
    for (const e of tr.evs) {
      const k = e.ch * 128 + e.pitch;
      if (e.on) { if (!open.has(k)) open.set(k, []); open.get(k).push(e); }
      else { const q = open.get(k); if (q && q.length) { const s = q.shift(); add(e.ch, e.pitch, s.vel, s.tick, e.tick); } }
    }
    for (const q of open.values()) for (const s of q) add(s.ch, s.pitch, s.vel, s.tick, tr.last);
    const multi = byCh.size > 1;
    for (const [ch, notes] of byCh) {
      if (!notes.length) continue;
      const base = tr.name || ('Piste ' + (ti + 1));
      groups.push({ name: multi ? base + ' (canal ' + (ch + 1) + ')' : base, drums: ch === 9, notes });
    }
  });
  if (!groups.length) throw new Error('Aucune note trouvée dans ce fichier.');
  return groups;
}
