const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  petle: () => {
    let b = T(170, 10, 'pętla adaptacji (wolna)', { s: true, m: true, a: true, b: true });
    b += box(10, 20, 120, 34, ['identyfikator', '(RMNK)'], { k: 'bxa' }) + arrow([[130, 37], [200, 37]], { k: 'lna' }) + box(200, 20, 130, 34, ['synteza', '(nastawy)'], { k: 'bxa' });
    b += arrow([[265, 54], [265, 100]], { k: 'lna', dash: true }) + T(272, 80, 'nastawy', { s: true, a: true });
    b += T(150, 92, 'pętla regulacji (szybka)', { s: true, b: true, m: true });
    b += box(200, 100, 130, 34, ['regulator']) + arrow([[200, 117], [140, 117]], { k: 'ln' }) + box(10, 100, 130, 34, ['obiekt']);
    b += arrow([[75, 100], [75, 54]], { k: 'lnm', dash: true });
    b += arrow([[75, 134], [75, 154], [265, 154], [265, 134]], { k: 'ln' }).slice(0, 0);
    b += T(170, 168, 'u i y zasilają identyfikator', { s: true, m: true });
    return svg(176, b, 'Dwie pętle pośredniego regulatora adaptacyjnego: szybka regulacja i wolna adaptacja');
  },
  kroki: () => H.chainV(['pomiar', 'identyfikacja|(aktualizacja modelu)', 'synteza|(nowe nastawy)', 'sterowanie', 'zapamiętanie'], { hi: [1, 2], loop: true, w: 190, gap: 42, note: ['kroki 2–3:', 'pętla adaptacji', '', 'kroki 1, 4:', 'pętla regulacji'], noteY: 30, label: 'Pięć kroków powtarzanych co próbkę' }),
  rodzina: () => H.tree('Adaptacja', ['pośrednie|(STR)|przez model', 'bezpośr.|(MRAC)|wprost', 'harmono-|gramowanie|tablica', 'autostro-|jenie|raz'], { hi: [0], h: 64, label: 'Cztery schematy adaptacji' }),
  pamiec: () => {
    const rows = [['λ = 0,95', 20], ['λ = 0,98', 50], ['λ = 0,99', 100], ['λ = 0,995', 200]]; let b = '';
    rows.forEach(([n, v], i) => { b += T(0, 29 + i * 30, n, { s: true }); b += rect(80, 14 + i * 30, v * 0.85, 22, i === 2 ? 'bxa' : 'bx', 4); b += T(80 + v * 0.85 + 6, 29 + i * 30, v + ' próbek', { s: true }); });
    b += T(170, 142, 'pamięć N ≈ 1/(1 − λ)', { s: true, m: true });
    return svg(152, b, 'Efektywna pamięć estymatora dla różnych czynników zapominania');
  },
  zabezpieczenia: () => H.cols('Zagrożenie', 'Zabezpieczenie', [['brak pobudzenia,|rosnące P', 'strefa martwa,|limit śladu P'], ['dynamika|niemodelowana', 'ograniczenie|niepewności'], ['osobliwa synteza', 'nadzór nad syntezą']], { w1: 150, w2: 150, h: 40, note: ['cisza + zapominanie + szum = wybuch estymatora'], label: 'Zagrożenia pętli adaptacji i zabezpieczenia' }),
};
