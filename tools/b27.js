const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(27, 5, [
  [1, [
    1, 18,
    S(19, 1, 'sekcja 02', { tytul: 'Karty Shewharta a PCA', svg: F('fig27.karty'), opis: 'Osobne karty widzą prostokąt granic, T² widzi elipsę ułożoną wzdłuż chmury. Korelacja między zmiennymi też jest informacją, jej złamanie bywa pierwszym objawem awarii.' }),
    9,
    fa(20, 2, 'sekcja 03', 'PCA ma sens tylko dla skorelowanych danych', 'Przy zmiennych niezależnych wszystkie wartości własne są podobne, nie ma czego ścisnąć i żadnej osi nie da się odrzucić. Nowe osie są wzajemnie prostopadłe, a nowe zmienne nieskorelowane, bo macierz korelacji jest symetryczna.')]],
  [2, [
    S(21, 1, 'sekcja 04', { pytanie: 'Wymień kroki algorytmu budowy modelu PCA (4 fazy, 11 kroków).', svg: F('fig27.fazy'), odpowiedz: 'P przygotuj: 1 normalizacja, 2 macierz korelacji. R rozłóż: 3 wartości własne, 4 wektory własne, 5 sortowanie. W wybierz: 6 udziały informacji, 7 wybór liczby składowych L, 8 zredukowana macierz przeładowań. M monitoruj: 9 projekcja, 10 miary T² i SPE z granicami, 11 sprawdzanie nowych danych.' }),
    3, 10,
    fa(22, 2, 'sekcja 04', 'Macierz korelacji i wartości własne', 'Macierz korelacji zapisuje, które zmienne rosną i maleją razem, dalsze kroki korzystają tylko z niej. Wartości własne to wariancje wzdłuż osi, dla danych znormalizowanych ich suma równa się liczbie zmiennych (ślad macierzy).'),
    11, 12, 6,
    fa(23, 2, 'sekcja 04', 'Zredukowana macierz przeładowań P', 'Pierwsze L wektorów własnych ustawione w kolumny. To właściwy model PCA. Model zapisany do pracy to: średnie, odchylenia, macierz P, wartości własne i dwie granice.'),
    4]],
  [3, [
    fa(24, 2, 'sekcja 05', 'Przykład: dwa termometry', 'Dwa termometry mierzą to samo, 8 próbek z normalnej pracy. Po normalizacji PC1 wychodzi pod kątem 45°: to „średnia obu termometrów”, PC2 to „różnica między nimi”. Udział PC1 wynosi 95,2%, więc L = 1: dwie liczby zastąpiono jedną.'),
    S(25, 1, 'sekcja 06', { tytul: 'Pas normy modelu PCA', svg: F('fig27.elipsa'), opis: 'Zielony pas to obszar normy: długość wyznacza granica T², szerokość granica SPE. P leży w pasie. Q wypadło w poprzek (duże SPE), R leży na linii modelu, ale za jej końcem (duże T²).' }),
    po(26, 2, 'sekcja 05', 'Trzy nowe próbki z przykładu', ['T²', 'SPE'], [['P (63,0; 62,8)', '0,25', '0,00: norma'], ['Q (64,5; 60,0)', '0,00', '2,96 ≫ 0,36: termometry się rozjechały'], ['R (67,0; 66,4)', '6,84 > 5,59: zgodnie, ale za gorąco', '0,01']]),
    dp(27, 3, 'sekcja 05', 'Dlaczego dwie osobne karty nie wykryją próbki Q?', 'Każdy termometr osobno mieści się w swoich granicach, więc karty milczą. SPE od razu pokazuje, że jeden termometr kłamie, bo złamana jest korelacja. Tego nie da się wykryć bez modelu korelacji.'),
    dp(28, 3, 'sekcja 05', 'Czy próbka ucząca nad granicą SPE oznacza błąd modelu?', 'Nie. Przy poziomie 95% średnio co dwudziesta całkiem normalna próbka przekroczy granicę (próbka ucząca nr 8 ma SPE nad granicą 0,36). Dlatego alarm ogłasza się, gdy granica jest przekroczona w kilku kolejnych próbkach.')]],
  [4, [
    S(29, 1, 'sekcja 06', { tytul: 'Dwie miary diagnostyczne', svg: F('fig27.miary'), opis: 'T²: jak daleko próbka odeszła wzdłuż modelu (zmiana punktu pracy). SPE: jak bardzo wypadła z modelu, czyli błąd odtworzenia (złamana korelacja, dryf czujnika).' }),
    2, 7, 15, 5, 14,
    fa(30, 2, 'sekcja 06', 'Granice T² i SPE', 'T²: z kwantyla rozkładu F-Snedecora, dla m zmiennych i n próbek uczących. SPE: wzór Jacksona–Mudholkara z odrzuconych wartości własnych, wyznaczane z danych normalnych na poziomie ufności np. 95% lub 99%.'),
    13]],
  [5, [
    8,
    S(31, 1, 'sekcja 06', { tytul: 'PCA w fazach diagnostyki', svg: F('fig27.fdd'), opis: 'Detekcja: T² lub SPE ponad granicą. Izolacja: wykres wkładów wskazuje zmienne odpowiedzialne. Identyfikacja rodzaju usterki wymaga wiedzy o procesie.' }),
    16, 17]]
]);
