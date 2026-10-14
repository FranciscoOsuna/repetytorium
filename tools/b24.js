const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(24, 4, [
  [1, [
    fa(1, 1, 'sekcja 01', 'Idea', 'Duży obiekt dzieli się na podsystemy i każdy dostaje własny regulator. Struktury różnią się tym, ile regulatory wiedzą o sobie nawzajem. Cała trudność bierze się ze sprzężeń między podsystemami.'),
    fi(2, 1, 'sekcja 02', 'Wymień cztery bariery sterowania scentralizowanego.', 'Obliczenia (zadanie za duże na czas rzeczywisty), niezawodność (awaria jednego komputera zatrzymuje wszystko), komunikacja (wszystkie pomiary w jedno miejsce), modyfikowalność (nowy podsystem wymaga przeprojektowania całości).'),
    S(3, 1, 'sekcja 03', { pytanie: 'Wymień trzy struktury rozproszone i co wiedzą regulatory.', svg: F('fig24.struktury'), odpowiedz: 'Zdecentralizowana: tylko własne wejścia i wyjścia. Rozproszona: wymieniają dane z sąsiadami. Hierarchiczna: lokalne regulatory i koordynator ustalający cele lub ceny.' }),
    po(4, 2, 'sekcja 03', 'Zdecentralizowana, rozproszona, hierarchiczna', ['Zaleta', 'Wada'], [['zdecentralizowana', 'prosta, odporna na awarię sieci', 'ignoruje sprzężenia, traci jakość lub stabilność'], ['rozproszona', 'uwzględnia sprzężenia bez centrali', 'zależność od komunikacji, iteracje kosztują czas'], ['hierarchiczna', 'spójność przy lokalnym działaniu', 'koordynator jest wąskim gardłem']]),
    fi(5, 2, 'sekcja 03', 'Jak dzieli się struktury rozproszone?', 'Na nieiteracyjne (jedna wymiana na krok) i iteracyjne (do ustalenia decyzji) oraz na niekooperacyjne (własny wskaźnik) i kooperacyjne (wspólny wskaźnik, wynik bliski scentralizowanemu).'),
    fa(6, 2, 'sekcja 03', 'Lokalne regulatory to zwykle MPC', 'Naturalnie wymieniają przewidywane trajektorie sterowań, dlatego w strukturach rozproszonych lokalnie stosuje się najczęściej regulatory predykcyjne.'),
    pf(7, 1, 'sekcja 03', 'W strukturze zdecentralizowanej regulatory wymieniają dane z sąsiadami.', false, 'To cecha struktury rozproszonej. Zdecentralizowana nie ma wymiany danych.')]],
  [2, [
    S(8, 2, 'sekcja 04', { tytul: 'Co daje wymiana danych', svg: F('fig24.przyklad'), opis: 'Regulator zdecentralizowany przegrzewa o 50 %. Regulatory rozproszone wymieniają moce i błąd maleje o połowę przy każdej wymianie, aż dochodzą do rozwiązania scentralizowanego.' }),
    dp(9, 3, 'sekcja 04', 'Dlaczego błąd maleje o połowę w każdej wymianie?', 'Bo wpływ sąsiada (1) jest dwa razy mniejszy od własnego (2). Gdyby sprzężenie było silniejsze od wpływu własnego, iteracje by się rozbiegały i potrzebny byłby koordynator albo wspólny wskaźnik.'),
    za(10, 2, 'sekcja 04', 'Zdecentralizowane = ignoruję sąsiada. Rozproszone = wymieniam się z sąsiadem.', 'Rozproszone dochodzi do wyniku scentralizowanego, jeśli sprzężenie nie jest zbyt silne.'),
    lu(11, 2, 'sekcja 04', 'Regulator zdecentralizowany w przykładzie stref grzewczych przegrzewa o ___.', ['50%', '10%', '100%'], 0, 'Nie widzi wpływu sąsiada na swoją strefę.')]],
  [3, [
    fa(12, 1, 'sekcja 05', 'System wieloagentowy', 'System złożony z wielu współdziałających inteligentnych agentów. Agent to więcej niż regulator: sam postrzega otoczenie, ma cele i wiedzę, decyduje i porozumiewa się z innymi.'),
    S(13, 1, 'sekcja 05', { tytul: 'Budowa agenta', svg: F('fig24.agent'), opis: 'Regulator ma percepcję i działanie. Agent dokłada wiedzę, cele, decyzję i komunikację.' }),
    fi(14, 2, 'sekcja 05', 'Wymień cztery cechy agenta (Wooldridge i Jennings).', 'Autonomia, reaktywność (odpowiedź na zmiany otoczenia na czas), proaktywność (inicjatywa w dążeniu do celu), zdolność społeczna (rozmowa wspólnym językiem).'),
    fi(15, 2, 'sekcja 05', 'Trzy własności całego systemu wieloagentowego?', 'Autonomia agentów, lokalny widok (żaden agent nie ma pełnego globalnego obrazu) i decentralizacja (żaden agent nie steruje całością).'),
    pf(16, 2, 'sekcja 05', 'W systemie wieloagentowym jeden agent ma pełny widok całego systemu.', false, 'Żaden agent nie ma pełnego globalnego widoku.')]],
  [4, [
    S(17, 1, 'sekcja 06', { tytul: 'Przetarg Contract Net', svg: F('fig24.przetarg'), opis: 'Zlecający ogłasza zadanie, wykonawcy składają oferty, najlepsza dostaje przydział.' }),
    fi(18, 2, 'sekcja 06', 'Jak agenci współpracują? Wymień mechanizmy.', 'Negocjacje i przetargi (przydział zadań i zasobów), konsensus (wspólna wartość uzgodniona z sąsiadami bez znajomości całości), mechanizmy rynkowe (cena równoważąca popyt i podaż).'),
    fa(19, 2, 'sekcja 06', 'Konsensus', 'Każdy agent przesuwa swoją wartość w stronę sąsiadów i wszyscy dochodzą do wspólnej wartości, choć nikt nie zna całości. Przykłady: wspólna prędkość pojazdów w kolumnie, częstotliwość w mikrosieci.'),
    po(20, 2, 'sekcja 07', 'Zastosowania agentów', ['Agenci', 'Co uzgadniają'], [['produkcja elastyczna', 'maszyny, detale, zlecenia', 'kolejność, przydział, reakcja na awarię'], ['sieci energetyczne', 'źródła, magazyny, odbiorcy', 'bilans mocy, częstotliwość, ceny'], ['sieci wodociągowe', 'strefy, pompownie, zbiorniki', 'ciśnienia, przepływy'], ['roboty, drony, pojazdy', 'pojazdy', 'formacja, trasy, unikanie kolizji']]),
    fa(21, 3, 'sekcja 07', 'Podejście holoniczne', 'Holon jest jednocześnie całością i częścią większej całości: maszyna jest autonomiczna, ale należy do gniazda, a gniazdo do linii. Łączy autonomię agentów z hierarchią.'),
    fa(22, 3, 'sekcja 07', 'IEC 61499', 'Norma rozproszonej logiki sterowania: cykliczny model wykonania IEC 61131 zastąpiono modelem sterowanym zdarzeniami, a jedną aplikację można rozłożyć na wiele urządzeń.')]]
]);
