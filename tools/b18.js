const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(18, 3, [
  [1, [
    S(1, 1, 'sekcja 01', { tytul: 'Opóźnienie przesuwa odpowiedź', svg: F('fig18.opoznienie'), opis: 'Przez czas θ wyjście stoi na zerze, bo do czujnika nic jeszcze nie dotarło. Dalej odpowiedź ma ten sam kształt, tylko przesunięty.' }),
    fa(2, 1, 'sekcja 01', 'Opóźnienie odbiera fazę, nie wzmocnienie', 'Człon e^(−sθ) nie zmienia amplitudy, ale obraca fazę coraz bardziej wraz z częstotliwością. Zapas fazy maleje, więc regulator trzeba stroić łagodniej, a przy zbyt dużym wzmocnieniu pętla traci stabilność.'),
    dp(3, 2, 'sekcja 01', 'Dlaczego nie wystarczy zwiększyć wzmocnienia regulatora, by przyspieszyć układ z opóźnieniem?', 'Opóźnienie nie znika, a wyższe wzmocnienie zmniejsza zapas fazy. Układ zaczyna oscylować i traci stabilność. Dolnej granicy wyznaczonej opóźnieniem nie da się przekroczyć żadnym regulatorem.'),
    pf(4, 1, 'sekcja 01', 'Opóźnienie transportowe zmienia amplitudę sygnału.', false, 'Zmienia tylko fazę. Wzmocnienie pozostaje jedynkowe dla każdej częstotliwości.')]],
  [2, [
    S(5, 1, 'sekcja 02', { pytanie: 'Wymień trzy metody sterowania obiektem z opóźnieniem.', svg: F('fig18.metody'), odpowiedz: 'Przestrojony regulator klasyczny (np. PI według SIMC na modelu FOPDT). Predyktor Smitha. Predyktor stanu albo sterowanie predykcyjne MPC.' }),
    fa(6, 2, 'sekcja 02', 'Przestrojony regulator klasyczny', 'Obiekt przybliża się modelem FOPDT (inercja plus opóźnienie), a regulator PI dostraja się np. regułą SIMC. Metoda Zieglera–Nicholsa daje zbyt agresywne nastawy. To rozwiązanie niewymagające, ale wolne.'),
    S(7, 1, 'sekcja 03', { tytul: 'Predyktor Smitha', svg: F('fig18.smith'), opis: 'Regulator dostaje sygnał z wewnętrznego modelu obiektu bez opóźnienia, więc w mianowniku układu zamkniętego opóźnienia nie ma.' }),
    fa(8, 2, 'sekcja 03', 'Jak działa predyktor Smitha', 'Równolegle do obiektu pracuje model bez opóźnienia, a z niego regulator widzi odpowiedź natychmiast. Opóźnienie pozostaje tylko poza pętlą, więc można stroić regulator tak, jakby go nie było. Wymaga dokładnego modelu: błąd opóźnienia psuje działanie.'),
    fi(9, 2, 'sekcja 03', 'Jakie są ograniczenia predyktora Smitha?', 'Wrażliwość na błąd opóźnienia w modelu, brak zastosowania dla obiektów niestabilnych i całkujących (potrzebny wariant filtrowany) oraz potrzeba pełnego modelu. Odpowiada strukturze IMC.'),
    fa(10, 2, 'sekcja 04', 'Predyktor stanu i MPC', 'Opóźnienie traktuje się jako dodatkowe stany. Obserwator odtwarza stan, a regulator korzysta z przewidywanego wyjścia. MPC dodaje horyzont predykcji, ograniczenia i obsługę wielu wejść i wyjść.'),
    pf(11, 2, 'sekcja 04', 'Predyktor Smitha obsługuje ograniczenia sygnałów i obiekty MIMO.', false, 'Ograniczenia i MIMO obsługuje dopiero MPC. Smith dotyczy pojedynczej pętli.'),
    lu(12, 1, 'sekcja 02', 'Reguła Zieglera–Nicholsa daje dla obiektu z opóźnieniem nastawy zbyt ___.', ['agresywne', 'łagodne', 'wolne'], 0, 'Dlatego zamiast niej stosuje się SIMC na modelu FOPDT.')]],
  [3, [
    po(13, 2, 'sekcja 07', 'Porównanie trzech metod na liczbach', ['PI przestrojony', 'Smith'], [['IAE: skok zadania', '14,8', '8,5'], ['IAE: zakłócenie', '10,9', '6,0'], ['Czas regulacji', '25,5 s', '15,0 s'], ['Przeregulowanie', '1,4 %', '8,1 %']]),
    S(14, 1, 'sekcja 07', { tytul: 'IAE po skoku zadania', svg: F('fig18.iae'), opis: 'Dla skoku zadania nikt nie zejdzie poniżej 6,0, bo przez 6 s wyjście stoi na zerze. Smith jest o 42% nad tą granicą, MPC o 106%, przestrojony PI o 146%.' }),
    dp(15, 3, 'sekcja 07', 'Jak z graniczną liczbą 6,0 ocenić metody?', 'Przy opóźnieniu 6 s wyjście musi stać na zerze, więc IAE nie może być mniejsze niż 6,0. Smith (8,5) jest tylko 42% powyżej, więc przy dokładnym modelu praktycznie nie ma gdzie poprawiać.'),
    fa(16, 2, 'sekcja 07', 'Kto najlepiej tłumi zakłócenie', 'Predyktor stanu: IAE 4,2 wobec 10,9 dla przestrojonego PI. Smith jest najszybszy w śledzeniu zadania, a predyktor stanu najlepszy w tłumieniu zakłócenia.'),
    S(17, 1, 'sekcja 08', { tytul: 'Kompromis zaufania do modelu', svg: F('fig18.kompromis'), opis: 'Im więcej metoda korzysta z modelu, tym szybszy układ i tym boleśniejszy błąd modelu.' }),
    fa(18, 2, 'sekcja 08', 'Odporność na błąd opóźnienia', 'Przy dwukrotnie większym rzeczywistym opóźnieniu IAE przestrojonego PI rośnie z 14,8 tylko do 31,5, a predyktora stanu sięga 92. Oba predyktory psują się też, gdy opóźnienie jest mniejsze niż założone.'),
    fi(19, 2, 'sekcja 08', 'Kiedy stosować predyktor, a kiedy przestrojony regulator?', 'Predyktor, gdy opóźnienie jest znane i stabilne. Gdy opóźnienie pływa (zależy od przepływu), lepszy jest przestrojony regulator albo predyktor z adaptacyjną estymacją opóźnienia.'),
    po(20, 2, 'sekcja 08', 'Wymagania i zakres', ['Smith', 'Predyktor stanu / MPC'], [['Czego wymaga', 'pełnego modelu', 'modelu stanu, obserwatora, mocy obliczeniowej'], ['Obiekty niestabilne', 'tak, w wariancie filtrowanym', 'tak'], ['Ograniczenia i MIMO', 'nie', 'tak (MPC)'], ['Odporność', 'umiarkowana', 'najgorsza']]),
    pf(21, 2, 'sekcja 08', 'Najszybszy układ jest zarazem najbardziej odporny na błąd modelu.', false, 'Odwrotnie. Im więcej metoda ufa modelowi, tym jest szybsza i bardziej wrażliwa na jego błąd.'),
    lu(22, 2, 'sekcja 07', 'Najlepszy w tłumieniu zakłócenia okazał się predyktor ___.', ['stanu', 'Smitha', 'PI']  , 0, 'IAE 4,2 wobec 10,9 dla przestrojonego PI.')]]
]);
