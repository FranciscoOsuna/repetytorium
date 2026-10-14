const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, cross, svg } = L;

// 1. Sterowalność i obserwowalność: dwa pytania o ten sam obiekt
function sterobs() {
  let b = '';
  b += T(0, 66, 'u', { b: true });
  b += arrow([[14, 62], [112, 62]], { k: 'ln' });
  b += box(112, 34, 116, 56, ['stan x', ['wnętrze obiektu', { s: true }]], { k: 'bxn' });
  b += arrow([[228, 62], [322, 62]], { k: 'ln' });
  b += T(328, 66, 'y', { b: true });
  b += TL(63, 28, ['sterowalność', ['para (A, B)', { s: true }]], { m: true, a: true }, 12);
  b += TL(275, 28, ['obserwowalność', ['para (A, C)', { s: true }]], { m: true, a: true }, 12);
  b += TL(63, 112, [['czy wejście dosięga', { s: true }], ['każdego kierunku stanu?', { s: true }]], { m: true }, 13);
  b += TL(275, 112, [['czy wyjście niesie', { s: true }], ['informację o stanie?', { s: true }]], { m: true }, 13);
  return svg(134, b, 'Sterowalność dotyczy drogi od wejścia do stanu, obserwowalność drogi od stanu do wyjścia');
}

// 2. Macierze kryterium Kalmana
function macierze() {
  let b = '';
  b += T(0, 12, 'macierz sterowalności (bloki obok siebie)', { b: true });
  const cells = ['B', 'AB', 'A²B', '…', 'Aⁿ⁻¹B'];
  cells.forEach((t, i) => { b += box(i * 68, 22, 64, 34, [t], { k: i === 3 ? 'bxn' : 'bx' }); });
  b += T(0, 76, 'rząd = n  ⇒  sterowalny', { a: true, b: true });
  b += T(0, 112, 'macierz obserwowalności (bloki jeden pod drugim)', { b: true });
  const rows = ['C', 'CA', 'CA²', '…', 'CAⁿ⁻¹'];
  rows.forEach((t, i) => { b += box(0, 122 + i * 26, 92, 24, [t], { k: i === 3 ? 'bxn' : 'bx', r: 5 }); });
  b += TL(112, 160, [['n kolumn, tyle bloków', { s: true }], ['ile zmiennych stanu', { s: true }]], {}, 13);
  b += T(112, 202, 'rząd = n  ⇒  obserwowalny', { a: true, b: true });
  return svg(256, b, 'Macierz sterowalności składa się z bloków B, AB, A²B…; macierz obserwowalności z bloków C, CA, CA²…');
}

// 3. Rozkład Kalmana
function kalman4() {
  let b = '';
  b += T(2, 36, 'u', { b: true });
  b += arrow([[14, 40], [30, 40]], { k: 'ln' });
  b += box(30, 18, 112, 44, ['sterowalna', 'nieobserwowalna'], { k: 'bx' });
  b += box(158, 18, 112, 44, ['sterowalna', 'obserwowalna'], { k: 'bxa' });
  b += arrow([[142, 40], [158, 40]], { k: 'ln' });
  b += box(30, 100, 112, 44, ['niesterowalna', 'nieobserwowalna'], { k: 'bxn' });
  b += box(158, 100, 112, 44, ['niesterowalna', 'obserwowalna'], { k: 'bx' });
  b += arrow([[142, 122], [158, 122]], { k: 'ln' });
  b += arrow([[270, 40], [298, 40], [298, 72]], { k: 'ln' });
  b += arrow([[270, 122], [298, 122], [298, 90]], { k: 'ln' });
  b += circle(298, 81, 9, 'bx');
  b += T(298, 85, 'Σ', { m: true, s: true });
  b += arrow([[307, 81], [326, 81]], { k: 'ln' });
  b += T(330, 85, 'y', { b: true });
  b += T(214, 12, 'tylko to widzi transmitancja', { m: true, a: true, s: true });
  b += T(86, 164, 'u nie dochodzi do dolnego rzędu', { m: true, s: true });
  b += T(150, 178, 'obserwowalna = widać ją na y', { m: true, s: true });
  return svg(188, b, 'Rozkład Kalmana: cztery części stanu, transmitancja opisuje tylko część sterowalną i obserwowalną');
}

