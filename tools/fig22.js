const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  funkcje: () => H.tree('Funkcje systemu automatyki', ['na procesie|pomiar,|sterowanie,|zabezpieczenia,|diagnostyka', 'dla ludzi i systemów|HMI, alarmy,|archiwum,|komunikacja'], { h: 84, label: 'Struktura funkcjonalna: funkcje na procesie i dla ludzi' }),
  tor: () => H.chainH(['czujnik|4–20 mA', 'moduł AI|liczba', 'CPU|program', 'moduł AO|→ zawór'], { hi: [2], h: 46, note: ['wielkość fizyczna → prąd → liczba → prąd → zawór,', 'proces zamyka pętlę'], label: 'Tor sygnału od czujnika do zaworu' }),
  cykl: () => H.chainV(['odczyt wejść|(obraz procesu)', 'program|na obrazie procesu', 'zapis wyjść|(wszystkie naraz)', 'komunikacja'], { hi: [1], loop: true, w: 190, gap: 46, note: ['cykl', 'trwa', 'milisekundy'], noteY: 50, label: 'Cykl pracy sterownika PLC' }),
  skalowanie: () => {
    const X = i => 30 + (i / 24) * 290, Y = v => 130 - v * 100;
    let b = line(30, 130, 330, 130, { k: 'ln' }) + line(30, 130, 30, 14, { k: 'ln' });
    b += rect(X(0), 14, X(3.8) - X(0), 116, 'bxn', 0) + rect(X(20.5), 14, X(24) - X(20.5), 116, 'bxn', 0);
    b += pline([[X(4), Y(0)], [X(20), Y(1)]], 'lna');
    b += circle(X(12.8), Y(0.55), 4, 'dot');
    b += T(250, 112, '12,8 mA → 15206', { s: true, m: true });
    b += T(X(1.9), 60, 'awaria', { s: true, m: true, r: true }) + T(X(22.2), 60, 'awaria', { s: true, m: true, r: true });
    b += T(30, 146, '0', { s: true, m: true }) + T(X(4), 146, '4', { s: true, m: true }) + T(X(20), 146, '20 mA', { s: true, m: true });
    b += T(10, 12, '27648', { s: true });
    return svg(158, b, 'Skalowanie prądu 4–20 mA na liczby 0…27648 ze strefami awarii');
  },
  architektury: () => H.tree('Cztery architektury sprzętowe', ['centralna|jeden|sterownik', 'rozpr.|we/wy|przy|obiekcie', 'PLC +|SCADA', 'DCS|jeden|system'], { h: 64, label: 'Cztery architektury sprzętowe systemów automatyki' }),
};
