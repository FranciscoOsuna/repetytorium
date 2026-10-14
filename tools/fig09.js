const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;

function klasyfikacja() {
  let b = '';
  b += T(80, 12, 'Bez ograniczeń', { m: true, b: true, s: true });
  b += T(260, 12, 'Z ograniczeniami', { m: true, b: true, s: true });
  const Lh = [['rząd 0', 'tylko wartości f'], ['rząd 1', 'gradient'], ['rząd 2', 'gradient + hesjan']];
  const Rh = [['kara i bariera', 'ograniczenia → koszt'], ['kierunki dopuszcz.', 'zostaje w obszarze'], ['warunki KKT', 'SQP, punkt wewn.']];
  Lh.forEach((l, i) => { b += box(0, 22 + i * 48, 160, 40, l, { k: 'bx', r: 6 }); });
  Rh.forEach((l, i) => { b += box(180, 22 + i * 48, 160, 40, l, { k: 'bxa', r: 6 }); });
  b += box(0, 172, 340, 30, ['osobny podział: metody lokalne i globalne'], { k: 'bxn', r: 6 });
  return svg(212, b, 'Klasyfikacja algorytmów: bez ograniczeń według rzędu informacji, z ograniczeniami według traktowania ograniczeń');
}

function ellipse(cx, cy, rx, ry, n = 60) {
  const p = []; for (let i = 0; i <= n; i++) { const t = 2 * Math.PI * i / n; p.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); }
  return p;
}
function zygzak() {
  let b = '';
  [1, 0.66, 0.33].forEach(k => { b += pline(ellipse(170, 80, 150 * k, 30 * k), 'lnm'); });
  const zz = [[60, 95], [96, 55], [122, 90], [142, 66], [156, 84], [165, 76], [170, 80]];
  b += pline(zz, 'lna');
  b += circle(60, 95, 3.5, 'dot');
  b += arrow([[60, 95], [166, 80]], { k: 'lnb', dash: true });
  b += circle(170, 80, 3.5, 'dotk');
  b += T(60, 114, 'start', { m: true, s: true });
  b += T(14, 150, 'najszybszy spadek: zygzak w wąskiej dolinie', { a: true, s: true });
  b += T(14, 166, 'Newton: jeden krok do minimum (funkcja kwadratowa)', { s: true });
  return svg(176, b, 'Warstwice wydłużonej doliny: metoda najszybszego spadku zygzakuje, metoda Newtona trafia w jednym kroku');
}

const f = t => 0.8 * (t - 0.7) ** 2 + 0.12 * Math.cos(5 * 2 * Math.PI * t) + 0.12;
const df = t => 1.6 * (t - 0.7) - 0.12 * 10 * Math.PI * Math.sin(10 * Math.PI * t);
function wielostart() {
  const X = t => 20 + t * 300, Y = v => 150 - v * 190;
  let b = '';
  b += line(14, 150, 326, 150, { k: 'ln' });
  const pts = []; for (let i = 0; i <= 160; i++) { const t = i / 160; pts.push([X(t), Y(f(t))]); }
  b += pline(pts, 'ln');
  const mins = [];
  [0.08, 0.3, 0.52, 0.85].forEach(s0 => {
    let t = s0; for (let i = 0; i < 4000; i++) t -= 0.0004 * df(t);
    mins.push(t);
    b += circle(X(s0), Y(f(s0)), 3.5, 'dot');
    b += line(X(s0), Y(f(s0)) - 4, X(s0), 10, { k: 'lnm', dash: true });
    b += arrow([[X(s0), 18], [X(t), 18], [X(t), Y(f(t)) - 8]], { k: 'lnb' });
  });
  const uniq = [...new Set(mins.map(m => m.toFixed(2)))].map(Number);
  const best = uniq.reduce((a, c) => f(c) < f(a) ? c : a);
  uniq.forEach(m => { b += circle(X(m), Y(f(m)), 4, m === best ? 'dot' : 'dotk'); });
  b += T(X(best), 164, 'globalne', { m: true, a: true, s: true });
  b += T(170, 182, 'ta sama metoda, różne starty, różne minima lokalne', { m: true, s: true });
  return svg(192, b, 'Metoda lokalna z różnych punktów startowych kończy w różnych minimach');
}

function kkt() {
  let b = '';
  b += circle(70, 105, 50, 'fl');
  b += circle(70, 105, 50, 'lna');
  b += circle(215, 105, 95, 'lnm');
  b += circle(215, 105, 50, 'lnm');
  b += circle(215, 105, 3.5, 'dotk');
  b += T(215, 92, 'min bez', { m: true, s: true });
  b += T(215, 126, 'ograniczeń', { m: true, s: true });
  b += circle(120, 105, 4, 'dot');
  b += arrow([[120, 105], [84, 105]], { k: 'lnb' });
  b += T(96, 96, '∇f', { m: true, b: true });
  b += arrow([[120, 105], [158, 105]], { k: 'lna' });
  b += T(150, 99, '∇g', { m: true, a: true, b: true });
  b += T(70, 78, 'obszar', { m: true, s: true });
  b += T(70, 172, 'x* na brzegu', { m: true, a: true, s: true });
  b += T(14, 214, '∇f i ∇g: jedna prosta, przeciwne zwroty', { s: true });
  b += T(14, 230, '∇f + μ∇g = 0', { s: true });
  return svg(240, b, 'Optimum na brzegu: warstwica styczna do ograniczenia, gradienty o przeciwnych zwrotach');
}
module.exports = { klasyfikacja, zygzak, wielostart, kkt };
