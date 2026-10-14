const L = require('./svg'); const H = require('./h');
const { T, box, arrow, svg } = L;
module.exports = {
  pamiec: () => H.cols('Model', 'Skąd przeszłe wyjście', [['NARX', 'z pomiaru obiektu'], ['NOE', 'z własnej prognozy'], ['Elman', 'warstwa kontekstowa'], ['NFIR', 'brak (tylko wejścia)']], { w1: 100, w2: 200, h: 38, note: ['NARX uczę, NOE używam'], label: 'Skąd sieć ma pamięć' }),
  struktury: () => H.cols('Struktura', 'Idea', [['odwrotna', 'sieć = odwrotność obiektu'], ['IMC', 'model i odwrotność'], ['model odniesienia', 'regulator uczony do wzorca'], ['NARMA-L2', 'u wchodzi liniowo, f i g z sieci'], ['NN-MPC', 'sieć jako predyktor w MPC']], { w1: 112, w2: 188, h: 38, hi: [3], label: 'Pięć struktur z siecią neuronową' }),
  ts: () => {
    let b = T(170, 12, 'wagi w_i(z) sklejają modele lokalne', { s: true, m: true });
    b += box(10, 26, 90, 34, ['JEŻELI z ∈ A₁', 'TO model 1'], { k: 'bxa' });
    b += box(10, 70, 90, 34, ['JEŻELI z ∈ A₂', 'TO model 2'], { k: 'bxa' });
    b += box(10, 114, 90, 34, ['JEŻELI z ∈ A₃', 'TO model 3'], { k: 'bxa' });
    b += arrow([[100, 43], [150, 43], [190, 82]], { k: 'lna' }) + arrow([[100, 87], [190, 87]], { k: 'lna' }) + arrow([[100, 131], [150, 131], [190, 92]], { k: 'lna' });
    b += box(190, 62, 70, 50, ['średnia', 'ważona']);
    b += arrow([[260, 87], [290, 87]], { k: 'ln' }) + T(312, 91, 'ẋ', { s: true, m: true });
    return svg(160, b, 'System Takagi–Sugeno: reguły z lokalnymi modelami i średnia ważona');
  },
  pid: () => {
    let b = '';
    b += box(10, 8, 90, 34, ['PID 1', '(punkt 1)'], { k: 'bxa' });
    b += box(10, 52, 90, 34, ['PID 2', '(punkt 2)'], { k: 'bxa' });
    b += box(10, 96, 90, 34, ['PID 3', '(punkt 3)'], { k: 'bxa' });
    b += box(130, 52, 90, 34, ['sklejanie', 'rozmyte']);
    b += arrow([[100, 25], [130, 60]], { k: 'lna' }) + arrow([[100, 69], [130, 69]], { k: 'lna' }) + arrow([[100, 113], [130, 78]], { k: 'lna' });
    b += arrow([[220, 69], [250, 69]], { k: 'ln' }) + box(250, 52, 80, 34, ['obiekt']);
    b += arrow([[290, 86], [290, 112], [175, 112], [175, 86]], { k: 'lnm', dash: true }) + T(232, 126, 'punkt pracy (poziom)', { s: true, m: true });
    return svg(140, b, 'Wieloobszarowy PID Takagi–Sugeno: lokalne regulatory mieszane wagami');
  },
  pdc: () => H.cols('Model TS', 'Regulator PDC', [['JEŻELI z ∈ Aᵢ', 'JEŻELI z ∈ Aᵢ'], ['TO ẋ = Aᵢx + Bᵢu', 'TO u = −Kᵢx'], ['wagi wᵢ', 'te same wagi wᵢ']], { w1: 150, w2: 150, h: 38, note: ['stabilność: wspólna P (LMI)'], label: 'PDC: regulator jako lustro modelu' }),
  anfis: () => H.chainV(['1: przesłanki|(zbiory rozmyte)', '2: moc reguł|(iloczyn)', '3: normalizacja', '4: konkluzje|(liniowe)', '5: suma|(wyjście)'], { hi: [0, 3], w: 190, gap: 42, label: 'Pięć warstw ANFIS (parametry w 1 i 4)' }),
};
