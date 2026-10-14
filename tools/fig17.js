const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  opisy: () => H.cols('Cztery opisy', 'Do czego służy', [['równanie różnicowe', 'realizacja w programie'], ['odpowiedź impulsowa', 'splot; FIR kontra IIR'], ['transmitancja H(z)', 'bieguny i stabilność'], ['charakterystyka|częstotliwościowa', 'co filtr przepuszcza']], { w1: 140, w2: 170, h: 34, label: 'Cztery równoważne opisy filtru cyfrowego' }),
  struktury: () => {
    let b = T(0, 12, 'FIR: tylko wejścia', { s: true, b: true });
    b += box(0, 22, 60, 30, ['x(k)']) + arrow([[60, 37], [90, 37]], { k: 'ln' });
    b += box(90, 22, 80, 30, ['z⁻¹, wagi b']) + arrow([[170, 37], [200, 37]], { k: 'ln' });
    b += box(200, 22, 60, 30, ['Σ']) + arrow([[260, 37], [290, 37]], { k: 'ln' }) + T(310, 41, 'y(k)', { m: true, s: true });
    b += T(0, 86, 'IIR: wejścia i wyjścia', { s: true, b: true });
    b += box(0, 96, 60, 30, ['x(k)']) + arrow([[60, 111], [90, 111]], { k: 'ln' });
    b += box(90, 96, 80, 30, ['z⁻¹, wagi b']) + arrow([[170, 111], [200, 111]], { k: 'ln' });
    b += box(200, 96, 60, 30, ['Σ'], { k: 'bxa' }) + arrow([[260, 111], [290, 111]], { k: 'ln' }) + T(310, 115, 'y(k)', { m: true, s: true });
    b += arrow([[275, 111], [275, 150], [230, 150]], { k: 'lna' });
    b += box(130, 135, 100, 30, ['z⁻¹, wagi a'], { k: 'bxa' });
    b += arrow([[130, 150], [20, 150], [20, 126]], { k: 'lna' });
    b += T(0, 12, '', {});
    return svg(176, b, 'Struktura FIR bez sprzężenia zwrotnego i IIR ze sprzężeniem od wyjść');
  },
  stabilnosc: () => {
    let b = circle(170, 78, 60, 'bx') + line(90, 78, 250, 78, { k: 'ln' }) + line(170, 8, 170, 148, { k: 'ln' });
    [[150, 56], [150, 100], [190, 70], [190, 86]].forEach(([x, y]) => { b += T(x, y + 4, '×', { m: true, g: true }); });
    b += T(262, 36, '×', { m: true, r: true }) + T(262, 62, 'biegun na', { s: true, r: true }) + T(262, 75, 'zewnątrz', { s: true, r: true });
    b += T(40, 40, 'wnętrze koła:', { s: true }) + T(40, 54, 'stabilny', { s: true, g: true });
    b += T(170, 164, '|z| = 1', { m: true, s: true, a: true });
    return svg(172, b, 'Filtr jest stabilny, gdy wszystkie bieguny leżą wewnątrz koła jednostkowego');
  },
  projekt: () => H.chainH(['wymagania|(pasmo, tłum.)', 'typ i rząd|FIR / IIR', 'współczynniki|i kwantyzacja'], { hi: [1], h: 46, note: ['IIR: prototyp analogowy + transformacja dwuliniowa', 'FIR: okno, próbkowanie w częstotliwości, Parks–McClellan'], label: 'Etapy projektowania filtru cyfrowego' }),
  petla: () => {
    let b = box(0, 20, 70, 36, ['regulator']) + arrow([[70, 38], [100, 38]], { k: 'ln' }) + box(100, 20, 70, 36, ['obiekt']) + arrow([[170, 38], [200, 38]], { k: 'ln' }) + T(205, 25, 'y', { s: true });
    b += box(200, 100, 100, 36, ['filtr','pomiarowy'], { k: 'bxa' });
    b += arrow([[185, 38], [185, 118], [200, 118]], { k: 'ln' });
    b += arrow([[250, 100], [250, 80], [35, 80], [35, 56]], { k: 'lna' });
    b += T(180, 152, 'opóźnienie filtru jest w pętli:', { s: true, a: true, m: true }) + T(180, 166, 'mniejszy zapas fazy', { s: true, a: true, m: true });
    return svg(174, b, 'Filtr pomiarowy leży wewnątrz pętli sprzężenia zwrotnego i wnosi opóźnienie');
  },
};
