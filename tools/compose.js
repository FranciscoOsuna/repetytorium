const fs = require('fs');
const figs = JSON.parse(fs.readFileSync('figs.json', 'utf8'));
const F = n => { if (!figs[n]) throw new Error('brak rysunku ' + n); return figs[n]; };
const OUT = '/mnt/user-data/outputs/';
const P2 = q => String(q).padStart(2, '0');
const oldOf = q => { const p = `/mnt/user-data/uploads/repetytorium/cards/_prev/q${P2(q)}.json`; return fs.existsSync(p) ? Object.fromEntries(JSON.parse(fs.readFileSync(p, 'utf8')).map(c => [c.id, c])) : {}; };

function build(q, parts, spec) {
  const old = oldOf(q); const used = new Set(); const out = [];
  spec.forEach(([cz, items]) => items.forEach(it => {
    let c;
    if (typeof it === 'number' || (Array.isArray(it))) {
      const [num, extra] = Array.isArray(it) ? it : [it, {}];
      const id = `q${q}-${String(num).padStart(2, '0')}`;
      if (!old[id]) throw new Error('brak starej karty ' + id);
      const { id: _i, q: _q, typ, poziom, zrodlo, ...rest } = old[id];
      c = { id, q, typ, poziom, zrodlo, cz, ...rest, ...extra };
      used.add(id);
    } else {
      const { num, ...rest } = it;
      const id = `q${q}-${String(num).padStart(2, '0')}`;
      const { typ, poziom, zrodlo, ...r2 } = rest;
      c = { id, q, typ, poziom, zrodlo, cz, ...r2 };
      if (old[id]) throw new Error('nowa karta zajmuje stare id ' + id);
    }
    if (out.find(x => x.id === c.id)) throw new Error('duplikat ' + c.id);
    out.push(c);
  }));
  const dropped = Object.keys(old).filter(id => !used.has(id));
  fs.writeFileSync(OUT + `q${P2(q)}.json`, '[\n' + out.map(c => '  ' + JSON.stringify(c)).join(',\n') + '\n]\n');
  console.log(`Q${q}: ${out.length} kart, odrzucone: ${dropped.join(',') || '-'}`);
}
const S = (num, poziom, zrodlo, o) => ({ num, typ: 'schemat', poziom, zrodlo, ...o });
const sv = (n, podpis) => ({ svg: F(n), podpis });

// ================= Q1 =================
build(1, 3, [
  [1, [1, 2,
    S(21, 1, 'sekcja 03', { pytanie: 'Narysuj oś od white-box do black-box i podaj cztery sytuacje informacyjne.', svg: F('fig01.os'), odpowiedz: 'Im więcej wiemy o prawach i parametrach, tym bliżej white-box. Im bardziej opieramy się na samych danych, tym bliżej black-box. Pośrodku leży gray-box w dwóch odmianach: znamy prawa, ale nie parametry, albo znamy reguły, ale nie strukturę.' }),
    3, 4,
    { num: 22, typ: 'fakt', poziom: 2, zrodlo: 'sekcja 04', tytul: 'Gray-box: dwie odmiany', tresc: 'Pierwsza: znamy prawa, ale nie znamy parametrów. Strukturę bierzemy z fizyki, a parametry z identyfikacji. Druga: znamy reguły postępowania, ale nie strukturę zależności. Budujemy wtedy model rozmyty albo neuronowo-rozmyty i strojemy go na danych. W obu wiedza i dane pracują razem.', analogia: 'Mapa narysowana z grubsza, a dokładne odległości mierzysz sam.' },
    8, 5, 6, 7]],
  [2, [10,
    S(23, 2, 'sekcja 06', { tytul: 'Dwie ścieżki i powiązania między nimi', svg: F('fig01.sciezki'), opis: 'Lewa ścieżka z wiedzy daje model fenomenologiczny, prawa z danych model behawioralny. Obie zaczynają od wiedzy apriorycznej i kończą porównaniem z systemem. Kreskowane strzałki A i B to powiązania: wiedza podpowiada strukturę, dane dostarczają parametrów.' }),
    { num: 24, typ: 'fiszka', poziom: 2, zrodlo: 'sekcja 06', pytanie: 'Jakie są dwa powiązania między ścieżką z wiedzy a ścieżką z danych?', odpowiedz: 'Z wiedzy do danych: prawa i bilanse podpowiadają strukturę modelu z danych, czyli rząd, opóźnienie, klasę modelu. Z danych do wiedzy: identyfikacja na pomiarach dostarcza liczbowych wartości parametrów modelu opartego na wiedzy.' },
    9,
    { num: 25, typ: 'pf', poziom: 2, zrodlo: 'sekcja 06', twierdzenie: 'Model oparty na wiedzy nigdy nie potrzebuje danych pomiarowych.', prawda: false, wyjasnienie: 'Dane zwykle dostarczają jego parametrów, a na końcu służą do porównania modelu z systemem. Dlatego model fizyczny w praktyce prawie zawsze kończy jako gray-box.' }]],
  [3, [15,
    S(26, 1, 'sekcja 07', { pytanie: 'Podaj siedem etapów modelowania matematycznego i zaznacz nawroty.', svg: F('fig01.etapy'), odpowiedz: 'Cele i założenia, baza wiedzy i danych, wybór kategorii modelu, struktura, identyfikacja, algorytmizacja obliczeń, weryfikacja. Negatywna weryfikacja cofa do struktury, do wyboru kategorii albo do celów.' }),
    { num: 27, typ: 'dopytka', poziom: 2, zrodlo: 'sekcja 07', pytanie: 'Co Pan robi, gdy weryfikacja modelu wypadnie negatywnie?', odpowiedz: 'Wracam do wcześniejszego etapu, zależnie od przyczyny: poprawiam strukturę, zmieniam kategorię modelu albo koryguję cele i założenia. Dla modelu z danych cofam się też do planu pomiarów lub przetwarzania danych. Modelowanie jest iteracyjne, pierwszy model rzadko jest ostatni.' },
    11,
    S(28, 2, 'sekcja 08', { tytul: 'Porządek wyprowadzania równań z wiedzy', svg: F('fig01.rownania'), opis: 'Najpierw wybierasz zmienne przepływu i naporu. Potem piszesz równania równowagi między przepływami i równania spójności między naporami. Na końcu dodajesz zależności wiążące elementu, które wnoszą parametry fizykalne.' }),
    12,
    S(29, 2, 'sekcja 09', { tytul: 'Identyfikacja: sekwencja z pętlą powrotu', svg: F('fig01.identyfikacja'), opis: 'Od celu i wiedzy apriorycznej przez pomiary, dane i strukturę do estymacji parametrów. Weryfikacja decyduje: NIE cofa do pomiarów, danych albo struktury, TAK kończy modelem wynikowym.' }),
    13, 14, 16, 17,
    S(30, 2, 'sekcja 10', { tytul: 'Weryfikacja pragmatyczna', svg: F('fig01.weryfikacja'), opis: 'To samo wejście podajemy do systemu i do modelu, a wyjścia porównujemy testami zgodności i analizą wrażliwości. Dobry model zgadza się z systemem także na danych innych niż identyfikacyjne.' }),
    18, 19]]
]);

