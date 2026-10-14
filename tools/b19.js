const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(19, 3, [
  [1, [
    S(1, 1, 'sekcja 01', { tytul: 'Tor cyfrowego przetwarzania sygnałów', svg: F('fig19.tor'), opis: 'Sygnał analogowy przechodzi przez filtr, przetwornik A/C, procesor sygnałowy i z powrotem przez przetwornik C/A.' }),
    fa(2, 1, 'sekcja 01', 'Czym jest cyfrowe przetwarzanie sygnałów', 'Sygnał zamienia się na ciąg liczb i przetwarza algorytmem, a nie układem analogowym. Całe działanie sprowadza się do operacji na liczbach, więc zależy od programu, nie od elementów.'),
    S(3, 2, 'sekcja 02', { tytul: 'Próbkowanie i kwantyzacja', svg: F('fig19.kwantyzacja'), opis: 'Sygnał ciągły traci informację dwa razy: między próbkami (próbkowanie) i w wartości (kwantyzacja).' }),
    fi(4, 1, 'sekcja 02', 'Wymień pięć właściwości cyfrowego przetwarzania sygnałów.', 'Programowalność, stabilność, powtarzalność, możliwość kompresji i algorytmy adaptacyjne.')]],
  [2, [
    fi(5, 1, 'sekcja 03', 'Wymień i opisz zalety cyfrowego przetwarzania sygnałów.', 'Elastyczność: zmiana programu zmienia działanie. Przesyłanie bez strat. Korekcja błędów i kodowanie. Wiele kanałów na jednym układzie. Dokładność zależna od długości słowa (około +6 dB na bit). Tanie, powtarzalne elementy.'),
    fa(6, 2, 'sekcja 03', 'Programowalność', 'Zmiana własności toru wymaga zmiany programu, nie lutownicy. Ten sam sprzęt realizuje różne filtry i kodeki.'),
    fa(7, 2, 'sekcja 03', 'Powtarzalność i brak dryftu', 'Operacje na liczbach dają zawsze ten sam wynik, bez starzenia i dryftu elementów analogowych. Dwa egzemplarze zachowują się identycznie.'),
    fa(8, 2, 'sekcja 03', 'Dokładność wyznacza długość słowa', 'Każdy dodatkowy bit przetwornika poprawia stosunek sygnału do szumu o około 6 dB. Precyzję dobiera się liczbą bitów, a nie jakością elementów.'),
    fa(9, 2, 'sekcja 03', 'Algorytmy adaptacyjne', 'Współczynniki zmieniają się w trakcie pracy, np. przy usuwaniu echa albo aktywnej redukcji hałasu. W technice analogowej jest to praktycznie niedostępne.'),
    dp(10, 2, 'sekcja 03', 'Dlaczego przetwarzanie cyfrowe jest stabilne?', 'Opiera się na liczbach, nie na elementach starzejących się i zależnych od temperatury, więc parametry torów się nie zmieniają.'),
    pf(11, 1, 'sekcja 03', 'W cyfrowym przetwarzaniu sygnałów zmiana własności toru wymaga wymiany elementów.', false, 'Wystarczy zmienić program. To jedna z głównych zalet.'),
    lu(12, 1, 'sekcja 03', 'Każdy dodatkowy bit przetwornika daje około ___ dB lepszy stosunek sygnału do szumu.', ['6', '3', '12'], 0, 'Dokładność wyznacza długość słowa.')]],
  [3, [
    S(13, 1, 'sekcja 05', { tytul: 'Zalety i ich cena', svg: F('fig19.bilans'), opis: 'Każdej zalecie odpowiada ograniczenie: cyfrowo da się wiele, ale kosztem szumu kwantyzacji, ograniczonego pasma i błędów zaokrągleń.' }),
    fi(14, 1, 'sekcja 05', 'Wymień ograniczenia cyfrowego przetwarzania sygnałów.', 'Ograniczone pasmo (aliasing, twierdzenie o próbkowaniu), ograniczony zakres dynamiki, szum kwantyzacji przetwornika, błędy zaokrągleń w obliczeniach.'),
    dp(15, 2, 'sekcja 05', 'Skąd bierze się ograniczone pasmo w torze cyfrowym?', 'Częstotliwość próbkowania ogranicza pasmo do połowy tej częstotliwości. Składowe wyższe podszywają się pod niskie (aliasing), więc przed próbkowaniem trzeba je odfiltrować filtrem analogowym.'),
    pf(16, 2, 'sekcja 05', 'Szum kwantyzacji można całkowicie usunąć, zwiększając moc procesora.', false, 'Wynika z liczby bitów przetwornika, nie z mocy obliczeniowej. Zmniejsza się go dłuższym słowem.'),
    fa(17, 2, 'sekcja 05', 'Błędy zaokrągleń', 'Obliczenia na liczbach o skończonej długości dodają błąd przy każdej operacji. W filtrach IIR może on się kumulować i wpływać na stabilność.'),
    fi(18, 2, 'sekcja 06', 'Podaj zastosowania cyfrowego przetwarzania sygnałów.', 'Telekomunikacja, przetwarzanie dźwięku i obrazu, a w automatyce filtracja pomiarów, obserwatory i regulatory cyfrowe.')]]
]);
