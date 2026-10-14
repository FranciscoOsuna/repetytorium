const H = require('./h');
module.exports = {
  mp: () => H.chainV(['reguła p ⇒ q|(wiedza ogólna)', 'fakt p|(wiedza szczegółowa)', 'nowy fakt q|modus ponens'], { hi: [2], w: 200, gap: 40, label: 'Modus ponens' }),
  przod: () => H.chainV(['baza: fakty i reguły', 'zbiór C: reguły|ze spełnionymi przesłankami', 'wybierz R wg strategii', 'uaktywnij R: dopisz wniosek'], { hi: [3], w: 210, gap: 40, loop: true, note: ['do celu', 'lub braku', 'reguł'], label: 'Wnioskowanie w przód' }),
  strategie: () => H.cols('Strategia', 'Wybór z C', [['pierwszeństwa', 'najwcześniej w C'], ['świeżości', 'najpóźniej w C'], ['blokowania', 'pomija już użyte'], ['specyficzności', 'najwięcej przesłanek'], ['przypadkowości', 'losowo']], { w1: 130, w2: 170, h: 36, label: 'Strategie sterowania w przód' }),
  wstecz: () => H.chainV(['hipoteza F|(cel)', 'reguła r5: potrzebne D', 'hipoteza pośrednia D', 'reguła r1: potrzebne A', 'A jest faktem|D, potem F potwierdzone'], { hi: [4], w: 220, gap: 40, label: 'Wnioskowanie wstecz' }),
  porownanie: () => H.cols('W przód', 'Wstecz', [['sterowanie faktami', 'sterowanie celem'], ['wszystkie wnioski', 'jedna hipoteza'], ['fakty podaje|się z góry', 'pyta tylko|o potrzebne'], ['monitoring, alarmy', 'diagnostyka']], { w1: 150, w2: 150, h: 46, label: 'W przód a wstecz' }),
  bazy: () => H.cols('Baza', 'Cecha', [['elementarna', 'bez negacji,|monotoniczna'], ['z ograniczeniami', 'listy|wykluczających się'], ['rozwinięta', 'niemonotoniczna'], ['niepewna', 'współczynniki CF|od −1 do 1'], ['probabilistyczna', 'reguła Bayesa']], { w1: 130, w2: 170, h: 46, label: 'Odmiany baz reguł' }),
};