// ================= Q2 =================
build(2, 3, [
  [1, [1, 2,
    S(26, 1, 'sekcja 01', { pytanie: 'Narysuj, jak MNK służy do identyfikacji parametrów obiektu.', svg: F('fig02.struktura'), odpowiedz: 'To samo pobudzenie podajemy do systemu i do modelu. Różnica pomiaru i predykcji to residuum, kryterium to suma jego kwadratów. Optymalizator zmienia parametry modelu, aż kryterium osiągnie minimum.' }),
    3,
    [4, sv('fig02.obserwacji', 'Wiersz to jeden pomiar, kolumna to jedna funkcja bazowa. Pomiarów musi być co najmniej tyle, ile parametrów.')],
    5,
    S(27, 3, 'sekcja 03', { tytul: 'Geometria MNK: estymata to rzut ortogonalny', svg: F('fig02.rzut'), opis: 'Wektor pomiarów rzutujemy prostopadle na przestrzeń kolumn H. Residuum jest prostopadłe do wszystkich kolumn H, a to dokładnie równania normalne.' }),
    6, 7]],
  [2, [
    [17, sv('fig02.odmiany', 'Zależnie od wiarygodności pomiarów i tego, czy są dostępne naraz, czy kolejno.')],
    8, 9, 10, 11,
    [13, sv('fig02.petla', 'Pętla: pomiar, innowacja, wzmocnienie, korekta estymaty, aktualizacja P.')],
    14, 15, 16, 18]],
  [3, [
    { num: 19, typ: 'fakt', poziom: 2, zrodlo: 'sekcja 09', tytul: 'Sformułowanie to nie algorytm', tresc: 'Równania normalne to sformułowanie zadania. Algorytm to sposób ich rozwiązania. Można rozwiązać je wprost rozkładem Cholesky’ego, bo HᵀH jest symetryczna i dodatnio określona. Można też ominąć tworzenie HᵀH i użyć rozkładu QR macierzy H albo SVD.', analogia: 'Ta sama zagadka, różne metody rachunku.' },
    { num: 20, typ: 'porownanie', poziom: 3, zrodlo: 'sekcja 09', tytul: 'Równania normalne kontra QR', kolumny: ['Równania normalne (Cholesky)', 'Rozkład QR'], wiersze: [['Co robi', 'buduje HᵀH i Hᵀy, rozwiązuje układ', 'rozkłada H, rozwiązuje układ trójkątny'], ['Koszt', 'najtańsze', 'droższe'], ['Uwarunkowanie', 'kwadruje uwarunkowanie', 'zachowuje uwarunkowanie H'], ['Kiedy', 'dane dobrze uwarunkowane', 'standard numeryczny, słabo uwarunkowane dane']] },
    { num: 21, typ: 'fiszka', poziom: 3, zrodlo: 'sekcja 09', pytanie: 'Po co w MNK rozkład SVD i pseudoodwrotność?', odpowiedz: 'To ratunek, gdy macierz H jest bliska osobliwej. SVD pozwala odciąć małe wartości osobliwe i daje rozwiązanie o najmniejszej normie.' },
    { num: 24, typ: 'pf', poziom: 2, zrodlo: 'sekcja 09', twierdzenie: 'Najlepszą numerycznie metodą jest jawne odwracanie macierzy HᵀH.', prawda: false, wyjasnienie: 'Tworzenie HᵀH kwaduje uwarunkowanie zadania. Układ rozwiązuje się rozkładem Cholesky’ego, a przy słabo uwarunkowanych danych rozkładem QR albo SVD, bez jawnego odwracania.' },
    { num: 25, typ: 'luka', poziom: 3, zrodlo: 'sekcja 09', zdanie: 'Przy słabo uwarunkowanych danych standardem numerycznym jest rozkład ___.', opcje: ['QR macierzy H', 'Cholesky’ego macierzy HᵀH', 'Fouriera'], poprawna: 0, wyjasnienie: 'QR pracuje bez jawnego tworzenia HᵀH, więc nie kwaduje uwarunkowania i jest dokładniejszy.' },
    12,
    { num: 22, typ: 'dopytka', poziom: 3, zrodlo: 'sekcja 09', pytanie: 'Co zrobić, gdy model jest nieliniowy względem parametrów?', odpowiedz: 'Użyć metod iteracyjnych: Gaussa–Newtona albo Levenberga–Marquardta. W każdej iteracji linearyzuje się model i rozwiązuje zadanie MNK. Wracają przy tym problemy minimów lokalnych i zależności od punktu startowego.' },
    { num: 23, typ: 'fakt', poziom: 3, zrodlo: 'sekcja 09', tytul: 'Uwarunkowanie: po co planuje się eksperyment', tresc: 'Rozwiązanie istnieje, gdy rząd H równa się liczbie parametrów, ale jego jakość zależy od odległości od osobliwości. Przy bogatym pobudzeniu cond(HᵀH) wynosi 28 i estymaty są dobre. Przy stałym wejściu kolumny H są niemal proporcjonalne, cond rośnie do 5,2·10⁴ i estymaty są bezwartościowe, choć wyliczalne.', analogia: 'Prosta przez dwa punkty prawie w tym samym miejscu: formalnie jest, praktycznie chwieje się.' }]]
]);

// ================= Q3 =================
build(3, 4, [
  [1, [1, 2,
    S(22, 1, 'sekcja 02', { tytul: 'Zmienna lingwistyczna i jej wartości', svg: F('fig03.os0'), opis: 'Zmienna x ma trzy wartości lingwistyczne, każda to zbiór rozmyty z funkcją przynależności. Sąsiednie funkcje się przekrywają, a w każdym punkcie przynależności sumują się do 1.' }),
    3, 4, 5,
    { num: 24, typ: 'fakt', poziom: 1, zrodlo: 'sekcja 04', tytul: 'Jak wygląda reguła', tresc: 'Jeżeli x₁ jest A₁ i x₂ jest A₂, to y jest B. Przesłanki łączy spójnik „i”, więc składa się je t-normą. Konkluzją jest zbiór rozmyty, w postaci lingwistycznej. Wszystkie reguły razem tworzą bazę reguł.', analogia: 'Jak receptura eksperta zapisana słowami.' },
    S(23, 2, 'sekcja 04', { tytul: 'Baza reguł jako kratownica 3 × 3', svg: F('fig03.kratownica'), opis: 'Dwa wejścia po trzy wartości dają 3 · 3 = 9 reguł. Każda komórka to jedna reguła, a wpis to wartość wyjścia. Dla pięciu wejść po siedem wartości byłoby ich 16 807.' }),
    8,
    S(21, 1, 'sekcja 03', { pytanie: 'Narysuj strukturę systemu rozmytego z rozmywaniem i wyostrzaniem.', svg: F('fig03.bloki'), odpowiedz: 'Liczba z czujnika wchodzi do rozmywania, mechanizm wnioskowania korzysta z bazy reguł i daje zbiór rozmyty B′, a wyostrzanie zamienia go w jedną liczbę dla siłownika.' }),
    6, 17, 19, 20]],
  [2, [10, 11,
    [12, sv('fig03.implikacja', 'MIN ścina zbiór konkluzji na wysokości β, PROD skaluje go w pionie.')],
    S(25, 2, 'sekcja 06', { tytul: 'Przykład z wykładu: obcięcie i agregacja', svg: F('fig03.agregacja'), opis: 'Stopnie 1,0, 0,4 i 0,1 obcinają trzy konkluzje. Operator MAX w każdym punkcie bierze największą z nich, więc B′ ma przynależności 1; 1; 0,6; 0,4; 0,4.' }),
    18]],
  [3, [7,
    [9, sv('fig03.os1', 'Pionowa kreska w x₀ = 3 odcina stopnie: β₁ = 0,33 dla „niskie” i β₂ = 0,67 dla „średnie”.')],
    { num: 26, typ: 'pf', poziom: 2, zrodlo: 'sekcja 05', twierdzenie: 'Reguła, której zbiór przesłanki nie obejmuje punktu pomiaru, i tak odpala się z małym stopniem.', prawda: false, wyjasnienie: 'Dla takiej reguły β = 0, więc w ogóle się nie odpala. Przy rozmywaniu singletonem liczy się tylko wartość funkcji przynależności dokładnie w punkcie pomiaru.' }]],
  [4, [
    S(27, 2, 'sekcja 07', { tytul: 'Wyostrzanie tego samego zbioru B′ pięcioma metodami', svg: F('fig03.wyostrzanie'), opis: 'Metody maksimum patrzą tylko na najwyższe przynależności, COG uwzględnia cały zbiór. Ten sam B′ daje 0, 12,5, 25 albo 36,8.' }),
    { num: 28, typ: 'fakt', poziom: 2, zrodlo: 'sekcja 07', tytul: 'Przykład liczbowy wyostrzania', tresc: 'Zbiór B′ ma przynależności 1; 1; 0,6; 0,4; 0,4 w punktach y = 0, 25, 50, 75, 100. Maksimum 1 jest w 0 i 25, więc SOM = 0, LOM = 25, MOM = 12,5. Środek ciężkości to Σ y·μ / Σ μ = 125 / 3,4 ≈ 36,8. BOA dzieli pole na pół i wypada w 25.' },
    { num: 29, typ: 'fiszka', poziom: 2, zrodlo: 'sekcja 07', pytanie: 'Wymień metody wyostrzania i opisz każdą jednym zdaniem.', odpowiedz: 'COG: średnia ważona całego zbioru. MOM: średnia y, dla których przynależność jest największa. SOM i LOM: najmniejsze i największe y o największej przynależności. BOA: punkt, który dzieli pole pod zbiorem na dwie równe części.' },
    13,
    { num: 30, typ: 'fiszka', poziom: 3, zrodlo: 'sekcja 07', pytanie: 'Czym SOM, LOM i BOA różnią się od COG?', odpowiedz: 'SOM i LOM biorą skrajny punkt z maksimum, więc ignorują słabsze reguły i skaczą, gdy zmienia się dominująca reguła. BOA i COG uwzględniają cały zbiór: BOA dzieli jego pole na pół, COG liczy średnią ważoną przynależnościami.' },
    14, 15, 16]]
]);

