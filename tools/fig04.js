const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, cross, svg } = L;

// 1. Sieć statyczna: wejścia, warstwa ukryta, wyjście
function siec() {
  let b = '';
  const xi = 50, xh = 170, xo = 290;
  const yi = [70, 130], yh = [40, 80, 120, 160], yo = [100];
  yi.forEach(a => yh.forEach(h => { b += line(xi, a, xh, h, { k: 'lnm' }); }));
  yh.forEach(h => { b += line(xh, h, xo, 100, { k: 'lnm' }); });
  yi.forEach(a => { b += circle(xi, a, 10, 'bxn'); });
  yh.forEach(h => { b += circle(xh, h, 10, 'bx'); });
  b += circle(xo, 100, 10, 'bxa');
  b += T(xi, 190, 'wejścia', { m: true, s: true });
  b += T(xh, 190, 'warstwa ukryta', { m: true, s: true });
  b += T(xo, 190, 'wyjście', { m: true, s: true });
  b += T(xh, 14, 'tanh (nieliniowa)', { m: true, a: true, s: true });
  b += T(xo, 70, 'liniowe', { m: true, s: true });
  return svg(200, b, 'Sieć jednokierunkowa: wejścia, jedna warstwa ukryta z neuronami nieliniowymi i liniowe wyjście');
}

// 2. Miękkie stopnie: neurony ukryte i ich suma
function stopnie() {
  let b = '';
  const X = x => 24 + x * 34, Y = v => 112 - v * 50;
  const sg = z => 1 / (1 + Math.exp(-z));
  const ws = [[0.6, 2], [0.9, 4.5], [-0.7, 7]];
  const f = x => ws.reduce((s, [w, c]) => s + w * sg(3 * (x - c)), 0);
  b += line(20, Y(0), 334, Y(0), { k: 'ln' });
  b += line(24, 12, 24, 150, { k: 'ln' });
  ws.forEach(([w, c]) => {
    const pts = []; for (let x = 0; x <= 9; x += 0.15) pts.push([X(x), Y(w * sg(3 * (x - c)))]);
    b += pline(pts, 'lnm');
  });
  const pts = []; for (let x = 0; x <= 9; x += 0.1) pts.push([X(x), Y(f(x))]);
  b += pline(pts, 'lna');
  b += T(X(0.3), 150, 'cienkie linie: pojedyncze neurony (stopnie)', { s: true });
  b += T(120, 14, 'suma stopni = odpowiedź sieci', { a: true, b: true });
  b += TL(24, 172, [['wagi wejściowe: stromość, bias: położenie,', { s: true }], ['waga wyjściowa: wysokość stopnia', { s: true }]], {}, 12);
  return svg(196, b, 'Suma kilku miękkich stopni sigmoidalnych daje dowolnie ukształtowaną krzywą');
}

// 3. NNARX vs NNOE
function arxoe() {
  let b = '';
  const panel = (y0, title, oe) => {
    let s = T(0, y0 + 10, title, { b: true });
    s += T(2, y0 + 33, 'u', { b: true });
    s += arrow([[14, y0 + 42], [40, y0 + 42]], { k: 'ln' });
    s += box(40, y0 + 20, 100, 44, ['linie', 'opóźniające'], { k: 'bxn' });
    s += arrow([[140, y0 + 42], [190, y0 + 42]], { k: 'ln' });
    s += T(165, y0 + 36, 'φ(k)', { m: true, s: true });
    s += box(190, y0 + 20, 70, 44, ['sieć'], { k: 'bxa' });
    s += arrow([[260, y0 + 42], [296, y0 + 42]], { k: 'ln' });
    s += T(298, y0 + 46, 'ŷ(k)', { a: true });
    if (oe) {
      s += arrow([[278, y0 + 42], [278, y0 + 100], [90, y0 + 100], [90, y0 + 64]], { k: 'lna' });
      s += T(110, y0 + 116, 'ŷ: własne wyjście modelu (rekurencja)', { a: true, s: true });
    } else {
      s += arrow([[90, y0 + 100], [90, y0 + 64]], { k: 'lnm' });
      s += T(100, y0 + 104, 'y: pomiar z obiektu (bez rekurencji)', { s: true });
    }
    return s;
  };
  b += panel(0, 'NNARX: regresory wyjściowe z pomiarów', false);
  b += line(0, 128, 340, 128, { k: 'bxn' });
  b += panel(134, 'NNOE: regresory wyjściowe z własnych wyjść', true);
  return svg(134 + 126, b, 'NNARX bierze opóźnione wyjścia z pomiarów, NNOE z własnych wyjść modelu');
}

