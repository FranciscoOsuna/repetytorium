const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;

// 1. Struktura MNK: system, model, residuum, kryterium, optymalizator
function struktura() {
  let b = '';
  b += T(0, 52, 'u', { b: true });
  b += line(10, 48, 44, 48, { k: 'ln' });
  b += arrow([[44, 48], [44, 30], [74, 30]], { k: 'ln' });
  b += arrow([[44, 48], [44, 108], [74, 108]], { k: 'ln' });
  b += box(74, 8, 92, 44, ['SYSTEM', ['pomiar ỹ', { s: true }]], { k: 'bxn' });
  b += box(74, 86, 92, 44, ['MODEL', ['ŷ(x̂)', { s: true }]], { k: 'bxa' });
  b += arrow([[166, 30], [206, 30], [206, 52]], { k: 'ln' });
  b += arrow([[166, 108], [206, 108], [206, 86]], { k: 'ln' });
  b += circle(206, 69, 17, 'bx');
  b += T(206, 73, 'Σ', { m: true, b: true });
  b += T(216, 46, '+', { s: true });
  b += T(216, 94, '−', { s: true });
  b += arrow([[223, 69], [252, 69]], { k: 'ln' });
  b += T(236, 62, 'ê', { s: true, m: true });
  b += box(252, 40, 88, 58, ['kryterium', ['J = ½ êᵀê', { s: true }]], { k: 'bxg' });
  b += arrow([[296, 98], [296, 150]], { k: 'ln' });
  b += box(214, 150, 126, 36, ['optymalizator', ['szuka x̂', { s: true }]], { k: 'bxa' });
  b += arrow([[214, 168], [120, 168], [120, 130]], { k: 'lna' });
  b += T(168, 160, 'nowe x̂', { s: true, m: true });
  return svg(194, b, 'Struktura metody najmniejszych kwadratów: system, model, residuum, kryterium i optymalizator');
}

// 2. Równanie obserwacji ỹ = H x̂ + ê
function obserwacji() {
  let b = '';
  const top = 26, hgt = 108;
  b += T(20, 14, 'ỹ', { m: true, b: true });
  b += rect(6, top, 28, hgt, 'bx', 4);
  b += T(44, top + 58, '=', { m: true, b: true });
  b += T(130, 14, 'H', { m: true, b: true });
  b += rect(62, top, 136, hgt, 'bx', 4);
  b += T(210, top + 58, '·', { m: true, b: true });
  b += T(236, 14, 'x̂', { m: true, b: true });
  b += rect(222, top, 28, hgt, 'bx', 4);
  b += T(262, top + 58, '+', { m: true, b: true });
  b += T(290, 14, 'ê', { m: true, b: true });
  b += rect(276, top, 28, hgt, 'bx', 4);
  // wiersz j
  b += rect(6, top + 44, 28, 20, 'fl', 3);
  b += rect(62, top + 44, 136, 20, 'fl', 3);
  b += rect(276, top + 44, 28, 20, 'fl', 3);
  // kolumna i
  b += rect(112, top, 30, hgt, 'fl', 3);
  b += rect(222, top + 70, 28, 20, 'fl', 3);
  b += T(127, top + 58, 'hᵢ(uⱼ)', { m: true, s: true });
  b += T(20, top + 58, 'ỹⱼ', { m: true, s: true });
  b += T(290, top + 58, 'êⱼ', { m: true, s: true });
  b += T(236, top + 84, 'x̂ᵢ', { m: true, s: true });
  b += T(236, top + 40, '⋮', { m: true, s: true });
  b += TL(0, 158, ['wiersz j = jeden pomiar', 'kolumna i = jedna funkcja bazowa hᵢ', ['H: m wierszy (pomiary), n kolumn (parametry), m ≥ n', { s: true }]], { a: false }, 14);
  return svg(200, b, 'Równanie obserwacji: wektor pomiarów, macierz obserwacji, parametry i residua');
}

