const L = require('./svg'); const H = require('./h');
const { T, TL, box, arrow, line, rect, poly, pline, circle, svg } = L;
module.exports = {
  wspolpraca: () => {
    let b = box(0, 0, 100, 40, ['SWD', '(MATLAB)'], { k: 'bxa' }) + box(240, 0, 100, 40, ['HMI', 'operator']) + box(100, 70, 140, 44, ['PLC', '+ serwer OPC UA'], { k: 'bxn' });
    b += arrow([[50, 40], [50, 92], [100, 92]], { k: 'lna' }) + arrow([[100, 100], [60, 100], [60, 40]], { k: 'lnm', dash: true });
    b += arrow([[290, 40], [290, 92], [240, 92]], { k: 'ln' }) + arrow([[240, 100], [300, 100], [300, 40]], { k: 'lnm', dash: true });
    b += box(100, 140, 140, 30, ['obiekt'], { k: 'bxn' }) + arrow([[170, 114], [170, 140]], { k: 'ln' });
    b += T(170, 24, 'propozycja → zgoda', { s: true, m: true });
    return svg(178, b, 'SWD i HMI jako klienci serwera OPC UA w sterowniku; sterownik steruje obiektem');
  },
  tryby: () => H.tree('Ile decyzji oddać automatyce', ['A|SWD tylko|doradza', 'B|propozycja|i zgoda', 'C|MPC:|sam steruje'], { hi: [1], h: 64, note: ['w przemyśle najczęściej B: decydująca rola człowieka'], label: 'Trzy tryby współpracy SWD z systemem sterowania' }),
};