// ================= Q4 =================
build(4, 3, [
  [1, [1,
    S(28, 1, 'sekcja 02', { tytul: 'Sieć jednokierunkowa: trzy warstwy', svg: F('fig04.siec'), opis: 'Wejścia, warstwa ukryta z neuronami tanh i liniowe wyjście. Sygnał płynie tylko w jedną stronę, więc sama sieć nie ma pamięci.' }),
    2,
    [3, sv('fig04.stopnie', 'Każdy neuron to miękki stopień. Suma stopni układa dowolny kształt.')],
    4, 5,
    S(29, 2, 'sekcja 04', { pytanie: 'Narysuj różnicę między NNARX a NNOE.', svg: F('fig04.arxoe'), odpowiedz: 'W obu sieć dostaje regresory z linii opóźniających. W NNARX regresory wyjściowe pochodzą z pomiarów obiektu, więc nie ma rekurencji. W NNOE pochodzą z własnych wyjść modelu, więc model jest rekurencyjny.' }),
    6,
    { num: 23, typ: 'pf', poziom: 2, zrodlo: 'sekcja 04', twierdzenie: 'Model NNFIR może stracić stabilność, bo jest siecią neuronową.', prawda: false, wyjasnienie: 'Regresory pochodzą wyłącznie z wejść i nie ma sprzężenia zwrotnego, więc przy ograniczonym wejściu odpowiedź jest ograniczona. Stabilność problemem staje się dopiero w strukturach rekurencyjnych.' },
    { num: 24, typ: 'luka', poziom: 2, zrodlo: 'sekcja 04', zdanie: 'W modelu NNARX regresory wyjściowe pochodzą z ___.', opcje: ['pomiarów obiektu', 'własnych wyjść modelu', 'residuów'], poprawna: 0, wyjasnienie: 'Dlatego w czasie uczenia nie ma rekurencji i wystarcza zwykła propagacja wsteczna. Z własnych wyjść modelu bierze regresory NNOE, a z residuów dodatkowo NNARMAX.' },
    { num: 25, typ: 'fiszka', poziom: 3, zrodlo: 'sekcja 04', pytanie: 'Co NNARMAX dodaje do NNARX?', odpowiedz: 'Dodatkowe regresory z residuów, czyli błędów predykcji. Dzięki temu model opisuje także zakłócenia, nie tylko obiekt. Residua zależą od modelu, więc uczenie jest trudniejsze niż dla NNARX.' },
    7, 21]],
  [2, [
    S(30, 2, 'sekcja 05', { pytanie: 'Narysuj sieć Elmana i sieć Jordana.', svg: F('fig04.elmanjordan'), odpowiedz: 'Obie mają warstwę kontekstową, która kopiuje sygnał z poprzedniej chwili na wejście warstwy ukrytej. Elman kopiuje stan warstwy ukrytej, Jordan kopiuje wyjście sieci.' }),
    8,
    { num: 27, typ: 'fiszka', poziom: 2, zrodlo: 'sekcja 05', pytanie: 'Do czego służy warstwa kontekstowa?', odpowiedz: 'To pamięć sieci rekurencyjnej: kopia sygnału z poprzedniej chwili, wracająca na wejście warstwy ukrytej. Dzięki niej dynamika jest zbudowana wewnątrz sieci, bez ręcznie dobranych linii opóźniających na wejściu.' },
    { num: 26, typ: 'pf', poziom: 2, zrodlo: 'sekcja 05', twierdzenie: 'W sieci Jordana warstwa kontekstowa przechowuje opóźniony stan warstwy ukrytej.', prawda: false, wyjasnienie: 'To robi sieć Elmana. W sieci Jordana kontekst przechowuje opóźnione wyjście sieci, dlatego jest bliska NNOE.' },
    9]],
  [3, [
    [10, sv('fig04.krajobraz', 'Kryterium jest nieliniowe względem wag: wiele dolin, wynik zależy od punktu startu.')],
    11,
    S(31, 2, 'sekcja 06', { pytanie: 'Narysuj przepływ sygnałów w propagacji wstecznej.', svg: F('fig04.backprop'), odpowiedz: 'W przód liczymy wyjście i błąd. Wstecz błąd wraca tą samą drogą, mnożony przez wagę i nachylenie aktywacji. Gradient wagi to sygnał błędu razy sygnał wchodzący do wagi.' }),
    12, 13, 14, 15,
    [16, sv('fig04.bptt', 'Sieć rozwinięta w czasie: kopie o wspólnych wagach, gradient wraca przez kolejne chwile.')],
    17, 18, 19, 20, 22]]
]);

