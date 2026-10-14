const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(40, 4, [
  [1, [
    1,
    S(17, 1, 'sekcja 02', { tytul: 'Pętla filtru Kalmana', svg: F('fig40.petla'), opis: 'W każdej próbce: predykcja modelem i sterowaniem, potem korekcja pomiarem. Wynik to estymata stanu i jej niepewność P.' }),
    2,
    S(18, 1, 'sekcja 02', { tytul: 'Skąd bierze się wzmocnienie K', svg: F('fig40.wzm'), opis: 'Wzmocnienie porównuje niepewność prognozy z niepewnością pomiaru: filtr jest ważoną średnią dwóch źródeł wiedzy. Liczy się je z równania Riccatiego na podstawie Q i R.' }),
    ]],
  [2, [
    fa(19, 2, 'sekcja 02', 'Czym się stroi filtr', 'Dwiema macierzami: R (ile szumu ma czujnik) i Q (jak bardzo obiekt odbiega od modelu). To założenia o rzeczywistości, nie dowolne pokrętła.'),
    11]],
  [3, [
    S(20, 1, 'sekcja 03', { tytul: 'Struktura sprzężenia od estymaty', svg: F('fig40.struktura'), opis: 'Filtr pracuje wewnątrz regulatora: dostaje pomiar y i to samo sterowanie u, które poszło do obiektu. Regulator dostaje estymatę zamiast stanu, którego nie mierzymy.' }),
    13, 12,
    S(21, 2, 'sekcja 03', { tytul: 'Trzy warianty struktury', svg: F('fig40.warianty'), opis: 'Filtr można wstawić w miejsce obserwatora przy zwykłej alokacji biegunów. Gdy oba wzmocnienia pochodzą z rachunku, struktura nazywa się LQG.' }),
    10, 9,
    fa(22, 3, 'sekcja 04', 'Liczby: filtr kontra szybki obserwator', 'Przy tym samym szumie czujnika obserwator 10 razy szybszy od regulatora daje błąd estymaty 0,2368 i odchylenie sterowania 0,0700, filtr Kalmana odpowiednio 0,0137 i 0,0055. Szybki obserwator przepisuje szum czujnika na zawór.'),
    4,
    S(23, 2, 'sekcja 03', { tytul: 'Zasada separacji', svg: F('fig40.separacja'), opis: 'Widmo układu zamkniętego to suma widm regulatora i estymatora, więc projektuje się je osobno. To dotyczy biegunów, nie zapasów stabilności.' }),
    5]],
  [4, [
    za(24, 1, 'sekcja 01', 'Zastosowania: stan, zakłócenie, diagnostyka, fuzja, MPC.', 'Stan dla regulatora, zakłócenia i parametry spoza modelu, innowacja do diagnostyki, łączenie czujników, estymator stanu dla MPC.'),
    S(25, 1, 'sekcja 05', { tytul: 'Cztery zastosowania filtru w sterowaniu', svg: F('fig40.zastosowania'), opis: 'Pierwsze, podstawowe, to stan dla regulatora. Pozostałe trzy wychodzą poza zwykłe sprzężenie od stanu.' }),
    3, 6, 16, 14, 15,
    S(26, 2, 'sekcja 06', { tytul: 'Diagnostyka przez innowację', svg: F('fig40.innowacja'), opis: 'Innowacja to różnica między pomiarem a przewidywaniem filtru. Przy poprawnym modelu jest białym szumem o zerowej średniej, każda struktura zdradza błąd.' }),
    7, 8]],
]);
