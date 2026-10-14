const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(30, 5, [
  [1, [
    13, 9,
    S(14, 1, 'sekcja 02', { tytul: 'Siatka i wektor wag', svg: F('fig30.siatka'), opis: 'Siatka jest sztywna i mówi tylko, kto jest czyim sąsiadem. Ruszają się wagi: te same neurony po nauczeniu leżą w przestrzeni danych blisko siebie, jeśli są sąsiadami na siatce (zachowanie topologii).' }),
    10,
    S(15, 1, 'sekcja 04', { pytanie: 'Wymień pięć podstawowych mechanizmów samoorganizacji sieci neuronowych.', svg: F('fig30.lista'), odpowiedz: 'Konkurencja (kto wygrał), adaptacja wag zwycięzcy, sąsiedztwo topologiczne, malejące parametry (krok i promień), mechanizmy przeciw martwym neuronom.' }),
    1, 2]],
  [2, [
    3, 4,
    fa(16, 2, 'sekcja 05', 'Konkurencja i adaptacja dają WTA', 'Same mechanizmy 1 i 2 dają uczenie konkurencyjne WTA (zwycięzca bierze wszystko): dobry kwantyzator, ale nie mapa, bo sąsiedzi na siatce trafiają w różne miejsca. Dopiero sąsiedztwo robi z kwantyzatora mapę.'),
    fa(17, 2, 'sekcja 05', 'Miara odległości w konkurencji', 'Zwykle odległość euklidesowa. Alternatywa: miara kątowa (największy iloczyn skalarny), wymaga normalizacji wektorów, bo inaczej wygrywałby neuron o największych wagach.')]],
  [3, [
    5,
    S(18, 1, 'sekcja 06', { tytul: 'WTA a WTM', svg: F('fig30.wta'), opis: 'WTA: uczy się tylko zwycięzca (kwantyzator, martwe neurony). WTM: zwycięzca i sąsiedzi z siłą malejącą z odległością na siatce (mapa z topologią).' }),
    8, 12,
    6,
    S(19, 1, 'sekcja 07', { tytul: 'Dwie fazy uczenia', svg: F('fig30.fazy'), opis: 'Porządkowanie (duże η i promień) rozplątuje mapę, dostrajanie (małe η, promień rzędu jednego neuronu) poprawia dokładność. Kolejność jest nieodwracalna: raz zawiązanego węzła nie rozplącze małe sąsiedztwo.' })]],
  [4, [
    7,
    S(20, 1, 'sekcja 08', { pytanie: 'Jak przeciwdziałać martwym neuronom?', svg: F('fig30.martwe'), odpowiedz: 'Sąsiedztwo (WTM, najskuteczniejsze), sumienie (kara dla zbyt częstego zwycięzcy), zmęczenie (wyłączenie po wygranej), inicjalizacja wag z danych lub z płaszczyzny dwóch składowych głównych.' }),
    fa(21, 3, 'sekcja 08', 'Martwe neurony w liczbach', 'Przy czystym WTA 24 z 40 neuronów nigdy nie wygrało. Sumienie zmniejsza to do ośmiu i poprawia błąd kwantyzacji z 0,149 do 0,111. Sąsiedztwo usuwa problem całkowicie.')]],
  [5, [
    S(22, 1, 'sekcja 09', { tytul: 'Własności mapy i ich źródła', svg: F('fig30.wlasnosci'), opis: 'Zachowanie topologii wynika z sąsiedztwa, dopasowanie do gęstości z konkurencji, kwantyzacja wektorowa z adaptacji.' }),
    S(23, 2, 'sekcja 09', { tytul: 'Dwie miary jakości mapy', svg: F('fig30.miary'), opis: 'Błąd kwantyzacji: średnia odległość próbki od najbliższego neuronu. Błąd topograficzny: odsetek próbek, dla których dwa najbliższe neurony nie sąsiadują na siatce. Patrzy się na oba naraz.' }),
    11,
    fa(24, 3, 'sekcja 09', 'Zastosowanie diagnostyczne', 'Mapa nauczona na sprawnym obiekcie opisuje normę. Odległość nowego pomiaru do najbliższego neuronu to wskaźnik diagnostyczny: dane zdrowe średnio 0,105, po symulowanym wycieku 0,447 (ponad cztery razy więcej), bez żadnego przykładu uszkodzenia.'),
    dp(25, 3, 'sekcja 09', 'Jakie inne sieci samoorganizujące warto znać?', 'Gaz neuronowy (bez sztywnej siatki, sąsiedztwo z rankingu odległości), sieci ART (dylemat stabilności i plastyczności: nowy neuron, gdy próbka za mało podobna), LVQ (wersja z nauczycielem, to już nie samoorganizacja).')]]
]);
