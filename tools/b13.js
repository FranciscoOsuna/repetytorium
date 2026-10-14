const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(13, 4, [
  [1, [
    S(15, 1, 'sekcja 02', { tytul: 'Schemat algorytmu genetycznego', svg: F('fig13.petla'), opis: 'Dwa kroki przygotowawcze, potem pętla: ocena, selekcja, krzyżowanie, mutacja, aż do warunku stopu. Pętla wraca do oceny przystosowania, a nie do losowania populacji (to tylko raz).' }),
    1,
    fa(16, 2, 'sekcja 02', 'Podział pracy w pętli', 'Selekcja i krzyżowanie tylko przestawiają i mieszają to, co już jest w populacji. Jedynym źródłem nowego materiału genetycznego po starcie jest mutacja.'),
    2,
    S(17, 1, 'sekcja 02', { pytanie: 'Wymień cztery warunki stopu algorytmu genetycznego.', svg: F('fig13.stop'), odpowiedz: 'Liczba pokoleń albo budżet ocen, brak poprawy najlepszego osobnika przez zadaną liczbę pokoleń, osiągnięcie zadanej jakości, zanik różnorodności populacji. Żaden nie jest warunkiem optymalności.' }),
    10]],
  [2, [
    3,
    S(18, 1, 'sekcja 03', { tytul: 'Eksploracja i eksploatacja', svg: F('fig13.os'), opis: 'Eksploracja: nowe rejony (populacja początkowa, mutacja). Eksploatacja: wykorzystanie dobrych (selekcja, krzyżowanie). Skrajności: błądzenie losowe i przedwczesna zbieżność.' }),
    8, 11, 12]],
  [3, [
    S(19, 1, 'sekcja 04', { pytanie: 'Wymień parametry algorytmu genetycznego i w którą stronę przesuwa ich zwiększenie.', svg: F('fig13.parametry'), odpowiedz: 'Rozmiar populacji i mutacja: ku eksploracji. Krzyżowanie, nacisk selekcyjny (rozmiar turnieju) i elitaryzm: ku eksploatacji. Liczba pokoleń to budżet, nie równowaga.' }),
    4,
    fa(20, 2, 'sekcja 04', 'Mutacja: najważniejszy parametr', 'Jedyne źródło nowego materiału po starcie. Podaje się ją na gen, częsta reguła pm = 1/L (L długość chromosomu, średnio jeden zmutowany gen na osobnika). Pomiary na funkcji Rastrigina (5 wymiarów, 40 przebiegów): bez mutacji trafia 37,5% przebiegów, przy dobrej mutacji 95%, przy zbyt dużej żaden.'),
    fa(21, 2, 'sekcja 04', 'Rozmiar populacji i krzyżowanie', 'Większa populacja to więcej rejonów badanych równolegle, ale droższe pokolenie, przy stałym budżecie to podział między osobniki a pokolenia (skrajnie: 15 pokoleń daje 2,5% skuteczności). Krzyżowanie (0,6–0,95) to główny mechanizm łączenia dobrych cech, ale samo nie wprowadza nowego materiału.'),
    fa(22, 2, 'sekcja 04', 'Nacisk selekcyjny i elitaryzm', 'Nacisk: w turnieju rozmiar turnieju (2 łagodny, 10 bardzo ostry), w ruletce zależy od rozrzutu przystosowań, stąd skalowanie lub rangowanie. Turniej jednoosobowy (brak selekcji) zawodzi. Elitaryzm przenosi najlepszego bez zmian i podnosi skuteczność z 80% do 95%, przesada daje kopie lidera.'),
    9]],
  [4, [
    dp(23, 2, 'sekcja 05', 'Jak przeciwdziałać przedwczesnej zbieżności? (sześć sposobów)', 'Większa mutacja, mniejszy nacisk selekcyjny, większa populacja, parametry zmienne w czasie (najsensowniejsze), wymuszona różnorodność (nisze, fitness sharing, usuwanie duplikatów), restart z zachowaniem elity.'),
    5, 6, 7,
    fa(24, 2, 'sekcja 06', 'Dobór parametrów w praktyce', 'Zacznij od typowych (N 50–200, pc 0,6–0,95, pm 0,001–0,05 na gen, turniej 2–3, elitaryzm 1). Ustal budżet ocen, uruchamiaj wielokrotnie (średnia, mediana, odsetek udanych), mierz różnorodność, strój najpierw mutację, na końcu populację, dociągnij wynik metodą lokalną (9).'),
    [13, {}]]]
]);
