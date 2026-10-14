const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(48, 5, [
  [1, [
    1, 2,
    S(13, 1, 'sekcja 02', { tytul: 'Modus ponens: krok elementarny', svg: F('fig48.mp'), opis: 'Jeżeli z p wynika q i p jest prawdziwe, to q też. Tak „odpala” każda reguła w obu kierunkach wnioskowania.' }),
    7, 12]],
  [2, [
    S(14, 1, 'sekcja 03', { tytul: 'Wnioskowanie w przód (na podstawie faktów)', svg: F('fig48.przod'), opis: 'Sterowane faktami: uaktywnienie reguły dopisuje fakt, ten może spełnić przesłanki kolejnej reguły. Bez faktów wnioskowanie nie ruszy.' }),
    3,
    S(15, 2, 'sekcja 03', { pytanie: 'Wymień strategie sterowania wnioskowaniem w przód.', svg: F('fig48.strategie'), odpowiedz: 'Pierwszeństwa (najwcześniej w C), świeżości (najpóźniej), blokowania (pomija już użyte), specyficzności (najwięcej przesłanek), przypadkowości (losowo).' }),
    6,
    fa(16, 3, 'sekcja 03', 'Przykład z wykładu: w przód', 'Fakty A, B, C, E, H są warunkami dopytywalnymi, a D, F, J niedopytywalnymi. Wnioskowanie w przód (pierwsza spełniona reguła, każda raz) dopisuje kolejno D, L, F, G, J, M: wszystko, co wynika z faktów, także to, czego nikt nie potrzebował.')]],
  [3, [
    S(17, 1, 'sekcja 04', { tytul: 'Wnioskowanie wstecz (na podstawie celów)', svg: F('fig48.wstecz'), opis: 'Sterowane celem: szukamy reguły, której konkluzja pasuje do hipotezy, a brakujące przesłanki dowodzimy tak samo jako hipotezy pośrednie.' }),
    4,
    fa(18, 3, 'sekcja 04', 'Przykład z wykładu: wstecz', 'Dla hipotezy F wnioskowanie schodzi od celu do faktów (r5, potrzebne D, r1, potrzebne A) i wraca z potwierdzeniem. Z sześciu reguł użyte są dwie, reszta bazy nie jest dotykana.')]],
  [4, [
    S(19, 1, 'sekcja 06', { tytul: 'W przód a wstecz', svg: F('fig48.porownanie'), opis: 'W przód sterują fakty i wynik to wszystkie wnioski, wstecz steruje cel i wynik to jedna hipoteza. Stąd monitoring i alarmy w przód, a diagnostyka wstecz.' }),
    5, 8, 9]],
  [5, [
    S(20, 2, 'sekcja 07', { tytul: 'Odmiany baz reguł', svg: F('fig48.bazy'), opis: 'Elementarna, z ograniczeniami, rozwinięta (niemonotoniczna), niepewna (współczynniki CF) i probabilistyczna (reguła Bayesa).' }),
    10, 11]],
]);
