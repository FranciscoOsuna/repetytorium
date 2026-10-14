const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, svg } = L;
module.exports = {
  budowa: () => H.chainV(['predykat|Uszkodzony(x): T lub F', 'reguła produkcji|warunki ⇒ konkluzja', 'reguła decyzyjna|if … then akcja', 'klauzula|alternatywa literałów'], { hi: [0], w: 220, gap: 40, label: 'Cztery pojęcia budują się jedno na drugim' }),
  arg: () => H.cols('Argumenty', 'Co opisuje (przykład)', [['0', 'stan świata: ALARM'], ['1', 'cechę: Uszkodzony(x)'], ['2', 'relację: Przekracza(T, 39)'], ['3', 'Odległość(WWA, KRA, 300)']], { w1: 90, w2: 210, h: 36, label: 'Predykat według liczby argumentów' }),
  lancuch: () => H.chainV(['masz grypę', 'musisz położyć się do łóżka', 'masz pilną pracę ∧ łóżko|⇒ zawiadom szefa'], { hi: [2], w: 220, gap: 40, label: 'Łańcuch reguł produkcji' }),
  zapisy: () => H.cols('Zapis', 'Warunek w regule podatkowej', [['zdaniowy', '„podatnik rozlicza się|indywidualnie”'], ['agregatowy', '⟨podatnik, Rodzaj-rozl.,|INDYWID.⟩'], ['predykatowy', 'Rozliczenie(podatnik,|INDYWID.)']], { w1: 100, w2: 200, h: 46, label: 'Ta sama reguła w trzech zapisach' }),
  ifthen: () => H.chainH(['warunek φ|(T lub F)', 'then|akcja ψ′', 'else|akcja ψ″'], { hi: [0], h: 50, note: ['if ⟨Z1, Poziom⟩ > 110 and not Awaria(POMPA)', 'then ZAMKNIJ zawór-Z1 else OTWÓRZ zawór-Z1'], label: 'Reguła decyzyjna' }),
  paradoks: () => H.cols('φ ⇒ ψ', 'Wartość', [['φ = T, ψ = T', 'T'], ['φ = T, ψ = F', 'F'], ['φ = F, ψ = T', 'T'], ['φ = F, ψ = F', 'T (paradoks)']], { w1: 150, w2: 120, h: 34, hi: [1], label: 'Tabela prawdy implikacji' }),
  klauzula: () => H.chainV(['reguła|q₁ ∧ q₂ ⇒ p', 'p ⇒ q to ¬p ∨ q|zaneguj warunek', 'de Morgan|¬q₁ ∨ ¬q₂ ∨ p'], { hi: [2], w: 210, gap: 40, label: 'Reguła do klauzuli' }),
  horn: () => H.cols('Klauzula Horna', 'W Prologu', [['fakt: 1 pozytywny', 'grypa(jan).'], ['reguła: 1 pozyt.|+ negatywne', 'grypa(X) :-|goraczka(X), dreszcze(X).'], ['cel: 0 pozytywnych', '?- goraczka(X),|dreszcze(X).']], { w1: 130, w2: 170, h: 46, label: 'Klauzule Horna' }),
  kroki: () => H.chainV(['1 usuń kwantyfikatory (Skolem)', '2 usuń ⇔, 3 usuń ⇒', '4 negacje do stwierdzeń', '5 rozdzielność ∨ nad ∧', '6 zbiór klauzul'], { hi: [4], w: 230, gap: 40, label: 'Formuła do klauzul w sześciu krokach' }),
  porownanie: () => H.cols('Pojęcie', 'Zapis i zastosowanie', [['predykat', 'fakty i warunki|T/F, Prolog'], ['reguła produkcji', 'warunki ⇒ konkluzja|systemy ekspertowe'], ['reguła decyzyjna', 'if–then–else, akcje|sterowanie, SWD'], ['klauzula', 'tylko ¬ i ∨|rezolucja, Prolog']], { w1: 120, w2: 180, h: 50, label: 'Jedna wiedza w czterech zapisach' }),
};
