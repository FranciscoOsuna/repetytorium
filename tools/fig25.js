const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  grupy: () => {
    let b = '';
    ['inicjowanie', 'planowanie', 'realizacja', 'zamykanie'].forEach((t, i) => {
      b += box(10, i * 46, 150, 32, [t], { k: i === 1 || i === 2 ? 'bx' : 'bx' });
      if (i < 3) b += arrow([[85, i * 46 + 32], [85, (i + 1) * 46]], { k: 'ln' });
    });
    b += box(190, 40, 150, 78, ['monitorowanie', 'i kontrola', '(pętla przez cały', 'projekt)'], { k: 'bxa' });
    b += arrow([[190, 60], [160, 62]], { k: 'lna' }) + arrow([[190, 100], [160, 108]], { k: 'lna' });
    b += arrow([[190, 58], [190, 58]], { k: 'lna' });
    return svg(172, b, 'Pięć grup procesów: cztery po kolei i monitorowanie przez cały projekt');
  },
  trojkat: () => {
    let b = poly([[170, 12], [30, 140], [310, 140]], 'bx');
    b += T(170, 36, 'zakres', { m: true, b: true }) + T(60, 158, 'czas', { m: true, b: true }) + T(280, 158, 'koszt', { m: true, b: true });
    b += T(170, 110, 'jakość', { m: true, a: true, b: true });
    return svg(168, b, 'Trójkąt ograniczeń: zakres, czas i koszt, pośrodku jakość');
  },
  siec: () => {
    const w = 44, g = 12, X = c => c * (w + g);
    const pos = { A: [0, 40], B: [1, 8], C: [1, 72], D: [2, 8], E: [2, 72], F: [3, 40], G: [4, 40], H: [5, 40] };
    const t = { A: 3, B: 4, C: 6, D: 5, E: 4, F: 2, G: 2, H: 1 };
    const crit = new Set(['A', 'B', 'D', 'F', 'G', 'H']);
    const ed = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'E'], ['C', 'F'], ['D', 'F'], ['E', 'G'], ['F', 'G'], ['G', 'H']];
    let b = '';
    ed.forEach(([a, c]) => { const [ca, ya] = pos[a], [cc, yc] = pos[c]; b += arrow([[X(ca) + w, ya + 16], [X(cc), yc + 16]], { k: crit.has(a) && crit.has(c) ? 'lnb' : 'lnm' }); });
    Object.entries(pos).forEach(([n, [c, y]]) => { b += box(X(c), y, w, 32, [n + ' · ' + t[n]], { k: crit.has(n) ? 'bxa' : 'bx' }); });
    b += T(170, 128, 'czasy w tygodniach, ścieżka krytyczna A–B–D–F–G–H', { s: true, m: true });
    return svg(138, b, 'Sieć zadań projektu ze ścieżką krytyczną A–B–D–F–G–H');
  },
  evm: () => {
    const rows = [['PV', 123, 'bx'], ['EV', 106, 'bxa'], ['AC', 118, 'bx']]; let b = '';
    rows.forEach(([n, v, k], i) => { b += T(0, 29 + i * 32, n, { s: true, b: true }); b += rect(40, 14 + i * 32, v * 1.6, 22, k, 4); b += T(40 + v * 1.6 + 6, 29 + i * 32, v + ' tys. zł', { s: true }); });
    b += T(170, 118, 'SPI = 106/123 ≈ 0,86   CPI = 106/118 ≈ 0,90', { s: true, m: true });
    return svg(128, b, 'Wartość planowana, wypracowana i koszt rzeczywisty w 10. tygodniu');
  },
  ryzyko: () => H.tree('Reakcje na ryzyko', ['unikanie|plan bez|ryzyka', 'przenie-|sienie|na innych', 'ograni-|czenie|skutku', 'akcepta-|cja|z rezerwą'], { h: 64, label: 'Cztery reakcje na ryzyko' }),
};
