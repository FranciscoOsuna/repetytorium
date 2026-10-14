const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(22, 4, [
  [1, [
    fa(1, 1, 'sekcja 01', 'Dwie części pytania', 'Struktura funkcjonalna mówi, co system robi. Struktura sprzętowa mówi, z czego jest zbudowany i jak urządzenia są połączone. Te same funkcje można rozłożyć na sprzęt na różne sposoby.'),
    S(2, 1, 'sekcja 02', { pytanie: 'Wymień i opisz funkcje systemu automatyki.', svg: F('fig22.funkcje'), odpowiedz: 'Pomiar i akwizycja, sterowanie (ciągłe PID i dyskretne sekwencje), zabezpieczenia i blokady, diagnostyka. Dla ludzi i systemów: obsługa operatorska HMI, alarmowanie, archiwizacja i raporty, komunikacja z innymi sterownikami oraz MES i ERP.' }),
    fi(3, 1, 'sekcja 02', 'Co obejmuje funkcja sterowania?', 'Sterowanie ciągłe (regulatory PID trzymające poziom, przepływ, temperaturę) i dyskretne (logika i sekwencje, np. uruchom pompę, potem otwórz zawór).'),
    fi(4, 2, 'sekcja 02', 'Czym zabezpieczenia różnią się od sterowania?', 'Zabezpieczenia reagują na stan niebezpieczny niezależnie od tego, co robi sterowanie (pompa stop przy przelewie). Robi je osobny sterownik bezpieczeństwa.'),
    fi(5, 2, 'sekcja 02', 'Jakie są funkcje dla ludzi i innych systemów?', 'HMI: obraz procesu, zmiana wartości zadanych, przełączanie ręczny/automat. Alarmowanie: wykrycie, powiadomienie, potwierdzenie. Archiwizacja i raporty. Komunikacja z MES i ERP.'),
    S(6, 1, 'sekcja 03', { tytul: 'Tor sygnału poziomu w zbiorniku', svg: F('fig22.tor'), opis: 'Informacja zmienia postać pięć razy: wielkość fizyczna, prąd, liczba w sterowniku, prąd, położenie zaworu. Ta sama liczba trafia też do HMI, alarmów i archiwum.' }),
    fa(7, 2, 'sekcja 03', 'Pętla prądowa 4–20 mA', 'Standard sygnału analogowego. Żywe zero (4 mA) pozwala zasilać urządzenie nawet przy zerowym sygnale procesowym, a prąd poniżej 3,8 mA lub powyżej 20,5 mA oznacza awarię. Sygnały binarne to zwykle 24 V DC.'),
    pf(8, 1, 'sekcja 02', 'Funkcje zabezpieczeń działają tylko wtedy, gdy zgodzi się na to sterowanie.', false, 'Zabezpieczenia działają niezależnie od sterowania.')]],
  [2, [
    po(9, 2, 'sekcja 04', 'Grupy sprzętu', ['Rola', 'Przykłady'], [['urządzenia polowe', 'wielkość fizyczna ↔ sygnał', 'przetworniki, zawory, falowniki'], ['układy wejść/wyjść', 'sygnały ↔ liczby', 'moduły DI, DO, AI, AO'], ['sterowniki', 'program w stałym cyklu', 'PLC, PAC, sterownik DCS'], ['sieci', 'wymiana danych', 'Profinet, Modbus, OPC UA'], ['stacje i serwery', 'nadzór, programowanie', 'SCADA/HMI, serwer archiwum'], ['zasilanie', 'ciągłość pracy', '24 V DC, UPS, redundancja']]),
    fi(10, 1, 'sekcja 04', 'Wymień grupy sprzętowe systemu automatyki.', 'Urządzenia polowe, układy wejść/wyjść, sterowniki, sieci, stacje i serwery, zasilanie.'),
    fa(11, 2, 'sekcja 04', 'SCADA', 'Architektura systemu nadzoru: komputery, sieć i graficzne interfejsy do nadzoru wysokiego poziomu nad maszynami i procesami.'),
    lu(12, 1, 'sekcja 04', 'Moduły DI, DO, AI i AO to układy ___.', ['wejść i wyjść', 'zasilania', 'komunikacji'], 0, 'Zamieniają sygnały elektryczne na liczby i odwrotnie.')]],
  [3, [
    fa(13, 1, 'sekcja 05', 'Sterownik PLC', 'Przemysłowy komputer odporny na trudne warunki, przystosowany do sterowania procesami. W nim wykonują się funkcje sterowania, zabezpieczeń i część diagnostyki.'),
    S(14, 1, 'sekcja 05', { tytul: 'Cykl pracy PLC', svg: F('fig22.cykl'), opis: 'Odczyt wejść, program na obrazie procesu, zapis wyjść, komunikacja. Program nie czyta wejść bezpośrednio, tylko ich kopię z początku cyklu.' }),
    dp(15, 2, 'sekcja 05', 'Po co obraz procesu?', 'Dzięki niemu w ciągu jednego cyklu każde wejście ma jedną wartość, a wyjścia zmieniają się wszystkie naraz, na końcu cyklu.'),
    za(16, 2, 'sekcja 05', 'PLC = zasilacz + CPU + moduły we/wy + komunikacja.', 'Cykl: odczyt wejść, program, zapis wyjść, komunikacja. Czas cyklu to milisekundy i ogranicza szybkość reakcji.'),
    fi(17, 2, 'sekcja 05', 'Dlaczego regulator PID działa w przerwaniu o stałym okresie?', 'Algorytm dyskretny wymaga stałego czasu próbkowania.'),
    S(18, 1, 'sekcja 06', { tytul: 'Skalowanie 4–20 mA na liczby', svg: F('fig22.skalowanie'), opis: 'Moduł AI zamienia 4–20 mA na liczby 0…27648. Odczyty poniżej 3,8 mA i powyżej 20,5 mA to strefy awarii.' }),
    dp(19, 3, 'sekcja 06', 'Przetwornik 0–5 m daje 4–20 mA. Jaka liczba i jaki poziom przy 12,8 mA?', 'Ułamek zakresu (12,8 − 4)/16 = 0,55. Liczba: 0,55 · 27648 ≈ 15206. Poziom: 0,55 · 5 m = 2,75 m.'),
    dp(20, 3, 'sekcja 06', 'Co oznacza odczyt 3,2 mA?', 'Nie poziom −0,25 m, tylko przerwany przewód albo uszkodzony przetwornik. Program nie może użyć tej wartości do regulacji: alarm i przejście w stan bezpieczny.'),
    fi(21, 3, 'sekcja 06', 'Dlaczego szybkie zabezpieczenia robi się sprzętowo albo w przerwaniach?', 'Zmiana wejścia tuż po odczycie czeka na następny cykl, potem na wykonanie programu i opóźnienie wyjścia, więc reakcja trwa kilka cykli.')]],
  [4, [
    S(22, 1, 'sekcja 07', { pytanie: 'Wymień cztery architektury sprzętowe systemów automatyki.', svg: F('fig22.architektury'), odpowiedz: 'A: scentralizowana, jeden sterownik. B: rozproszone wejścia/wyjścia, jeden kabel sieciowy. C: PLC + SCADA, elementy różnych producentów. D: DCS, jeden spójny system.' }),
    po(23, 2, 'sekcja 07', 'Architektury: zalety i wady', ['Zalety', 'Wady'], [['A centralna', 'prosta, tania', 'długie przewody, jedna awaria zatrzymuje wszystko'], ['B rozpr. we/wy', 'krótkie przewody, rozbudowa', 'zależność od sieci i jej opóźnienia'], ['C PLC + SCADA', 'elastyczność, różni producenci', 'integracja po stronie wykonawcy'], ['D DCS', 'wspólna baza, redundancja', 'cena, jeden producent']]),
    fi(24, 2, 'sekcja 07', 'Gdzie stosuje się poszczególne architektury?', 'A: maszyna, mały obiekt. B: linia produkcyjna, rozległy obiekt. C: wodociągi, oczyszczalnie, zakłady średniej wielkości. D: rafinerie, elektrownie, chemia.'),
    fa(25, 2, 'sekcja 07', 'Jak zapewnia się niezawodność', 'W każdej architekturze tak samo: redundancja tam, gdzie awaria kosztuje najwięcej (sterownik, sieć, zasilanie), osobny sterownik bezpieczeństwa i diagnostyka modułów i przewodów.'),
    pf(26, 2, 'sekcja 07', 'W systemie DCS funkcje sterowania są rozłożone między wiele autonomicznych sterowników.', true, 'W odróżnieniu od systemów scentralizowanych, gdzie funkcje wykonuje głównie jeden sterownik.')]]
]);
