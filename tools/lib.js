const fs = require('fs');
const figs = JSON.parse(fs.readFileSync('figs.json', 'utf8'));
const F = n => { if (!figs[n]) throw new Error('brak rysunku ' + n); return figs[n]; };
const OUT = '/mnt/user-data/outputs/';
const P2 = q => String(q).padStart(2, '0');
const oldOf = q => { const p = `/mnt/user-data/uploads/repetytorium/cards/_prev/q${P2(q)}.json`; return fs.existsSync(p) ? Object.fromEntries(JSON.parse(fs.readFileSync(p, 'utf8')).map(c => [c.id, c])) : {}; };

function build(q, parts, spec) {
  const old = oldOf(q); const used = new Set(); const out = [];
  spec.forEach(([cz, items]) => items.forEach(it => {
    let c;
    if (typeof it === 'number' || (Array.isArray(it))) {
      const [num, extra] = Array.isArray(it) ? it : [it, {}];
      const id = `q${q}-${String(num).padStart(2, '0')}`;
      if (!old[id]) throw new Error('brak starej karty ' + id);
      const { id: _i, q: _q, typ, poziom, zrodlo, ...rest } = old[id];
      c = { id, q, typ, poziom, zrodlo, ...rest, ...extra, cz };
      used.add(id);
    } else {
      const { num, ...rest } = it;
      const id = `q${q}-${String(num).padStart(2, '0')}`;
      const { typ, poziom, zrodlo, ...r2 } = rest;
      c = { id, q, typ, poziom, zrodlo, cz, ...r2 };
      if (old[id]) throw new Error('nowa karta zajmuje stare id ' + id);
    }
    if (out.find(x => x.id === c.id)) throw new Error('duplikat ' + c.id);
    out.push(c);
  }));
  const dropped = Object.keys(old).filter(id => !used.has(id));
  fs.writeFileSync(OUT + `q${P2(q)}.json`, '[\n' + out.map(c => '  ' + JSON.stringify(c)).join(',\n') + '\n]\n');
  console.log(`Q${q}: ${out.length} kart, odrzucone: ${dropped.join(',') || '-'}`);
}
const S = (num, poziom, zrodlo, o) => ({ num, typ: 'schemat', poziom, zrodlo, ...o });
const sv = (n, podpis) => ({ svg: F(n), podpis });


// shorthand do nowych kart
const fa = (num, poziom, zrodlo, tytul, tresc, analogia) => ({ num, typ: 'fakt', poziom, zrodlo, tytul, tresc, ...(analogia ? { analogia } : {}) });
const fi = (num, poziom, zrodlo, pytanie, odpowiedz) => ({ num, typ: 'fiszka', poziom, zrodlo, pytanie, odpowiedz });
const dp = (num, poziom, zrodlo, pytanie, odpowiedz) => ({ num, typ: 'dopytka', poziom, zrodlo, pytanie, odpowiedz });
const pf = (num, poziom, zrodlo, twierdzenie, prawda, wyjasnienie) => ({ num, typ: 'pf', poziom, zrodlo, twierdzenie, prawda, wyjasnienie });
const lu = (num, poziom, zrodlo, zdanie, opcje, poprawna, wyjasnienie) => ({ num, typ: 'luka', poziom, zrodlo, zdanie, opcje, poprawna, wyjasnienie });
const za = (num, poziom, zrodlo, haslo, rozwiniecie) => ({ num, typ: 'zapamietaj', poziom, zrodlo, haslo, rozwiniecie });
const kr = (num, poziom, zrodlo, tytul, kroki, wyjasnienie) => ({ num, typ: 'kroki', poziom, zrodlo, tytul, kroki, wyjasnienie });
const po = (num, poziom, zrodlo, tytul, kolumny, wiersze) => ({ num, typ: 'porownanie', poziom, zrodlo, tytul, kolumny, wiersze });


module.exports={build,F,S,sv,fa,fi,dp,pf,lu,za,kr,po};
