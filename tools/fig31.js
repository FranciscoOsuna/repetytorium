const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, pline, svg } = L;
module.exports = {
  idea: () => H.chainV(['przestrzeń wejść X|(zależność nieliniowa)', 'Φ: odwzorowanie|do przestrzeni cech F', 'zwykłe PCA w F|(zależność liniowa)', 'sztuczka jądra:|bez liczenia Φ'], { hi: [3], w: 200, gap: 40, label: 'Idea kernel PCA' }),
  jadro: () => H.cols('Jądro', 'Uwaga', [['liniowe xᵀy', 'kPCA = zwykłe PCA'], ['wielomianowe', 'jednomiany do stopnia d'], ['Gaussa (RBF)', 'domyślne, parametr σ'], ['sigmoidalne', 'nie zawsze Mercer']], { w1: 130, w2: 170, h: 38, label: 'Funkcje jądra' }),
  mercer: () => H.chainV(['symetria|k(x, y) = k(y, x)', 'macierz K|półdodatnio określona', 'wtedy istnieje Φ|k jest iloczynem skalarnym'], { hi: [2], w: 210, gap: 40, label: 'Warunki Mercera' }),
  fazy: () => H.cols('Faza', 'Kroki', [['P przygotuj', '1 dane i normalizacja|2 jądro i parametr'], ['J jądro', '3 macierz K|4 centrowanie w F'], ['R rozłóż', '5 wartości i wektory|6 skalowanie α, 7 wybór L'], ['M monitoruj', '8 rzut próbki|9 miara i granica, 10 test']], { w1: 110, w2: 190, h: 44, note: ['„Porządny Jądrowy Rachunek Monitoruje”'], label: 'Dziesięć kroków w czterech fazach' }),
  porownanie: () => H.cols('PCA', 'Kernel PCA', [['korelacji M×M', 'jądra N×N'], ['liniowe', 'nieliniowe'], ['pas wokół płaszcz.', 'izolinia dopasowana'], ['SPE nieograniczone', 'SPE do stałej'], ['wkłady zmiennych', 'brak prostych']], { w1: 150, w2: 150, h: 36, label: 'PCA a kernel PCA' }),
  spe: () => {
    let b = line(36, 140, 320, 140, { k: 'ln' }) + line(36, 140, 36, 10, { k: 'ln' });
    const pa = [], pk = []; for (let i = 0; i <= 40; i++) { const d = i * 0.1; pa.push([36 + d * 68, Math.max(14, 140 - d * d * 14)]); pk.push([36 + d * 68, 140 - 1.56 * (1 - Math.exp(-d * d * 1.2)) * 60]); }
    b += pline(pa, 'lnb') + pline(pk, 'lna');
    b += T(318, 156, 'odległość od danych', { s: true, e: true }) + T(40, 12, 'SPE', { s: true });
    b += T(190, 28, 'PCA: bez ograniczeń', { s: true, b: true }) + T(200, 62, 'kPCA: dąży do stałej', { s: true, a: true });
    return svg(168, b, 'Błąd rekonstrukcji: w PCA rośnie bez ograniczeń, w kPCA zbiega do stałej');
  },
  param: () => H.cols('Parametr', 'Zły dobór', [['σ za duże', 'jak zwykłe PCA'], ['σ za małe', 'fałszywe alarmy'], ['L za małe', 'awarie nie wykryte'], ['L za duże', 'przeuczenie']], { w1: 120, w2: 180, h: 38, label: 'Dobór σ i L' }),
};
