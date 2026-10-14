const L = require('./svg'); const H = require('./h');
const { T, box, arrow, svg } = L;
module.exports = {
  piramida: () => {
    let b = '';
    const lv = [['zwykły Ethernet, OPC UA', 'SCADA, MES, chmura'], ['Ethernet przemysłowy', 'Profinet, EtherCAT'], ['sieci polowe', 'Profibus, CAN'], ['IO-Link', 'czujniki, aktory']];
    lv.forEach(([a, c], i) => { const w = 200 + i * 40, x = 170 - w / 2; b += box(x, 8 + i * 50, w, 42, [a, c], { k: i === 1 ? 'bxa' : 'bx' }); });
    return svg(210, b, 'Cztery poziomy sieci przemysłowych: od IO-Link do zwykłego Ethernetu z OPC UA');
  },
  wymagania: () => H.cols('Wymaganie', 'Po co', [['determinizm', 'znany, ograniczony czas'], ['stały cykl, mały jitter', 'stały okres próbkowania'], ['niezawodność', 'redundancja'], ['odporność na zakłócenia', 'falowniki, silniki'], ['bezpieczeństwo IT', 'oddzielenie od biura']], { w1: 150, w2: 150, h: 36, label: 'Wymagania wobec komunikacji w sterowaniu' }),
  osi: () => H.cols('Warstwa', 'Rola', [['7 aplikacji', 'znaczenie danych (profile)'], ['3–6', 'pomijane (mniejszy narzut)'], ['2 łącza', 'ramka i dostęp do medium'], ['1 fizyczna', 'medium i sygnał']], { w1: 110, w2: 190, h: 38, label: 'Sieci polowe używają warstw 1, 2 i 7' }),
  dostep: () => H.cols('Metoda', 'Zasada', [['master–slave', 'master pyta'], ['znacznik', 'prawo nadawania krąży'], ['arbitraż CAN', 'niższy ID wygrywa'], ['EtherCAT', 'jedna ramka w locie'], ['CSMA/CD', 'kolizje: czas losowy']], { w1: 120, w2: 180, h: 36, label: 'Metody dostępu do medium' }),
  topologie: () => H.cols('Topologia', 'Cecha', [['magistrala, linia', 'najmniej kabla'], ['gwiazda', 'izoluje awarie łączy'], ['pierścień', 'przeżywa jedną przerwę']], { w1: 130, w2: 170, h: 42, label: 'Topologie sieci' }),
  przeglad: () => H.cols('Sieć', 'Cecha', [['Modbus RTU', 'RS-485, master–slave'], ['Profibus DP', 'do 12 Mbit/s'], ['CAN', 'arbitraż bitowy'], ['Profinet', 'RT 1–10 ms, IRT < 1 ms'], ['EtherCAT', 'cykl ≤ 100 µs']], { w1: 110, w2: 190, h: 36, label: 'Przegląd sieci przemysłowych' }),
  opoznienie: () => H.cols('Pętla i sieć', 'Strata fazy', [['zbiorniki, Modbus', 'bez znaczenia'], ['serwo, Modbus', '> 2700°: nie da się'], ['serwo, Profinet RT', '34°'], ['serwo, Profinet IRT', '8,6°'], ['serwo, EtherCAT', '3,4°']], { w1: 150, w2: 150, h: 36, label: 'Opóźnienie sieci a utrata fazy' }),
};
