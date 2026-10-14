const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  tor: () => H.chainH(['filtr|wejściowy', 'przetw.|A/C', 'procesor|DSP', 'przetw.|C/A'], { hi: [2], h: 46, note: ['sygnał analogowy → liczby → algorytm → sygnał analogowy'], label: 'Tor cyfrowego przetwarzania sygnałów' }),
  kwantyzacja: () => {
    const X = t => 10 + t * 320, f = t => 0.5 + 0.4 * Math.sin(t * 2 * Math.PI * 1.5), Y = v => 120 - v * 100;
    let b = line(10, 120, 332, 120, { k: 'ln' }) + line(10, 120, 10, 14, { k: 'ln' });
    const c = []; for (let i = 0; i <= 80; i++) { const t = i / 80; c.push([X(t), Y(f(t))]); }
    b += pline(c, 'lnm');
    const N = 24, st = [];
    for (let i = 0; i < N; i++) { const t0 = i / N, t1 = (i + 1) / N, q = Math.round(f(t0) * 8) / 8; st.push([X(t0), Y(q)], [X(t1), Y(q)]); }
    b += pline(st, 'lna');
    b += T(170, 142, 'próbkowanie w czasie + zaokrąglanie wartości', { s: true, m: true, a: true });
    return svg(152, b, 'Sygnał ciągły i jego wersja spróbkowana oraz skwantowana');
  },
  bilans: () => H.cols('Zaleta', 'Cena', [['programowalność|(zmiana kodu)', 'szum kwantyzacji'], ['powtarzalność,|brak dryftu', 'pasmo ograniczone|(aliasing)'], ['dokładność z|długości słowa', 'błędy zaokrągleń'], ['algorytmy|adaptacyjne', 'zakres dynamiki|ograniczony']], { w1: 150, w2: 160, h: 34, label: 'Zalety cyfrowego przetwarzania i jego ograniczenia' }),
};
