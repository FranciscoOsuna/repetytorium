const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
function ellipse(cx, cy, rx, ry, n = 60) { const p = []; for (let i = 0; i <= n; i++) { const t = (Math.PI / 2) * i / n; p.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); } return p; }

function fullEllipse(cx, cy, rx, ry, n = 60) { const p = []; for (let i = 0; i <= n; i++) { const t = 2 * Math.PI * i / n; p.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); } return p; }
function polozenie() {
  let b = '';
  b += circle(80, 80, 60, 'fl'); b += circle(80, 80, 60, 'lna');
  b += circle(95, 70, 14, 'lnm'); b += circle(95, 70, 30, 'lnm');
  b += circle(95, 70, 3.5, 'dot');
  b += T(80, 168, 'optimum we wnętrzu', { m: true, s: true });
  b += T(80, 184, 'ograniczenie nieaktywne', { m: true, s: true });
  b += circle(200, 85, 30, 'fl'); b += circle(200, 85, 30, 'lna');
  b += circle(285, 85, 55, 'lnm'); b += circle(285, 85, 28, 'lnm');
  b += circle(285, 85, 3.5, 'dotk');
  b += circle(230, 85, 4, 'dot');
  b += T(262, 168, 'optimum na brzegu', { m: true, s: true });
  b += T(262, 184, 'ograniczenie aktywne', { m: true, s: true });
  b += T(80, 12, 'obszar', { m: true, s: true });
  return svg(194, b, 'Optimum we wnętrzu obszaru dopuszczalnego i optimum na brzegu');
}

function kara() {
  const X = x => 20 + x * 45, Y = v => 160 - v * 28;
  const f = x => 0.25 * (x - 6) ** 2;
  let b = '';
  b += rect(X(1), 10, X(4) - X(1), 150, 'fl', 0);
  b += line(14, 160, 330, 160, { k: 'ln' });
  b += line(X(4), 10, X(4), 160, { k: 'lna', dash: true });
  b += T(X(2.5), 24, 'obszar', { m: true, s: true });
  b += T(X(4), 174, '4', { m: true, s: true, a: true });
  b += T(X(1), 174, '1', { m: true, s: true });
  const curve = (fn, x0, x1) => { const p = []; for (let i = 0; i <= 120; i++) { const x = x0 + (x1 - x0) * i / 120, v = fn(x); if (v <= 5) p.push([X(x), Y(v)]); } return p; };
  b += pline(curve(f, 0, 7), 'lnm');
  const bar = x => f(x) + 0.3 / (4 - x), ext = x => f(x) + 2 * Math.max(0, x - 4) ** 2;
  b += pline(curve(bar, 1, 3.95), 'lng');
  b += pline(curve(ext, 1, 7), 'lnb');
  let xb = 1; for (let x = 1; x < 3.99; x += 0.001) if (bar(x) < bar(xb)) xb = x;
  let xe = 1; for (let x = 1; x < 7; x += 0.001) if (ext(x) < ext(xe)) xe = x;
  b += circle(X(xb), Y(bar(xb)), 3.5, 'dotk'); b += circle(X(xe), Y(ext(xe)), 3.5, 'dot');
  b += T(14, 192, 'f(x)', { s: true });
  b += T(60, 192, 'bariera: minimum w środku', { s: true, g: true });
  b += T(14, 208, 'kara zewnętrzna: minimum tuż za brzegiem', { s: true, r: true });
  return svg(218, b, 'f(x) przy 1 ≤ x ≤ 4: minimum z barierą leży w obszarze, z karą zewnętrzną tuż poza nim');
}

function algorytm() {
  let b = '';
  b += box(20, 0, 180, 30, ['wybór: kara, x⁽⁰⁾, r₁, ε'], { k: 'bx' });
  b += arrow([[110, 30], [110, 44]], { k: 'ln' });
  b += box(20, 44, 180, 30, ['T = f + φ(x, r)'], { k: 'bxa' });
  b += arrow([[110, 74], [110, 88]], { k: 'ln' });
  b += box(20, 88, 180, 30, ['min T bez ograniczeń'], { k: 'bxa' });
  b += T(212, 108, 'dowolna metoda', { s: true });
  b += arrow([[110, 118], [110, 132]], { k: 'ln' });
  b += box(20, 132, 180, 30, ['warunek stopu?'], { k: 'bxn' });
  b += arrow([[200, 147], [250, 147]], { k: 'ln' });
  b += T(224, 139, 'TAK', { m: true, g: true, s: true });
  b += box(250, 132, 90, 30, ['wynik x⁽ᵏ⁾'], { k: 'bxg' });
  b += arrow([[110, 162], [110, 180]], { k: 'lna' });
  b += T(124, 175, 'NIE', { a: true, s: true });
  b += box(20, 180, 180, 30, ['zwiększ r (r · c), k + 1'], { k: 'bx' });
  b += arrow([[20, 195], [8, 195], [8, 59], [20, 59]], { k: 'lna' });
  return svg(220, b, 'Algorytm metody funkcji kary: pętla zmieniająca parametr kary r');
}

function przyklad() {
  const X = x => 40 + x * 80, Y = y => 150 - y * 55;
  let b = '';
  b += line(30, 150, 300, 150, { k: 'ln' }); b += line(40, 160, 40, 20, { k: 'ln' });
  b += T(300, 164, 'x₁', { e: true, s: true }); b += T(48, 24, 'x₂', { s: true });
  [3, 12.86, 25].forEach((c, i) => { b += pline(ellipse(X(0), Y(0), Math.sqrt(c / 4) * 80, -Math.sqrt(c / 5) * 55, 80), i === 1 ? 'lna' : 'lnm'); });
  b += pline([[X(3), Y(0)], [X(0), Y(2)]], 'ln');
  b += T(X(0.75), Y(1.95), '2x₁ + 3x₂ = 6', { s: true });
  const tr = [[0, 0], [0.234, 0.281], [0.489, 0.587], [0.709, 0.851], [0.909, 1.091], [1.034, 1.241], [1.071, 1.286]];
  b += pline(tr.map(([a, c]) => [X(a), Y(c)]), 'lnb');
  tr.forEach(([a, c], i) => { b += circle(X(a), Y(c), 3, i === 6 ? 'dot' : 'dotk'); });
  b += T(X(0) + 4, Y(0) + 14, 'r = 0', { s: true });
  b += T(X(1.071) + 10, Y(1.286) - 8, 'r → ∞', { s: true, a: true });
  b += T(14, 190, 'x*(r) dochodzi do (15/14; 9/7), gdzie warstwica', { s: true });
  b += T(14, 204, 'dotyka prostej ograniczenia', { s: true });
  return svg(214, b, 'Przykład z wykładu: minima z karą zewnętrzną zbliżają się do rozwiązania po prostej');
}
module.exports = { polozenie, kara, algorytm, przyklad };
