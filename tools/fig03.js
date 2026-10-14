const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;

// 1. Cztery bloki systemu rozmytego
function bloki() {
  let b = '';
  b += T(110, 10, 'x₀ — liczba z czujnika', { m: true, s: true });
  b += arrow([[110, 14], [110, 30]], { k: 'lnm' });
  b += box(20, 30, 180, 34, ['ROZMYWANIE'], { k: 'bxa' });
  b += arrow([[110, 64], [110, 100]], { k: 'ln' });
  b += T(120, 86, 'stopnie βᵢ', { s: true });
  b += box(6, 100, 208, 34, ['MECHANIZM WNIOSKOWANIA'], { k: 'bx' });
  b += box(244, 100, 96, 34, ['BAZA REGUŁ'], { k: 'bx' });
  b += arrow([[244, 117], [214, 117]], { k: 'ln' });
  b += arrow([[110, 134], [110, 170]], { k: 'ln' });
  b += T(120, 156, 'zbiór rozmyty B′', { s: true });
  b += box(20, 170, 180, 34, ['WYOSTRZANIE'], { k: 'bxa' });
  b += arrow([[110, 204], [110, 222]], { k: 'lnm' });
  b += T(110, 236, 'y* — liczba dla siłownika', { m: true, s: true });
  b += TL(236, 170, ['ostre wejście', 'i wyjście, rozmyte', 'tylko wnętrze'], { s: true }, 13);
  return svg(244, b, 'Struktura systemu rozmytego: rozmywanie, baza reguł, mechanizm wnioskowania, wyostrzanie');
}

// 2. Zmienna lingwistyczna (opcjonalnie z pomiarem x0 = 3)
function os(x0) {
  const X = v => 30 + v * 36.25, Y = m => 140 - m * 110;
  let b = '';
  b += line(24, 140, 326, 140, { k: 'ln' });
  b += line(30, 140, 30, 18, { k: 'ln' });
  b += T(24, 24, '1', { e: true, s: true });
  b += T(24, 144, '0', { e: true, s: true });
  b += T(334, 144, 'x', { e: true, s: true });
  [0, 2, 4, 6, 8].forEach(v => { b += T(X(v), 154, String(v), { m: true, s: true }); });
  b += pline([[X(0), Y(1)], [X(1), Y(1)], [X(4), Y(0)]], 'lna');
  b += pline([[X(1), Y(0)], [X(4), Y(1)], [X(7), Y(0)]], 'ln');
  b += pline([[X(4), Y(0)], [X(7), Y(1)], [X(8), Y(1)]], 'lng');
  b += T(X(0.1), 12, 'niskie', { a: true });
  b += T(X(4), 12, 'średnie', { m: true });
  b += T(X(8), 12, 'wysokie', { e: true, g: true });
  if (x0 != null) {
    b += line(X(x0), 140, X(x0), 10, { k: 'lnb', dash: true });
    b += T(X(x0), 170, `x₀ = ${x0}`, { m: true, r: true });
    const lo = Math.max(0, Math.min(1, (4 - x0) / 3)), ok = Math.max(0, Math.min(1, (x0 - 1) / 3));
    if (lo > 0) { b += circle(X(x0), Y(lo), 4, 'dot'); b += T(X(x0) + 8, Y(lo) + 4, `β₁ = ${lo.toFixed(2).replace('.', ',')}`, { a: true }); }
    if (ok > 0) { b += circle(X(x0), Y(ok), 4, 'dotk'); b += T(X(x0) + 8, Y(ok) + 4, `β₂ = ${ok.toFixed(2).replace('.', ',')}`, {}); }
    return svg(178, b, 'Rozmywanie singletonem: pionowa kreska w punkcie pomiaru odcina stopnie przynależności');
  }
  b += T(170, 172, 'suma przynależności = 1, zbiory się przekrywają', { m: true, s: true });
  return svg(180, b, 'Zmienna lingwistyczna z trzema wartościami lingwistycznymi i przekrywającymi się funkcjami przynależności');
}

// 3. Kratownica reguł 3 x 3
function kratownica() {
  let b = '';
  const x0 = 56, y0 = 40, cw = 92, ch = 46;
  const lab = ['N', 'Z', 'P'];
  const out = [['UD', 'UM', 'Z'], ['UM', 'Z', 'DM'], ['Z', 'DM', 'DD']];
  b += T(x0 + 1.5 * cw, 12, 'x₁', { m: true, b: true });
  b += T(8, y0 + 1.5 * ch + 4, 'x₂', { b: true });
  lab.forEach((t, i) => {
    b += T(x0 + (i + 0.5) * cw, 30, t, { m: true, a: true });
    b += T(x0 - 10, y0 + (i + 0.5) * ch + 4, t, { e: true, a: true });
  });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    b += box(x0 + c * cw + 2, y0 + r * ch + 2, cw - 4, ch - 4, [out[r][c]], { k: out[r][c] === 'Z' ? 'bxa' : 'bx', r: 5 });
  }
  b += T(x0 + 1.5 * cw, y0 + 3 * ch + 20, 'K = N₁ · N₂ = 3 · 3 = 9 reguł', { m: true, b: true });
  b += T(x0 + 1.5 * cw, y0 + 3 * ch + 36, 'komórka = jedna reguła, wpis = wartość wyjścia y', { m: true, s: true });
  return svg(y0 + 3 * ch + 44, b, 'Kratownica rozmytych hiperskrzynek dla dwóch wejść po trzy wartości lingwistyczne');
}

