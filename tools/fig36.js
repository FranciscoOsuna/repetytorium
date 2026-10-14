const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  blokowa: () => {
    let b = rect(10, 8, 320, 30, 'bxa', 4) + T(170, 28, 'zasoby wspólne A₁ A₂ A₃', { m: true, s: true });
    [[10, 'B₁'], [120, 'B₂'], [230, 'B₃']].forEach(([x, n], i) => { b += rect(x, 46 + i * 36, 100, 30, 'bx', 4) + T(x + 50, 66 + i * 36, n, { m: true, s: true }); });
    b += T(170, 160, 'bloki lokalne zakładów na przekątnej', { m: true, s: true });
    return svg(168, b, 'Macierz ograniczeń: wiersz zasobów wspólnych nad blokami lokalnymi na przekątnej');
  },
  dialog: () => {
    let b = box(80, 0, 180, 40, ['centrum', 'zadanie główne'], { k: 'bxa' });
    [[0, 'zakład 1'], [120, 'zakład 2'], [240, 'zakład 3']].forEach(([x, n]) => {
      b += box(x, 110, 100, 36, [n, 'zadanie lokalne']);
      b += arrow([[x + 30, 40], [x + 30, 110]].map((p, i) => i ? p : [Math.min(Math.max(x + 30, 100), 240), 40]), { k: 'lna' }).slice(0, 0);
    });
    b += arrow([[110, 40], [50, 110]], { k: 'lna' }) + arrow([[170, 40], [170, 110]], { k: 'lna' }) + arrow([[230, 40], [290, 110]], { k: 'lna' });
    b += arrow([[70, 110], [130, 40]], { k: 'lnm', dash: true }) + arrow([[200, 110], [190, 40]], { k: 'lnm', dash: true }) + arrow([[320, 110], [250, 40]], { k: 'lnm', dash: true });
    b += T(2, 80, 'ceny π', { s: true, a: true }) + T(300, 80, 'oferty', { s: true, m: true });
    return svg(156, b, 'Centrum wysyła ceny zasobów wspólnych, zakłady odsyłają oferty');
  },
  algorytm: () => H.chainV(['centrum: zadanie główne|daje ceny π', 'zakłady optymalizują|przy cenach π', 'oferty γ|(plan i wartość)', 'oferta poprawia wynik?|kryterium (4)', 'tak: dopisz kolumnę|nie: koniec'], { hi: [3], loop: true, w: 200, gap: 46, label: 'Pętla algorytmu Dantziga–Wolfe’a' }),
  granice: () => {
    const X = i => 40 + i * 120, Y = v => 130 - v * 10;
    let b = line(30, 130, 330, 130, { k: 'ln' }) + line(30, 130, 30, 14, { k: 'ln' });
    b += pline([[X(0), Y(0)], [X(1), Y(10)], [X(2), Y(10.5)]], 'lna') + pline([[X(1), Y(10.5)], [X(2), Y(10.5)]], 'lnb');
    [[0, 0], [1, 10], [2, 10.5]].forEach(([i, v]) => { b += circle(X(i), Y(v), 4, 'dot'); });
    b += T(X(0), 148, 'it. 0', { s: true, m: true }) + T(X(1), 148, 'it. 1', { s: true, m: true }) + T(X(2), 148, 'it. 2', { s: true, m: true });
    b += T(240, Y(10.5) - 8, 'górna granica 10,5', { s: true, m: true, r: true });
    b += T(160, Y(5) + 10, 'dolna granica rośnie', { s: true, m: true, a: true });
    return svg(158, b, 'Dolna granica z zagadnienia głównego rośnie do optimum 10,5, górna już w iteracji 1 wynosi 10,5');
  },
};