// ================= Q5 =================
build(5, 4, [
  [1, [1,
    S(26, 1, 'sekcja 01', { tytul: 'Dwa pytania o ten sam obiekt', svg: F('fig05.sterobs'), opis: 'Sterowalność pyta o drogę od wejścia do stanu i zależy tylko od pary (A, B). Obserwowalność pyta o drogę od stanu do wyjścia i zależy tylko od pary (A, C).' }),
    2,
    { num: 21, typ: 'luka', poziom: 1, zrodlo: 'sekcja 01', zdanie: 'Sterowalność zależy wyłącznie od pary macierzy ___.', opcje: ['(A, B)', '(A, C)', '(B, C)'], poprawna: 0, wyjasnienie: 'Obserwowalność zależy od (A, C). Dlatego układ może być sterowalny i nieobserwowalny, albo odwrotnie.' },
    3, 4, 20, 19]],
  [2, [
    S(27, 1, 'sekcja 03', { pytanie: 'Zapisz macierze z kryterium Kalmana dla sterowalności i obserwowalności.', svg: F('fig05.macierze'), odpowiedz: 'Sterowalność: bloki B, AB, A²B, …, Aⁿ⁻¹B obok siebie. Obserwowalność: bloki C, CA, CA², …, CAⁿ⁻¹ jeden pod drugim. Układ jest sterowalny albo obserwowalny, gdy rząd macierzy wynosi n.' }),
    5,
    { num: 22, typ: 'luka', poziom: 2, zrodlo: 'sekcja 03', zdanie: 'Macierz sterowalności ma bloki B, AB, A²B, …, ___.', opcje: ['Aⁿ⁻¹B', 'AⁿB', 'Aⁿ⁺¹B'], poprawna: 0, wyjasnienie: 'Dalsze potęgi nic nie dodają, bo z twierdzenia Cayleya–Hamiltona Aⁿ jest kombinacją niższych potęg.' },
    6, 7,
    S(28, 3, 'sekcja 04', { tytul: 'Rozkład Kalmana: cztery części stanu', svg: F('fig05.kalman4'), opis: 'Tylko część sterowalna i obserwowalna widoczna jest w transmitancji. Pozostałe części istnieją w obiekcie, ale transmitancja ich nie pokazuje.' }),
    8, 9, 10]],
  [3, [
    S(29, 2, 'sekcja 05', { tytul: 'Co sprzężenie od stanu robi z biegunami', svg: F('fig05.bieguny'), opis: 'Przy sterowalnej parze (A, B) macierz K przesuwa bieguny tam, gdzie chcemy. Biegun modu niesterowalnego zostaje na miejscu, niezależnie od K.' }),
    11,
    { num: 24, typ: 'fiszka', poziom: 3, zrodlo: 'sekcja 05', pytanie: 'Sformułuj twierdzenie o dowolnej alokacji biegunów.', odpowiedz: 'Dla pary (A, B) sterowalnej i dowolnego zbioru n liczb zespolonych, symetrycznego względem osi rzeczywistej, istnieje macierz K, dla której widmem A − BK jest ten zbiór. Gdy para nie jest sterowalna, bieguny modów niesterowalnych nie dają się przesunąć.' },
    { num: 23, typ: 'pf', poziom: 2, zrodlo: 'sekcja 05', twierdzenie: 'Przy niesterowalnej parze (A, B) odpowiednio duże K i tak przesunie wszystkie bieguny.', prawda: false, wyjasnienie: 'Mod niesterowalny jest odcięty od wejścia, więc jego biegun zostaje biegunem układu zamkniętego niezależnie od K.' },
    12, 18]],
  [4, [
    S(30, 2, 'sekcja 06', { tytul: 'Obserwator Luenbergera', svg: F('fig05.obserwator'), opis: 'To kopia modelu obiektu, korygowana różnicą między pomiarem a przewidywaniem. Błąd estymacji ma własną dynamikę z macierzą A − LC i nie zależy ani od u, ani od stanu obiektu.' }),
    13,
    { num: 25, typ: 'pf', poziom: 2, zrodlo: 'sekcja 06', twierdzenie: 'Błąd estymacji obserwatora zależy od sterowania u.', prawda: false, wyjasnienie: 'Obiekt i obserwator dostają to samo u, więc sterowanie się odejmuje. Błąd spełnia równanie ė = (A − LC) e i zależy tylko od własnej dynamiki.' },
    14, 15,
    S(31, 2, 'sekcja 06', { pytanie: 'Narysuj układ z obserwatorem i sprzężeniem od estymaty stanu. Co mówi zasada separacji?', svg: F('fig05.separacja'), odpowiedz: 'Prawo sterowania −K dostaje estymatę x̂ z obserwatora. Widmo układu zamkniętego jest sumą widm A − BK oraz A − LC, więc K i L projektuje się niezależnie.' }),
    16,
    S(32, 2, 'sekcja 09', { tytul: 'Jak szybki ma być obserwator', svg: F('fig05.szybkosc'), opis: 'Zwykle bieguny obserwatora ustawia się 3–10 razy szybciej niż regulatora. Dalej w lewo estymata nadąża lepiej, ale rośnie wzmocnienie szumu i skok błędu na starcie.' }),
    17]]
]);

// ================= Q6 =================
build(6, 3, [
  [1, [1,
    S(18, 1, 'sekcja 02', { tytul: 'Struktura: L reguluje, M śledzi', svg: F('fig06.struktura'), opis: 'Stan x wraca na wejście przez L (zadanie regulacyjne, dynamika). Wartość zadana idzie w przód przez M (zadanie śledzące, wartość ustalona). Podstawienie u = −Lx + M yᵣ do obiektu daje ẋ = (A − BL)x + BM yᵣ.' }),
    2,
    S(19, 1, 'sekcja 04', { pytanie: 'Co robi alokacja biegunów z obiektem o wolnych, oscylacyjnych biegunach?', svg: F('fig06.bieguny'), odpowiedz: 'Przenosi wartości własne A − BL w zadane miejsca. W przykładzie z wykładu bieguny −1,5 ± j1,32 (oscylacyjne, wolne) trafiają w −6 i −8 (szybkie, bez oscylacji). Zera układu się nie zmieniają.' }),
    15, 14, 16]],
  [2, [10, 11,
    { num: 20, typ: 'kroki', poziom: 2, zrodlo: 'sekcja 06', tytul: 'Wyprowadzenie macierzy M', kroki: ['Przyjmij stan ustalony: ẋ = 0 i y = yᵣ', 'Z równania układu zamkniętego: 0 = (A − BL)x + BM yᵣ, czyli x = (BL − A)⁻¹ B M yᵣ', 'Wstaw do wyjścia: y = Cx = C(BL − A)⁻¹B M yᵣ', 'Zażądaj jednostkowego wzmocnienia: C(BL − A)⁻¹B M = I', 'Dla p = q odwróć: M = [C(BL − A)⁻¹B]⁻¹'], wyjasnienie: 'Wymaga odwracalności A − BL. M to odwrotność wzmocnienia statycznego układu zamkniętego.' },
    12, 13, 17,
    { num: 21, typ: 'pf', poziom: 2, zrodlo: 'sekcja 06', twierdzenie: 'Macierz M koryguje błąd modelu, bo sprawdza, czy wyjście dotarło do wartości zadanej.', prawda: false, wyjasnienie: 'M działa w otwartej pętli: jest policzona z modelu i nie widzi wyjścia. Przy błędzie modelu lub stałym zakłóceniu zostaje uchyb ustalony. Naprawia to dopiero człon całkujący (zagadnienie 7).' }]],
  [3, [3, 4, 5, 6, 7,
    S(22, 2, 'sekcja 05', { pytanie: 'Narysuj obszar dopuszczalnych biegunów i podaj, skąd się bierze.', svg: F('fig06.obszar'), odpowiedz: 'Tłumienie ζ ≥ 0,6 ogranicza przeregulowanie (kąt od osi ujemnej). Re s ≤ −1 ogranicza czas regulacji. |s| ≤ 4 ogranicza wzmocnienia i sterowanie. Bieguny dobiera się kompromisowo wewnątrz tego obszaru.' }),
    8, 9]]
]);

// ================= Q7 =================
build(7, 3, [
  [1, [
    { num: 18, typ: 'fiszka', poziom: 1, zrodlo: 'sekcja 02', pytanie: 'Jakie prawo sterowania i jaką rolę macierzy L i M pamiętasz z zagadnienia 6?', odpowiedz: 'u = −Lx + M yᵣ. L realizuje zadanie regulacyjne i przesuwa bieguny A − BL. M realizuje zadanie śledzące i daje jednostkowe wzmocnienie wartość zadana – wyjście.' },
    1,
    { num: 19, typ: 'pf', poziom: 1, zrodlo: 'sekcja 02', twierdzenie: 'Sprzężenie od stanu L ma działanie całkujące.', prawda: false, wyjasnienie: 'L to regulator proporcjonalny, z działaniem różniczkującym przez ẋ = Ax, ale bez całki. Dlatego nie usuwa uchybu ustalonego przy błędzie modelu.' },
    { num: 20, typ: 'luka', poziom: 1, zrodlo: 'sekcja 02', zdanie: 'Macierz M działa w torze ___, więc nie sprawdza, czy wyjście doszło do wartości zadanej.', opcje: ['otwartym', 'zamkniętym', 'zwrotnym'], poprawna: 0, wyjasnienie: 'M jest policzona z modelu A, B, C. Przy innym obiekcie albo stałym zakłóceniu zostaje uchyb.' }]],
  [2, [2,
    S(21, 1, 'sekcja 03', { tytul: 'Integrator w pętli: L₁ od stanu, L₂ od całki', svg: F('fig07.struktura'), opis: 'Integrator na wyjściu komparatora liczy całkę uchybu η. Sterowanie ma dwie części: L₁ działa na stan obiektu, L₂ na całkę uchybu. Pętla wyjścia zamyka się przez komparator.' }),
    3, 4, 5, 6, 7]],
  [3, [8, 9, 17, 10,
    S(22, 2, 'sekcja 05', { pytanie: 'Jak wyglądają odpowiedzi skokowe układów o wielomianach ITAE?', svg: F('fig07.itae'), odpowiedz: 'Wszystkie dochodzą do 1 z małym przeregulowaniem, wyższy rząd jest nieco wolniejszy. Wybiera się tylko ωₙ, czyli skalę czasu, a współczynniki wielomianu czyta się z tabeli.' }),
    11, 12, 13, 14, 15, 16]]
]);

