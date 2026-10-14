const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  powierzchnia: () => {
    const X = e => 170 + e * 60, Y = d => 90 - d * 40;
    let b = line(20, 90, 330, 90, { k: 'ln' }) + line(170, 10, 170, 170, { k: 'ln' });
    b += line(X(-2.2), Y(2.2 * 1), X(2.2), Y(-2.2 * 1), { k: 'lna' });
    const tr = []; for (let i = 0; i <= 30; i++) { const t = i / 30; tr.push([X(-1.8 + 1.1 * t), Y(-1.4 + 3.2 * Math.pow(t, 0.6) - 0.0)]); }
    // trajektoria: dojście do powierzchni, potem zjazd po niej
    const path = [[X(-1.8), Y(-1.2)], [X(-1.4), Y(-0.3)], [X(-1.1), Y(0.5)], [X(-0.9), Y(0.9)]];
    for (let i = 0; i <= 12; i++) { const e = -0.9 + 0.9 * (i / 12); path.push([X(e), Y(-e)]); }
    b += pline(path, 'lnb');
    b += circle(X(-1.8), Y(-1.2), 4, 'dot');
    b += circle(X(0), Y(0), 4, 'dotk');
    b += T(300, 84, 'e', { s: true }) + T(176, 18, 'ė', { s: true });
    b += T(108, 34, 's = 0', { s: true, a: true, m: true }) + T(100, 168, 'faza dojścia', { s: true, m: true, r: true }) + T(262, 168, 'faza ślizgu: po prostej', { s: true, m: true, a: true });
    return svg(178, b, 'Płaszczyzna fazowa: dojście do powierzchni ślizgu i zjazd po niej do celu');
  },
  prawo: () => H.tree('u = u_eq + u_sw', ['sterowanie równoważne|utrzymuje na|powierzchni|przy dokładnym modelu', 'człon przełączający|dociska zawsze|w stronę s = 0|pokrywa niepewność'], { h: 84, label: 'Dwa człony prawa sterowania ślizgowego' }),
  sgn: () => {
    let b = line(10, 70, 330, 70, { k: 'ln' }) + line(170, 8, 170, 132, { k: 'ln' });
    b += pline([[10, 100], [170, 100]], 'lnm') + pline([[170, 40], [330, 40]], 'lnm') + line(170, 40, 170, 100, { k: 'lnm', dash: true });
    b += T(60, 125, 'przełącznik (sgn)', { s: true, m: true });
    return svg(136, b, 'Twardy przełącznik zmienia znak na powierzchni').replace('</svg>', '</svg>');
  },
  warstwa: () => {
    let b = line(10, 70, 330, 70, { k: 'ln' }) + line(170, 8, 170, 132, { k: 'ln' });
    b += pline([[10, 100], [130, 100], [210, 40], [330, 40]], 'lna');
    b += line(130, 120, 130, 40, { k: 'lnm', dash: true }) + line(210, 120, 210, 40, { k: 'lnm', dash: true });
    b += T(170, 128, 'warstwa graniczna ±φ', { s: true, m: true, a: true }) + T(250, 28, 'wewnątrz wzmocnienie K/φ', { s: true, m: true, a: true });
    return svg(136, b, 'Warstwa graniczna zamienia przełącznik w wzmocnienie wewnątrz pasa wokół powierzchni');
  },
};
