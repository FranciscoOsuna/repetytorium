const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
const front = (f, n = 40) => { const p = []; for (let i = 0; i <= n; i++) { const t = i / n; p.push([60 + 240 * t, f(t)]); } return p; };
function axes() { return line(40, 150, 320, 150, { k: 'ln' }) + line(40, 150, 40, 14, { k: 'ln' }) + T(318, 164, 'f₁', { e: true, s: true }) + T(48, 22, 'f₂', { s: true }); }
module.exports = {
  dominacja: () => {
    let b = axes();
    b += rect(40, 70, 160, 80, 'fl', 0);
    b += pline(front(t => 40 + 100 * (1 - (1 - t) ** 2)), 'lna');
    b += circle(200, 70, 4.5, 'dot'); b += T(208, 66, 'x (zdominowany)', { s: true, r: true });
    b += T(120, 102, 'dominują x', { m: true, s: true });
    b += circle(60, 140, 4, 'dotk'); b += T(68, 136, 'punkt idealny', { s: true });
    b += circle(300, 40, 4, 'dotk'); b += T(296, 30, 'nadir', { e: true, s: true });
    b += T(250, 112, 'front Pareto', { a: true, s: true });
    return svg(176, b, 'Dominacja i front Pareto w przestrzeni kryteriów: zacieniony kwadrat zawiera rozwiązania dominujące punkt x');
  },
  niewypukly: () => {
    let b = axes();
    b += line(60, 40, 300, 140, { k: 'lnm', dash: true });
    b += pline(front(t => 40 + 100 * t * t), 'lna');
    b += circle(60, 40, 4.5, 'dot'); b += circle(300, 140, 4.5, 'dot');
    b += circle(180, 70, 4, 'dotk');
    b += T(190, 60, 'środek frontu', { s: true });
    b += T(190, 46, 'nieosiągalny sumą ważoną', { s: true, r: true });
    b += T(70, 104, 'prosta o stałej wadze', { s: true });
    return svg(176, b, 'Front niewypukły: prosta sumy ważonej dotyka tylko dwóch końców');
  },
  metody: () => H.tree('Metody wielokryterialne', ['skalaryzacja|suma ważona|ε-ograniczenia|Czebyszew', 'hierarchiczne|leksykogr.|cele (goal)', 'ewolucyjne|NSGA-II|cały front|w jednym biegu'], { hi: [2], h: 62, note: ['skalaryzacja: jeden przebieg = jeden punkt frontu'], label: 'Rodziny metod poszukiwania rozwiązań Pareto-optymalnych' }),
};
