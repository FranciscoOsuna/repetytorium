const L = require('./svg'); const H = require('./h');
const { T, box, arrow, svg } = L;
module.exports = {
  petle: () => {
    let b = '';
    b += T(170, 12, 'pętla wewnętrzna kasuje, zewnętrzna reguluje', { s: true, m: true });
    b += box(8, 40, 82, 40, ['regulator', 'liniowy'], { k: 'bxa' });
    b += box(118, 40, 94, 40, ['blok', 'kasujący'], { k: 'bxa' });
    b += box(242, 40, 90, 40, ['obiekt', 'nieliniowy']);
    b += arrow([[90, 60], [118, 60]], { k: 'lna' }) + T(104, 52, 'v', { s: true, m: true });
    b += arrow([[212, 60], [242, 60]], { k: 'lna' }) + T(227, 52, 'u', { s: true, m: true });
    b += arrow([[287, 80], [287, 118], [165, 118], [165, 80]], { k: 'lnm', dash: true }) + T(226, 112, 'stan x', { s: true, m: true });
    b += arrow([[287, 118], [287, 140], [49, 140], [49, 80]], { k: 'ln' }) + T(168, 134, 'y (uchyb y_d − y)', { s: true, m: true });
    return svg(152, b, 'Linearyzacja przez sprzężenie zwrotne: blok kasujący i pętla zewnętrzna');
  },
  kroki: () => H.chainV(['różniczkuj y|do stopnia r', 'odwróć:|u = (v − a)/b', 'pętla zewnętrzna|dla v = y^(r)'], { hi: [1], w: 190, gap: 40, label: 'Trzy kroki dla obiektu deterministycznego' }),
  reszta: () => H.cols('Środek', 'Poprawia', [['całka', 'stałą resztę'], ['człon odporny', 'resztę ograniczoną'], ['adaptacja', 'parametry modelu'], ['obserwator|zakłócenia', 'resztę estymowaną']], { w1: 130, w2: 170, h: 40, note: ['reszta = Δa + Δb·u'], label: 'Cztery środki na niepewność' }),
  zastosowania: () => H.cols('Obszar', 'Co się kasuje', [['robotyka', 'bezwładność, Coriolis'], ['napędy', 'sprzężenie strumień–moment'], ['lotnictwo', 'momenty aerodynamiczne'], ['reaktory', 'wykładnik Arrheniusa'], ['lewitacja', 'siła ~ i²/szczelina²']], { w1: 110, w2: 190, h: 36, label: 'Zastosowania i kasowana nieliniowość' }),
  stopien: () => H.tree('Stopień r', ['r = n|cały stan|(wejście–stan)', 'r < n|tylko wyjście|+ dyn. zerowa'], { hi: [1], h: 72, label: 'Stopień względny a rząd obiektu' }),
};
