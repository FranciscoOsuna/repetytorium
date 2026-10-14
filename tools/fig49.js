const L = require('./svg'); const H = require('./h');
const { T, box, arrow, svg } = L;
module.exports = {
  struktura: () => {
    let b = '';
    const X = [10, 122, 234], W = 96;
    const row = (y, h, items, k) => items.forEach((l, i) => { b += box(X[i], y, W, h, l, k ? { k } : {}); });
    row(8, 38, [['interfejs', 'użytkownika'], ['generator', 'wyjaśnień'], ['edytor,', 'kontrola']]);
    row(74, 40, [['baza danych', '(fakty)'], ['maszyna', 'wnioskująca'], ['baza wiedzy', '(reguły)']], 'bxa');
    row(142, 38, [['moduł', 'obliczeń'], ['sterowanie'], ['interfejs', 'zewnętrzny']]);
    b += arrow([[106, 89], [122, 89]], { k: 'lna' }) + arrow([[122, 99], [106, 99]], { k: 'lna' });
    b += arrow([[234, 94], [218, 94]], { k: 'lna' });
    b += arrow([[58, 74], [58, 46]], { k: 'ln' }) + arrow([[170, 74], [170, 46]], { k: 'ln' }) + arrow([[282, 46], [282, 74]], { k: 'ln' });
    b += arrow([[170, 142], [170, 114]], { k: 'ln' }) + arrow([[58, 142], [58, 114]], { k: 'ln' }) + arrow([[282, 142], [282, 114]], { k: 'ln' });
    return svg(190, b, 'Struktura systemu ekspertowego: baza wiedzy, baza danych, maszyna wnioskująca i moduły pomocnicze');
  },
  podzial: () => H.tree('System ekspertowy', ['system|wnioskujący|(9 modułów)', 'baza wiedzy|(wiedza|dziedzinowa)'], { hi: [1], h: 76, label: 'Dwie części systemu ekspertowego' }),
  zastosowania: () => H.cols('Zastosowanie: fakty', 'wnioski', [['wspomaganie decyzji: warunki', 'decyzje'], ['diagnostyka: objawy', 'diagnoza'], ['klasyfikacja: cechy', 'kategoria'], ['konfigurowanie: wymagania', 'struktura'], ['prognozowanie: stan', 'prognoza']], { w1: 200, w2: 100, h: 34, label: 'Fakty i wnioski zależnie od zastosowania' }),
  role: () => H.cols('Moduł', 'Służy', [['maszyna, sterowanie', 'rdzeń'], ['interfejs, generator wyjaśnień', 'użytkownik'], ['edytor, kontrola poprawności', 'inżynier wiedzy'], ['moduł obliczeń, interfejs zewn.', 'świat zewnętrzny']], { w1: 200, w2: 100, h: 38, label: 'Moduły pogrupowane według odbiorcy' }),
  bazy: () => H.cols('Baza wiedzy', 'Baza danych', [['reguły, wiedza ogólna', 'fakty bieżącej sprawy'], ['stała', 'zmienia się'], ['wszystkie sprawy', 'jedna sprawa|i wyniki pośrednie']], { w1: 150, w2: 150, h: 42, label: 'Dwie bazy, które łatwo pomylić' }),
  szkielet: () => H.cols('Podział', 'Rodzaje', [['związek z bazą', 'specjalizowane | szkieletowe'], ['postać wiedzy', 'regułowe | regułowo-modelowe']], { w1: 130, w2: 170, h: 44, label: 'Klasyfikacja systemów ekspertowych' }),
  etapy: () => H.chainV(['analiza problemu', 'specyfikacja', 'akwizycja wiedzy', 'reprezentacja i narzędzia', 'konstrukcja', 'weryfikacja i testy'], { hi: [2], w: 190, gap: 36, label: 'Etapy tworzenia systemu ekspertowego' }),
};
