const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  warstwy: () => {
    const lv = [['4 planowanie', 'dni–tygodnie'], ['3 optymalizacja', 'godziny'], ['2 nadrzędne (MPC)', 's–min'], ['1 bezpośrednie (PID)', 'ms–s']]; let b = '';
    lv.forEach(([n, p], i) => { const y = i * 48; b += box(10, y, 190, 34, [n], { k: i === 3 ? 'bxa' : 'bx' }); b += T(215, y + 21, p, { s: true, g: true }); if (i < 3) { b += arrow([[60, y + 34], [60, y + 48]], { k: 'ln' }); b += arrow([[150, y + 48], [150, y + 34]], { k: 'lnm', dash: true }); } });
    b += box(10, 192, 190, 30, ['obiekt'], { k: 'bxn' }) + arrow([[60, 168], [60, 192]], { k: 'ln' });
    b += T(210, 205, 'w dół: cele', { s: true }) + T(210, 219, 'w górę: pomiary', { s: true });
    return svg(230, b, 'Cztery warstwy modelu nad obiektem z okresami pracy');
  },
  realizacja: () => H.cols('Warstwa', 'Sprzęt i oprogramowanie', [['1 bezpośrednie', 'PLC, cykl 10–100 ms,|IEC 61131-3'], ['2 nadrzędne', 'komputer przemysłowy z MPC,|OPC UA do PLC'], ['3 optymalizacja', 'stacja/serwer,|OPC UA, historian'], ['4 planowanie', 'MES i ERP|(za zaporą / DMZ)']], { w1: 120, w2: 190, h: 40, note: ['osobno: SIS, niezależny sterownik bezpieczeństwa'], label: 'Realizacja sprzętowo-programowa warstw modelu' }),
  wartosc: () => {
    const rows = [['PID (σ = 0,10)', 3.70, 'bx'], ['MPC (σ = 0,03)', 3.91, 'bxa']]; let b = '';
    const X = v => 100 + (v - 3.4) * 180;
    rows.forEach(([n, v, k], i) => { b += T(0, 29 + i * 34, n, { s: true }); b += rect(100, 14 + i * 34, X(v) - 100, 22, k, 4); b += T(X(v) - 6, 29 + i * 34, String(v).replace('.', ',') + ' m', { s: true, e: true }); });
    b += line(X(4.0), 6, X(4.0), 84, { k: 'lnb', dash: true }) + T(X(4.0), 98, 'ograniczenie 4,0 m', { s: true, m: true, r: true }) + T(0, 98, 'oś od 3,4 m', { s: true });
    return svg(108, b, 'Wartość zadana poziomu przy regulacji PID i MPC względem ograniczenia 4,0 m');
  },
  kierowca: () => H.chainH(['nawigacja|trasa', 'kierowca|pas, prędkość', 'tempomat|ułamek s'], { h: 46, note: ['każdy poziom przekazuje niższemu tylko cel'], label: 'Analogia kierowcy: trzy poziomy w różnym tempie' }),
};
