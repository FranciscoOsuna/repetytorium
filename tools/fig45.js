const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, poly, pline, circle, svg } = L;
const X = z => 36 + z * 3.5, Y = z => 150 - z * 1.15;
module.exports = {
  front: () => {
    let b = line(36, 150, 320, 150, { k: 'ln' }) + line(36, 150, 36, 10, { k: 'ln' });
    b += T(320, 164, 'z₁ zysk', { s: true, e: true }) + T(40, 12, 'z₂ udział', { s: true });
    b += poly([[X(0), Y(0)], [X(60), Y(40)], [X(70), Y(70)], [X(60), Y(110)], [X(30), Y(90)]], 'bx');
    b += pline([[X(60), Y(110)], [X(70), Y(70)]], 'lna');
    [['0', 0, 0, -6, 12], ['A', 60, 110, -14, 4], ['B', 70, 70, 8, 4], ['C', 60, 40, 8, 10], ['D', 30, 90, -14, 4]].forEach(([n, a, c, dx, dy]) => { b += circle(X(a), Y(c), 4, n === 'A' || n === 'B' ? 'dotk' : 'dot') + T(X(a) + dx, Y(c) + dy, n, { s: true }); });
    b += T(300, 36, 'front', { s: true, a: true, m: true }) + T(300, 48, 'Pareto AB', { s: true, a: true, m: true });
    return svg(172, b, 'Przestrzeń celów: obraz zbioru dopuszczalnego i front Pareto na odcinku AB');
  },
  stozki: () => H.cols('Położenie względem z*', 'Znaczenie', [['lewy dolny stożek', 'lepsze (minimalizacja)'], ['prawy górny stożek', 'gorsze'], ['pozostałe pola', 'nieporównywalne']], { w1: 150, w2: 150, h: 40, label: 'Nierówność Pareto wokół punktu z*' }),
  podejscia: () => H.cols('Podejście', 'Preferencje i wynik', [['klasyczne', 'przed optymalizacją|jeden punkt frontu'], ['populacyjne', 'po optymalizacji|cały zbiór Pareto']], { w1: 100, w2: 200, h: 44, label: 'Klasyczne i populacyjne metody wielocelowe' }),
  eps: () => H.chainV(['jeden cel zostaje|funkcją celu', 'pozostałe: z_j ≥ ε_j|(ograniczenia twarde)', 'rozwiąż LP', 'zmień ε: kolejny|punkt frontu'], { hi: [1], w: 190, gap: 42, label: 'Metoda ε-ograniczeń' }),
  wazenie: () => H.chainV(['suma ważona|w₁z₁ + w₂z₂', 'rozwiąż LP|(maksymalizacja)', 'zmień wagi:|inny wierzchołek'], { hi: [0], w: 190, gap: 42, label: 'Metoda ważenia' }),
  porownanie: () => H.cols('ε-ograniczenia', 'Ważenie', [['progi ε dla celów', 'wagi ważności celów'], ['każdy punkt frontu', 'w LP: wierzchołki'], ['ryzyko: ε za duże', 'ryzyko: ten sam|wierzchołek']], { w1: 150, w2: 150, h: 44, label: 'Dwie metody skalaryzacji' }),
};
