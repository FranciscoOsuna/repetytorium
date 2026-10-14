const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, poly, circle, svg } = L;
module.exports = {
  fazy: () => H.cols('Faza', 'Kroki', [['P przygotuj', '1 normalizacja|2 macierz korelacji'], ['R rozłóż', '3 wartości, 4 wektory|5 sortowanie'], ['W wybierz', '6 udziały, 7 wybór L|8 macierz P'], ['M monitoruj', '9 projekcja, 10 T², SPE|11 nowe dane']], { w1: 100, w2: 200, h: 38, note: ['„Porządny Rachunek Wymaga Monitoringu”'], label: 'Jedenaście kroków w czterech fazach' }),
  elipsa: () => {
    const cx = 170, cy = 92, k = 28; const P = (x, y) => [cx + x * k, cy - y * k];
    const c = Math.SQRT1_2, a = 3.26, w = 0.6;
    const u = [c, c], v = [-c, c];
    const pt = (s, t) => P(u[0] * s + v[0] * t, u[1] * s + v[1] * t);
    let b = line(20, cy, 320, cy, { k: 'lnm' }) + line(cx, 8, cx, 176, { k: 'lnm' });
    b += poly([pt(-a, -w), pt(a, -w), pt(a, w), pt(-a, w)], 'bxg');
    [['P', 0.5, 0.47, 'dotk', 9, 14], ['Q', 1.25, -1.18, 'dot', 9, 4], ['R', 2.5, 2.6, 'dot', 9, 4]].forEach(([n, x, y, k2, dx, dy]) => { const p = P(x, y); b += circle(p[0], p[1], 4, k2) + T(p[0] + dx, p[1] + dy, n, { s: true }); });
    b += T(318, cy - 6, 'z₁', { s: true, e: true }) + T(cx + 6, 14, 'z₂', { s: true });
    b += T(10, 178, 'pas: długość = T², szerokość = SPE', { s: true });
    return svg(190, b, 'Dwa termometry: pas normy modelu PCA i próbki P, Q i R');
  },
  miary: () => H.cols('T² (Hotelling)', 'SPE (Q)', [['jak daleko po modelu', 'jak daleko od modelu'], ['w przestrzeni głównej', 'błąd odtworzenia'], ['za daleko wzdłuż drogi', 'próbka zjechała z drogi'], ['zmiana punktu pracy', 'złamana korelacja']], { w1: 150, w2: 150, h: 40, label: 'Dwie miary diagnostyczne PCA' }),
  fdd: () => H.cols('Faza diagnostyki', 'Rola PCA', [['detekcja', 'T² lub SPE ponad granicą'], ['izolacja', 'wykres wkładów zmiennych'], ['identyfikacja', 'wiedza o procesie']], { w1: 130, w2: 170, h: 42, label: 'PCA w fazach diagnostyki' }),
  karty: () => H.cols('Osobne karty', 'T² i SPE', [['prostokąt granic', 'elipsa wzdłuż chmury'], ['ignorują korelację', 'widzą korelację'], ['fałszywe alarmy rosną', 'jedna miara na próbkę']], { w1: 150, w2: 150, h: 40, label: 'Karty Shewharta a PCA' }),
};
