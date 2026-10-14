const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  ulica: () => {
    const X = x => 30 + (x + 1.5) * 30, Y = y => 172 - (y + 1.5) * 30;
    let b = '';
    const ln = (c, k, d) => { const x0 = Math.max(-1.5, c - 4.5); return line(X(x0), Y(c - x0), X(c + 1.5), Y(-1.5), { k, dash: d }); };
    b += ln(0, 'lnm', true) + ln(4, 'lnm', true) + ln(2, 'lna', false);
    [[2, 2], [3, 2], [2, 4], [4, 3]].forEach(([x, y]) => { b += circle(X(x), Y(y), 5, 'dot'); });
    [[0, 0], [-1, 0], [0, -1], [-1, -1]].forEach(([x, y]) => { b += circle(X(x), Y(y), 5, 'dotk'); });
    b += circle(X(2), Y(2), 10, 'bx') + circle(X(0), Y(0), 10, 'bx');
    b += circle(238, 20, 5, 'dot') + T(248, 24, 'klasa +1', { s: true }) + circle(238, 38, 5, 'dotk') + T(248, 42, 'klasa −1', { s: true });
    b += T(236, 70, 'kółka: wektory', { s: true, a: true }) + T(236, 83, 'nośne', { s: true, a: true });
    b += T(236, 108, 'granica w środku', { s: true, a: true }) + T(236, 121, 'ulicy', { s: true, a: true });
    return svg(186, b, 'Najszersza ulica między klasami z wektorami nośnymi na krawężnikach');
  },
  jadro: () => {
    const X = x => 170 + x * 55, Y = y => 128 - y * 26;
    let b = line(20, 128, 320, 128, { k: 'ln' }) + line(170, 128, 170, 14, { k: 'ln' });
    const p = []; for (let i = -25; i <= 25; i++) { const x = i / 10; p.push([X(x), Y(x * x)]); }
    b += pline(p, 'lnm');
    [-2, -1.6, 1.6, 2].forEach(x => { b += circle(X(x), Y(x * x), 5, 'dotk'); });
    [-0.6, 0, 0.6].forEach(x => { b += circle(X(x), Y(x * x), 5, 'dot'); });
    b += line(20, Y(1.1), 320, Y(1.1), { k: 'lna', dash: true });
    b += T(170, 150, 'x', { s: true, m: true }) + T(176, 20, 'x²', { s: true });
    b += T(250, Y(1.1) - 6, 'prosta w nowej przestrzeni', { s: true, m: true, a: true });
    b += T(170, 166, 'w przestrzeni wejść: dwa progi', { s: true, m: true });
    return svg(176, b, 'Po dopisaniu współrzędnej x kwadrat klasy rozdziela pozioma prosta');
  },
  diagnostyka: () => H.chainH(['pomiary', 'cechy', 'SVM|klasyf.', 'klasa|stanu'], { hi: [2], h: 46, note: ['PCA wykrywa odstępstwo od normy,', 'SVM nazywa awarię, którą widziała w danych'], label: 'Miejsce SVM w diagnostyce jako rozpoznawaniu wzorców' }),
  fazy: () => H.chainH(['dane', 'model', 'uczenie', 'użycie'], { h: 40, note: ['dane: skalowanie. model: jądro, C, σ. uczenie: walidacja', 'krzyżowa. Błąd: dobór C i σ albo ocena na złych danych'], label: 'Cztery fazy budowy klasyfikatora SVM' }),
};
