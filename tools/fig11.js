const H = require('./h');
module.exports = {
  petla: () => H.chainV(['Populacja', 'OCENA|jedyne miejsce ograniczeń', 'Selekcja', 'Krzyżowanie', 'Mutacja'], { hi: [1], loop: true, w: 190, gap: 48, note: ['operatory', 'działają na kodzie', 'i nie znają', 'ograniczeń'], noteY: 70, label: 'Pętla algorytmu genetycznego: ograniczenia wchodzą tylko przez ocenę osobnika' }),
  rodziny: () => H.tree('Obsługa ograniczeń w AG', ['funkcja|kary', 'naprawa|osobnika', 'reguły|Deba', 'podejście|wielokryt.'], { hi: [2], note: ['każda to inny sposób oceny osobnika niedopuszczalnego'], label: 'Cztery rodziny sposobów obsługi ograniczeń w algorytmie genetycznym' }),
  deb: () => H.cols('Pojedynek w turnieju', 'Wygrywa', [['dopuszczalny vs|niedopuszczalny', 'dopuszczalny'], ['dwa dopuszczalne', 'mniejsze f'], ['dwa niedopuszczalne', 'mniejsze|naruszenie']], { w1: 190, w2: 130, hi: [2], note: ['dla niedopuszczalnych wartość f w ogóle się nie liczy'], label: 'Reguły Deba: trzy zasady porównywania osobników' }),
};
