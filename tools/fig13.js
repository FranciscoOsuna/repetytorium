const L = require('./svg'); const H = require('./h');
const { T, box, arrow, svg } = L;
module.exports = {
  petla: () => H.chainV(['parametry, przystos.,|kodowanie', 'populacja początkowa|(losowana raz)', 'ocena przystosowania', 'selekcja', 'krzyżowanie', 'mutacja', 'stop? nie → do oceny'], { hi: [3, 4, 5], w: 200, gap: 36, loop: true, label: 'Schemat algorytmu genetycznego' }),
  os: () => H.cols('Eksploracja', 'Eksploatacja', [['nowe rejony|przestrzeni', 'dobre rejony|wykorzystane'], ['populacja pocz.,|mutacja', 'selekcja,|krzyżowanie'], ['skrajność:|błądzenie losowe', 'skrajność:|przedwcz. zbieżność']], { w1: 150, w2: 150, h: 44, label: 'Dwie siły algorytmu genetycznego' }),
  parametry: () => H.cols('Zwiększenie parametru', 'przesuwa w stronę', [['rozmiar populacji', 'eksploracji'], ['krzyżowanie pc', 'eksploatacji'], ['mutacja pm', 'eksploracji'], ['nacisk selekcyjny', 'eksploatacji'], ['elitaryzm', 'eksploatacji']], { w1: 180, w2: 120, h: 34, label: 'Parametry jako pokrętła eksploracja–eksploatacja' }),
  stop: () => H.cols('Warunek stopu', 'Uwaga', [['pokolenia / budżet', 'najuczciwszy'], ['brak poprawy', 'ryzyko zastoju'], ['zadana jakość', 'trzeba wiedzieć cel'], ['zanik różnorodności', 'dalej nic nie wniesie']], { w1: 150, w2: 150, h: 38, label: 'Cztery warunki stopu' }),
};
