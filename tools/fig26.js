const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  piramida: () => {
    const lv = [['polityka i księga', 'dlaczego'], ['procedury', 'kto, co, kiedy'], ['instrukcje, specyfikacje', 'jak dokładnie'], ['zapisy, formularze', 'dowód']]; let b = '';
    lv.forEach(([n, q], i) => { const w = 100 + i * 32, x = 130 - w / 2 + 0; const xx = 120 - w / 2; b += rect(xx, i * 40, w, 34, i === 3 ? 'bxa' : 'bx', 4); b += T(120, i * 40 + 21, n, { m: true, s: true }); b += T(288, i * 40 + 21, '← ' + q, { s: true, g: true }); });
    return svg(164, b, 'Piramida dokumentacji: polityka i księga, procedury, instrukcje, zapisy');
  },
  dokzap: () => H.cols('Dokument', 'Zapis', [['jak ma być?', 'jak było?'], ['aktualizuje się|rewizjami', 'nie zmienia się|po wypełnieniu'], ['„utrzymywać”', '„zachowywać”'], ['instrukcja,|procedura', 'karta kontroli,|świadectwo']], { w1: 150, w2: 150, h: 36, label: 'Dokument kontra zapis w ISO 9001' }),
  cykl: () => H.chainV(['opracowanie|i oznaczenie rewizji', 'przegląd|i zatwierdzenie', 'dystrybucja|na stanowiska', 'stosowanie', 'zmiana: nowa rewizja|i wycofanie starej'], { hi: [4], loop: true, w: 190, gap: 46, label: 'Cykl życia instrukcji' }),
  niezgodny: () => H.chainV(['polityka: cel jakości', 'procedura: kto i co robi|z wyrobem niezgodnym', 'instrukcja: co zrobić|przy maszynie', 'zapis: dowód,|że tak zrobiono'], { hi: [3], w: 220, gap: 46, label: 'Jeden wymóg schodzi przez cztery poziomy dokumentacji' }),
};
