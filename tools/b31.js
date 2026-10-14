const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(31, 5, [
  [1, [
    1, 2,
    S(19, 1, 'sekcja 02', { tytul: 'Idea kernel PCA', svg: F('fig31.idea'), opis: 'Nieliniową zależność przenosimy do przestrzeni cech, gdzie jest liniowa, i wykonujemy tam zwykłe PCA. Sztuczka jądra pozwala nigdy nie liczyć samego odwzorowania Φ.' }),
    3, 17,
    S(20, 2, 'sekcja 03', { tytul: 'Warunki Mercera', svg: F('fig31.mercer'), opis: 'Nie każda funkcja jest jądrem: potrzebna symetria i półdodatnio określona macierz K. Dopiero wtedy k jest iloczynem skalarnym w jakiejś przestrzeni cech.' }),
    4,
    S(21, 1, 'sekcja 03', { tytul: 'Typowe funkcje jądra', svg: F('fig31.jadro'), opis: 'Jądro liniowe sprowadza kPCA do PCA, a bez przesłanek do innego wyboru zaleca się jądro Gaussa z jednym parametrem σ.' }),
    5, 12]],
  [2, [
    S(22, 1, 'sekcja 04', { pytanie: 'Wymień kroki algorytmu budowy modelu Kernel PCA (10 kroków w 4 fazach).', svg: F('fig31.fazy'), odpowiedz: 'P: dane i normalizacja, jądro i parametr. J: macierz K, centrowanie. R: wartości i wektory własne, skalowanie α, wybór L. M: rzut nowej próbki, miara i granica, sprawdzanie.' }),
    kr(23, 2, 'sekcja 04', 'Kernel PCA: kroki 1–5 (przygotowanie, jądro, rozkład)', ['Znormalizuj dane jak w PCA', 'Wybierz funkcję jądra i jej parametr (np. σ)', 'Policz macierz jądra K, N×N', 'Wycentruj K w przestrzeni cech', 'Wyznacz wartości i wektory własne K'], 'Struktura jak w PCA, tylko zamiast macierzy kowariancji zmiennych jest macierz jądra między próbkami.'),
    kr(31, 2, 'sekcja 04', 'Kernel PCA: kroki 6–10 (skalowanie, L, monitoring)', ['Przeskaluj wektory: α = v/√λ', 'Wybierz liczbę składowych L', 'Rzutuj nowe próbki przez jądro z próbkami uczącymi', 'Policz SPE (i T²) w przestrzeni cech i wyznacz granicę', 'Sprawdź model na danych uczących i walidacyjnych'], 'Rzut nowej próbki wymaga całego zbioru uczącego, a granica to izolinia SPE poniżej wartości granicznej.'),
    7,
    fa(24, 3, 'sekcja 04', 'Po co skalowanie α = v/√λ', 'Wektory własne K mają długość 1, a w przestrzeni cech osie główne muszą mieć długość 1. Dzielenie przez √λ to wymusza, dzięki czemu rzut nowej próbki daje poprawne współrzędne.'),
    18]],
  [3, [
    fa(25, 2, 'sekcja 05', 'Przykład: trzy próbki, jądro Gaussa', 'Dla trzech próbek na prostej PC1 przyjmuje wartości −0,66; 0; +0,66, a PC2 wartości +0,20; −0,40; +0,20. Dwie składowe z trzech możliwych (N = 3) już opisują układ, a SPE nowej próbki dąży do stałej 1,56.'),
    fi(26, 3, 'sekcja 05', 'Ile składowych może mieć kPCA dla trzech próbek?', 'Najwyżej trzy, bo macierz jądra ma wymiar N×N = 3×3. Jedna składowa jest zwykle zerowa po centrowaniu.'),
    15]],
  [4, [
    S(27, 1, 'sekcja 06', { tytul: 'PCA a kernel PCA', svg: F('fig31.porownanie'), opis: 'PCA rozkłada macierz korelacji M×M i zakłada liniowość, kPCA macierz jądra N×N i wiąże nieliniowości. Granica w PCA to pas, w kPCA izolinia dopasowana do danych.' }),
    8, 9,
    S(28, 2, 'sekcja 06', { tytul: 'SPE: PCA i kernel PCA', svg: F('fig31.spe'), opis: 'W PCA błąd rekonstrukcji rośnie bez ograniczeń, w kPCA daleko od danych zbiega do stałej, więc granicę wybiera się jako izolinię poniżej tej stałej.' }),
    14]],
  [5, [
    13,
    fa(29, 3, 'sekcja 05', 'Zbiornik: PCA kontra kPCA', 'W przykładzie ze zbiornikiem PCA wykrywa około 50% awarii, kPCA około 94%. Fałszywe alarmy: PCA 1,4%, kPCA 2,7%. Wzrost wykrywalności jest wyraźnie większy niż koszt fałszywych alarmów.'),
    10, 11,
    S(30, 2, 'sekcja 05', { tytul: 'Dobór σ i L', svg: F('fig31.param'), opis: 'σ za duże daje model jak PCA, za małe fałszywe alarmy. L za małe luźną granicę, za duże przeuczenie.' }),
    16]],
]);
