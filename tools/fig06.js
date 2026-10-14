const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, cross, svg } = L;

// 1. Układ ze sprzężeniem od stanu: L (zwrotnie) i M (w przód)
function struktura() {
  let b = '';
  b += T(0, 44, 'yᵣ', { b: true });
  b += arrow([[18, 40], [30, 40]], { k: 'ln' });
  b += box(30, 24, 48, 32, ['M'], { k: 'bxa' });
  b += arrow([[78, 40], [100, 40]], { k: 'ln' });
  b += circle(110, 40, 10, 'bx');
  b += T(110, 44, 'Σ', { m: true, s: true });
  b += arrow([[120, 40], [146, 40]], { k: 'ln' });
  b += T(133, 32, 'u', { m: true, s: true });
  b += box(146, 20, 84, 40, ['OBIEKT', ['ẋ = Ax + Bu', { s: true }]], { k: 'bxn' });
  b += arrow([[230, 40], [258, 40]], { k: 'ln' });
  b += T(244, 32, 'x', { m: true, s: true });
  b += box(258, 24, 36, 32, ['C'], { k: 'bxn' });
  b += arrow([[294, 40], [324, 40]], { k: 'ln' });
  b += T(328, 44, 'y', { b: true });
  b += arrow([[244, 40], [244, 112], [230, 112]], { k: 'lna' });
  b += box(146, 96, 84, 32, ['L'], { k: 'bxa' });
  b += arrow([[146, 112], [110, 112], [110, 50]], { k: 'lna' });
  b += T(118, 78, '−', { r: true, b: true });
  b += T(92, 36, '+', { s: true });
  b += T(0, 150, 'L: zadanie regulacyjne (dynamika)', { a: true, s: true });
  b += T(0, 165, 'M: zadanie śledzące (wartość ustalona)', { a: true, s: true });
  b += box(0, 176, 340, 44, ['u = −Lx + M yᵣ', ['ẋ = (A − BL)x + BM yᵣ', { s: true }]], { k: 'bxg' });
  return svg(228, b, 'Układ ze sprzężeniem od stanu przez L i kompensacją wartości zadanej przez M');
}

// 2. Przykład z wykładu: bieguny -1,5 ± j1,32 -> -6 i -8
function bieguny() {
  let b = '';
  const X = r => 290 + r * 32, Y = i => 80 - i * 34;
  b += rect(X(0) + 1, 8, 44, 144, 'fl', 0);
  b += line(20, 80, 334, 80, { k: 'ln' });
  b += line(290, 8, 290, 152, { k: 'ln' });
  b += T(330, 94, 'Re', { e: true, s: true });
  b += T(296, 18, 'Im', { s: true });
  const up = [X(-1.5), Y(1.32)], lo = [X(-1.5), Y(-1.32)];
  b += cross(up[0], up[1], 5, 'lnm'); b += cross(lo[0], lo[1], 5, 'lnm');
  b += cross(X(-6), Y(0), 5, 'lna'); b += cross(X(-8), Y(0), 5, 'lna');
  b += arrow([[up[0] - 8, up[1] + 3], [X(-6) + 8, Y(0) - 4]], { k: 'lnm', dash: true });
  b += arrow([[lo[0] - 8, lo[1] - 3], [X(-8) + 8, Y(0) + 4]], { k: 'lnm', dash: true });
  b += T(up[0], up[1] - 12, '−1,5 ± j1,32', { m: true, s: true });
  b += T(X(-7), Y(0) - 12, '−8  i  −6', { m: true, a: true, s: true });
  b += cross(14, 172, 4, 'lnm'); b += T(26, 176, 'bieguny obiektu: oscylacyjne, wolne', { s: true });
  b += cross(14, 188, 4, 'lna'); b += T(26, 192, 'po alokacji: szybkie, bez oscylacji', { s: true });
  return svg(200, b, 'Alokacja biegunów w przykładzie: para zespolona zostaje przeniesiona w dwa bieguny rzeczywiste');
}

// 3. Obszar dopuszczalnych biegunów
function obszar() {
  let b = '';
  const X = r => 250 + r * 28, Y = i => 108 - i * 28;
  const ph = Math.acos(0.6);
  const pts = [[X(-1), Y(1.3333)], [X(-2.4), Y(3.2)]];
  for (let a = ph; a >= -ph - 1e-9; a -= 0.08) pts.push([X(-4 * Math.cos(a)), Y(4 * Math.sin(a))]);
  pts.push([X(-2.4), Y(-3.2)], [X(-1), Y(-1.3333)]);
  b += poly(pts, 'fl');
  b += pline([...pts, pts[0]], 'lna');
  b += line(X(-5), Y(0), X(2), Y(0), { k: 'ln' });
  b += line(X(0), Y(3.6), X(0), Y(-3.6), { k: 'ln' });
  b += line(X(0), Y(0), X(-2.4), Y(3.2), { k: 'lnm', dash: true });
  b += line(X(0), Y(0), X(-2.4), Y(-3.2), { k: 'lnm', dash: true });
  b += T(X(2), Y(0) + 14, 'Re', { e: true, s: true });
  b += T(X(0) + 8, Y(3.6) + 4, 'Im', { s: true });
  b += TL(0, 228, [['ζ ≥ 0,6: przeregulowanie ograniczone (kąt ≤ 53°)', { s: true }], ['Re s ≤ −1: czas regulacji ograniczony', { s: true }], ['|s| ≤ 4: wzmocnienia i sterowanie ograniczone', { s: true }]], {}, 14);
  return svg(276, b, 'Obszar dopuszczalnych biegunów na płaszczyźnie s: tłumienie, część rzeczywista i pulsacja');
}
module.exports = { struktura, bieguny, obszar };
