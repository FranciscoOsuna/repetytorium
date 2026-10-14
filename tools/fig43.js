const L = require('./svg'); const H = require('./h');
const { T, box, arrow, rect, svg } = L;
module.exports = {
  madp: () => H.cols('MADP', 'MODP', [['opcje znane|z góry', 'opcje z|ograniczeń'], ['atrybuty|(też nie liczbowe)', 'mierzalne|funkcje celu'], ['wybór, ranking', 'kompromis']], { w1: 150, w2: 150, h: 42, label: 'Wieloatrybutowe (MADP) i wielocelowe (MODP)' }),
  grupy: () => H.tree('Metody MADP', ['pełna|agregacja|(AHP, SAW)', 'przewyższanie|(ELECTRE)', 'aspiracji|(TOPSIS,|VIKOR)'], { hi: [0], h: 72, label: 'Trzy grupy metod wieloatrybutowych' }),
  hierarchia: () => H.chainV(['cel|(np. kupić dom)', 'kryteria|(atrybuty)', 'opcje|(domy A, B, C)'], { hi: [1], w: 190, gap: 42, label: 'Hierarchia AHP: trzy poziomy' }),
  kroki: () => H.chainV(['1 hierarchia:|cel, kryteria, opcje', '2 porównania parami|(skala Saaty’ego)', '3 wagi|(średnie geometryczne)', '4 spójność|(CR < 0,1)', '5 synteza|(priorytety globalne)'], { hi: [1, 4], w: 200, gap: 42, label: 'Pięć kroków AHP' }),
  saaty: () => H.cols('Wartość', 'Znaczenie', [['1', 'i i j równie ważne'], ['3 / 5 / 7 / 9', 'słabo, istotnie,|wyraźnie, bezwzględnie'], ['2, 4, 6, 8', 'wartości pośrednie'], ['1/3, 1/5…', 'odwrotnie: j ważniejsze']], { w1: 100, w2: 200, h: 38, label: 'Skala Saaty’ego' }),
  wyniki: () => {
    const r = [['dom A', 0.396], ['dom B', 0.341], ['dom C', 0.263]]; let b = '';
    r.forEach(([n, v], i) => { b += T(0, 29 + i * 32, n, { s: true }); b += rect(60, 14 + i * 32, v * 560, 24, i === 0 ? 'bxa' : 'bx', 4); b += T(60 + v * 560 + 6, 30 + i * 32, v.toFixed(3).replace('.', ','), { s: true }); });
    b += T(170, 124, 'priorytety globalne: A wygrywa', { s: true, m: true });
    return svg(134, b, 'Priorytety globalne trzech domów w AHP');
  },
  electre: () => H.chainV(['znormalizuj,|zmień znak', 'zgodność|C(i,k) ≥ próg', 'niezgodność|D(i,k) ≤ próg', 'relacja|przewyższania', 'graf: O5|przewyższa 3 opcje'], { hi: [3], w: 200, gap: 42, label: 'Kroki ELECTRE I' }),
};
