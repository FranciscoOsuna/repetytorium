const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(28, 5, [
  [1, [
    fa(1, 1, 'sekcja 01', 'SVM w jednym zdaniu', 'Klasyfikator, który spośród wszystkich granic rozdzielających dwie klasy wybiera tę o największym marginesie, czyli najszerszą ulicę między klasami. Granicę wyznaczają tylko próbki na krawędzi ulicy, czyli wektory nośne.'),
    S(2, 1, 'sekcja 02', { tytul: 'Najszersza ulica i wektory nośne', svg: F('fig28.ulica'), opis: 'Granica biegnie środkiem ulicy, krawężniki opierają się o najbliższe próbki. Usunięcie pozostałych próbek niczego by nie zmieniło.' }),
    dp(3, 2, 'sekcja 02', 'Dlaczego wybiera się najszerszą ulicę?', 'Nowe próbki będą trochę inne niż uczące. Granica z największym zapasem po obu stronach najrzadziej się pomyli, czyli najlepiej uogólnia.'),
    fi(4, 1, 'sekcja 02', 'Co to są wektory nośne?', 'Próbki leżące na krawężnikach ulicy (albo w niej). Tylko one mają niezerowe mnożniki Lagrange’a i tylko one wyznaczają granicę.'),
    pf(5, 1, 'sekcja 02', 'Usunięcie próbki, która nie jest wektorem nośnym, zmienia granicę SVM.', false, 'Nie zmienia. Takie próbki mają mnożnik zero. Usunięcie wektora nośnego natomiast od razu poszerza ulicę i obraca granicę.'),
    fa(6, 2, 'sekcja 01', 'Pojęcia', 'Hiperpłaszczyzna decyzyjna wᵀx + b = 0 (w jest prostopadły do granicy). Etykieta y = +1 albo −1. Margines to szerokość ulicy. Zmienna luzu ξ mówi, jak bardzo próbka narusza margines. C to kara za naruszenia, σ szerokość jądra Gaussa.')]],
  [2, [
    fa(7, 2, 'sekcja 03', 'Rampa i poziomice', 'f(x) = wᵀx + b to wysokość pochylonej rampy nad punktem x. Granica to poziomica f = 0, krawężniki to poziomice f = ±1. Wektor w wskazuje pod górę, prostopadle do poziomic.'),
    dp(8, 2, 'sekcja 03', 'Jaka jest szerokość ulicy w SVM?', '2/‖w‖. ‖w‖ to stromość rampy: stroma rampa szybko przechodzi od −1 do +1, więc ulica jest wąska. Najszersza ulica to najłagodniejsza rampa, która stawia wszystkie próbki co najmniej na wysokości ±1.'),
    fa(9, 2, 'sekcja 04', 'Zadanie optymalizacji', 'Minimalizuj ½‖w‖² przy ograniczeniach yᵢ(wᵀxᵢ + b) ≥ 1. Kwadrat zamiast długości dla wygody, funkcja jest wypukła, ma jedno minimum, to zadanie kwadratowe z ograniczeniami liniowymi.'),
    dp(10, 3, 'sekcja 03', 'Dlaczego wolno przyjąć ograniczenie ±1?', 'Pomnożenie w i b przez tę samą liczbę zmienia tylko stromość rampy, nie położenie poziomicy zero. Skalę dobiera się tak, by najbliższe próbki stały dokładnie na ±1.'),
    fa(11, 2, 'sekcja 04', 'Mnożniki Lagrange’a to siły', 'Ulica jest sztywną deską, próbki to przeszkody naciskające na nią z siłą λ. Próbki daleko od ulicy nie naciskają (λ = 0), czyli warunek KKT: albo dotykam, albo nie pcham. Siły z obu stron się równoważą: Σλᵢyᵢ = 0.'),
    fi(12, 3, 'sekcja 04', 'Jak z mnożników wychodzi wektor w?', 'w = Σλᵢyᵢxᵢ. Suma obejmuje tylko wektory nośne, bo reszta ma λ = 0.'),
    fa(13, 3, 'sekcja 04', 'Postać dualna', 'Niewiadomymi zostają same siły λ, a dane występują tylko w iloczynach skalarnych xᵢᵀxⱼ. Dlatego iloczyn można zastąpić funkcją jądra.'),
    dp(14, 3, 'sekcja 05', 'Policz SVM dla wektorów nośnych (2; 2) z klasy +1 i (0; 0) z klasy −1.', 'Równowaga sił daje λ₁ = λ₂ = λ, w = λ(2; 2). Warunki na krawężnikach: 2w₁+2w₂+b = 1 i b = −1, stąd w = (1/2; 1/2), b = −1. Granica x + y = 2, szerokość 2/‖w‖ = 2√2, czyli odległość między (0;0) i (2;2).'),
    fa(15, 3, 'sekcja 05', 'Wartość f jako miara pewności', 'Dla powyższej granicy f(x) = ½x₁ + ½x₂ − 1. Gdy |f| < 1, próbka leży w ulicy i decyzja jest niepewna, nawet jeśli znak jest jasny.'),
    lu(16, 2, 'sekcja 04', 'Zadanie SVM jest zadaniem ___ z ograniczeniami liniowymi.', ['kwadratowym', 'liniowym', 'nieliniowym'], 0, 'Funkcja celu jest kwadratowa i wypukła, więc minimum jest jedno.')]],
  [3, [
    fa(17, 1, 'sekcja 06', 'Miękki margines', 'W danych z procesu klasy się nakładają (szum, stany przejściowe, błędne etykiety) i żadna ulica nie spełnia wszystkich ograniczeń. Każda próbka dostaje zmienną luzu ξ, a za luz płaci się karą C·Σξ.'),
    fi(18, 2, 'sekcja 06', 'Jak działa parametr C?', 'To cena za próbkę po złej stronie. Małe C: szeroka ulica, wiele błędów, gładka granica, ryzyko niedouczenia. Duże C: wąska, powyginana ulica, silne karanie błędów, ryzyko przeuczenia.'),
    pf(19, 2, 'sekcja 06', 'W postaci dualnej miękki margines zmienia tylko jedno ograniczenie: 0 ≤ λ ≤ C.', true, 'Wszystko inne w zadaniu dualnym zostaje.'),
    S(20, 1, 'sekcja 07', { tytul: 'Sztuczka jądra na jednej zmiennej', svg: F('fig28.jadro'), opis: 'Klasa +1 w środku, −1 po bokach: żaden próg na osi x ich nie rozdzieli. Po dopisaniu x² wystarcza pozioma prosta, w przestrzeni wejść to dwa progi.' }),
    fa(21, 2, 'sekcja 07', 'Jądro zamiast iloczynu skalarnego', 'Zadanie dualne zawiera dane tylko w iloczynach skalarnych, więc zastępuje się je funkcją jądra K(x, y). Nie trzeba znać samego przekształcenia, tylko K. Najczęściej jądro Gaussa exp(−‖x−y‖²/2σ²).'),
    dp(22, 3, 'sekcja 07', 'Jak czytać SVM z jądrem Gaussa?', 'Każdy wektor nośny to źródło dzwonowatego pola ze znakiem swojej klasy i wagą λ. Klasyfikacja to sprawdzenie, które pola przeważają w danym punkcie. σ decyduje, jak daleko sięga każde pole.')]],
  [4, [
    po(23, 2, 'sekcja 08', 'C i σ: za mały i za duży', ['Za mały', 'Za duży'], [['C', 'szeroka ulica, dużo błędów (niedouczenie)', 'wąska, powyginana ulica (przeuczenie)'], ['σ', 'wyspy wokół próbek (przeuczenie)', 'granica prawie liniowa (niedouczenie)']]),
    fi(24, 2, 'sekcja 08', 'Jak dobiera się C i σ w praktyce?', 'Przegląd siatki wartości w skali logarytmicznej i walidacja krzyżowa: dla każdej pary uczy się na części danych i sprawdza na pozostałych. Wcześniej trzeba skalować cechy, bo SVM nie jest niezmiennicza względem skali.'),
    dp(25, 3, 'sekcja 08', 'Czy najlepszy model to ten z najwyższą trafnością uczącą?', 'Nie. Trafność ucząca rośnie z C i maleje z σ, ale model dopasowany do pojedynczych próbek się przeucza. Wybór robi się na walidacji, nie na danych uczących.')]],
  [5, [
    S(26, 1, 'sekcja 10', { tytul: 'Miejsce SVM w diagnostyce', svg: F('fig28.diagnostyka'), opis: 'Diagnostyka jako rozpoznawanie wzorców: pomiary, cechy, klasyfikator, klasa stanu. PCA wykrywa odstępstwo, SVM identyfikuje awarię, o ile taką widziała.' }),
    S(27, 1, 'sekcja 10', { tytul: 'Fazy budowy klasyfikatora', svg: F('fig28.fazy'), opis: 'Dane (skalowanie), model (jądro, C, σ), uczenie z walidacją, użycie z oceną na danych testowych.' }),
    fa(28, 2, 'sekcja 10', 'SVM w diagnostyce kontra PCA', 'PCA uczy się tylko normy i wykrywa odstępstwa. SVM uczy się na przykładach każdej klasy i nazywa awarię, pod warunkiem, że taką awarię widziała.'),
    fi(29, 2, 'sekcja 10', 'Jak zrobić z SVM klasyfikator wieloklasowy?', 'Jeden na jeden: osobna maszyna dla każdej pary klas, K(K−1)/2 maszyn, głosowanie. Jeden na resztę: K maszyn klasa kontra wszystkie inne, wygrywa największa wartość f.'),
    fa(30, 3, 'sekcja 10', 'Przykład: stany zbiornika', 'Trzy stany: norma, zatkany odpływ o 20%, czujnik poziomu zawyża o 0,6 m. SVM liniowa myli awarie (79% trafności na teście), SVM z jądrem Gaussa 90%. Pozostałe błędy są tam, gdzie krzywe obu awarii się przecinają (h ≈ 1,7 m): w przestrzeni (h, Q) wyglądają identycznie.'),
    dp(31, 3, 'sekcja 10', 'Co zrobić, gdy SVM myli dwie awarie mimo dobrych C i σ?', 'Dodać cechę, która je odróżnia (np. dopływ albo szybkość zmian poziomu). Klasyfikator nie naprawi złych cech, dlatego ekstrakcja cech stoi przed nim.'),
    po(32, 2, 'sekcja 10', 'Zalety i ograniczenia SVM', ['Zalety', 'Ograniczenia'], [['Optymalizacja', 'jedno minimum globalne', 'uczenie rośnie szybko z liczbą próbek'], ['Dane', 'dobre uogólnianie przy mało próbek', 'potrzebne etykiety także z awarii'], ['Nieliniowość', 'jądro zmienia granicę bez zmiany algorytmu', 'dobór jądra, C, σ i skalowanie'], ['Wynik', 'model zależy tylko od wektorów nośnych', 'dwuklasowa, nie rozpozna awarii spoza danych']]),
    pf(33, 2, 'sekcja 10', 'SVM rozpozna awarię, której nie było w danych uczących.', false, 'Uczy się tylko na widzianych klasach. Wykrywanie nowych odstępstw to rola metod uczących się normy, np. PCA.')]]
]);
