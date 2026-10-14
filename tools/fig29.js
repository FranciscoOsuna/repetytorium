const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  warstwy: () => {
    let b = T(170, 12, 'warstwa nadzorcza', { s: true, m: true, a: true, b: true });
    b += box(10, 22, 90, 34, ['diagnostyka', '(FDD)'], { k: 'bxa' }) + arrow([[100, 39], [125, 39]], { k: 'lna' });
    b += box(125, 22, 80, 34, ['decyzja'], { k: 'bxa' }) + arrow([[205, 39], [230, 39]], { k: 'lna' });
    b += box(230, 22, 100, 34, ['akomodacja /', 'rekonfiguracja'], { k: 'bxa' });
    b += arrow([[280, 56], [280, 104]], { k: 'lna' });
    b += T(170, 92, 'pętla regulacji', { s: true, m: true, b: true });
    b += box(10, 104, 100, 34, ['regulator']) + arrow([[110, 121], [140, 121]], { k: 'ln' });
    b += box(140, 104, 100, 34, ['obiekt']) + arrow([[240, 121], [320, 121]], { k: 'ln' }) + T(318, 114, 'y', { s: true });
    b += arrow([[285, 121], [285, 150], [60, 150], [60, 138]], { k: 'ln' });
    b += arrow([[60, 104], [60, 56]], { k: 'lnm', dash: true });
    b += T(170, 168, 'diagnostyka czyta u i y z pętli', { s: true, m: true });
    return svg(178, b, 'Sterowanie tolerujące uszkodzenia: pętla regulacji i warstwa nadzorcza');
  },
  droga: () => H.tree('Dwie drogi do tolerancji uszkodzeń', ['pasywne|jeden odporny|regulator,|bez diagnostyki', 'aktywne|diagnostyka|i potem|reakcja'], { h: 74, label: 'FTC pasywne i aktywne' }),
  etapy: () => H.chainV(['zbieranie danych', 'detekcja', 'izolacja', 'identyfikacja', 'ocena i decyzja', 'akomodacja lub|rekonfiguracja'], { hi: [5], w: 190, gap: 40, note: ['dwa ostatnie', 'etapy są', 'tylko w FTC'], noteY: 190, label: 'Etapy od uszkodzenia do odzyskanej jakości' }),
  poziomy: () => H.tree('Trzy poziomy ingerencji', ['akomodacja|ten sam kształt|pętli,|nowe liczby', 'rekonfiguracja|nowy kształt|pętli', 'zmiana celu|skromniejszy|cel'], { h: 74, note: ['im poważniejsze uszkodzenie, tym wyżej na liście'], label: 'Akomodacja, rekonfiguracja i zmiana celu' }),
  zbiorniki: () => {
    let b = box(0, 54, 36, 30, ['P']) + arrow([[36, 69], [60, 69]], { k: 'ln' });
    b += rect(60, 30, 70, 80, 'bx', 4) + T(95, 74, 'Z1', { m: true, b: true });
    b += arrow([[130, 85], [175, 85]], { k: 'ln' }) + T(152, 78, 'V12', { s: true, m: true, a: true });
    b += rect(175, 40, 70, 70, 'bx', 4) + T(210, 80, 'Z2', { m: true, b: true });
    b += arrow([[245, 100], [290, 100]], { k: 'ln' }) + T(315, 104, 'odbiór', { s: true, m: true });
    b += line(130, 100, 150, 100, { k: 'lna', dash: true }) + line(150, 100, 150, 126, { k: 'lna', dash: true }) + arrow([[150, 126], [175, 100]], { k: 'lna' });
    b += T(152, 142, 'Va (rezerwowy)', { s: true, m: true, a: true });
    b += T(60, 22, 'wyciek ↓', { s: true, m: true, r: true });
    b += T(210, 30, 'cel: h₂', { s: true, m: true });
    return svg(152, b, 'Dwa zbiorniki z zaworem V12, zaworem rezerwowym Va i możliwym wyciekiem');
  },
};
