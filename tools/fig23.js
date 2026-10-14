const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  plan: () => {
    const X = k => 20 + k * 15, Y = v => 110 - v * 70;
    let b = line(20, 110, 330, 110, { k: 'ln' }) + line(20, 110, 20, 14, { k: 'ln' });
    b += line(X(10), 20, X(10), 112, { k: 'lna', dash: true }) + T(X(10), 14, 'teraz', { s: true, m: true, a: true });
    const past = []; for (let k = 0; k <= 10; k++) past.push([X(k), Y(0.3 + 0.35 * (1 - Math.exp(-k / 4)))]);
    b += pline(past, 'lng');
    const ys = [0.95, 0.85, 0.7, 0.55, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], st = [];
    ys.forEach((v, i) => { st.push([X(10 + i), Y(v)], [X(11 + i), Y(v)]); });
    b += pline(st, 'lnm');
    b += rect(X(10), Y(0.95) - 2, 15, 3, 'bxa', 0);
    b += T(262, 36, 'wykonaj tylko 1. krok', { s: true, m: true, a: true });
    b += T(180, 130, 'reszta planu jest wyrzucana', { s: true, m: true });
    return svg(140, b, 'Plan sterowań na horyzont, z którego wykonuje się tylko pierwszy krok');
  },
  elementy: () => H.cols('Element', 'Co wnosi', [['① model obiektu', 'prognoza przyszłości'], ['② funkcja celu', 'horyzonty i wagi'], ['③ ograniczenia', 'zakres u, Δu i y'], ['④ optymalizacja', 'zadanie kwadratowe QP'], ['⑤ estymator stanu', 'punkt startu prognozy'], ['⑥ przesuw. horyzontu', 'pierwszy krok, od nowa']], { w1: 150, w2: 170, h: 28, label: 'Sześć elementów technologii sterowania predykcyjnego' }),
  petla: () => H.chainV(['pomiar wyjścia', 'estymator stanu|i zakłócenia', 'optymalizacja|(QP z ograniczeniami)', 'pierwszy krok|sterowania', 'obiekt'], { hi: [2], loop: true, w: 190, gap: 46, label: 'Pętla regulatora predykcyjnego w jednej próbce' }),
  przeregulowanie: () => {
    const rows = [['bez ogr.', 8.7, 'bx'], ['anty-windup', 6.8, 'bx'], ['MPC z ogr.', 4.3, 'bxa']];
    let b = '';
    rows.forEach(([n, v, k], i) => { b += T(0, 29 + i * 32, n, { s: true }); b += rect(80, 14 + i * 32, v * 22, 22, k, 4); b += T(80 + v * 22 + 6, 29 + i * 32, String(v).replace('.', ',') + ' %', { s: true }); });
    return svg(104, b, 'Przeregulowanie: regulator nieświadomy ograniczeń, anty-windup i MPC z ograniczeniami');
  },
};
