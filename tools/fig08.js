const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;

function funkcja() {
  let b = '';
  b += box(20, 24, 50, 34, ['K'], { k: 'bxa' });
  b += arrow([[70, 41], [170, 41]], { k: 'ln' });
  b += T(100, 33, 'u', { m: true, s: true });
  b += box(170, 24, 80, 34, ['OBIEKT'], { k: 'bxn' });
  b += arrow([[250, 41], [330, 41]], { k: 'ln' });
  b += T(322, 33, 'y', { b: true });
  b += circle(130, 41, 3, 'dotk');
  b += arrow([[130, 41], [130, 108]], { k: 'lna' });
  b += circle(290, 41, 3, 'dotk');
  b += arrow([[290, 41], [290, 127], [260, 127]], { k: 'lna' });
  b += box(110, 108, 150, 38, ['OBSERWATOR'], { k: 'bxa' });
  b += arrow([[110, 127], [45, 127], [45, 58]], { k: 'lna' });
  b += T(78, 120, 'x̂', { m: true, a: true });
  b += T(170, 166, 'oprogramowanie: żadnego nowego czujnika', { m: true, s: true });
  return svg(176, b, 'Obserwator w układzie sterowania: z sygnałów u i y odtwarza stan x̂ dla regulatora K');
}

function luenberger() {
  let b = '';
  b += arrow([[10, 27], [150, 27]], { k: 'ln' });
  b += T(30, 19, 'u', { m: true, s: true });
  b += box(150, 10, 100, 34, ['OBIEKT'], { k: 'bxn' });
  b += arrow([[250, 27], [330, 27]], { k: 'ln' });
  b += T(322, 19, 'y', { b: true });
  b += circle(70, 27, 3, 'dotk');
  b += arrow([[70, 27], [70, 138], [150, 138]], { k: 'lna' });
  b += box(150, 108, 100, 46, ['MODEL', 'Ax̂ + Bu'], { k: 'bxa' });
  b += circle(290, 27, 3, 'dotk');
  b += arrow([[290, 27], [290, 66]], { k: 'ln' });
  b += circle(290, 75, 9, 'bx'); b += T(290, 79, 'Σ', { m: true, s: true });
  b += arrow([[250, 131], [290, 131], [290, 84]], { k: 'ln' });
  b += T(266, 124, 'ŷ', { m: true, s: true });
  b += T(300, 100, '−', { r: true, b: true });
  b += arrow([[281, 75], [222, 75]], { k: 'lnb' });
  b += T(252, 67, 'y − ŷ', { m: true, s: true });
  b += box(172, 60, 50, 30, ['L'], { k: 'bxa' });
  b += arrow([[172, 75], [118, 75], [118, 122], [150, 122]], { k: 'lnb' });
  b += arrow([[200, 154], [200, 178]], { k: 'lna' });
  b += T(212, 176, 'x̂', { a: true });
  b += TL(8, 168, ['dx̂/dt = Ax̂ + Bu', '+ L(y − Cx̂)'], { s: true }, 13);
  return svg(190, b, 'Obserwator Luenbergera: model obiektu korygowany błędem wyjścia przez macierz L');
}

function dualnosc() {
  let b = '';
  b += T(62, 12, 'Regulator', { m: true, b: true });
  b += T(268, 12, 'Obserwator', { m: true, b: true });
  const rows = [['A', 'Aᵀ'], ['B', 'Cᵀ'], ['L', 'Lᵀ'], ['sterowalna (A, B)', 'obserwowalna (A, C)'], ['A − BL', 'Aᵀ − CᵀLᵀ']];
  rows.forEach(([l, r], i) => {
    const y = 22 + i * 34;
    b += box(0, y, 124, 26, [l], { k: i === 4 ? 'bxa' : 'bx', r: 5 });
    b += box(196, y, 144, 26, [r], { k: i === 4 ? 'bxa' : 'bx', r: 5 });
    b += T(160, y + 18, '↔', { m: true, b: true });
  });
  b += T(170, 206, 'ta sama alokacja biegunów, wynik transponujemy', { m: true, s: true });
  return svg(216, b, 'Dualność: obserwator projektuje się jak regulator dla pary transponowanej');
}

function separacja() {
  let b = '';
  b += box(0, 0, 160, 42, ['REGULATOR', 'n biegunów'], { k: 'bxa' });
  b += T(170, 26, '+', { m: true, b: true });
  b += box(180, 0, 160, 42, ['OBSERWATOR', 'n biegunów'], { k: 'bxa' });
  b += arrow([[80, 42], [80, 72]], { k: 'ln' });
  b += arrow([[260, 42], [260, 72]], { k: 'ln' });
  b += box(20, 72, 300, 44, ['UKŁAD rzędu 2n', 'bieguny = oba zbiory, bez nowych'], { k: 'bxg' });
  b += T(170, 134, 'macierz blokowo-trójkątna: bieguny to bloki na przekątnej', { m: true, s: true });
  return svg(144, b, 'Zasada separacji: bieguny układu z obserwatorem to suma biegunów regulatora i obserwatora');
}
module.exports = { funkcja, luenberger, dualnosc, separacja };
