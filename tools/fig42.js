const L = require('./svg'); const H = require('./h');
const { T, box, arrow, svg } = L;
module.exports = {
  elementy: () => H.cols('Element', 'Przykład (przedszkole)', [['decydent', 'dyrekcja przedszkola'], ['opcje (zbiór D)', 'pomieszczenia w okolicy'], ['ograniczenia', 'czynsz ≤ 2 tys., ≤ 1 km'], ['kryterium', 'wzrost powierzchni ≥ 20%']], { w1: 110, w2: 190, h: 38, label: 'Cztery niezbędne elementy problemu decyzyjnego' }),
  warunki: () => H.cols('Warunki', 'Model i metody', [['pewność', 'deterministyczny|(prog. matematyczne)'], ['ryzyko', 'znane prawdop.|(drzewa decyzyjne)'], ['niepewność', 'nieznane prawdop.|(statyst. bayesowska)']], { w1: 90, w2: 210, h: 42, label: 'Warunki podejmowania decyzji' }),
  model: () => H.chainV(['zmienne decyzyjne', 'ograniczenia|(zbiór dopuszczalny)', 'funkcja celu|(kryterium)'], { hi: [2], w: 190, gap: 38, label: 'Trzy składniki modelu decyzyjnego' }),
  funkcje: () => H.cols('Krok procesu', 'Funkcja SWD', [['1 problem', 'dane, wykrywanie sytuacji'], ['2–4 model', 'modele, identyfikacja'], ['5 wrażliwość', 'analiza „co jeśli”'], ['6–7 rozwiązanie', 'optymalizacja, symulacja'], ['8 wdrożenie', 'do sterowania, monitoring']], { w1: 110, w2: 190, h: 36, label: 'Funkcje SWD w krokach procesu' }),
  rodzaje: () => H.cols('Rodzaj SWD', 'Na czym się opiera', [['analizy danych', 'przetwarzanie danych'], ['anal. informacji', 'bazy pod decyzje'], ['optymalizacyjne', 'metody optymalizacji'], ['reprezentatywne', 'modele symulacyjne'], ['sugestywne', 'wnioskowanie (47–49)'], ['zarz. wiedzą', 'dostęp do wiedzy']], { w1: 120, w2: 180, h: 34, label: 'Sześć rodzajów SWD' }),
  arch: () => {
    let b = '';
    b += box(10, 8, 320, 34, ['interfejs (HMI)'], { k: 'bxa' });
    b += box(10, 56, 100, 44, ['dane', 'i wiedza']) + box(120, 56, 100, 44, ['modele']) + box(230, 56, 100, 44, ['wnioskowanie', 'i sugestie']);
    b += box(10, 114, 320, 34, ['połączenie z KSS: PLC – OPC UA'], { k: 'bxa' });
    b += arrow([[170, 42], [170, 56]], { k: 'ln' }) + arrow([[170, 100], [170, 114]], { k: 'ln' });
    return svg(158, b, 'Możliwa architektura SWD: interfejs, jądro i połączenie z systemem sterowania');
  },
};
