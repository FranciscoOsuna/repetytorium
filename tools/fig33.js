const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  v: () => {
    let b = '';
    const left = ['wymagania', 'analiza obiektu', 'dekompozycja,|struktura', 'sprzęt i sieć'], right = ['SAT, eksploat.', 'FAT', 'HIL', 'testy modułów'];
    left.forEach((t, i) => { b += box(0, i * 36, 120, 30, t.split('|'), { k: 'bx' }); });
    right.forEach((t, i) => { b += box(220, i * 36, 120, 30, [t], { k: 'bxa' }); b += line(120, i * 36 + 15, 220, i * 36 + 15, { k: 'lnm', dash: true }); });
    b += box(110, 144, 120, 30, ['oprogramowanie'], { k: 'bxn' });
    b += arrow([[60, 138], [60, 159], [110, 159]], { k: 'ln' }) + arrow([[230, 159], [280, 159], [280, 138]], { k: 'lna' });
    return svg(182, b, 'Model V budowy systemu: lewe ramię projekt, prawe ramię testy, każdy test sprawdza etap z tej samej wysokości');
  },
  rga: () => H.tree('Element RGA λ₁₁', ['λ ≈ 1|decentralizuj|śmiało', 'λ < 0|zła para,|zamień', 'λ ≫ 1|nie dziel,|steruj razem'], { hi: [0], h: 64, label: 'Trzy decyzje według RGA' }),
  testy: () => H.chainH(['moduły', 'HIL', 'FAT', 'SAT'], { h: 40, hi: [2, 3], note: ['kolejne etapy zastępują modele prawdziwymi elementami:', 'FAT u dostawcy, SAT na obiekcie z użytkownikiem'], label: 'Kolejne etapy testów' }),
};
