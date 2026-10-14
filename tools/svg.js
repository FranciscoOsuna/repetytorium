// Mała biblioteka do rysowania schematów SVG dla feedu (klasy CSS są w feed_powtorki.html, sekcja ".fig").
const W = 340;
const warns = [];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const n = v => Math.round(v * 100) / 100;
const CW = { n: 6.9, s: 5.9 };            // szerokość znaku (zapas) dla 12 px i 10,5 px

function T(x, y, str, o = {}) {
  const cls = ['s', 'a', 'g', 'r', 'b', 'm', 'e'].filter(k => o[k]).join(' ');
  return `<text${cls ? ` class="${cls}"` : ''} x="${n(x)}" y="${n(y)}">${esc(str)}</text>`;
}
// wiele linii; linia może być 'tekst' albo ['tekst', {s:true}]
function TL(x, y, lines, o = {}, lh = 13) {
  return lines.map((l, i) => {
    const [t, oo] = Array.isArray(l) ? l : [l, {}];
    return T(x, y + i * lh, t, { ...o, ...oo });
  }).join('');
}
function fitCheck(tag, lines, w) {
  for (const l of lines) {
    const [t, oo] = Array.isArray(l) ? l : [l, {}];
    const est = [...t].length * (oo.s ? CW.s : CW.n);
    if (est > w - 6) warns.push(`${tag}: „${t}” ~${Math.round(est)}px > ${w - 6}px`);
  }
}
function box(x, y, w, h, lines, o = {}) {
  lines = Array.isArray(lines) ? lines : [lines];
  fitCheck(o.tag || lines[0], lines, w);
  const lh = o.lh || 13;
  const cls = o.k || 'bx';
  let s = `<rect class="${cls}" x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${o.r == null ? 7 : o.r}"/>`;
  const y0 = y + h / 2 - ((lines.length - 1) * lh) / 2 + 4;
  const al = o.left ? { x: x + 8, m: false } : { x: x + w / 2, m: true };
  s += TL(al.x, y0, lines, { m: al.m, a: o.a, g: o.g, r: o.r2, b: o.b }, lh);
  return s;
}
function head(x2, y2, dx, dy, cls) {
  const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  const bx = x2 - ux * 7.5, by = y2 - uy * 7.5, px = -uy * 3.4, py = ux * 3.4;
  return `<polygon class="${cls}" points="${n(x2)},${n(y2)} ${n(bx + px)},${n(by + py)} ${n(bx - px)},${n(by - py)}"/>`;
}
// strzałka po łamanej: pts = [[x,y],...]; o.k: ln|lna|lnm|lng|lnb ; o.dash
function arrow(pts, o = {}) {
  const k = o.k || 'ln';
  const hk = { ln: 'hk', lna: 'hka', lnm: 'hkm', lng: 'hka', lnb: 'hka' }[k];
  const m = pts.length;
  const [x1, y1] = pts[m - 2], [x2, y2] = pts[m - 1];
  const L = Math.hypot(x2 - x1, y2 - y1) || 1;
  const ex = x2 - ((x2 - x1) / L) * 5, ey = y2 - ((y2 - y1) / L) * 5;
  const d = pts.slice(0, m - 1).map((p, i) => `${i ? 'L' : 'M'}${n(p[0])},${n(p[1])}`).join('') + `L${n(ex)},${n(ey)}`;
  let s = `<path class="${k}${o.dash ? ' dash' : ''}" d="${d}"/>`;
  if (o.head !== false) s += head(x2, y2, x2 - x1, y2 - y1, o.hk || hk);
  return s;
}
function line(x1, y1, x2, y2, o = {}) {
  return `<path class="${o.k || 'ln'}${o.dash ? ' dash' : ''}" d="M${n(x1)},${n(y1)}L${n(x2)},${n(y2)}"/>`;
}
function rect(x, y, w, h, cls = 'bx', r = 7) { return `<rect class="${cls}" x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${r}"/>`; }
function poly(pts, cls) { return `<polygon class="${cls}" points="${pts.map(p => n(p[0]) + ',' + n(p[1])).join(' ')}"/>`; }
function pline(pts, cls) { return `<path class="${cls}" d="${pts.map((p, i) => (i ? 'L' : 'M') + n(p[0]) + ',' + n(p[1])).join('')}"/>`; }
function circle(x, y, r, cls = 'dot') { return `<circle class="${cls}" cx="${n(x)}" cy="${n(y)}" r="${r}"/>`; }
function cross(x, y, r, cls = 'ln') { return `<path class="${cls}" d="M${n(x - r)},${n(y - r)}L${n(x + r)},${n(y + r)}M${n(x - r)},${n(y + r)}L${n(x + r)},${n(y - r)}"/>`; }
function svg(h, body, label) {
  return `<svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
}
module.exports = { W, warns, esc, n, T, TL, box, arrow, line, rect, poly, pline, circle, cross, svg, head, fitCheck };