// 4. Przykład z wykładu: odpowiedzi cząstkowe i agregacja (dyskretnie)
const YS = [0, 25, 50, 75, 100];
const B1 = [1, 1, .6, 0, 0], B2 = [0, 0, .3, .4, .4], B3 = [.1, .1, .1, 0, 0], BA = [1, 1, .6, .4, .4];
const fmt = v => String(v).replace('.', ',');
function bars(b, y, vals, k, label, label2, H = 30) {
  const base = y + H + 14;
  b += T(0, base - H / 2 - 2, label, { b: true });
  if (label2) b += T(0, base - H / 2 + 11, label2, { s: true });
  b += line(104, base, 336, base, { k: 'lnm' });
  vals.forEach((v, i) => {
    const cx = 122 + i * 46;
    if (v > 0) {
      b += rect(cx - 12, base - v * H, 24, v * H, k, 2);
      b += T(cx, base - v * H - 3, fmt(v), { m: true, s: true });
    }
  });
  return b;
}
function agregacja() {
  let b = '';
  b += bars('', 0, B1, 'bxa', 'B′₁', 'β₁ = 1,0');
  b += bars('', 54, B2, 'bxa', 'B′₂', 'β₂ = 0,4');
  b += bars('', 108, B3, 'bxa', 'B′₃', 'β₃ = 0,1');
  b += line(0, 164, 340, 164, { k: 'bxn' });
  b += bars('', 170, BA, 'bxg', 'B′ = MAX', 'agregacja');
  YS.forEach((v, i) => { b += T(122 + i * 46, 232, String(v), { m: true, s: true }); });
  b += T(334, 232, 'y', { s: true, e: true });
  return svg(244, b, 'Odpowiedzi cząstkowe po obcięciu operatorem MIN i ich agregacja operatorem MAX');
}

// 5. Wyostrzanie: pięć metod na tym samym zbiorze B′
function wyostrzanie() {
  let b = '';
  const H = 70, base = 90;
  b += line(104, base, 336, base, { k: 'ln' });
  BA.forEach((v, i) => {
    const cx = 122 + i * 46;
    b += rect(cx - 12, base - v * H, 24, v * H, 'fl', 2);
    b += T(cx, base - v * H - 3, fmt(v), { m: true, s: true });
    b += T(cx, base + 13, String(YS[i]), { m: true, s: true });
  });
  b += T(0, 58, 'zbiór B′', { b: true });
  b += T(0, 71, 'po agregacji', { s: true });
  const X = y => 122 + y * 1.84, ya = base + 24;
  b += line(104, ya, 336, ya, { k: 'lnm' });
  const m = [['COG = 36,8', 36.8, 3], ['LOM = BOA = 25', 25, 2], ['MOM = 12,5', 12.5, 1], ['SOM = 0', 0, 0]];
  m.forEach(([t, v, r], k) => {
    const yy = ya + 20 + k * 17, c = r === 3;
    b += line(X(v), ya, X(v), yy - 4, { k: c ? 'lna' : 'lnm' });
    b += circle(X(v), ya, 3.5, c ? 'dot' : 'dotk');
    b += T(X(v) + 6, yy, t, c ? { a: true, b: true } : {});
  });
  return svg(ya + 20 + 3 * 17 + 8, b, 'Pięć metod wyostrzania zastosowanych do tego samego zbioru B′ daje różne wyniki');
}

// 6. Implikacja MIN i PROD
function implikacja() {
  let b = '';
  const bw = 140, h = 70, base = 90, beta = 0.6;
  const panel = (x0, kind) => {
    let s = line(x0, base, x0 + bw, base, { k: 'ln' });
    const tri = [[x0 + 8, base], [x0 + bw / 2, base - h], [x0 + bw - 8, base]];
    s += pline([...tri, tri[0]], 'lnm dash'.split(' ')[0]);
    if (kind === 'min') {
      const t = beta, xl = tri[0][0] + (tri[1][0] - tri[0][0]) * t, xr = tri[2][0] - (tri[2][0] - tri[1][0]) * t;
      s += poly([tri[0], [xl, base - h * t], [xr, base - h * t], tri[2]], 'fl');
      s += pline([tri[0], [xl, base - h * t], [xr, base - h * t], tri[2]], 'lna');
    } else {
      s += poly([tri[0], [x0 + bw / 2, base - h * beta], tri[2]], 'fl');
      s += pline([tri[0], [x0 + bw / 2, base - h * beta], tri[2]], 'lna');
    }
    s += line(x0, base - h * beta, x0 + bw, base - h * beta, { k: 'lnb', dash: true });
    s += T(x0 + bw + 2, base - h * beta + 4, 'β', { r: true });
    return s;
  };
  b += panel(0, 'min') + panel(184, 'prod');
  b += T(70, 112, 'MIN: ścina na wysokości β', { m: true, s: true });
  b += T(254, 112, 'PROD: skaluje kształt', { m: true, s: true });
  b += T(0, 12, 'cienka linia: zbiór Bᵢ, wypełnienie: wynik', { s: true });
  return svg(120, b, 'Implikacja MIN obcina zbiór konkluzji, implikacja PROD go skaluje');
}

module.exports = { bloki, os0: () => os(null), os1: () => os(3), kratownica, agregacja, wyostrzanie, implikacja };
