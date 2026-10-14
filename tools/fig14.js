const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
const cell = (x, y, v, k = 'bx', w = 24, st = 26) => rect(x, y, w, 24, k, 4) + T(x + w / 2, y + 16, String(v), { m: true });
const row = (x0, y, bits, ks, w = 24, st = 26) => bits.split('').map((v, i) => cell(x0 + i * st, y, v, ks ? ks[i] : 'bx', w)).join('');
module.exports = {
  chromosom: () => {
    let b = row(10, 20, '1011001001101110', null, 18, 20);
    b += T(88, 12, 'gen x₁', { m: true, s: true, a: true });
    b += T(252, 12, 'gen x₂', { m: true, s: true, a: true });
    b += line(10, 50, 168, 50, { k: 'lna' }); b += line(172, 50, 330, 50, { k: 'lna' });
    b += arrow([[88, 56], [88, 84]], { k: 'ln' }); b += arrow([[252, 56], [252, 84]], { k: 'ln' });
    b += box(20, 84, 140, 32, ['bity → liczba'], { k: 'bx' });
    b += box(182, 84, 140, 32, ['skala do [xmin, xmax]'], { k: 'bxa' });
    b += T(170, 140, 'liczba bitów na gen = rozdzielczość', { m: true, s: true });
    return svg(150, b, 'Chromosom binarny z dwoma genami i jego dekodowanie do liczb rzeczywistych');
  },
  krzyz: () => {
    const A = '10110010', B = '01001101', c = 3;
    const ka = Array(8).fill('bxa'), kb = Array(8).fill('bx');
    let b = T(0, 31, 'rodzic A', { s: true }) + T(0, 61, 'rodzic B', { s: true });
    b += row(78, 14, A, ka) + row(78, 44, B, kb);
    b += line(78 + c * 26 - 1, 6, 78 + c * 26 - 1, 76, { k: 'lnb', dash: true });
    b += T(78 + c * 26 - 1, 88, 'punkt cięcia', { m: true, s: true, r: true });
    const C1 = A.slice(0, c) + B.slice(c), C2 = B.slice(0, c) + A.slice(c);
    const k1 = [...Array(c).fill('bxa'), ...Array(8 - c).fill('bx')], k2 = [...Array(c).fill('bx'), ...Array(8 - c).fill('bxa')];
    b += T(0, 121, 'potomek 1', { s: true }) + T(0, 151, 'potomek 2', { s: true });
    b += row(78, 104, C1, k1) + row(78, 134, C2, k2);
    return svg(172, b, 'Krzyżowanie jednopunktowe: potomkowie składają się z odcinków rodziców');
  },
  mutacja: () => {
    const s = '10110010', k = Array(8).fill('bx'); const k2 = [...k]; k2[4] = 'bxn';
    let b = T(0, 31, 'przed', { s: true }) + row(60, 14, s, k);
    const f = s.split(''); f[4] = f[4] === '1' ? '0' : '1';
    b += arrow([[164, 42], [164, 58]], { k: 'lna' });
    b += T(0, 81, 'po', { s: true }) + row(60, 64, f.join(''), k2.map((x, i) => i === 4 ? 'bxa' : 'bx'));
    b += T(60 + 4 * 26 + 12, 104, 'negacja jednego bitu', { m: true, s: true, a: true });
    b += T(170, 124, 'p ≈ 1/L na gen: średnio jeden gen na osobnika', { m: true, s: true });
    return svg(134, b, 'Mutacja bitowa: negacja jednego bitu');
  },
  gray: () => {
    let b = T(0, 14, 'liczba', { s: true }) + T(70, 14, 'binarnie', { s: true, b: true }) + T(190, 14, 'kod Graya', { s: true, b: true });
    const R = [['7', '0111', '0100'], ['8', '1000', '1100']];
    R.forEach(([n, bi, g], i) => {
      const y = 24 + i * 40;
      b += box(0, y, 40, 30, [n], { k: 'bx' }); b += box(70, y, 90, 30, [bi], { k: 'bx' }); b += box(190, y, 90, 30, [g], { k: 'bxa' });
    });
    b += T(115, 112, 'różnią się 4 bitami', { m: true, s: true, r: true });
    b += T(235, 112, 'różnią się 1 bitem', { m: true, s: true, a: true });
    b += T(170, 134, 'klif Hamminga: sąsiedzi 7 i 8 w zapisie binarnym', { m: true, s: true });
    return svg(144, b, 'Klif Hamminga: liczby 7 i 8 w kodzie binarnym i w kodzie Graya');
  },
  zgodnosc: () => H.cols('Kodowanie', 'Krzyżowanie i mutacja', [['binarne', 'punktowe, równomierne|negacja bitu'], ['rzeczywiste', 'arytmetyczne, BLX|mutacja gaussowska'], ['permutacyjne', 'PMX, OX, CX|zamiana, odwrócenie']], { w1: 100, w2: 200, h: 38, hi: [2], note: ['operator ma z poprawnych rodziców dać poprawne potomstwo'], label: 'Zasada zgodności kodowania i operatorów' }),
};