// shorthand do nowych kart
const fa = (num, poziom, zrodlo, tytul, tresc, analogia) => ({ num, typ: 'fakt', poziom, zrodlo, tytul, tresc, ...(analogia ? { analogia } : {}) });
const fi = (num, poziom, zrodlo, pytanie, odpowiedz) => ({ num, typ: 'fiszka', poziom, zrodlo, pytanie, odpowiedz });
const dp = (num, poziom, zrodlo, pytanie, odpowiedz) => ({ num, typ: 'dopytka', poziom, zrodlo, pytanie, odpowiedz });
const pf = (num, poziom, zrodlo, twierdzenie, prawda, wyjasnienie) => ({ num, typ: 'pf', poziom, zrodlo, twierdzenie, prawda, wyjasnienie });
const lu = (num, poziom, zrodlo, zdanie, opcje, poprawna, wyjasnienie) => ({ num, typ: 'luka', poziom, zrodlo, zdanie, opcje, poprawna, wyjasnienie });
const za = (num, poziom, zrodlo, haslo, rozwiniecie) => ({ num, typ: 'zapamietaj', poziom, zrodlo, haslo, rozwiniecie });
const kr = (num, poziom, zrodlo, tytul, kroki, wyjasnienie) => ({ num, typ: 'kroki', poziom, zrodlo, tytul, kroki, wyjasnienie });
const po = (num, poziom, zrodlo, tytul, kolumny, wiersze) => ({ num, typ: 'porownanie', poziom, zrodlo, tytul, kolumny, wiersze });

// ================= Q8 =================
build(8, 3, [
  [1, [1,
    S(20, 1, 'sekcja 02', { tytul: 'Obserwator w układzie sterowania', svg: F('fig08.funkcja'), opis: 'Obserwator dostaje to, co naprawdę jest dostępne: sterowanie u i pomiar y. Oddaje estymatę stanu x̂, którą regulator K traktuje jak prawdziwy stan. To oprogramowanie, nie dokłada żadnego czujnika.' }),
    2,
    pf(26, 1, 'sekcja 02', 'Obserwator jest dodatkowym czujnikiem montowanym przy obiekcie.', false, 'To program: kopia modelu korygowana błędem wyjścia. Używa tylko sygnałów, które i tak są dostępne, czyli u i y.')]],
  [2, [3,
    S(21, 1, 'sekcja 03', { pytanie: 'Narysuj obserwator pełnego rzędu (Luenbergera).', svg: F('fig08.luenberger'), odpowiedz: 'Model obiektu dostaje to samo sterowanie u co obiekt. Różnica y − ŷ przechodzi przez L i koryguje model. Równanie: dx̂/dt = Ax̂ + Bu + L(y − Cx̂). Błąd estymacji ė = (A − LC)e jest autonomiczny.' }),
    5,
    fi(24, 1, 'sekcja 01', 'Wymień rodzaje obserwatorów i podaj, czym się różnią.', 'Pełnego rzędu (Luenberger): odtwarza cały stan, rząd n. Zredukowanego rzędu: odtwarza tylko niemierzone składowe, rząd n − p. Filtr Kalmana: ta sama struktura, ale L liczone z kowariancji szumów. Obserwator rozszerzony: stan uzupełniony o zakłócenie, które też jest odtwarzane.'),
    6, 7, 8, 18, 9, 11, 12, 13,
    pf(27, 2, 'sekcja 04', 'Obserwator zredukowanego rzędu jest zawsze lepszy, bo ma niższy rząd.', false, 'Szybciej się zbiega bez szumu, ale pomiar wchodzi do estymaty bez filtrowania. Przy zaszumionym czujniku pełny rząd wypada dokładniej.'),
    19]],
  [3, [4,
    S(22, 1, 'sekcja 03', { tytul: 'Dualność: obserwator jako regulator dla pary transponowanej', svg: F('fig08.dualnosc'), opis: 'Nie ma osobnej teorii: podstawiasz Aᵀ za A i Cᵀ za B, liczysz alokację biegunów jak dla regulatora i transponujesz wynik. Dlatego obserwowalność gra tu rolę sterowalności.' }),
    lu(25, 1, 'sekcja 03', 'Wzmocnienie obserwatora liczy się alokacją biegunów dla pary (Aᵀ, Cᵀ), a wynik ___.', ['transponuje się', 'odwraca się', 'mnoży przez B'], 0, 'Macierz L = (Lᵀ)ᵀ. Cała procedura jest identyczna jak dla regulatora z zagadnienia 6.'),
    10,
    S(23, 2, 'sekcja 07', { tytul: 'Zasada separacji', svg: F('fig08.separacja'), opis: 'Układ z obiektu, regulatora i obserwatora ma rząd 2n. Jego bieguny to dokładnie n biegunów regulatora i n biegunów obserwatora, bez nowych. Oba projekty prowadzi się osobno.' }),
    14, 15, 16, 17]]
]);

