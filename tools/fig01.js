const L = require('./svg');
const { T, TL, box, arrow, line, rect, svg } = L;

// 1. Oś white → gray → black (cztery sytuacje informacyjne)
function os() {
  const rows = [
    ['white-box', 'bxn', ['prawa i parametry', 'znane'], ['równania różniczk.', 'model stanu']],
    ['gray-box', 'bx', ['prawa znane,', 'brak parametrów'], ['identyfikacja', 'parametrów']],
    ['gray-box', 'bx', ['znane reguły,', 'brak struktury'], ['modele rozmyte i', 'neuronowo-rozmyte']],
    ['black-box', 'bxa', ['założona struktura,', 'mierzalne sygnały'], ['transmitancje, ARX,', 'sieci neuronowe']],
  ];
  let b = '';
  b += T(31, 12, 'technologia', { s: true, al: 'm', m: true });
  b += T(132, 12, 'co wiemy', { s: true, m: true });
  b += T(272, 12, 'typowy model', { s: true, m: true });
  const y0 = 22, h = 46, st = 54;
  rows.forEach((r, i) => {
    const y = y0 + i * st;
    b += box(0, y, 62, h, [r[0]], { k: r[1], tag: r[0] });
    b += box(70, y, 128, h, r[2], { k: 'bxn' });
    b += box(206, y, 134, h, r[3], { k: 'bxn' });
    if (i < 3) b += arrow([[31, y + h], [31, y + st]], { k: 'lnm' });
  });
  const H = y0 + 4 * st - 6;
  return svg(H, b, 'Oś od white-box do black-box: cztery sytuacje informacyjne');
}

// 2. Dwie ścieżki modelowania i powiązania między nimi
function sciezki() {
  let b = '';
  b += box(60, 0, 220, 30, ['Wiedza aprioryczna o systemie'], { k: 'bxa' });
  b += arrow([[75, 30], [75, 42]], { k: 'lnm' });
  b += arrow([[265, 30], [265, 42]], { k: 'lnm' });
  b += T(75, 56, 'ścieżka z wiedzy', { a: true, m: true, b: true });
  b += T(265, 56, 'ścieżka z danych', { a: true, m: true, b: true });
  const lx = 0, rx = 190, w = 150, h = 40, ys = [68, 124, 180, 236];
  const left = [['Prawa i bilanse', '(równania równowagi)'], ['Model fenomenologiczny', 'struktura + parametry'], ['Upraszczanie modelu', '(linearyzacja, redukcja)'], ['Uproszczony model', 'struktura + parametry']];
  const right = [['Założona struktura', '(rząd, opóźnienie)'], ['Eksperyment', 'plan wejść, pomiary'], ['Identyfikacja', 'estymacja parametrów'], ['Model behawioralny', 'parametry (+ struktura)']];
  ys.forEach((y, i) => {
    b += box(lx, y, w, h, [left[i][0], [left[i][1], { s: true }]], { k: 'bx' });
    b += box(rx, y, w, h, [right[i][0], [right[i][1], { s: true }]], { k: 'bx' });
    if (i < 3) {
      b += arrow([[lx + w / 2, y + h], [lx + w / 2, ys[i + 1]]], { k: 'ln' });
      b += arrow([[rx + w / 2, y + h], [rx + w / 2, ys[i + 1]]], { k: 'ln' });
    }
  });
  // powiązania (kreskowane, akcent)
  b += arrow([[lx + w, ys[0] + 20], [rx, ys[0] + 20]], { k: 'lna', dash: true });
  b += T(170, ys[0] + 14, 'A', { a: true, m: true, b: true });
  b += arrow([[rx, ys[2] + 30], [lx + w, ys[3] + 12]], { k: 'lna', dash: true });
  b += T(170, ys[2] + 38, 'B', { a: true, m: true, b: true });
  // porównanie
  const yb = 294;
  b += arrow([[lx + w / 2, ys[3] + h], [105, yb]], { k: 'ln' });
  b += arrow([[rx + w / 2, ys[3] + h], [235, yb]], { k: 'ln' });
  b += box(40, yb, 260, 30, ['Porównanie z systemem → model wynikowy'], { k: 'bxa' });
  return svg(yb + 30, b, 'Dwie ścieżki modelowania, fenomenologiczna i behawioralna, oraz powiązania między nimi');
}

// 3. Siedem etapów modelowania matematycznego
function etapy() {
  const names = ['Cele i założenia', 'Baza wiedzy i baza danych', 'Wybór kategorii modelu', 'Struktura: budowa modelu', 'Identyfikacja modelu', 'Algorytmizacja obliczeń', 'Weryfikacja modelu'];
  let b = '';
  const x = 24, w = 196, h = 28, st = 38;
  names.forEach((t, i) => {
    const y = i * st;
    b += rect(0, y + 4, 22, 20, i === 6 ? 'bxa' : 'bx', 6);
    b += T(11, y + 18, String(i + 1), { m: true, b: true });
    b += box(x, y, w, h, [t], { k: i === 6 ? 'bxa' : 'bx' });
    if (i < 6) b += arrow([[x + w / 2, y + h], [x + w / 2, y + st]], { k: 'ln' });
  });
  // nawroty: jedna pętla z trzema wejściami (struktura, kategoria, cele)
  const y7 = 6 * st + 14, yy = [3 * st + 14, 2 * st + 14, 14];
  b += line(x + w + 14, y7, x + w + 14, yy[2], { k: 'lnb', dash: true });
  b += line(x + w, y7, x + w + 14, y7, { k: 'lnb', dash: true });
  yy.forEach(y => { b += arrow([[x + w + 14, y], [x + w, y]], { k: 'lnb', dash: true }); });
  b += TL(x + w + 24, 3 * st - 14, [['weryfikacja cofa', { s: true }], ['do struktury,', { s: true }], ['kategorii lub', { s: true }], ['celów', { s: true }]], {}, 12);
  b += arrow([[x + w / 2, 6 * st + h], [x + w / 2, 6 * st + 54]], { k: 'lng' });
  b += T(x + w / 2, 6 * st + 66, 'model zweryfikowany: zastosowanie', { g: true, m: true });
  return svg(6 * st + 74, b, 'Siedem etapów modelowania matematycznego i nawroty');
}

