const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, pline, circle, svg } = L;
module.exports = {
  kroki: () => H.chainV(['1 predykcja stanu', '2 predykcja niepewności P', '3 wzmocnienie K', '4 korekcja pomiarem', '5 aktualizacja P'], { hi: [], w: 190, gap: 36, loop: true, label: 'Ta sama pętla w KF i EKF' }),
  roznice: () => H.cols('Krok', 'KF → EKF', [['1, 4 (stan, pomiar)', 'macierze → funkcje f, h'], ['2, 3, 5 (P, K)', 'A, C → jakobiany F, H'], ['wynik', 'optymalny → przybliżony'], ['koszt', 'jakobian co krok']], { w1: 130, w2: 170, h: 38, label: 'Gdzie są różnice' }),
  styczna: () => {
    const X = h => 30 + h * 70, Y = v => 150 - v * 55;
    const pts = []; for (let i = 0; i <= 40; i++) { const h = 0.2 + i * 0.1; pts.push([X(h), Y(Math.sqrt(h))]); }
    let b = line(30, 150, 320, 150, { k: 'ln' }) + line(30, 150, 30, 10, { k: 'ln' }) + pline(pts, 'lnm');
    [[1, 'lna'], [3, 'lnb']].forEach(([h, k]) => { const f = Math.sqrt(h), s = 0.5 / f; const a = [X(h - 0.8), Y(f - 0.8 * s)], c = [X(h + 0.8), Y(f + 0.8 * s)]; b += line(a[0], a[1], c[0], c[1], { k }) + circle(X(h), Y(f), 4, 'dot'); });
    b += T(X(1), 164, 'estymata 1', { s: true, m: true }) + T(X(3), 164, 'estymata 2', { s: true, m: true });
    b += T(180, 28, 'styczna wędruje za estymatą', { s: true, m: true });
    return svg(176, b, 'Linearyzacja EKF: styczna do nieliniowej charakterystyki stawiana w bieżącej estymacie');
  },
  zast: () => H.cols('Zastosowanie', 'Przykład', [['obiekty nieliniowe', 'zbiorniki, silniki'], ['nawigacja', 'fuzja czujników'], ['estymacja parametrów', 'rozszerzenie stanu'], ['diagnostyka', 'zatkanie odpływu']], { w1: 150, w2: 150, h: 38, label: 'Zastosowania EKF' }),
};
