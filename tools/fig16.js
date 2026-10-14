const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  neuron: () => {
    let b = '';
    [['x₁', 'w₁', 20], ['x₂', 'w₂', 70], ['x₃', 'w₃', 120]].forEach(([x, w, y]) => {
      b += T(8, y + 4, x, { s: true });
      b += arrow([[26, y], [112, 70]], { k: 'ln' });
      b += T(60, y + (70 - y) * 0.35 - 4, w, { s: true, a: true });
    });
    b += circle(130, 70, 18, 'bx'); b += T(130, 75, 'Σ', { m: true, b: true });
    b += T(130, 104, '+ bias b', { m: true, s: true });
    b += arrow([[148, 70], [190, 70]], { k: 'ln' });
    b += box(190, 52, 60, 36, ['f(·)'], { k: 'bxa' });
    b += T(220, 104, 'nieliniowa', { m: true, s: true, a: true });
    b += arrow([[250, 70], [320, 70]], { k: 'ln' }); b += T(318, 62, 'y', { e: true, b: true });
    return svg(140, b, 'Neuron: suma ważona wejść plus bias, potem nieliniowa funkcja aktywacji');
  },
  struktury: () => H.tree('Struktury sieci neuronowych', ['MLP|jednokier.|statyczna', 'RBF|radialna|lokalna', 'rekurenc.|ma stan', 'Kohonen|neurony|rywalizują'], { h: 64, label: 'Cztery struktury sieci neuronowych' }),
  paradygmaty: () => H.tree('Co sieć dostaje przy uczeniu', ['z nauczycielem|pary wejście–|wzorzec', 'bez nauczyciela|same dane,|struktura', 'ze wzmocnieniem|ocena|skutku'], { hi: [0], h: 64, note: ['w automatyce i identyfikacji zwykle pierwszy przypadek'], label: 'Trzy paradygmaty uczenia' }),
  petla: () => H.chainV(['inicjalizacja wag', 'przejście w przód|(wyjście i błąd)', 'propagacja wsteczna|(gradient)', 'poprawka wag|(algorytm uczenia)', 'błąd przestał maleć?'], { hi: [2, 3], loop: true, w: 190, gap: 48, h2: 1, note: ['propagacja', 'to sposób', 'liczenia', 'gradientu,', 'nie algorytm', 'uczenia'], noteY: 70, label: 'Pętla uczenia z nauczycielem' }),
  podzial: () => {
    let b = rect(0, 10, 238, 34, 'bxa', 6) + rect(238, 10, 51, 34, 'bx', 6) + rect(289, 10, 51, 34, 'bxn', 6);
    b += T(119, 31, 'uczący 70%', { m: true }) + T(263, 31, '15%', { m: true, s: true }) + T(315, 31, '15%', { m: true, s: true });
    b += T(119, 62, 'liczy gradient, poprawia wagi', { m: true, s: true });
    b += T(263, 62, 'walidacyjny', { m: true, s: true });
    b += T(263, 75, 'decyzje o modelu', { m: true, s: true });
    b += T(310, 90, 'testowy: raz,', { m: true, s: true }) + T(310, 103, 'na końcu', { m: true, s: true });
    return svg(112, b, 'Podział danych na uczący, walidacyjny i testowy');
  },
  przeuczenie: () => {
    const X = t => 30 + t * 290, Y = v => 150 - v * 120;
    let b = line(30, 150, 330, 150, { k: 'ln' }) + line(30, 150, 30, 14, { k: 'ln' });
    const tr = [], va = [];
    for (let i = 0; i <= 60; i++) { const t = i / 60; tr.push([X(t), Y(0.95 * Math.exp(-4.5 * t) + 0.01)]); va.push([X(t), Y(0.3 * Math.exp(-7 * t) + 0.1 + 0.55 * t * t)]); }
    b += pline(tr, 'lng') + pline(va, 'lnb');
    let tm = 0, best = 9; for (let i = 0; i <= 600; i++) { const t = i / 600, v = 0.3 * Math.exp(-7 * t) + 0.1 + 0.55 * t * t; if (v < best) { best = v; tm = t; } }
    b += line(X(tm), 18, X(tm), 150, { k: 'lna', dash: true }); b += circle(X(tm), Y(best), 4, 'dot');
    b += T(X(tm), 12, 'stop', { m: true, a: true, s: true });
    b += T(318, 164, 'iteracje', { e: true, s: true });
    b += T(250, Y(0.95 * Math.exp(-4.5 * 0.8) + 0.01) - 10, 'uczący', { g: true, s: true }) + T(250, Y(0.3 * Math.exp(-7 * 0.8) + 0.1 + 0.55 * 0.64) - 6, 'walidacyjny', { r: true, s: true });
    return svg(176, b, 'Przeuczenie: błąd uczący maleje, a walidacyjny po minimum rośnie');
  },
};