// 4. Porządek wyprowadzania równań modelu z wiedzy
function rownania() {
  let b = '';
  b += box(0, 0, 162, 52, ['1 · zmienne przepływu', ['prąd, natężenie, siła', { s: true }], ['strumień ciepła', { s: true }]], { k: 'bxa' });
  b += box(178, 0, 162, 52, ['1 · zmienne naporu', ['napięcie, ciśnienie', { s: true }], ['różnica temperatur', { s: true }]], { k: 'bxa' });
  b += arrow([[81, 52], [81, 90]], { k: 'ln' });
  b += arrow([[259, 52], [259, 90]], { k: 'ln' });
  b += box(0, 90, 162, 58, ['2 · równania równowagi', ['(bilansu) między', { s: true }], ['zm. przepływu', { s: true }], ], { k: 'bx' });
  b += box(178, 90, 162, 58, ['2 · równania spójności', ['między zmiennymi', { s: true }], ['naporu', { s: true }]], { k: 'bx' });
  b += arrow([[81, 148], [120, 184]], { k: 'ln' });
  b += arrow([[259, 148], [220, 184]], { k: 'ln' });
  b += box(40, 184, 260, 44, ['3 · zależności wiążące elementu', ['łączą przepływ i napór, wnoszą', { s: true }], ['parametry fizykalne', { s: true }]], { k: 'bxg' });
  b += arrow([[170, 228], [170, 250]], { k: 'ln' });
  b += box(40, 250, 260, 30, ['układ równań → model (po eliminacji)'], { k: 'bxa' });
  return svg(280, b, 'Porządek wyprowadzania równań modelu fenomenologicznego');
}

// 5. Sekwencja identyfikacji z pętlą powrotu
function identyfikacja() {
  const steps = [
    ['Cel, zasoby i wiedza aprioryczna', 'bxa'],
    ['Planowanie pomiarów', 'bx'],
    ['Eksperyment i zebranie danych', 'bx'],
    ['Sprawdzenie i przetwarzanie danych', 'bx'],
    ['Założenie struktury modelu', 'bx'],
    ['Estymacja parametrów: min J(p)', 'bx'],
    ['Weryfikacja modelu', 'bxa'],
  ];
  let b = '';
  const x = 0, w = 228, h = 28, st = 38;
  steps.forEach(([t, k], i) => {
    const y = i * st;
    b += box(x, y, w, h, [t], { k });
    if (i < 6) b += arrow([[x + w / 2, y + h], [x + w / 2, y + st]], { k: 'ln' });
  });
  const yv = 6 * st + 14;
  b += arrow([[x + w, yv], [310, yv], [310, st + 14], [x + w, st + 14]], { k: 'lnb', dash: true });
  b += T(314, yv - 8, 'NIE', { r: true, b: true });
  b += TL(236, 4 * st + 6, [['powrót do', { s: true }], ['pomiarów,', { s: true }], ['danych lub', { s: true }], ['struktury', { s: true }]], {}, 12);
  b += arrow([[x + w / 2, 6 * st + h], [x + w / 2, 6 * st + 54]], { k: 'lng' });
  b += T(x + w / 2 + 8, 6 * st + 46, 'TAK', { g: true, b: true });
  b += box(36, 6 * st + 54, 160, 28, ['model wynikowy'], { k: 'bxg' });
  return svg(6 * st + 84, b, 'Sekwencja identyfikacji z pętlą powrotu po negatywnej weryfikacji');
}

// 6. Weryfikacja pragmatyczna
function weryfikacja() {
  let b = '';
  b += box(0, 64, 70, 40, ['wielkości', 'wejściowe'], { k: 'bx' });
  b += arrow([[70, 74], [100, 50]], { k: 'ln' });
  b += arrow([[70, 94], [100, 128]], { k: 'ln' });
  b += T(150, 12, 'zakłócenia', { s: true, m: true });
  b += arrow([[150, 16], [150, 26]], { k: 'lnm' });
  b += box(100, 26, 100, 44, ['SYSTEM', ['obiekt rzeczywisty', { s: true }]], { k: 'bxn' });
  b += box(100, 106, 100, 44, ['MODEL', ['reprezentacja', { s: true }]], { k: 'bxa' });
  b += arrow([[150, 172], [150, 150]], { k: 'lnm' });
  b += T(150, 184, 'model zakłóceń', { s: true, m: true });
  b += arrow([[200, 50], [236, 74]], { k: 'ln' });
  b += arrow([[200, 128], [236, 104]], { k: 'ln' });
  b += T(214, 54, 'y', { s: true });
  b += T(214, 124, 'ŷ', { s: true });
  b += box(236, 60, 104, 58, ['porównanie:', ['testy zgodności', { s: true }], ['wrażliwość', { s: true }]], { k: 'bxg' });
  return svg(192, b, 'Weryfikacja pragmatyczna: te same wejścia do systemu i modelu, porównanie wyjść');
}

module.exports = { os, sciezki, etapy, rownania, identyfikacja, weryfikacja };
