const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, poly, pline, circle, svg } = L;
module.exports = {
  cele: () => H.cols('Cel analizy', 'Pytanie decydenta', [['ryzyko i stabilność', 'czy plan|przetrwa wahania?'], ['wycena zasobów', 'który zasób|ogranicza zysk?'], ['margines|błędu danych', 'jak dokładne|muszą być dane?'], ['zmiany w systemie', 'czy opłaca się|nowy produkt?']], { w1: 140, w2: 160, h: 44, label: 'Cele analizy wrażliwości' }),
  zadanie: () => {
    const X = x => 40 + x * 10, Y = y => 190 - y * 3.4;
    let b = line(40, 190, 300, 190, { k: 'ln' }) + line(40, 190, 40, 14, { k: 'ln' });
    b += poly([[0, 0], [20, 0], [20, 10], [10, 30], [0, 30]].map(p => [X(p[0]), Y(p[1])]), 'fl');
    b += line(X(0), Y(50), X(25), Y(0), { k: 'lnm' }) + line(X(20), Y(0), X(20), Y(40), { k: 'lnm' }) + line(X(0), Y(30), X(25), Y(30), { k: 'lnm' });
    b += line(X(16), Y(22), X(23.3), Y(0), { k: 'lna' }) + line(X(10), Y(0), X(0), Y(30), { k: 'lna', dash: true });
    b += circle(X(20), Y(10), 4, 'dotk') + T(X(20) + 8, Y(10) - 4, 'B (20, 10): z = 70', { s: true, b: true });
    b += T(X(25) + 4, Y(0) - 6, 'x₁', { s: true }) + T(46, 18, 'x₂', { s: true });
    b += T(X(6), Y(40), 'surowiec', { s: true, m: true }) + T(X(20) + 6, Y(36), 'rynek 1', { s: true }) + T(X(21), Y(30) - 4, 'rynek 2', { s: true });
    return svg(206, b, 'Zadanie bazowe: obszar dopuszczalny i prosta zysku przez optimum B(20, 10)');
  },
  mozliwosci: () => H.cols('Parametr', 'Wynik analizy', [['cⱼ (zysk, cena)', 'przedział|stabilności planu'], ['bᵢ (zasoby)', 'ceny dualne,|opłacalność dokupienia'], ['nowa zmienna', 'koszt zredukowany'], ['aᵢⱼ (technologia)', 'czy zmiana|technologii się opłaca']], { w1: 130, w2: 170, h: 44, label: 'Możliwości realizacji analizy' }),
  c: () => H.cols('Zmiana cⱼ', 'Wynik', [['c₁ przy c₂ = 1', 'plan trwa dla c₁ ≥ 2'], ['c₂ przy c₁ = 3', 'plan trwa dla|0 ≤ c₂ ≤ 1,5'], ['na granicy', 'remis: cały odcinek AB'], ['za granicą', 'skok do A (10, 30)']], { w1: 130, w2: 170, h: 44, hi: [3], label: 'Zmiana współczynników celu' }),
  zb: () => {
    const X = x => 40 + x * 3.4, Y = z => 160 - z * 1.5;
    let b = line(40, 160, 320, 160, { k: 'ln' }) + line(40, 160, 40, 14, { k: 'ln' });
    b += pline([[0, 0], [40, 60], [70, 90], [80, 90]].map(p => [X(p[0]), Y(p[1])]), 'lna');
    b += circle(X(50), Y(70), 4, 'dotk') + T(X(50) + 8, Y(70) + 14, 'b₁ = 50: z = 70', { s: true });
    b += T(X(20), Y(58), 'nachylenie 1,5', { s: true, m: true }) + T(X(52), Y(40), 'nachylenie 1 = cena dualna', { s: true, m: true }) + T(X(76), Y(90) - 8, '0', { s: true, m: true });
    b += T(318, 176, 'zasób b₁ (surowiec)', { s: true, e: true }) + T(44, 12, 'zysk z*', { s: true });
    return svg(184, b, 'Zysk optymalny w funkcji zasobu: łamana o nachyleniach 1,5, 1 i 0');
  },
  zredukowany: () => H.chainV(['koszt alternatywny|1,5 kg × cena dualna 1 = 1,5', 'zysk produktu 3|c₃ = 2', 'koszt zredukowany|2 − 1,5 = +0,5 > 0', 'opłaca się: +3,33 jp.|plan (20; 0; 6,67)'], { hi: [3], w: 230, gap: 40, label: 'Nowy produkt' }),
  raport: () => H.cols('Kolumna raportu', 'Skąd', [['koszt zredukowany', 'c̄ (0 dla zmiennych|w bazie)'], ['cena dualna', 'y: 1, 1, 0'], ['dopuszczalny wzrost', 'odległość do końca|przedziału'], ['dopuszczalny spadek', 'odległość do końca|przedziału']], { w1: 140, w2: 160, h: 44, label: 'Raport wrażliwości solvera' }),
};