// ================= Q9 =================
build(9, 4, [
  [1, [
    fa(1, 1, 'sekcja 01', 'Wspólny szkielet wszystkich algorytmów', 'Dla funkcji nieliniowej nie ma wzoru na minimum, więc każdy algorytm startuje z punktu i schodzi w dół. Różnią się dwiema decyzjami w każdym kroku: w którą stronę iść (kierunek) i jak daleko (długość kroku). Przy ograniczeniach dochodzi trzecia: co zrobić z ograniczeniami.', 'Schodzenie we mgle: kierunek to nachylenie pod stopami, krok to to, jak odważnie idziesz.'),
    za(2, 1, 'sekcja 02', 'Minimum: ∇f(x*) = 0 oraz hesjan ∇²f(x*) dodatnio określony.', 'Pierwszy warunek jest konieczny, drugi wystarczający. Przy funkcji wypukłej każde minimum lokalne jest globalne, a ∇f = 0 wystarcza.'),
    S(3, 1, 'sekcja 03', { pytanie: 'Narysuj klasyfikację algorytmów optymalizacji nieliniowej bez ograniczeń i z ograniczeniami.', svg: F('fig09.klasyfikacja'), odpowiedz: 'Bez ograniczeń dzielimy według informacji o funkcji celu: rząd 0 (wartości), rząd 1 (gradient), rząd 2 (gradient i hesjan). Z ograniczeniami według traktowania ograniczeń: kara i bariera, kierunki dopuszczalne, warunki KKT. Niezależnie: metody lokalne i globalne.' }),
    po(4, 2, 'sekcja 03', 'Rząd metody a koszt iteracji', ['Co wykorzystuje', 'Cena i zaleta'], [['Rząd 0', 'tylko wartości f', 'działa bez wzoru, np. z symulacji; wolna'], ['Rząd 1', 'gradient', 'tania iteracja; zbieżność liniowa lub nadliniowa'], ['Rząd 2', 'gradient i hesjan', 'najmniej iteracji; droga iteracja, układ równań']]),
    fi(5, 2, 'sekcja 03', 'Dlaczego rząd metody jest sensownym kryterium podziału?', 'Bo przekłada się wprost na koszt jednej iteracji. Im więcej informacji o funkcji, tym mniej iteracji, ale tym droższa każda z nich.'),
    lu(6, 1, 'sekcja 02', 'Gradient wskazuje kierunek najszybszego ___ funkcji.', ['wzrostu', 'spadku', 'zerowania'], 0, 'Minus gradient to kierunek najszybszego spadku. Gradient mówi, gdzie jest dół, ale nie jak daleko.'),
    dp(7, 2, 'sekcja 02', 'Jaką informację niesie hesjan, której nie ma w gradiencie?', 'Krzywiznę, czyli jak zmienia się sam gradient. Dzięki niej wiadomo, jak daleko jest do minimum, dlatego metody rzędu drugiego są tak szybkie.'),
    pf(8, 2, 'sekcja 03', 'Metoda SQP jest metodą z ograniczeniami, więc nie może być jednocześnie metodą rzędu drugiego i lokalną.', false, 'Podziały są niezależne. SQP to jednocześnie metoda oparta na KKT, rzędu drugiego i lokalna.')]],
  [2, [
    fa(9, 1, 'sekcja 04', 'Najszybszy spadek', 'Kierunek to minus gradient. Metoda jest tania i odporna, ale zbieżna tylko liniowo. W wąskiej, zakrzywionej dolinie zygzakuje, bo kierunek najszybszego spadku jest prostopadły do warstwicy, a nie skierowany do minimum.'),
    fa(10, 2, 'sekcja 04', 'Metoda Newtona', 'Przybliża funkcję paraboloidą i skacze do jej minimum. Dla funkcji kwadratowej trafia w jednym kroku, blisko minimum zbieżność jest kwadratowa. Cena: hesjan i układ równań w każdym kroku. Pułapka: gdy hesjan nie jest dodatnio określony, kierunek może prowadzić pod górę.'),
    fa(11, 2, 'sekcja 04', 'Quasi-Newton (BFGS)', 'Hesjanu nie liczy, tylko buduje jego przybliżenie z historii gradientów: para (zmiana punktu, zmiana gradientu) niesie krzywiznę w jednym kierunku. Zbieżność nadliniowa, prawie jak Newton, przy koszcie metody pierwszego rzędu. Domyślny wybór w praktyce.'),
    fa(12, 2, 'sekcja 04', 'Gradienty sprzężone', 'Kierunek to poprawiony gradient: człon z poprzednim kierunkiem gasi zygzakowanie. Nie przechowuje żadnej macierzy, więc nadaje się do zadań z bardzo wieloma zmiennymi.'),
    fa(13, 2, 'sekcja 04', 'Metody rzędu zerowego', 'Nelder–Mead i Hooke–Jeeves używają tylko wartości funkcji. Są wolniejsze i bez porządnej teorii zbieżności, ale to jedyne wyjście, gdy funkcja pochodzi z symulacji lub pomiaru albo jest nieróżniczkowalna.'),
    S(14, 2, 'sekcja 04', { tytul: 'Zygzak a skok Newtona w wąskiej dolinie', svg: F('fig09.zygzak'), opis: 'Kierunek najszybszego spadku jest prostopadły do warstwicy, więc w wydłużonej dolinie kolejne kroki odbijają się od jej ścian. Newton widzi krzywiznę i dla funkcji kwadratowej idzie prosto do minimum.' }),
    kr(15, 2, 'sekcja 04', 'Nawrót z warunkiem Armijo', ['Zacznij od kroku próbnego', 'Sprawdź, czy funkcja zmalała dostatecznie, choć w części tak, jak obiecywał gradient', 'Jeśli nie, połowa kroku', 'Powtarzaj do spełnienia warunku'], 'Krok za duży rozbiega algorytm, za mały spowalnia go do bezużyteczności.'),
    dp(16, 3, 'sekcja 04', 'Dlaczego metoda gradientowa zwalnia na źle uwarunkowanym zadaniu?', 'Bo jej tempo pogarsza się wraz z liczbą warunkową hesjanu. W przykładzie kwadratowym o warstwicach elips o stosunku osi 5 spadek potrzebował 250 iteracji, a Newton jednej, bo paraboloida przybliżająca jest tam samą funkcją. Metody rzędu drugiego są na uwarunkowanie odporne.'),
    pf(17, 2, 'sekcja 04', 'Kierunek Newtona zawsze prowadzi w dół.', false, 'Tylko gdy hesjan jest dodatnio określony, a daleko od minimum zwykle nie jest. Implementacja musi to wykrywać i wracać do kierunku gradientowego.'),
    lu(18, 2, 'sekcja 04', 'BFGS buduje przybliżenie ___ z historii gradientów.', ['hesjanu', 'gradientu', 'funkcji celu'], 0, 'Dzięki temu nie liczy drugich pochodnych, a zbieżność jest nadliniowa.'),
    S(19, 2, 'sekcja 05', { pytanie: 'Co się dzieje, gdy funkcja ma wiele minimów lokalnych?', svg: F('fig09.wielostart'), odpowiedz: 'Metoda lokalna kończy w pierwszym napotkanym minimum, więc wynik zależy od startu, a ∇f = 0 jest spełnione w każdym z nich tak samo. Ostrzega przed tym tylko wielostart.' }),
    fi(20, 2, 'sekcja 05', 'Co zrobić, gdy funkcja ma wiele minimów lokalnych?', 'Wielostart: metoda lokalna z wielu punktów, najlepszy wynik (tanio, bez gwarancji). Metody globalne: wyżarzanie, algorytmy genetyczne, rój (wolne, bez gwarancji). Wykazanie wypukłości: jedyna droga do gwarancji.'),
    fi(21, 2, 'sekcja 08', 'Jakie trzy rzeczy psują każdą metodę i co na nie pomaga?', 'Złe uwarunkowanie: skalowanie zmiennych lub metoda rzędu drugiego. Wielomodalność: wielostart. Nieróżniczkowalność: metody rzędu zerowego lub przeformułowanie zadania.')]],
  [3, [
    fa(22, 1, 'sekcja 06', 'Z ograniczeniami minimum leży zwykle na brzegu', 'Gradient nie musi się już zerować. Minimum bez ograniczeń często leży poza obszarem dopuszczalnym, więc rozwiązanie wychodzi na brzeg, gdzie funkcję dałoby się dalej zmniejszać, ale ograniczenie na to nie pozwala. Potrzebny jest inny warunek optymalności.'),
    S(23, 2, 'sekcja 06', { tytul: 'Geometria KKT: styczność i przeciwne gradienty', svg: F('fig09.kkt'), opis: 'W optimum warstwica funkcji celu jest styczna do brzegu obszaru. Gradienty ∇f i ∇g leżą na jednej prostej i mają przeciwne zwroty, więc nie da się przesunąć wzdłuż brzegu i zmniejszyć f.' }),
    kr(24, 2, 'sekcja 06', 'Cztery warunki KKT', ['Stacjonarność: ∇f + Σμᵢ∇gᵢ + Σλⱼ∇hⱼ = 0', 'Dopuszczalność: ograniczenia spełnione', 'Znak mnożników: μᵢ ≥ 0 dla nierówności', 'Komplementarność: μᵢgᵢ = 0'], 'Czytaj po ludzku: gradientu celu nie da się zrównoważyć niczym poza gradientami ograniczeń, a ograniczenie nieaktywne nie wpływa na rozwiązanie.'),
    fi(25, 2, 'sekcja 06', 'Co mówi warunek komplementarności?', 'Albo ograniczenie jest aktywne (gᵢ = 0, leżymy na nim, mnożnik może być dodatni), albo nieaktywne (gᵢ < 0, jest zapas) i wtedy μᵢ = 0, więc w ogóle nie wpływa na rozwiązanie.'),
    fi(26, 3, 'sekcja 06', 'Jak interpretuje się mnożnik Lagrange’a?', 'Mówi, o ile poprawiłaby się wartość funkcji celu, gdyby ograniczenie odrobinę poluzować. Stąd nazwa „cena ukryta” i użyteczność w analizie wrażliwości.'),
    pf(27, 2, 'sekcja 06', 'Warunki KKT są zawsze wystarczające dla optimum.', false, 'Są konieczne przy regularności ograniczeń. Wystarczające są dopiero dla zadania wypukłego.'),
    fi(28, 1, 'sekcja 07', 'Wymień trzy rodziny metod z ograniczeniami.', 'Sprowadzenie do zadania bez ograniczeń (kara i bariera). Metody kierunków dopuszczalnych (rzutowanie gradientu, zbiór aktywny). Metody oparte na KKT (SQP, punkt wewnętrzny).'),
    lu(29, 3, 'sekcja 07', 'Metoda punktu wewnętrznego łagodzi warunek ___ i stopniowo zbliża parametr do zera.', ['komplementarności', 'stacjonarności', 'dopuszczalności'], 0, 'Zamiast μg = 0 rozwiązuje μg = −τ i zmniejsza τ, idąc wnętrzem zbioru dopuszczalnego.')]],
  [4, [
    fa(30, 1, 'sekcja 07', 'Kara i bariera', 'Ograniczenia wbudowuje się w funkcję celu i używa dowolnej metody bez ograniczeń. Kara dokłada składnik rosnący z naruszeniem, bariera rośnie do nieskończoności przy brzegu od wewnątrz. Zaleta: prostota. Wada: coraz gorsze uwarunkowanie kolejnych zadań. Szczegóły w zagadnieniu 10.'),
    fa(31, 2, 'sekcja 07', 'Kierunki dopuszczalne', 'Algorytm porusza się tylko wewnątrz zbioru dopuszczalnego. Rzutowanie gradientu zawraca wychodzący krok na brzeg. Metoda zbioru aktywnego zgaduje aktywne ograniczenia, traktuje je jak równości i poprawia zgadywanie znakami mnożników. Każde przybliżenie jest dopuszczalne, ale przy ograniczeniach nieliniowych jest to kosztowne.'),
    fa(32, 2, 'sekcja 07', 'SQP', 'W każdej iteracji celu przybliża się kwadratowo, ograniczenia liniowo i rozwiązuje zadanie kwadratowe. To metoda Newtona zastosowana do warunków KKT: bardzo szybka blisko rozwiązania, kosztowna iteracja, wrażliwa na start.'),
    fa(33, 2, 'sekcja 07', 'Punkt wewnętrzny', 'Nowoczesny potomek bariery. Rozwiązuje złagodzoną wersję warunków KKT i idzie wnętrzem zbioru dopuszczalnego do rozwiązania. Standard dla zadań dużej skali.'),
    po(34, 3, 'sekcja 07', 'Kara i bariera kontra kierunki dopuszczalne', ['Kara i bariera', 'Kierunki dopuszczalne'], [['Idea', 'ograniczenia zamienione na koszt', 'ruch tylko wewnątrz zbioru'], ['Zaleta', 'prosta, gotowe solvery', 'każde przybliżenie dopuszczalne'], ['Wada', 'złe uwarunkowanie przy dużym r', 'kosztowna dla ograniczeń nieliniowych']]),
    fi(35, 2, 'sekcja 08', 'Którą metodę wybrać przy ograniczeniach nieliniowych, a którą przy liniowych i dużej skali?', 'Nieliniowe: SQP, bo rozwiązuje warunki KKT metodą Newtona. Liniowe i duża skala: punkt wewnętrzny, bo skaluje się najlepiej.'),
    dp(36, 3, 'sekcja 07', 'Dlaczego SQP buduje w każdym kroku zadanie kwadratowe?', 'Bo przy ograniczeniach liniowych i funkcji celu kwadratowej zadanie rozwiązuje się skończenie i niezawodnie. SQP zamienia jeden trudny problem na ciąg łatwych. Ten sam mechanizm napędza sterowanie predykcyjne MPC.'),
    pf(37, 2, 'sekcja 07', 'W metodach kierunków dopuszczalnych przerwane obliczenia nadal dają rozwiązanie dopuszczalne.', true, 'Każde kolejne przybliżenie leży w zbiorze dopuszczalnym, więc wynik może nie być najlepszy, ale jest wykonalny.')]]
]);