// 3. Cztery odmiany MNK
function odmiany() {
  let b = '';
  const c0 = 76, cw = 88, g = 0;
  const heads = ['jednakowo', 'różnie', 'część'];
  const heads2 = ['wiarygodne', 'wiarygodne', 'dokładna'];
  b += T(0, 10, 'pomiary są:', { s: true });
  heads.forEach((t, i) => { b += T(c0 + i * cw + cw / 2, 10, t, { s: true, m: true }); b += T(c0 + i * cw + cw / 2, 22, heads2[i], { s: true, m: true }); });
  b += box(0, 32, 70, 74, ['wszystkie', 'naraz'], { k: 'bxn' });
  b += box(c0, 32, cw - 4, 74, ['zwykła', ['J = ½êᵀê', { s: true }]], { k: 'bxa' });
  b += box(c0 + cw, 32, cw - 4, 74, ['ważona', ['J = ½êᵀWê', { s: true }]], { k: 'bxa' });
  b += box(c0 + 2 * cw, 32, cw - 4, 74, ['z pomiarami', 'dokładnymi'], { k: 'bxa' });
  b += box(0, 116, 70, 56, ['kolejno', 'w czasie'], { k: 'bxn' });
  b += box(c0, 116, 3 * cw - 4, 56, ['sekwencyjna (rekurencyjna)', ['poprawia estymatę po każdym pomiarze', { s: true }]], { k: 'bxg' });
  return svg(172, b, 'Cztery odmiany MNK: zależnie od wiarygodności pomiarów i momentu ich dostępności');
}

// 4. Rzut ortogonalny
function rzut() {
  let b = '';
  b += poly([[10, 170], [250, 170], [330, 118], [90, 118]], 'fl');
  b += T(20, 188, 'podprzestrzeń rozpięta przez kolumny H', { s: true });
  b += circle(120, 148, 3, 'dotk');
  b += T(110, 164, 'O', { s: true });
  const P = [250, 142], Y = [250, 44];
  b += arrow([[120, 148], [P[0] - 2, P[1] - 1]], { k: 'ln' });
  b += arrow([[120, 148], [Y[0] - 3, Y[1] + 3]], { k: 'lna' });
  b += line(P[0], P[1], Y[0], Y[1] + 2, { k: 'lnb', dash: true });
  b += line(P[0] - 9, P[1], P[0] - 9, P[1] - 9, { k: 'lnm' });
  b += line(P[0] - 9, P[1] - 9, P[0], P[1] - 9, { k: 'lnm' });
  b += circle(P[0], P[1], 3.5, 'dot');
  b += T(Y[0] + 8, Y[1] + 4, 'ỹ (pomiary)', { a: true });
  b += T(P[0] + 8, P[1] + 4, 'Hx̂ (rzut)', {});
  b += T(P[0] + 8, 96, 'ê', { r: true, b: true });
  b += T(P[0] + 20, 96, '⟂ kolumn H', { r: true, s: true });
  return svg(196, b, 'Geometria MNK: estymata to rzut ortogonalny wektora pomiarów na przestrzeń kolumn macierzy obserwacji');
}

// 5. Pętla estymacji rekursywnej
function petla() {
  let b = '';
  b += box(0, 36, 100, 168, ['stan', 'estymatora', ['x̂ₖ , Pₖ', { s: true }]], { k: 'bxa' });
  b += box(132, 0, 208, 30, ['nowy pomiar ỹₖ₊₁, wiersz Hₖ₊₁'], { k: 'bx' });
  b += box(132, 48, 208, 30, ['innowacja = ỹₖ₊₁ − Hₖ₊₁ x̂ₖ'], { k: 'bx' });
  b += box(132, 96, 208, 30, ['wzmocnienie Kₖ₊₁ z Pₖ i H'], { k: 'bx' });
  b += box(132, 144, 208, 30, ['x̂ₖ₊₁ = x̂ₖ + K · innowacja'], { k: 'bxg' });
  b += box(132, 192, 208, 30, ['Pₖ₊₁ = (I − K H) Pₖ'], { k: 'bxg' });
  b += arrow([[236, 30], [236, 48]], { k: 'ln' });
  b += arrow([[236, 78], [236, 96]], { k: 'ln' });
  b += arrow([[236, 126], [236, 144]], { k: 'ln' });
  b += arrow([[236, 174], [236, 192]], { k: 'ln' });
  b += arrow([[100, 63], [132, 63]], { k: 'lnm' });
  b += arrow([[100, 111], [132, 111]], { k: 'lnm' });
  b += arrow([[132, 159], [100, 159]], { k: 'lna' });
  b += arrow([[132, 207], [100, 207]], { k: 'lna' });
  b += T(50, 232, 'k → k+1', { s: true, m: true });
  return svg(238, b, 'Pętla estymacji rekursywnej: innowacja, wzmocnienie, korekta estymaty i aktualizacja macierzy P');
}

module.exports = { struktura, obserwacji, odmiany, rzut, petla };
