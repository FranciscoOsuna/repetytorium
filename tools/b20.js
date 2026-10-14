const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(20, 3, [
  [1, [
    1,
    S(16, 1, 'sekcja 03', { tytul: 'Podobieństwa: ta sama pętla', svg: F('fig20.kroki'), opis: 'Pięć kroków, ta sama kolejność i rola każdej wielkości w obu filtrach: predykcja stanu, predykcja niepewności P, wzmocnienie K, korekcja pomiarem, aktualizacja P.' }),
    4,
    fa(17, 2, 'sekcja 03', 'Cztery rzeczy identyczne', 'Struktura predykcja–korekcja („przewidź, zmierz, popraw”). Znaczenie Q (nieufność wobec modelu) i R (wobec czujnika). Rola wzmocnienia K: rozstrzyga spór model–pomiar, liczone z macierzy kowariancji. Wymagania: model obiektu i obserwowalność, wynik to estymata całego stanu z części pomiarów.'),
    dp(18, 2, 'sekcja 03', 'Dlaczego R jest tylko w kroku 3, a Q tylko w 2?', 'Q to nieufność wobec modelu, więc potrzebne tam, gdzie idziemy w przód po modelu (krok 2, niepewność rośnie). R to nieufność wobec czujnika, więc potrzebne przy liczeniu K (krok 3), w krokach 4 i 5 działa pośrednio przez K.'),
    pf(19, 1, 'sekcja 03', 'Filtr rozszerzony to zupełnie inna metoda niż filtr Kalmana.', false, 'To ten sam filtr Kalmana zastosowany do modelu linearyzowanego na bieżąco wokół własnej estymaty.')]],
  [2, [
    S(20, 1, 'sekcja 04', { tytul: 'Gdzie są różnice', svg: F('fig20.roznice'), opis: 'W krokach 1 i 4 macierze modelu ustępują funkcjom f i h. W krokach 2, 3 i 5 stałe macierze A, C ustępują jakobianom F, H liczonym w każdym kroku. Wynik jest przybliżony, nie optymalny.' }),
    2, 3,
    S(21, 1, 'sekcja 04', { tytul: 'Linearyzacja wokół bieżącej estymaty', svg: F('fig20.styczna'), opis: 'EKF stawia styczną do nieliniowego modelu w punkcie, w którym filtr widzi obiekt, i przesuwa ją za estymatą w każdym kroku. Zwykły KF z modelem zlinearyzowanym raz ma styczną w jednym, ustalonym punkcie.' }),
    5, 6, 7, 8, 11, 12, 13]],
  [3, [
    14,
    S(22, 1, 'sekcja 05', { pytanie: 'Wymień zastosowania rozszerzonego filtru Kalmana.', svg: F('fig20.zast'), odpowiedz: 'Obiekty nieliniowe (zbiorniki, reaktory, silniki), nawigacja i fuzja czujników, jednoczesna estymacja stanu i parametrów (rozszerzenie stanu), diagnostyka (np. zatkanie odpływu).' }),
    9, 10, 15]]
]);
