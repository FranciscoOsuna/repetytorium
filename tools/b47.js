const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(47, 5, [
  [1, [
    S(8, 1, 'sekcja 01', { tytul: 'Cztery pojęcia reprezentacji wiedzy', svg: F('fig47.budowa'), opis: 'Predykat to najmniejsza cegiełka, z niego budują się reguły produkcji, reguły decyzyjne i klauzule. Wszystko to deklaratywny zapis wiedzy.' }),
    1,
    fa(9, 1, 'sekcja 03', 'Predykat: definicja', 'Predykat P(t₁, …, tₙ) to stwierdzenie o obiektach (termach), któremu po podstawieniu przypisuje się T albo F. Liczba argumentów n może wynosić 0, 1, 2, 3 i więcej.'),
    S(10, 1, 'sekcja 03', { tytul: 'Predykat według liczby argumentów', svg: F('fig47.arg'), opis: 'Zero argumentów to zwykłe zdanie, jeden to cecha, dwa to relacja, trzy to charakterystyka (agregat ⟨obiekt, atrybut, wartość⟩).' }),
    fa(11, 2, 'sekcja 03', 'Zastosowania predykatu', 'Fakty w bazie wiedzy (Uszkodzony(POMPA_2)), warunki w regułach (Przekracza(Temperatura(x), 39)), wiedza ogólna z kwantyfikatorami, a także Prolog i systemy ekspertowe, które zapisują fakty w tej postaci.')]],
  [2, [
    fa(12, 1, 'sekcja 04', 'Reguła produkcji: definicja', 'Jeśli φ i ψ są wyrażeniami logicznymi, to φ ⇒ ψ jest regułą produkcji: φ to warunki, ψ to konkluzja. Zbiór reguł tworzy regułową bazę wiedzy, w której wszystkie reguły muszą być prawdziwe naraz. Przykład: gorączka ∧ dreszcze ⇒ grypa.'),
    S(13, 1, 'sekcja 04', { tytul: 'Łańcuch reguł produkcji', svg: F('fig47.lancuch'), opis: 'Konkluzja jednej reguły bywa warunkiem następnej. Program, który zna fakty, odpala reguły po kolei i dopisuje nowe fakty.' }),
    S(14, 2, 'sekcja 04', { tytul: 'Ta sama reguła w trzech zapisach', svg: F('fig47.zapisy'), opis: 'Reguła podatkowa może mieć warunki zdaniowe, agregatowe albo predykatowe. Zmienia się tylko rodzaj stwierdzeń w warunkach.' }),
    fa(15, 2, 'sekcja 04', 'Zastosowania reguł produkcji', 'Regułowe bazy wiedzy systemów ekspertowych (diagnostyka medyczna i techniczna, doradztwo kredytowe, przepisy podatkowe) oraz wnioskowanie w przód i wstecz.')]],
  [3, [
    fa(16, 1, 'sekcja 05', 'Reguła decyzyjna: definicja', 'Po zastąpieniu ¬, ∧, ∨ nazwami not, and, or zapisy if φ then ψ, if φ then ψ′ else ψ″ oraz ψ if φ są regułami decyzyjnymi. Konkluzją może być polecenie, np. ZAMKNIJ zawór, o którym nie da się powiedzieć, że jest prawdziwe.'),
    S(17, 1, 'sekcja 05', { tytul: 'Reguła decyzyjna if–then–else', svg: F('fig47.ifthen'), opis: 'Gdy warunek jest prawdziwy, wykonuje się akcję ψ′, gdy fałszywy, akcję ψ″.' }),
    S(18, 2, 'sekcja 05', { tytul: 'Paradoks implikacji', svg: F('fig47.paradoks'), opis: 'Implikacja jest fałszywa tylko dla φ prawdziwego i ψ fałszywego. Przy fałszywym warunku jest zawsze prawdziwa, nawet bez sensu przyczynowego. Reguła decyzyjna wiąże przyczynę ze skutkiem i tego unika.' }),
    5,
    fa(19, 2, 'sekcja 05', 'Zastosowania reguł decyzyjnych', 'Systemy ekspertowe z akcjami (konkluzja uruchamia procedurę lub wypisuje zalecenie), sterowanie i automatyka (jeśli poziom za wysoki, zamknij zawór), reguły alarmowe w SCADA i systemy wspomagania decyzji.')]],
  [4, [
    fa(20, 1, 'sekcja 06', 'Klauzula: definicja', 'Klauzula to alternatywa literałów: ¬p₁ ∨ … ∨ q₁ ∨ …. Literał pozytywny to stwierdzenie bez negacji, negatywny to stwierdzenie zanegowane. Koniunkcję klauzul zapisuje się jako zbiór, czyli klauzulową bazę wiedzy.'),
    3,
    S(21, 2, 'sekcja 06', { tytul: 'Reguła do klauzuli', svg: F('fig47.klauzula'), opis: 'Warunki dostają minus, konkluzje zostają bez minusa, wszystko łączy się znakiem ∨. Kluczem jest równoważność p ⇒ q i ¬p ∨ q.' }),
    7,
    S(22, 3, 'sekcja 06', { tytul: 'Klauzule Horna', svg: F('fig47.horn'), opis: 'Klauzula Horna ma co najwyżej jeden literał pozytywny: fakt, reguła albo cel. Slajd 28 mówi „co najmniej”, co jest pomyłką.' }),
    4,
    S(23, 3, 'sekcja 06', { pytanie: 'Jak zamienić dowolną formułę na zbiór klauzul (6 kroków)?', svg: F('fig47.kroki'), odpowiedz: 'Usuń kwantyfikatory (skolemizacja), usuń ⇔ i ⇒, przesuń negacje do stwierdzeń (de Morgan), zastosuj rozdzielność ∨ nad ∧, usuń koniunkcje i zapisz zbiór klauzul.' }),
    6,
    fa(24, 2, 'sekcja 06', 'Zastosowania klauzul', 'Rezolucja i automatyczne dowodzenie (operacje tylko na zbiorze klauzul), Prolog (program to zbiór klauzul Horna: fakty, reguły, cel) oraz jednolita klauzulowa baza wiedzy czytana w dowolnym kierunku.')]],
  [5, [
    2,
    S(25, 1, 'sekcja 07', { tytul: 'Porównanie czterech pojęć', svg: F('fig47.porownanie'), opis: 'Ta sama wiedza (gorączka ∧ dreszcze ⇒ grypa) w czterech zapisach: predykaty, reguła produkcji, reguła decyzyjna, klauzula.' }),
    fa(26, 2, 'sekcja 07', 'Jedna wiedza, cztery zapisy', 'Predykaty: Gorączka(x), Dreszcze(x), Grypa(x). Reguła produkcji: Gorączka(x) ∧ Dreszcze(x) ⇒ Grypa(x). Reguła decyzyjna: if Gorączka(x) and Dreszcze(x) then ZALEĆ(x, łóżko). Klauzula: ¬Gorączka(x) ∨ ¬Dreszcze(x) ∨ Grypa(x).')]],
]);
