const L = require('./svg');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;

// 1. Układ z integratorami: x przez L1, całka uchybu przez L2
function struktura() {
  let b = '';
  b += T(30, 10, 'yᵣ', { m: true, b: true });
  b += arrow([[30, 14], [30, 40]], { k: 'ln' });
  b += circle(30, 50, 9, 'bx'); b += T(30, 54, 'Σ', { m: true, s: true });
  b += arrow([[39, 50], [62, 50]], { k: 'ln' });
  b += T(50, 42, 'e', { m: true, s: true });
  b += box(62, 34, 40, 32, ['∫'], { k: 'bxa' });
  b += arrow([[102, 50], [126, 50]], { k: 'ln' });
  b += T(114, 42, 'η', { m: true, s: true });
  b += box(126, 34, 44, 32, ['L₂'], { k: 'bxa' });
  b += arrow([[170, 50], [191, 50]], { k: 'ln' });
  b += circle(200, 50, 9, 'bx'); b += T(200, 54, 'Σ', { m: true, s: true });
  b += arrow([[209, 50], [236, 50]], { k: 'ln' });
  b += T(222, 42, 'u', { m: true, s: true });
  b += box(236, 32, 70, 36, ['OBIEKT'], { k: 'bxn' });
  b += arrow([[306, 50], [330, 50]], { k: 'ln' });
  b += T(326, 42, 'y', { b: true });
  b += arrow([[290, 68], [290, 130], [262, 130]], { k: 'lna' });
  b += T(298, 104, 'x', { s: true });
  b += box(218, 114, 44, 32, ['L₁'], { k: 'bxa' });
  b += arrow([[218, 130], [200, 130], [200, 59]], { k: 'lna' });
  b += arrow([[318, 50], [318, 176], [30, 176], [30, 59]], { k: 'lnm' });
  b += T(22, 74, '−', { r: true, b: true });
  b += T(210, 78, '−', { r: true, b: true });
  b += T(170, 198, 'η̇ = yᵣ − y,   u = −L₁x − L₂η', { m: true, s: true });
  return svg(206, b, 'Układ z integratorem w pętli: sprzężenie od stanu L₁ i od całki uchybu L₂');
}

// 2. Odpowiedzi skokowe wielomianów ITAE (rząd 2, 3, 4)
function itae() {
  let b = '';
  const X = t => 36 + t * 24, Y = v => 140 - v * 100;
  const polys = [[1.4, 1], [1.75, 2.15, 1], [2.1, 3.4, 2.7, 1]];
  const sim = a => {
    const n = a.length; let x = new Array(n).fill(0); const pts = []; const dt = 0.005;
    // y^(n) + a_{n-1} y^(n-1) + ... + a_0 y = a_0 ; a = [a_{n-1},...,a_0]
    const f = s => { const d = new Array(n); for (let i = 0; i < n - 1; i++) d[i] = s[i + 1]; let acc = a[n - 1] * (1 - s[0]); for (let i = 1; i < n; i++) acc -= a[n - 1 - i] * s[i]; d[n - 1] = acc; return d; };
    for (let k = 0; k <= 12 / dt; k++) {
      if (k % 20 === 0) pts.push([X(k * dt), Y(x[0])]);
      const k1 = f(x), k2 = f(x.map((v, i) => v + dt / 2 * k1[i])), k3 = f(x.map((v, i) => v + dt / 2 * k2[i])), k4 = f(x.map((v, i) => v + dt * k3[i]));
      x = x.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    }
    return pts;
  };
  b += line(30, Y(0), 330, Y(0), { k: 'ln' });
  b += line(36, 14, 36, 146, { k: 'ln' });
  b += line(36, Y(1), 330, Y(1), { k: 'lnm', dash: true });
  b += T(30, Y(1) + 4, '1', { e: true, s: true });
  b += T(30, Y(0) + 4, '0', { e: true, s: true });
  [0, 4, 8, 12].forEach(t => { b += T(X(t), 156, String(t), { m: true, s: true }); });
  b += T(330, 170, 'ωₙt', { e: true, s: true });
  const cls = ['lnb', 'lng', 'lna'];
  polys.forEach((a, i) => { b += pline(sim(a), cls[i]); });
  b += T(44, 16, 'rząd 2', { r: true, s: true });
  b += T(100, 16, 'rząd 3', { g: true, s: true });
  b += T(156, 16, 'rząd 4', { a: true, s: true });
  return svg(176, b, 'Odpowiedzi skokowe układów o wielomianach ITAE rzędu 2, 3 i 4 w czasie względnym');
}
module.exports = { struktura, itae };