// 4. Alokacja biegunów na płaszczyźnie zespolonej
function bieguny() {
  let b = '';
  const X = r => 300 + r * 26, Y = i => 80 - i * 22;
  b += line(20, 80, 334, 80, { k: 'ln' });
  b += line(300, 8, 300, 152, { k: 'ln' });
  b += T(330, 94, 'Re', { e: true, s: true });
  b += T(308, 14, 'Im', { s: true });
  b += rect(X(0) + 1, 8, 36, 144, 'fl', 0);
  // przed
  const before = [[0.5, 2], [0.5, -2]];
  const after = [[-4, 2], [-4, -2]];
  before.forEach(([r, i]) => { b += cross(X(r), Y(i), 5, 'lnm'); });
  before.forEach(([r, i], k) => { b += arrow([[X(r) - (r > 0 ? 6 : 6), Y(i)], [X(after[k][0]) + 7, Y(after[k][1])]], { k: 'lnm', dash: true }); });
  after.forEach(([r, i]) => { b += cross(X(r), Y(i), 5, 'lna'); });
  b += cross(X(-2), Y(0), 5, 'lnb');
  b += T(X(-2), Y(0) - 10, 'stały', { m: true, r: true, s: true });
  b += cross(14, 172, 4, 'lnm'); b += T(26, 176, 'bieguny obiektu', { s: true });
  b += cross(14, 188, 4, 'lna'); b += T(26, 192, 'po sprzężeniu od stanu (dowolnie, gdy sterowalny)', { s: true });
  b += cross(14, 204, 4, 'lnb'); b += T(26, 208, 'mod niesterowalny: K go nie rusza', { s: true });
  return svg(216, b, 'Sprzężenie od stanu przesuwa bieguny sterowalne, biegun niesterowalny zostaje na miejscu');
}

// 5. Obserwator Luenbergera
function obserwator() {
  let b = '';
  b += T(0, 36, 'u', { b: true });
  b += arrow([[12, 40], [24, 40], [24, 142], [40, 142]], { k: 'ln' });
  b += arrow([[24, 40], [40, 40]], { k: 'ln' });
  b += box(40, 20, 170, 40, ['OBIEKT', ['(A, B, C)', { s: true }]], { k: 'bxn' });
  b += box(40, 112, 170, 60, ['OBSERWATOR', ['kopia modelu (A, B, C)', { s: true }], ['+ korekta L · (y − ŷ)', { s: true }]], { k: 'bxa' });
  b += arrow([[210, 40], [300, 40]], { k: 'ln' });
  b += T(306, 44, 'y', { b: true });
  b += arrow([[250, 40], [250, 126], [210, 126]], { k: 'lnm' });
  b += arrow([[210, 158], [300, 158]], { k: 'ln' });
  b += T(306, 162, 'x̂', { a: true, b: true });
  b += box(20, 196, 300, 40, ['błąd e = x − x̂ spełnia ė = (A − LC) e'], { k: 'bxg' });
  b += T(170, 254, 'nie zależy od u ani od stanu obiektu', { m: true, s: true });
  return svg(262, b, 'Obserwator Luenbergera: kopia modelu z korektą z błędu wyjścia, błąd estymacji ma własną dynamikę');
}

// 6. Zasada separacji
function separacja() {
  let b = '';
  b += box(0, 100, 70, 40, ['−K'], { k: 'bx' });
  b += box(130, 20, 100, 40, ['OBIEKT'], { k: 'bxn' });
  b += box(130, 100, 100, 40, ['OBSERWATOR'], { k: 'bxa' });
  b += arrow([[35, 100], [35, 40], [130, 40]], { k: 'ln' });
  b += T(82, 34, 'u', { b: true });
  b += arrow([[82, 40], [82, 112], [130, 112]], { k: 'lnm' });
  b += arrow([[130, 130], [70, 130]], { k: 'lna' });
  b += T(100, 124, 'x̂', { m: true, a: true, b: true });
  b += arrow([[230, 40], [300, 40]], { k: 'ln' });
  b += T(306, 44, 'y', { b: true });
  b += arrow([[262, 40], [262, 120], [230, 120]], { k: 'lnm' });
  b += box(0, 168, 340, 64, ['widmo układu zamkniętego =', 'bieguny (A − BK)  ∪  bieguny (A − LC)', ['K i L projektuje się osobno', { s: true }]], { k: 'bxg' });
  return svg(240, b, 'Zasada separacji: prawo sterowania dostaje estymatę stanu z obserwatora, bieguny obu projektów się sumują');
}

// 7. Szybkość obserwatora względem regulatora
function szybkosc() {
  let b = '';
  const X = r => 330 + r * 20;
  b += line(10, 60, 334, 60, { k: 'ln' });
  b += rect(X(-20), 36, X(-6) - X(-20), 48, 'fl', 4);
  b += cross(X(-2), 60, 6, 'lna');
  b += cross(X(-8), 60, 6, 'ln');
  b += T(X(-2), 104, 'regulator', { m: true, a: true, b: true });
  b += T(X(-8), 104, 'obserwator', { m: true, b: true });
  b += T(X(-13), 30, '3–10 razy szybciej', { m: true, s: true });
  b += arrow([[200, 128], [30, 128]], { k: 'lnm' });
  b += T(115, 146, 'dalej w lewo: szybsza estymata,', { m: true, s: true });
  b += T(115, 159, 'ale więcej szumu i większy skok błędu', { m: true, s: true });
  return svg(168, b, 'Bieguny obserwatora ustawia się zwykle 3–10 razy szybciej niż bieguny regulatora');
}

module.exports = { sterobs, macierze, kalman4, bieguny, obserwator, separacja, szybkosc };
