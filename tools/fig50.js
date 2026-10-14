const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, circle, svg } = L;
module.exports = {
  fgh: () => {
    let b = '';
    b += circle(30, 70, 7, 'dotk') + circle(170, 70, 7, 'dot') + circle(310, 70, 7, 'dotk');
    b += T(30, 98, 'start', { s: true, m: true }) + T(170, 98, 'węzeł w', { s: true, m: true }) + T(310, 98, 'cel', { s: true, m: true });
    b += arrow([[38, 70], [162, 70]], { k: 'lna' }) + T(100, 58, 'g(w): znane', { s: true, m: true, a: true });
    b += arrow([[178, 70], [302, 70]], { k: 'lnm', dash: true }) + T(240, 58, 'h(w): szacunek', { s: true, m: true });
    b += T(170, 130, 'f(w) = g(w) + h(w)', { s: true, m: true, b: true });
    b += T(170, 20, 'h*(w): prawdziwy koszt (nieznany), h ≤ h*', { s: true, m: true });
    return svg(142, b, 'Funkcja oceny A*: g to koszt dojścia, h to szacunek do celu, f to ich suma');
  },
  strategie: () => H.cols('Strategie', 'Przykłady', [['ślepe', 'DFS, BFS, powracanie'], ['poinformowane', 'Dijkstra, A*']], { w1: 150, w2: 150, h: 46, label: 'Ślepe i poinformowane strategie przeszukiwania' }),
  kryteria: () => H.cols('Kryterium', 'Pytanie', [['zupełność', 'czy znajdzie, jeśli istnieje?'], ['optymalność', 'czy najtańsze?'], ['czas', 'ile węzłów rozwija?'], ['pamięć', 'ile węzłów trzyma?']], { w1: 110, w2: 190, h: 38, label: 'Cztery kryteria oceny algorytmów przeszukiwania' }),
  petla: () => H.chainV(['OPEN = {start}|CLOSED = ∅', 'wybierz z OPEN|najmniejsze f', 'cel? tak → koniec|(ścieżka z rodziców)', 'rozwiń: sąsiedzi,|policz g, f, rodzica', 'do CLOSED;|popraw g (krótsza)'], { hi: [1, 2], w: 210, gap: 40, label: 'Pętla algorytmu A*' }),
  gdansk: () => H.cols('Krok: rozwinięty (f)', 'OPEN po kroku', [['1 Gdańsk (500)', 'P 526, Ł 540, Wa 599'], ['2 Poznań (526)', 'Ł 540, Wr 554, Wa 599'], ['3 Łódź (540)', 'Cz 551, Wr 554, Wa 599'], ['4 Częstochowa (551)', 'Wr 554, O 559, Wa 599'], ['5 Wrocław (554)', 'O 559, Wa 599'], ['6 Opole (559)', 'koniec']], { w1: 150, w2: 150, h: 34, label: 'A*: Gdańsk → Opole' }),
  cechy: () => H.cols('Cecha', 'Wartość', [['zupełność', 'tak (skończony graf, koszty > 0)'], ['optymalność', 'tak, gdy h ≤ h*'], ['h = 0', 'algorytm Dijkstry'], ['czas', 'tym mniej, im h bliżej h*'], ['pamięć', 'główna wada: wszystkie węzły']], { w1: 100, w2: 200, h: 38, label: 'Cechy algorytmu A*' }),
  heurystyki: () => H.cols('Zadanie uproszczone', 'Heurystyka', [['bez dróg', 'linia prosta'], ['bez ścian, 4 kierunki', 'metryka taksówkowa'], ['bez ścian, skosy', 'metryka euklidesowa'], ['klocki przenikają się', 'suma przesunięć']], { w1: 150, w2: 150, h: 38, label: 'Heurystyki z łatwiejszego zadania' }),
};
