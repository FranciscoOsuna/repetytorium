const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, circle, svg } = L;
module.exports = {
  lista: () => H.chainV(['1 konkurencja|(kto wygrał)', '2 adaptacja|(ile się przesuwa)', '3 sąsiedztwo|(kto jeszcze się przesuwa)', '4 malejące parametry|(jak słabnie w czasie)', '5 martwe neurony|(co z tymi, co nie wygrywają)'], { hi: [2], w: 220, gap: 38, label: 'Pięć mechanizmów samoorganizacji' }),
  siatka: () => {
    let b = ''; const N = 5;
    const g = (i, j) => [30 + i * 28, 40 + j * 24];
    const w = (i, j) => { const x = 215 + i * 24 + Math.sin(j * 0.9) * 8 + (i - 2) * (j - 2) * 1.5, y = 40 + j * 22 + Math.cos(i * 0.8) * 8 - (i === 4 ? 4 : 0); return [x, y]; };
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      if (i < N - 1) { const a = g(i, j), c = g(i + 1, j); b += line(a[0], a[1], c[0], c[1], { k: 'lnm' }); const a2 = w(i, j), c2 = w(i + 1, j); b += line(a2[0], a2[1], c2[0], c2[1], { k: 'lna' }); }
      if (j < N - 1) { const a = g(i, j), c = g(i, j + 1); b += line(a[0], a[1], c[0], c[1], { k: 'lnm' }); const a2 = w(i, j), c2 = w(i, j + 1); b += line(a2[0], a2[1], c2[0], c2[1], { k: 'lna' }); }
    }
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const a = g(i, j), c = w(i, j); b += circle(a[0], a[1], 3, 'dotk') + circle(c[0], c[1], 3, 'dot'); }
    b += T(86, 18, 'siatka: sztywna', { s: true, m: true }) + T(262, 18, 'wagi: ruszają się', { s: true, m: true, a: true });
    b += T(170, 158, 'te same krawędzie, inne położenie', { s: true, m: true });
    return svg(168, b, 'Siatka neuronów (sztywna) i te same neurony w przestrzeni wag (po uczeniu)');
  },
  wta: () => H.cols('WTA (bierze wszystko)', 'WTM (bierze najwięcej)', [['uczy się tylko zwycięzca', 'zwycięzca i sąsiedzi'], ['kwantyzator', 'mapa z topologią'], ['martwe neurony', 'brak martwych']], { w1: 150, w2: 150, h: 40, label: 'Winner takes all a winner takes most' }),
  fazy: () => H.cols('Faza', 'Co się dzieje', [['porządkowanie|duże η, duży promień', 'mapa się rozplątuje'], ['dostrajanie|małe η, promień ~ 1', 'poprawia się dokładność']], { w1: 150, w2: 150, h: 48, note: ['najpierw porządkowanie, potem dostrajanie'], label: 'Dwie fazy uczenia' }),
  martwe: () => H.cols('Sposób', 'Na czym polega', [['sąsiedztwo (WTM)', 'uczy się z sąsiadem'], ['sumienie', 'kara za częste wygrane'], ['zmęczenie', 'wyłączenie po wygranej'], ['inicjalizacja z danych', 'start z próbek lub PCA']], { w1: 140, w2: 160, h: 38, label: 'Przeciwdziałanie martwym neuronom' }),
  wlasnosci: () => H.cols('Własność', 'Skąd się bierze', [['zachowanie topologii', 'z sąsiedztwa'], ['zgodność z gęstością', 'z konkurencji'], ['kwantyzacja wektorowa', 'z adaptacji']], { w1: 160, w2: 140, h: 40, label: 'Własności mapy i ich źródła' }),
  miary: () => H.cols('Błąd', 'Mierzy', [['kwantyzacji', 'bliskość mapy do danych'], ['topograficzny', 'czy mapa jest splątana']], { w1: 120, w2: 180, h: 44, note: ['patrz na obie naraz'], label: 'Dwie miary jakości mapy' }),
};
