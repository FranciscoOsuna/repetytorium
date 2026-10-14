const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(23, 4, [
  [1, [
    fa(1, 1, 'sekcja 01', 'Pytanie wyliczeniowe', 'Odpowiedź to lista elementów technologii, każdy z jednym zdaniem o tym, co wnosi, a nie opowieść o tym, że MPC jest nowoczesne.'),
    fa(2, 1, 'sekcja 01', 'Definicja sterowania predykcyjnego', 'Sterowanie przez rozwiązywanie zadania optymalizacji: w każdej próbce regulator przewiduje modelem przyszłość obiektu, wybiera najlepszy ciąg sterowań z uwzględnieniem ograniczeń i wykonuje z niego tylko pierwszy krok.'),
    S(3, 1, 'sekcja 02', { tytul: 'Plan i przesuwany horyzont', svg: F('fig23.plan'), opis: 'Plan sięga kilkudziesięciu próbek w przód, ale wykonywany jest tylko pierwszy krok, bo w następnej próbce przyjdzie nowy pomiar i plan zostanie policzony od nowa.' }),
    S(4, 1, 'sekcja 03', { pytanie: 'Wymień sześć elementów technologii sterowania predykcyjnego.', svg: F('fig23.elementy'), odpowiedz: 'Model obiektu i zakłóceń, funkcja celu z horyzontami i wagami, ograniczenia, zadanie optymalizacji (QP), estymator stanu, przesuwany horyzont.' }),
    dp(5, 2, 'sekcja 02', 'Dlaczego MPC to sprzężenie zwrotne, skoro plan jest liczony w otwartej pętli?', 'Sprzężenie wchodzi przez powtarzanie: każda próbka zaczyna się od świeżego pomiaru, więc błąd modelu i zakłócenie od razu zmieniają punkt startowy prognozy.'),
    pf(6, 2, 'sekcja 03', 'MPC gwarantuje stabilność z definicji, bo minimalizuje kryterium.', false, 'Sama minimalizacja na skończonym horyzoncie stabilności nie daje.'),
    fa(7, 2, 'sekcja 03', 'Odmiany MPC', 'DMC (odpowiedź skokowa), GPC (model transmitancyjny), MPC w przestrzeni stanu, MPC nieliniowy, explicit MPC.'),
    lu(8, 1, 'sekcja 03', 'Z policzonego planu wykonuje się ___.', ['pierwszy krok', 'cały plan', 'ostatni krok'], 0, 'Wykonanie całego planu byłoby sterowaniem programowym w otwartej pętli.')]],
  [2, [
    fa(9, 2, 'sekcja 03', 'Model obiektu i zakłóceń', 'Model jest elementem obowiązkowym, bo bez niego nie ma prognozy. Postać modelu daje nazwy odmian: odpowiedź skokowa (DMC), transmitancja (GPC), przestrzeń stanu. Do modelu dokłada się model zakłócenia, zwykle stałą niezgodność pomiaru z prognozą, bo bez tego nie znika uchyb ustalony.'),
    fa(10, 2, 'sekcja 03', 'Funkcja celu: horyzonty i wagi', 'Horyzont predykcji Np: jak daleko patrzymy. Horyzont sterowania Nu: ile ruchów wolno zaplanować. Wagi nadążania i wysiłku sterowania. Trajektoria zadana na przyszłość.'),
    dp(11, 3, 'sekcja 03', 'Dlaczego w funkcji celu karze się przyrosty sterowania, a nie samo sterowanie?', 'Regulator nie ma wtedy powodu wracać do zera i dostaje działanie całkujące za darmo.'),
    dp(12, 3, 'sekcja 03', 'Co daje trajektoria zadana zamiast jednej wartości?', 'Jeśli znamy przyszłe zmiany zadania, regulator może zacząć działać, zanim zmiana nastąpi. Regulator ze sprzężeniem od uchybu tego nie potrafi.'),
    fi(13, 2, 'sekcja 05', 'Jak dobrać horyzont predykcji?', 'Musi obejmować istotną część odpowiedzi obiektu, a przy obiekcie z opóźnieniem co najmniej całe opóźnienie i kawałek odpowiedzi po nim.')]],
  [3, [
    fa(14, 1, 'sekcja 03', 'Ograniczenia: po to sięga się po MPC', 'Dotyczą sterowania (zakres zaworu), jego przyrostu (szybkość napędu), wyjść i stanów (limity technologiczne). Ograniczenia wyjścia bywają nieosiągalne, więc robi się je miękkimi: przekroczenie wolno, ale z dużą karą w funkcji celu.'),
    fi(15, 2, 'sekcja 03', 'Dlaczego ograniczenia wyjścia robi się miękkie?', 'Mogą być nieosiągalne, a zadanie musi zawsze mieć rozwiązanie. Przekroczenie jest dopuszczone, ale karane w funkcji celu.'),
    S(16, 1, 'sekcja 04', { tytul: 'Przeregulowanie z ograniczeniem zaworu', svg: F('fig23.przeregulowanie'), opis: 'Regulator nieświadomy ograniczeń: 8,7 %. Anty-windup: 6,8 %. Ograniczenia w zadaniu optymalizacji: 4,3 %. Plan zawiera tylko ruchy, które zawór potrafi wykonać.' }),
    dp(17, 3, 'sekcja 04', 'Czy przewaga MPC nad anty-windup jest duża w tym przykładzie?', 'Nie: IAE 10,15 wobec 9,77. Przy jednym prostym ograniczeniu na obiekcie stabilnym i wolnym dobry anty-windup daje podobny efekt. Przewaga rośnie przy wielu ograniczeniach, ograniczeniach na wyjściach, obiekcie wielowymiarowym i zmiennych sprzężonych.'),
    fa(18, 2, 'sekcja 03', 'Zadanie optymalizacji', 'Po wstawieniu prognozy do funkcji celu zostaje zadanie programowania kwadratowego (QP). Dla modelu liniowego i kryterium kwadratowego jest wypukłe, ma jedno minimum i rozwiązuje się je w skończonej liczbie kroków, więc nadaje się do czasu rzeczywistego. Dla modelu nieliniowego (NMPC) przestaje być wypukłe i jest dużo droższe.'),
    pf(19, 2, 'sekcja 03', 'Dla modelu liniowego i kryterium kwadratowego zadanie MPC ma wiele minimów lokalnych.', false, 'Jest wypukłe, więc minimum jest jedno.')]],
  [4, [
    fa(20, 2, 'sekcja 03', 'Estymator stanu', 'Prognoza startuje ze stanu, a mierzy się zwykle jedno wyjście. Estymator (obserwator albo filtr Kalmana) odtwarza stan i razem z nim zakłócenie wejściowe.'),
    S(21, 1, 'sekcja 03', { tytul: 'Jedna próbka regulatora predykcyjnego', svg: F('fig23.petla'), opis: 'Pomiar, estymator, optymalizacja z ograniczeniami, pierwszy krok sterowania, obiekt, i od nowa z nowym pomiarem.' }),
    dp(22, 2, 'sekcja 03', 'Po co estymator stanu w MPC?', 'Prognoza startuje ze stanu, a stan zwykle nie jest mierzony w całości. Bez estymatora nie ma punktu startu.'),
    kr(23, 2, 'sekcja 03', 'Jedna próbka MPC', ['Pomiar wyjścia', 'Estymacja stanu i zakłócenia', 'Rozwiązanie QP z ograniczeniami', 'Wykonanie pierwszego kroku sterowania', 'Przesunięcie horyzontu i powtórzenie'], 'Cały plan jest liczony od nowa w każdej próbce.')]]
]);
