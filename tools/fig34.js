const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  kaskada: () => H.chainV(['optymalizacja technologiczna|(minuty)', 'stacja MPC|(co 1 s)', 'pętla PID w sterowniku|(co 0,1 s)', 'obiekt'], { hi: [1], w: 230, gap: 46, note: ['OPC UA'], noteY: 78, label: 'Kaskada: MPC zadaje wartości zadane pętlom PID' }),
  probka: () => H.chainV(['odczyt i walidacja danych', 'estymacja stanu|i zakłócenia', 'rozwiązanie zadania QP', 'zapis pierwszego kroku|(wartości zadane)', 'rejestracja planu|i zapas czasu'], { hi: [2], w: 220, gap: 44, label: 'Jedna próbka regulatora predykcyjnego w systemie' }),
  zaklocenie: () => {
    const rows = [['kaskada', 0.018, 'bxa'], ['MPC wprost', 0.127, 'bx']]; let b = '';
    rows.forEach(([n, v, k], i) => { b += T(0, 29 + i * 34, n, { s: true }); b += rect(90, 14 + i * 34, v * 1700, 22, k, 4); b += T(90 + v * 1700 + 6, 29 + i * 34, String(v).replace('.', ','), { s: true }); });
    b += T(170, 96, 'odchyłka poziomu po spadku ciśnienia o 0,18', { s: true, m: true });
    return svg(106, b, 'Odchyłka poziomu po zakłóceniu ciśnienia zasilania: kaskada kontra MPC wprost');
  },
};