// 4. Elman i Jordan
function elmanjordan() {
  let b = '';
  const panel = (y0, title, jordan) => {
    let s = T(0, y0 + 10, title, { b: true });
    s += T(0, y0 + 44, 'u(k)', {});
    s += arrow([[30, y0 + 40], [100, y0 + 40]], { k: 'ln' });
    s += box(100, y0 + 22, 90, 36, ['warstwa', 'ukryta'], { k: 'bx' });
    s += arrow([[190, y0 + 40], [230, y0 + 40]], { k: 'ln' });
    s += box(230, y0 + 22, 70, 36, ['wyjście'], { k: 'bxn' });
    s += arrow([[300, y0 + 40], [334, y0 + 40]], { k: 'ln' });
    s += box(100, y0 + 84, 90, 28, ['kontekst'], { k: 'bxa' });
    s += arrow([[145, y0 + 84], [145, y0 + 58]], { k: 'lna' });
    if (jordan) {
      s += arrow([[265, y0 + 58], [265, y0 + 98], [190, y0 + 98]], { k: 'lna' });
      s += T(145, y0 + 128, 'pamięć = opóźnione wyjście sieci', { m: true, s: true });
    } else {
      s += arrow([[120, y0 + 58], [120, y0 + 84]], { k: 'lna' });
      s += T(145, y0 + 128, 'pamięć = opóźniony stan warstwy ukrytej', { m: true, s: true });
    }
    return s;
  };
  b += panel(0, 'Sieć Elmana', false);
  b += line(0, 140, 340, 140, { k: 'bxn' });
  b += panel(146, 'Sieć Jordana', true);
  return svg(146 + 136, b, 'Sieć Elmana kopiuje do kontekstu stan warstwy ukrytej, sieć Jordana kopiuje wyjście');
}

// 5. Propagacja wsteczna
function backprop() {
  let b = '';
  const xs = [0, 128, 256];
  b += T(0, 12, 'w przód: liczymy wyjście i błąd', { a: true, b: true });
  xs.forEach((x, i) => { b += box(x, 26, 84, 40, [`warstwa ${i + 1}`], { k: i === 2 ? 'bxa' : 'bx' }); });
  [0, 1].forEach(i => {
    b += arrow([[xs[i] + 84, 38], [xs[i + 1], 38]], { k: 'lna' });
    b += arrow([[xs[i + 1], 56], [xs[i] + 84, 56]], { k: 'lnb' });
  });
  b += T(0, 84, 'wstecz: sygnał błędu × waga × nachylenie aktywacji', { r: true, b: true });
  b += T(0, 108, 'gradient wagi = sygnał błędu, który do niej dotarł,', {});
  b += T(0, 122, 'razy sygnał wchodzący do tej wagi', {});
  b += T(0, 146, 'koszt: jedno przejście w przód + jedno wstecz,', { s: true });
  b += T(0, 159, 'niezależnie od liczby wag', { s: true });
  return svg(168, b, 'Propagacja wsteczna: sygnał idzie w przód, błąd wraca wstecz przez te same warstwy');
}

// 6. BPTT
function bptt() {
  let b = '';
  const xs = [20, 130, 240], names = ['sieć k−2', 'sieć k−1', 'sieć k'];
  xs.forEach((x, i) => {
    b += box(x, 44, 80, 40, [names[i]], { k: i === 2 ? 'bxa' : 'bx' });
    b += T(x + 40, 14, `u(${['k−2', 'k−1', 'k'][i]})`, { m: true, s: true });
    b += arrow([[x + 40, 20], [x + 40, 44]], { k: 'lnm' });
    b += arrow([[x + 40, 84], [x + 40, 102]], { k: 'lnm' });
  });
  b += arrow([[100, 64], [130, 64]], { k: 'lna' });
  b += arrow([[210, 64], [240, 64]], { k: 'lna' });
  b += T(115, 58, 'stan', { m: true, s: true, a: true });
  b += T(225, 58, 'stan', { m: true, s: true, a: true });
  b += arrow([[280, 124], [60, 124]], { k: 'lnb', dash: true });
  b += T(170, 142, 'gradient wraca przez czas', { m: true, r: true });
  b += T(170, 164, 'wspólne wagi: przyczynki z kopii się sumują', { m: true, s: true });
  return svg(172, b, 'Propagacja wsteczna w czasie: sieć rozwinięta w łańcuch kopii o wspólnych wagach');
}

// 7. Krajobraz kryterium
function krajobraz() {
  let b = '';
  const c = x => 1 - 0.5 * Math.exp(-(((x - 100) / 36) ** 2)) - 0.95 * Math.exp(-(((x - 245) / 34) ** 2)) - 0.0008 * (x - 20);
  const Y = x => 150 - 105 * c(x);
  const P = (a, bb) => { const r = []; for (let x = a; x <= bb; x += 2) r.push([x, Y(x)]); return r; };
  b += line(20, 160, 334, 160, { k: 'ln' });
  b += T(334, 176, 'wagi', { e: true, s: true });
  b += T(8, 14, 'J', { b: true });
  b += pline(P(20, 330), 'ln');
  const xl = 100, xg = 245;
  b += arrow(P(48, xl - 2), { k: 'lnb' });
  b += arrow(P(185, xg - 2), { k: 'lng' });
  b += circle(48, Y(48), 4, 'dotk'); b += T(48, Y(48) - 8, 'start 1', { m: true, s: true });
  b += circle(185, Y(185), 4, 'dotk'); b += T(185, Y(185) - 8, 'start 2', { m: true, s: true });
  b += circle(xl, Y(xl), 4, 'dot'); b += T(xl, Y(xl) + 16, 'minimum lokalne', { m: true, r: true });
  b += circle(xg, Y(xg), 4, 'dot'); b += T(xg, Y(xg) + 16, 'minimum globalne', { m: true, g: true });
  return svg(184, b, 'Kryterium uczenia sieci ma wiele dolin, wynik zależy od punktu startu');
}

module.exports = { siec, stopnie, arxoe, elmanjordan, backprop, bptt, krajobraz };
