const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  struktury: () => H.tree('Podział sterowania dużym obiektem', ['zdecentr.|brak|wymiany|danych', 'rozproszona|wymiana|danych|z sąsiadami', 'hierarch.|koordynator|nad lokalnymi'], { h: 74, note: ['coraz więcej wiedzy o sobie nawzajem →'], label: 'Struktury zdecentralizowana, rozproszona i hierarchiczna' }),
  przyklad: () => {
    const v = [50, 25, 12.5, 6.25]; let b = '';
    const lab = ['zdecentr.', '1. wymiana', '2. wymiana', '3. wymiana'];
    v.forEach((e, i) => { b += T(0, 29 + i * 30, lab[i], { s: true }); b += rect(80, 14 + i * 30, e * 4.2, 22, i === 0 ? 'bx' : 'bxa', 4); b += T(80 + e * 4.2 + 6, 29 + i * 30, e + ' %', { s: true }); });
    b += T(170, 138, 'błąd względem rozwiązania scentralizowanego', { s: true, m: true });
    return svg(148, b, 'Błąd regulatorów rozproszonych maleje o połowę przy każdej wymianie');
  },
  agent: () => H.chainH(['percepcja', 'wiedza|i cele', 'decyzja', 'działanie'], { hi: [1, 2], h: 46, note: ['regulator ma percepcję i działanie,', 'agent dokłada wiedzę, cele, decyzję i komunikację'], label: 'Budowa agenta' }),
  przetarg: () => H.chainV(['ogłoszenie zadania|(zlecający)', 'oferty|(wykonawcy)', 'wybór najlepszej|oferty', 'przydział zadania'], { hi: [2], w: 190, gap: 46, note: ['Contract', 'Net', '(Smith 1980)'], noteY: 40, label: 'Przetarg Contract Net' }),
};
