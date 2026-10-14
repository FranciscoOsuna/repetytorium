const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  rodziny: () => H.cols('Rodzina', 'Co stoi po TO → wynik', [['Mamdani', 'słowo (zbiór rozmyty)|→ wyostrzanie'], ['Takagi–Sugeno', 'wzór (funkcja wejść)|→ średnia ważona'], ['Tsukamoto', 'zbiór monotoniczny|→ średnia ważona']], { w1: 110, w2: 210, h: 38, note: ['Mamdani mówi, Sugeno liczy, Tsukamoto odczytuje'], label: 'Trzy rodziny systemów rozmytych różnią się tym, co stoi po TO' }),
  monoton: () => {
    let b = '';
    const Y = v => 110 - v * 90;
    // lewy: trójkąt
    b += line(6, 110, 150, 110, { k: 'ln' });
    b += pline([[10, 110], [70, Y(1)], [130, 110]], 'lna');
    b += line(6, Y(0.3), 150, Y(0.3), { k: 'lnb', dash: true });
    b += circle(10 + 60 * 0.3, Y(0.3), 4, 'dot'); b += circle(130 - 60 * 0.3, Y(0.3), 4, 'dot');
    b += T(78, 134, 'dwie wartości: odczyt', { m: true, s: true, r: true }); b += T(78, 147, 'niemożliwy', { m: true, s: true, r: true });
    // prawy: pochylnia
    b += line(190, 110, 334, 110, { k: 'ln' });
    b += pline([[196, 110], [316, Y(1)], [316, 110]], 'lna');
    b += line(190, Y(0.3), 334, Y(0.3), { k: 'lnb', dash: true });
    b += circle(196 + 120 * 0.3, Y(0.3), 4, 'dot');
    b += arrow([[196 + 120 * 0.3, Y(0.3) + 4], [196 + 120 * 0.3, 108]], { k: 'lna' });
    b += T(262, 134, 'jedna wartość:', { m: true, s: true, a: true }); b += T(262, 147, 'odwracalna reguła', { m: true, s: true, a: true });
    return svg(156, b, 'Zbiór trójkątny daje dwie wartości dla jednej wysokości, zbiór monotoniczny dokładnie jedną');
  },
  kroki: () => H.chainH(['stopień|spełnienia', 'ścięcie|konkluzji', 'złożenie|przez MAX', 'liczba|(wyostrz.)'], { hi: [3], h: 46, note: ['u Takagi–Sugeno i Tsukamoto kroki 2 i 4 inne:', 'liczba z reguły i średnia ważona'], label: 'Cztery kroki wnioskowania Mamdaniego' }),
};
