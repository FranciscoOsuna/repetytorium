const L = require('./svg'); const H = require('./h');
const { T, box, arrow, line, poly, pline, circle, svg } = L;
const X = z => 36 + z * 3.5, Y = z => 150 - z * 1.15;
module.exports = {
  slownik: () => H.cols('Porównanie', 'Rozstrzyga', [['cel 1 różny', 'cel 1 (reszta się nie liczy)'], ['cel 1 remis', 'cel 2'], ['cele 1–2 remis', 'cel 3 itd.']], { w1: 120, w2: 180, h: 40, note: ['jak w słowniku: ALA przed ALE'], label: 'Porządek leksykograficzny' }),
  sekw: () => H.chainV(['krok 1: optymalizuj|cel najważniejszy', 'krok 2: kolejny cel,|ale z f₁ = najlepsza', 'krok k: f_k przy|f₁…f_{k−1} zamrożone', 'stop: po ostatnim|lub gdy jedno rozwiązanie'], { hi: [1], w: 200, gap: 42, label: 'Algorytm sekwencyjny' }),
  klocki: () => H.cols('Klocek', 'Co to jest', [['poziom aspiracji', 'zadowalająca wartość celu'], ['odchylenia η, ρ', 'niedobór i nadwyżka'], ['niepożądane', 'psuje warunek (η dla ≥)'], ['priorytet P_k', 'grupa o tej samej ważności'], ['funkcja osiągania', 'wektor sum odchyleń']], { w1: 120, w2: 180, h: 38, label: 'Klocki programowania zadaniowego' }),
  algo: () => H.chainV(['cele → zadania|(aspiracje)', 'dopisz η, ρ|(niepożądane)', 'priorytety:|P₁ twarde, dalej cele', 'funkcja osiągania|u = (u₁, u₂, …)', 'ciąg LP: min u_k|wcześniejsze zamrożone'], { hi: [4], w: 200, gap: 40, label: 'Leksykograficzne PZ krok po kroku' }),
  trzy: () => H.cols('Krok (priorytet)', 'Wynik', [['1: zasoby', '(0,0), u = (0;80;50)'], ['2: udział ≥ 80', '(0; 26⅔), u = (0;0;23⅓)'], ['3: zysk ≥ 50', 'H = (10,20), u = (0;0;0)']], { w1: 120, w2: 180, h: 42, label: 'Trzy zadania LP z wykładu' }),
  arch: () => H.cols('Leksykograficzne PZ', 'Archimedesowe PZ', [['decyduje kolejność', 'wagi i jednostki'], ['niższy ustępuje', 'cele się wymieniają'], ['LP na priorytet', 'dwa LP']], { w1: 150, w2: 150, h: 44, label: 'Leksykograficzne i archimedesowe PZ' }),
  wyniki: () => {
    let b = line(36, 150, 320, 150, { k: 'ln' }) + line(36, 150, 36, 10, { k: 'ln' });
    b += T(320, 164, 'z₁ zysk', { s: true, e: true }) + T(40, 12, 'z₂ udział', { s: true });
    b += poly([[X(0), Y(0)], [X(60), Y(40)], [X(70), Y(70)], [X(60), Y(110)], [X(30), Y(90)]], 'bx');
    b += pline([[X(60), Y(110)], [X(70), Y(70)]], 'lna');
    [['A', 60, 110, -14, 4, 'dotk'], ['B', 70, 70, 8, 4, 'dotk'], ['H', 50, 80, -14, 4, 'dot'], ['M', 62, 102, -14, 14, 'dot'], ['R', 65, 90, 12, 16, 'dot']].forEach(([n, a, c, dx, dy, k]) => { b += circle(X(a), Y(c), 4, k) + T(X(a) + dx, Y(c) + dy, n, { s: true }); });
    b += T(300, 124, 'front', { s: true, a: true, m: true }) + T(300, 136, 'Pareto AB', { s: true, a: true, m: true });
    return svg(172, b, 'Wyniki metod w przestrzeni celów: A, B, H, minimaksowe M i rozmyte R');
  },
};
