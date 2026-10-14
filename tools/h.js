// Pomocnicze generatory prostych schematów (szerokość 340)
const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
const sp = s => String(s).split('|');
// pionowy łańcuch bloków; hi = indeksy wyróżnione; loop = strzałka powrotna; note = tekst po prawej
function chainV(items, o = {}) {
  const w = o.w || 170, h = 32, gap = o.gap || 44, x = o.x == null ? 10 : o.x, hi = o.hi || [], dim = o.dim || [];
  let b = '';
  items.forEach((t, i) => {
    const y = i * gap;
    b += box(x, y, w, h, sp(t), { k: hi.includes(i) ? 'bxa' : dim.includes(i) ? 'bxn' : 'bx' });
    if (i < items.length - 1) b += arrow([[x + w / 2, y + h], [x + w / 2, y + gap]], { k: 'ln' });
  });
  const last = (items.length - 1) * gap + h / 2;
  if (o.loop) b += arrow([[x + w, last], [x + w + 14, last], [x + w + 14, h / 2], [x + w, h / 2]], { k: 'lna' });
  if (o.note) b += TL(x + w + (o.loop ? 26 : 14), o.noteY == null ? 20 : o.noteY, o.note, { s: true }, 13);
  return svg((items.length - 1) * gap + h + 6, b, o.label || '');
}
// poziomy łańcuch
function chainH(items, o = {}) {
  const n = items.length, g = 14, w = (340 - (n - 1) * g) / n, h = o.h || 44, hi = o.hi || [];
  let b = '';
  items.forEach((t, i) => {
    const x = i * (w + g);
    b += box(x, 0, w, h, sp(t), { k: hi.includes(i) ? 'bxa' : 'bx' });
    if (i < n - 1) b += arrow([[x + w, h / 2], [x + w + g, h / 2]], { k: 'ln' });
  });
  let H = h + 6;
  if (o.note) { b += TL(0, h + 20, o.note, { s: true }, 13); H = h + 20 + o.note.length * 13 + 4; }
  return svg(H, b, o.label || '');
}
// korzeń + dzieci
function tree(root, kids, o = {}) {
  const n = kids.length, g = o.g || 6, w = (340 - (n - 1) * g) / n, hi = o.hi || [], h = o.h || 56;
  let b = box(50, 0, 240, 30, sp(root), { k: 'bxn' });
  kids.forEach((t, i) => {
    const x = i * (w + g), cx = x + w / 2;
    b += arrow([[170, 30], [170, 44], [cx, 44], [cx, 62]], { k: 'ln' });
    b += box(x, 62, w, h, sp(t), { k: hi.includes(i) ? 'bxa' : 'bx' });
  });
  let H = 62 + h + 6;
  if (o.note) { b += TL(0, H + 14, o.note, { s: true }, 13); H += 14 + o.note.length * 13 + 4; }
  return svg(H, b, o.label || '');
}
// dwie kolumny: lewa → prawa
function cols(h1, h2, rows, o = {}) {
  const w1 = o.w1 || 150, w2 = o.w2 || 150, gx = 340 - w1 - w2, hh = o.h || 34, hi = o.hi || [];
  let b = T(w1 / 2, 12, h1, { m: true, b: true, s: true }) + T(340 - w2 / 2, 12, h2, { m: true, b: true, s: true });
  rows.forEach(([l, r], i) => {
    const y = 22 + i * (hh + 8);
    b += box(0, y, w1, hh, sp(l), { k: 'bx' });
    b += box(340 - w2, y, w2, hh, sp(r), { k: hi.includes(i) ? 'bxa' : 'bx' });
    b += arrow([[w1, y + hh / 2], [340 - w2, y + hh / 2]], { k: 'lnm' });
  });
  let H = 22 + rows.length * (hh + 8);
  if (o.note) { b += TL(0, H + 8, o.note, { s: true }, 13); H += 8 + o.note.length * 13; }
  return svg(H, b, o.label || '');
}
module.exports = { chainV, chainH, tree, cols, sp };