// ================= Q10 =================
build(10, 4, [
  [1, [
    fa(1, 1, 'sekcja 03', 'Ograniczenie zamienione na koszt', 'Ograniczeń nie można zignorować, ale można je zamienić na koszt: możesz je naruszyć, ale zapłać karę. Do funkcji celu dodaje się funkcję kary φ(x, r) i minimalizuje T = f + φ już bez ograniczeń, dla coraz większego r. Ciąg minimów x*(r) dąży do rozwiązania zadania z ograniczeniami.', 'Strefa płatnego parkowania bez szlabanu: stanąć można wszędzie, ale mandat zniechęca.'),
    S(2, 1, 'sekcja 02', { tytul: 'Gdzie leży optimum: wnętrze albo brzeg', svg: F('fig10.polozenie'), opis: 'Po lewej ograniczenia są nieaktywne i wystarczą metody bez ograniczeń. Po prawej minimum bez ograniczeń leży poza obszarem, więc optimum jest na brzegu, tam gdzie poziomica f dotyka ograniczenia. Z tego bierze się cała trudność.' }),
    fi(3, 1, 'sekcja 02', 'Czym różnią się metody bezpośrednie od pośrednich i gdzie jest metoda funkcji kary?', 'Bezpośrednie traktują ograniczenia jawnie (metody losowe, SQP, kierunki dopuszczalne, complex). Pośrednie rozwiązują zadanie jako ciąg zadań bez ograniczeń: to metody funkcji kary i transformacji zmiennych. Kara jest metodą pośrednią.'),
    za(4, 1, 'sekcja 03', 'T(x, r) = f(x) + φ(x, r), a x*(r) → x* dla r → ∞.', 'T to zmodyfikowana funkcja celu minimalizowana bez ograniczeń. φ to funkcja kary zbudowana z ograniczeń, r to „wysokość mandatu”. Odległość minimum T od rozwiązania maleje ze wzrostem r.'),
    pf(5, 1, 'sekcja 02', 'Optimum zadania z ograniczeniami zawsze leży na brzegu obszaru.', false, 'Może leżeć we wnętrzu, gdy minimum bez ograniczeń jest dopuszczalne. Wtedy ograniczenia są nieaktywne.'),
    lu(6, 1, 'sekcja 03', 'Im większy parametr kary r, tym ___ przybliżenie rozwiązania.', ['dokładniejsze', 'mniej dokładne', 'bardziej dopuszczalne'], 0, 'W granicy r → ∞ minimum T pokrywa się z rozwiązaniem zadania z ograniczeniami.'),
    dp(7, 2, 'sekcja 06', 'Dlaczego nie od razu ogromne r, tylko ciąg zadań?', 'Przy dużym r poziomice T są bardzo wydłużone wzdłuż ograniczenia. Taką wąską dolinę metody bez ograniczeń minimalizują wolno i niedokładnie, bo zadanie jest źle uwarunkowane. Lepiej zacząć od małego r i przenosić wynik jako punkt startowy następnego zadania.')]],
  [2, [
    S(8, 2, 'sekcja 03', { tytul: 'Bariera od środka, kara od zewnątrz', svg: F('fig10.kara'), opis: 'Zadanie f(x) = ¼(x − 6)² przy 1 ≤ x ≤ 4, więc x* = 4. Bariera rośnie do nieskończoności przy brzegu, więc minima T leżą w środku. Kara zewnętrzna jest zerowa w obszarze, więc minima leżą tuż za brzegiem. Oba dążą do 4.' }),
    fa(9, 2, 'sekcja 04', 'Wewnętrzna funkcja kary (bariera)', 'Płot pod napięciem tuż przed granicą: im bliżej brzegu, tym mocniej odpycha. Bariera jest określona tylko we wnętrzu i rośnie do nieskończoności przy brzegu, więc algorytm nigdy nie opuszcza obszaru. Każde przybliżenie jest dopuszczalne, a obliczenia można przerwać w dowolnej chwili.'),
    za(10, 2, 'sekcja 04', 'Bariera: tylko nierówności, niepuste wnętrze, start wewnątrz.', 'Nie może wystąpić para h ≤ 0 i −h ≤ 0, czyli równość. Waga bariery maleje, a minimum podchodzi coraz bliżej brzegu.'),
    fa(11, 2, 'sekcja 05', 'Zewnętrzna funkcja kary', 'Mandat: w obszarze nic nie kosztuje, za wyjście płaci się tym więcej, im dalej się wyszło. Dla nierówności karze się max(0, h)^β, dla równości odejście w dowolną stronę. Działa z równościami i nierównościami i nie wymaga startu w obszarze. Kwadrat daje funkcję gładką, łatwą do minimalizacji gradientowej.'),
    fa(12, 2, 'sekcja 05', 'Kara mieszana', 'Łączy barierę B i karę K. Bariera pilnuje nierówności, które muszą być spełnione zawsze, kara obsługuje równości i te ograniczenia, które wolno chwilowo naruszyć. Stosuje się ją, gdy w zadaniu są równości, a niektóre nierówności mają być zawsze spełnione.'),
    po(13, 3, 'sekcja 08', 'Wewnętrzna kontra zewnętrzna', ['Wewnętrzna (bariera)', 'Zewnętrzna'], [['Ograniczenia', 'tylko nierówności', 'równości i nierówności'], ['Punkt startowy', 'wewnątrz obszaru', 'dowolny'], ['Przybliżenia', 'zawsze dopuszczalne', 'zwykle niedopuszczalne'], ['Parametr', 'waga bariery maleje', 'r rośnie']]),
    lu(14, 2, 'sekcja 04', 'Bariera nie obsłuży ograniczeń ___, bo wnętrze obszaru byłoby puste.', ['równościowych', 'nierównościowych', 'liniowych'], 0, 'Równość h = 0 to para h ≤ 0 i −h ≤ 0, która nie ma wnętrza. Dla równości potrzebna jest kara zewnętrzna.'),
    pf(15, 2, 'sekcja 05', 'Przybliżenia z kary zewnętrznej są zawsze dopuszczalne.', false, 'Leżą zwykle na zewnątrz obszaru i dopiero w granicy r → ∞ go osiągają. To cecha bariery, że przybliżenia są dopuszczalne.'),
    dp(16, 3, 'sekcja 05', 'Kiedy stosuje się karę mieszaną?', 'Gdy w zadaniu są równości (bariera ich nie obsłuży), a pewne nierówności muszą być spełnione przez cały czas obliczeń. Barierą chroni się te nietykalne, karą rozlicza resztę.'),
    fi(17, 2, 'sekcja 05', 'Jaką postać ma zewnętrzna funkcja kary i dlaczego kwadratową?', 'Składnik jest zerowy, gdy ograniczenie jest spełnione, i rośnie z naruszeniem, np. r·max(0, h)² dla nierówności i r·g² dla równości. Kwadrat daje funkcję gładką, więc łatwą do minimalizacji metodami gradientowymi.')]],
  [3, [
    S(18, 1, 'sekcja 06', { pytanie: 'Narysuj schemat algorytmu metody funkcji kary.', svg: F('fig10.algorytm'), odpowiedz: 'Wybór kary, x⁽⁰⁾, r₁ i ε. Budowa T = f + φ. Minimalizacja T bez ograniczeń dowolną metodą. Test stopu: jeśli spełniony, wynik, jeśli nie, zwiększ r i wróć do minimalizacji. Pętla zewnętrzna zmienia tylko r.' }),
    kr(19, 1, 'sekcja 06', 'Algorytm metody funkcji kary', ['Wybierz postać kary, punkt startowy, r₁, dokładność ε i mnożnik c', 'Zbuduj T(x, r) = f + φ', 'Zminimalizuj T bez ograniczeń, startując z poprzedniego wyniku', 'Sprawdź warunek stopu', 'Zmień r (r · c) i wróć do kroku 3'], 'Przy barierze punkt startowy musi leżeć wewnątrz obszaru, a waga bariery maleje.'),
    fi(20, 2, 'sekcja 06', 'Jakie są warunki stopu?', 'Kolejne przybliżenia przestały się ruszać. Albo wartość funkcji z karą przestała się zmieniać. Albo składnik kary w x⁽ᵏ⁾ jest mniejszy od ε, więc T ≈ f.'),
    fi(21, 2, 'sekcja 06', 'Skąd startuje kolejne zadanie bez ograniczeń?', 'Z wyniku poprzedniego. Rozwiązanie stopniowo się poprawia, a zadanie z większym r startuje blisko swojego minimum.'),
    lu(22, 1, 'sekcja 06', 'W karze zewnętrznej parametr r w kolejnych zadaniach ___.', ['rośnie', 'maleje', 'jest stały'], 0, 'Rośnie przez mnożenie przez c > 1. W barierze natomiast maleje waga bariery.')]],
  [4, [
    S(23, 2, 'sekcja 07', { tytul: 'Przykład z wykładu: ścieżka x*(r)', svg: F('fig10.przyklad'), opis: 'Minimalizujemy 4x₁² + 5x₂² przy 2x₁ + 3x₂ = 6. Kolejne minima T idą po prostej od zera w stronę punktu, w którym poziomica dotyka ograniczenia: (15/14; 9/7).' }),
    kr(24, 3, 'sekcja 07', 'Rozwiązanie przykładu krok po kroku', ['Równość, więc kara zewnętrzna kwadratowa: T = 4x₁² + 5x₂² + r(2x₁ + 3x₂ − 6)²', 'Gradient równy zeru daje dwa równania z tym samym nawiasem', 'Podzielenie równań daje x₁ = (5/6) x₂', 'Wyliczenie x₂ jako funkcji r', 'Przejście r → ∞ daje (15/14; 9/7)'], 'W granicy nawias 2x₁ + 3x₂ − 6 dąży do zera, więc 14/3 · x₂ = 6, czyli x₂ = 9/7 i x₁ = 15/14. Ten sam wynik daje metoda Lagrange’a.'),
    za(25, 2, 'sekcja 07', 'x* = (15/14; 9/7) ≈ (1,071; 1,286).', 'Spełnia ograniczenie: 2·15/14 + 3·9/7 = 6. Dla skończonego r minimum leży na prostej x₁ = (5/6)x₂, ale z naruszeniem ograniczenia, które maleje z rosnącym r.'),
    fi(26, 3, 'sekcja 07', 'Jak sprawdzić, że znaleziony punkt to minimum T?', 'Hesjan T ma elementy 8 + 8r, 12r i 10 + 18r. Pierwszy minor 8 + 8r > 0, wyznacznik 80 + 224r > 0 dla r > 0. Hesjan jest dodatnio określony, więc to minimum.'),
    dp(27, 2, 'sekcja 07', 'Jak w przykładzie zmienia się naruszenie ograniczenia wraz z r?', 'Maleje do zera: dla r = 0 wynosi −6, dla r = 0,3 około −3,3, dla r = 10 około −0,2, a w granicy 0. Przybliżenia leżą po stronie niedopuszczalnej, tak jak dla każdej kary zewnętrznej.'),
    fa(28, 2, 'sekcja 08', 'Zastosowanie metody', 'Pozwala użyć do zadania z ograniczeniami dowolnej metody bez ograniczeń: gradientowej, Newtona, bezgradientowej, a także algorytmu genetycznego, w którym kara obniża przystosowanie osobników niedopuszczalnych.'),
    fi(29, 2, 'sekcja 08', 'Jakie są zalety i wady metody funkcji kary?', 'Zalety: prostota, uniwersalność (ograniczenia nieliniowe, równości i nierówności), możliwość użycia gotowego solvera. Wady: wynik jest przybliżeniem, trzeba rozwiązać wiele zadań, przy dużym r zadanie jest źle uwarunkowane, a wynik zależy od r₁ i c.'),
    pf(30, 2, 'sekcja 08', 'Dla skończonego r metoda funkcji kary daje dokładne rozwiązanie zadania z ograniczeniami.', false, 'Dokładne jest dopiero w granicy r → ∞. Dla skończonego r otrzymuje się przybliżenie, a zbyt duże r psuje uwarunkowanie.')]]
]);
