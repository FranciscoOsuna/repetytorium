const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  opoznienie: () => {
    const X = t => 20 + t * 22, Y = v => 110 - v * 80;
    let b = line(20, 110, 330, 110, { k: 'ln' }) + line(20, 110, 20, 20, { k: 'ln' });
    const a = [], d = [];
    for (let i = 0; i <= 60; i++) { const t = i / 4; a.push([X(t), Y(1 - Math.exp(-t / 2))]); if (t >= 4) d.push([X(t), Y(1 - Math.exp(-(t - 4) / 2))]); }
    b += pline(a, 'lnm') + pline(d, 'lna');
    b += line(X(4), 114, X(4), 20, { k: 'lnb', dash: true });
    b += T(X(4) + 4, 30, 'θ', { s: true, r: true });
    b += T(60, 130, 'bez opóźnienia (kropki)', { s: true }); 
    b += T(250, 130, 'z opóźnieniem θ', { s: true, a: true });
    b += T(170, 148, 'ten sam kształt, tylko przesunięty o θ', { s: true, m: true });
    return svg(156, b, 'Opóźnienie przesuwa odpowiedź obiektu w czasie o θ');
  },
  metody: () => H.tree('Sterowanie z opóźnieniem', ['przestrojony|regulator|(PI, SIMC)', 'predyktor|Smitha', 'predyktor|stanu, MPC'], { h: 64, label: 'Trzy metody sterowania obiektem z opóźnieniem' }),
  smith: () => {
    let b = circle(22, 40, 10, 'bx') + T(22, 44, 'Σ', { m: true });
    b += T(0, 28, 'r', { s: true }) + arrow([[0, 40], [12, 40]], { k: 'ln' });
    b += arrow([[32, 40], [60, 40]], { k: 'ln' }) + box(60, 24, 60, 32, ['C']);
    b += arrow([[120, 40], [150, 40]], { k: 'ln' }) + box(150, 24, 110, 32, ['G · e^(−sθ)']);
    b += arrow([[260, 40], [335, 40]], { k: 'ln' }) + T(325, 30, 'y', { s: true });
    b += arrow([[300, 40], [300, 74], [22, 74], [22, 50]], { k: 'ln' });
    b += T(160, 70, '', { s: true });
    b += box(140, 100, 120, 32, ['model G','bez opóźnienia'], { k: 'bxa' });
    b += arrow([[135, 40], [135, 116], [140, 116]], { k: 'lna' });
    b += arrow([[260, 116], [290, 116], [290, 74]], { k: 'lna' });
    b += T(170, 156, 'sprzężenie widzi model bez opóźnienia', { s: true, a: true, m: true });
    return svg(166, b, 'Predyktor Smitha: wewnętrzny model obiektu bez opóźnienia w pętli');
  },
  kompromis: () => H.chainH(['przestrojony|PI', 'predyktor|Smitha', 'predyktor|stanu / MPC'], { h: 46, note: ['rośnie zaufanie do modelu →', 'szybszy układ, ale gorsza odporność na błąd modelu'], label: 'Im więcej modelu, tym szybszy układ i bardziej wrażliwy na jego błąd' }),
  iae: () => {
    const rows = [['PI', 14.8, 'bx'], ['Smith', 8.5, 'bxa'], ['stan/MPC', 12.3, 'bx']];
    let b = '';
    const X = v => 70 + v * 15;
    rows.forEach(([n, v, k], i) => { b += T(0, 28 + i * 32, n, { s: true }); b += rect(70, 14 + i * 32, v * 15, 22, k, 4); b += T(70 + v * 15 + 6, 29 + i * 32, String(v).replace('.', ','), { s: true }); });
    b += line(X(6), 6, X(6), 110, { k: 'lnb', dash: true }) + T(X(6) + 3, 120, 'granica 6,0', { s: true, r: true });
    return svg(130, b, 'IAE po skoku zadania dla trzech metod i dolna granica 6,0');
  },
};
