const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(33, 4, [
  [1, [
    fa(1, 1, 'sekcja 01', 'Pytanie o proces', 'Trzeba opowiedzieć, co robi się po kolei, od wymagań do uruchomienia. To synteza bloku: warstwy (32), sprzęt (22), sieci (21) i struktury rozproszone (24) pojawiają się jako kroki jednego projektu.'),
    S(2, 1, 'sekcja 01', { tytul: 'Proces budowy jako model V', svg: F('fig33.v'), opis: 'Lewe ramię: rozkład wymagań i projekt. Prawe: integracja i walidacja. Każdy test po prawej sprawdza etap na tej samej wysokości po lewej.' }),
    kr(3, 1, 'sekcja 01', 'Kroki budowy systemu', ['Wymagania i analiza obiektu', 'Dekompozycja na słabo sprzężone podsystemy i dobór par wejście–wyjście', 'Wybór struktury: zdecentralizowana, rozproszona, hierarchiczna', 'Przydział podsystemów do węzłów sprzętowych i sieci', 'Oprogramowanie', 'Testy: moduły, HIL, FAT, SAT i uruchomienie'], 'Procedura jest iteracyjna i może wymagać kilku przejść przez kroki.'),
    fi(4, 1, 'sekcja 02', 'Co obejmuje etap wymagań i analizy obiektu?', 'Cele (co regulować, z jaką dokładnością, cele ekonomiczne), ograniczenia i bezpieczeństwo, listę sygnałów (pomiary i elementy wykonawcze), model (co najmniej wzmocnienia statyczne i stałe czasowe).'),
    dp(5, 2, 'sekcja 02', 'Po co lista sygnałów i model już na początku?', 'Z listy sygnałów powstanie przydział do modułów wejść/wyjść. Bez modelu nie da się ocenić sprzężeń ani dobrać okresów próbkowania.'),
    fa(6, 3, 'sekcja 01', 'Skogestad: z góry na dół i od dołu', 'Najpierw analiza z góry na dół (cele, stopnie swobody, zmienne regulowane), potem projekt od dołu (regulacja, warstwa nadrzędna, optymalizacja, walidacja). Procedura jest zwykle iteracyjna.')]],
  [2, [
    fa(7, 2, 'sekcja 03', 'Dekompozycja', 'Podsystem to grupa silnie sprzężonych pętli. Słabe sprzężenia się przecina: po podziale stają się wymianą danych między regulatorami (struktura rozproszona) albo zakłóceniem, które lokalny regulator usunie sam (zdecentralizowana).'),
    dp(8, 2, 'sekcja 03', 'Dlaczego dekompozycja decyduje o wszystkim dalej?', 'Jeśli podział przetnie silne sprzężenie, żaden lokalny regulator go nie skompensuje, a zignorowane sprzężenie daje duży błąd (przykład ze struktur zdecentralizowanych).'),
    fa(9, 2, 'sekcja 04', 'Macierz RGA', 'Macierz wzmocnień względnych (Bristol 1966) ocenia sprzężenia i pomaga dobrać pary wejście–wyjście. λ₁₁ to wzmocnienie u₁ → y₁ przy otwartej drugiej pętli podzielone przez to samo wzmocnienie przy zamkniętej. Wiersze i kolumny RGA sumują się do 1.'),
    S(10, 1, 'sekcja 04', { pytanie: 'Jak czytać element λ₁₁ macierzy RGA?', svg: F('fig33.rga'), odpowiedz: 'λ ≈ 1: pary na przekątnej, decentralizuj śmiało. λ < 0: zła para, zamień, bo wzmocnienie zmieniłoby znak po zamknięciu drugiej pętli. λ ≫ 1: pętle silnie ze sobą walczą, nie dziel, steruj razem (MPC albo struktura rozproszona).' }),
    pf(11, 2, 'sekcja 04', 'Parować należy na ujemnych elementach RGA.', false, 'Należy unikać (o ile to możliwe) parowania na ujemnych elementach RGA. Preferuje się układ z RGA bliską jedności.'),
    lu(12, 1, 'sekcja 04', 'Gdy λ ≫ 1, podsystemu ___ między dwa niezależne regulatory.', ['nie dzieli się', 'dzieli się', 'wyłącza się'], 0, 'Potrzebne sterowanie wielowymiarowe albo struktura rozproszona z wymianą danych.')]],
  [3, [
    fi(13, 2, 'sekcja 05', 'Jak dobrać strukturę po dekompozycji?', 'Słabe sprzężenia, RGA bliskie 1: zdecentralizowana. Umiarkowane sprzężenia i niezawodna sieć: rozproszona. Wspólny zasób lub cel (moc, plan): hierarchiczna. Silne sprzężenie wewnątrz podsystemu: jeden regulator wielowymiarowy (MPC).'),
    dp(14, 2, 'sekcja 05', 'W jakiej kolejności projektuje się regulatory?', 'Od dołu: najpierw pętle stabilizujące i szybkie (przepływy, poziomy), potem warstwa nadrzędna i koordynacja. Każdy regulator lokalny na modelu swojego podsystemu, wpływ sąsiadów jako zakłócenie albo mierzony sygnał z sieci.'),
    dp(15, 3, 'sekcja 05', 'Czy stabilne pętle lokalne dają stabilny układ?', 'Nie zawsze. Przy silnych sprzężeniach zestaw stabilnych pętli lokalnych nie musi być stabilny, więc na koniec trzeba sprawdzić stabilność całości.'),
    fa(16, 2, 'sekcja 06', 'Realizacja: węzły i sieć', 'Podsystem to węzeł sprzętowy z własnym sterownikiem i modułami wejść/wyjść przy obiekcie. Każdy sygnał do węzła swojego podsystemu, możliwie najbliżej obiektu, pętla zamyka się wewnątrz węzła. Sieć przenosi tylko to, co wynika ze słabych sprzężeń, i cele od koordynatora.'),
    fi(17, 2, 'sekcja 06', 'Jak zapewnić niezawodność w systemie rozproszonym?', 'Awaria sieci nie może zatrzymać węzła: każdy ma tryb pracy samodzielnej (ostatnie wartości zadane). Redundancja tam, gdzie awaria najdroższa. Cykl i opóźnienie sieci dobrane do dynamiki pętli, które przez nią przechodzą.'),
    fa(18, 2, 'sekcja 06', 'Oprogramowanie', 'Programy węzłów w językach IEC 61131-3 albo jako rozproszona aplikacja IEC 61499, wspólna baza zmiennych, konfiguracja SCADA i alarmów.')]],
  [4, [
    S(19, 1, 'sekcja 07', { tytul: 'Łańcuch testów', svg: F('fig33.testy'), opis: 'Kolejne etapy zastępują modele prawdziwymi elementami. FAT u dostawcy, SAT i uruchomienie na obiekcie z udziałem użytkownika.' }),
    fi(20, 2, 'sekcja 07', 'Co to jest HIL?', 'Hardware-in-the-loop: prawdziwe sterowniki i sieć pracują z symulatorem obiektu. Technika testowania złożonych systemów wbudowanych czasu rzeczywistego.'),
    po(21, 2, 'sekcja 07', 'FAT kontra SAT', ['FAT', 'SAT'], [['Gdzie', 'u dostawcy', 'na obiekcie'], ['Kto', 'pracownicy dostawcy', 'z udziałem użytkownika']]),
    fa(22, 2, 'sekcja 07', 'Uruchomienie', 'Sprawdzenie torów sygnałowych, strojenie regulatorów na obiekcie (najpierw pętle wewnętrzne, potem zewnętrzne), próby awarii węzłów i sieci, szkolenie operatorów.'),
    fa(23, 2, 'sekcja 07', 'Eksploatacja', 'Obejmuje utrzymanie, diagnostykę i modyfikacje, które wracają do lewego ramienia V.')]]
]);
