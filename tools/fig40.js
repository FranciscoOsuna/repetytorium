const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, pline, svg } = L;
module.exports = {
  petla: () => H.chainV(['predykcja|modelem i sterowaniem u', 'korekcja|pomiarem y', 'estymata x̂ i niepewność P'], { hi: [1], w: 200, gap: 40, loop: true, label: 'Pętla filtru Kalmana' }),
  wzm: () => H.cols('Sytuacja', 'Filtr', [['czujnik kiepski|(R duże)', 'K maleje:|ufa modelowi'], ['model kiepski|(Q duże)', 'K rośnie:|ufa pomiarowi'], ['oba źródła niepewne', 'ważona średnia'], ['wynik dodatkowy', 'macierz P:|dokładność']], { w1: 150, w2: 150, h: 44, label: 'Skąd bierze się wzmocnienie K' }),
  struktura: () => {
    let b = box(10, 20, 80, 38, ['Regulator', '−K'], { k: 'bx' }) + box(130, 20, 90, 38, ['Obiekt'], { k: 'bx' }) + box(130, 96, 120, 38, ['Filtr Kalmana'], { k: 'bxa' });
    b += arrow([[90, 39], [130, 39]], { k: 'ln' }) + T(110, 14, 'u', { s: true, m: true });
    b += arrow([[110, 39], [110, 115], [130, 115]], { k: 'lna' });
    b += arrow([[220, 39], [325, 39]], { k: 'ln' }) + T(322, 14, 'y', { s: true, e: true });
    b += arrow([[270, 39], [270, 115], [250, 115]], { k: 'lna' });
    b += arrow([[190, 134], [190, 156], [50, 156], [50, 58]], { k: 'lna' }) + T(120, 150, 'x̂ (estymata)', { s: true, m: true });
    return svg(168, b, 'Sprzężenie od estymaty: filtr dostaje u i y, regulator dostaje x̂');
  },
  warianty: () => H.cols('Wariant', 'Wzmocnienia', [['alokacja +|obserwator', 'oba wybrane'], ['alokacja + filtr', 'regulator wybrany,|K z Q i R'], ['LQG', 'oba z rachunku']], { w1: 140, w2: 160, h: 46, hi: [2], label: 'Trzy warianty struktury' }),
  separacja: () => H.chainV(['układ zamknięty|macierz blokowo-trójkątna', 'widmo = widmo regulatora|+ widmo estymatora', 'projektuj osobno|regulator i filtr', 'cena: szum estymaty|i brak zapasów LQR'], { hi: [2], w: 220, gap: 40, label: 'Zasada separacji' }),
  zastosowania: () => H.tree('Zastosowania filtru w sterowaniu', ['stan dla|regulatora', 'zakłócenia|i parametry', 'diagnostyka|z innowacji', 'fuzja|czujników'], { hi: [0], h: 50, label: 'Cztery zastosowania' }),
  innowacja: () => H.cols('Innowacja', 'Wniosek', [['biały szum,|średnia 0', 'model|zgodny z obiektem'], ['przesunięta|średnia', 'błąd modelu|lub zakłócenie'], ['struktura|w czasie', 'zły model|albo Q, R']], { w1: 150, w2: 150, h: 46, label: 'Diagnostyka przez innowację' }),
};
