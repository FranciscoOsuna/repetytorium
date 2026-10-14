const { build, F, S, sv, fa, fi, dp, pf, lu, za, kr, po } = require('./lib');
build(21, 5, [
  [1, [
    1,
    S(8, 1, 'sekcja 02', { pytanie: 'Wymień wymagania wobec komunikacji w rozproszonym systemie sterowania.', svg: F('fig21.wymagania'), odpowiedz: 'Determinizm (znany, ograniczony czas dostarczenia), krótki i stały cykl (mały jitter), niezawodność (redundancja, diagnostyka), odporność na zakłócenia, specyfika miejsca (zasilanie po kablu, iskrobezpieczność), bezpieczeństwo IT (oddzielenie od sieci biurowej).' }),
    fa(9, 2, 'sekcja 02', 'Po co sieć polowa', 'Zastępuje połączenia punkt–punkt (pętle 4–20 mA, sygnały binarne), zmniejszając długość i liczbę kabli. W zamian musi spełnić wymagania, których sieć biurowa nie ma.'),
    fa(10, 2, 'sekcja 02', 'Jitter', 'Rozrzut odstępów między kolejnymi pakietami. Ważny, bo regulator dyskretny zakłada stały okres próbkowania.')]],
  [2, [
    S(11, 1, 'sekcja 01', { tytul: 'Poziomy sieci przemysłowych', svg: F('fig21.piramida'), opis: 'Im niżej, tym krótszy cykl i mniej danych w ramce (IO-Link, Profibus, CAN). Wyżej Ethernet przemysłowy (Profinet, EtherCAT), na górze zwykły Ethernet z OPC UA. Różnią się metodą dostępu do medium i topologią.' }),
    S(12, 2, 'sekcja 03', { tytul: 'Model ISO/OSI w sieciach przemysłowych', svg: F('fig21.osi'), opis: 'Sieci polowe używają warstw 1, 2 i 7. Profinet przesyła dane cykliczne bezpośrednio w ramce Ethernet, bez TCP/IP, a przez UDP/IP tylko dane acykliczne. Standardy IEC 61158 i IEC 61784.' }),
    3]],
  [3, [
    S(13, 1, 'sekcja 04', { pytanie: 'Wymień metody dostępu do medium w sieciach przemysłowych.', svg: F('fig21.dostep'), odpowiedz: 'Master–slave (master pyta, slave odpowiada), znacznik (prawo nadawania krąży między masterami, Profibus łączy oba), arbitraż CAN (bit 0 dominuje, wygrywa najniższy identyfikator), EtherCAT (jedna ramka w locie), CSMA/CD (po kolizji czas losowy).' }),
    2, 4, 6, 7,
    dp(14, 2, 'sekcja 04', 'Co to jest metoda deterministyczna?', 'Taka, dla której da się policzyć najgorszy czas dostarczenia danych. Z sześciu metod tylko CSMA/CD daje czas losowy. Nowoczesny Ethernet z przełącznikami i trybem full-duplex nie potrzebuje już CSMA/CD.')]],
  [4, [
    S(15, 1, 'sekcja 05', { tytul: 'Topologie sieci', svg: F('fig21.topologie'), opis: 'Magistrala i linia zużywają najmniej kabla, gwiazda izoluje awarie pojedynczych łączy, pierścień przeżywa jedną przerwę. Ethernet przemysłowy łączy je: linie i pierścienie z przełącznikami wbudowanymi w urządzenia.' }),
    S(16, 1, 'sekcja 06', { pytanie: 'Wymień przykładowe sieci przemysłowe i ich cechy.', svg: F('fig21.przeglad'), odpowiedz: 'Modbus RTU (RS-485, master–slave, do 247 urządzeń), Profibus DP (do 12 Mbit/s, master–slave + znacznik), Profibus PA (31,25 kbit/s, zasilanie po kablu), CAN/CANopen (do 1 Mbit/s, arbitraż), Profinet (RT 1–10 ms, IRT < 1 ms), EtherCAT (cykl ≤ 100 µs), Modbus TCP/OPC UA/MQTT (SCADA, MES, chmura).' }),
    fa(17, 2, 'sekcja 06', 'Dlaczego Ethernet schodzi coraz niżej', 'Jest szybki, tani i ten sam od czujnika po serwer. Klasyczna wada (losowy dostęp CSMA/CD) znika w sieciach z przełącznikami, a determinizm zapewniają dodatki: priorytety ramek, pomijanie TCP/IP dla danych cyklicznych, okna czasowe (Profinet IRT), ramka w locie (EtherCAT), standardy TSN.')]],
  [5, [
    5,
    fa(18, 3, 'sekcja 07', 'Przykład: cykl Modbus RTU', '19 200 bit/s, znak 11 bitów, 10 urządzeń po 2 rejestry. Jedno urządzenie: pytanie 4,58 ms + odpowiedź 5,16 ms + dwie przerwy po 3,5 znaku (4,01 ms) + czas odpowiedzi 2 ms. Cykl 10 urządzeń ok. 0,16 s, tyle wynosi odświeżanie każdej wartości.'),
    S(19, 2, 'sekcja 07', { tytul: 'Opóźnienie sieci a utrata fazy', svg: F('fig21.opoznienie'), opis: 'Opóźnienie τ daje utratę fazy Δφ = ωc·τ. Dla zbiorników bez znaczenia, dla serwonapędu przez Modbus ponad 2700° (pętli nie da się zamknąć), Profinet RT 34°, IRT 8,6°, EtherCAT 3,4°.' }),
    za(20, 1, 'sekcja 07', 'Sieć dobiera się do dynamiki pętli.', 'Opóźnienie τ kosztuje fazę ωc·τ. Wolny proces zniesie Modbus, szybki napęd wymaga cyklu rzędu 100 µs.')]]
]);
