const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(44, 5, [
  [1, [
    1,
    S(8, 1, 'sekcja 02', { tytul: 'Cele analizy wrażliwości', svg: F('fig44.cele'), opis: 'Analiza bada, jak zmiany parametrów zmieniają decyzję i jej skutki, bez rozwiązywania zadania od nowa. Cztery cele: ryzyko, wycena zasobów, margines błędu danych, ocena zmian w systemie.' }),
    S(9, 1, 'sekcja 09', { tytul: 'Możliwości realizacji', svg: F('fig44.mozliwosci'), opis: 'Każda grupa parametrów zadania liniowego daje inny wynik: przedział stabilności, ceny dualne, koszt zredukowany albo ocenę technologii.' })]],
  [2, [
    fa(10, 1, 'sekcja 03', 'Zadanie bazowe', 'Dwa produkty o zyskach 3 i 1 jp./szt. Surowiec: 2 kg na produkt 1 i 1 kg na produkt 2, razem 50. Rynek 1 przyjmie najwyżej 20 szt., rynek 2 najwyżej 30. Cel: max 3x₁ + x₂.'),
    S(11, 1, 'sekcja 03', { tytul: 'Obszar dopuszczalny i optimum', svg: F('fig44.zadanie'), opis: 'Wierzchołki 0, D(0, 30), A(10, 30), B(20, 10), C(20, 0) dają zysk 0, 30, 60, 70, 60. Optimum B(20, 10), z = 70. Aktywne są surowiec i rynek 1, rynek 2 ma luz 20.' }),
    fa(12, 2, 'sekcja 03', 'Baza', 'Baza to zestaw ograniczeń aktywnych w optimum (tu surowiec i rynek 1). Analiza wrażliwości pyta zawsze o to samo: jak bardzo można zmienić dane, zanim zmieni się baza.')]],
  [3, [
    fa(13, 2, 'sekcja 04', 'Zmiana cⱼ obraca prostą zysku', 'Zmiana ceny zmienia tylko nachylenie prostych zysku, ograniczenia stoją. B wygrywa, dopóki prosta zysku jest bardziej stroma niż krawędź surowca (nachylenie −2), czyli c₁/c₂ ≥ 2.'),
    S(14, 2, 'sekcja 04', { tytul: 'Przedziały stabilności cⱼ', svg: F('fig44.c'), opis: 'Zawsze jeden parametr naraz. Wewnątrz przedziału plan zostaje, zmienia się tylko zysk. Na granicy remis całej krawędzi, za nią skok do innego wierzchołka.' }),
    S(15, 2, 'sekcja 05', { tytul: 'Zysk w funkcji zasobu', svg: F('fig44.zb'), opis: 'Nachylenie łamanej to cena dualna: 1,5 poniżej 40, 1 w przedziale [40; 70], 0 powyżej 70 (surowiec leży w magazynie).' }),
    2, 3, 6]],
  [4, [
    S(16, 2, 'sekcja 06', { tytul: 'Nowy produkt: koszt zredukowany', svg: F('fig44.zredukowany'), opis: 'Produkt 3 zużywa 1,5 kg surowca. Koszt alternatywny to 1,5 jp., zysk 2, więc koszt zredukowany +0,5 i produkt się opłaca. Nowy plan (20; 0; 6,67) daje +3,33 jp.' }),
    4,
    fa(17, 3, 'sekcja 07', 'Zmiana technologii aᵢⱼ', 'Gdy maszyna zużywa 1,5 kg zamiast 2 kg surowca na produkt 1, prosta surowca obraca się wokół (0, 50). Baza trwa dla a₁₁ między 1 a 2,5, a dla 1,5 plan (20, 20) daje 10 jp. więcej: tyle najwyżej warto zapłacić.'),
    5]],
  [5, [
    S(18, 2, 'sekcja 08', { pytanie: 'Co zawiera raport wrażliwości solvera i skąd się to bierze?', svg: F('fig44.raport'), odpowiedz: 'Koszt zredukowany (0 dla zmiennych w bazie), cena dualna (1, 1, 0), dopuszczalny wzrost i spadek jako odległość do końców przedziału stabilności bazy.' }),
    7]],
]);
