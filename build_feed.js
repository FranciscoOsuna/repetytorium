// build_feed.js — node build_feed.js
// Źródło prawdy: cards/_meta.json + cards/qNN.json. Wynik: wklejone do feed_powtorki.html
// między znacznikami /*CARDS:BEGIN*/ i /*CARDS:END*/. Idempotentny.
const fs = require('fs'), path = require('path');
const dir = __dirname, cdir = path.join(dir, 'cards'), out = path.join(dir, 'feed_powtorki.html');

const meta = JSON.parse(fs.readFileSync(path.join(cdir, '_meta.json'), 'utf8'));
const FIELDS = {
  fakt: ['tytul', 'tresc'], fiszka: ['pytanie', 'odpowiedz'], dopytka: ['pytanie', 'odpowiedz'],
  pf: ['twierdzenie', 'prawda', 'wyjasnienie'], luka: ['zdanie', 'opcje', 'poprawna', 'wyjasnienie'],
  porownanie: ['tytul', 'kolumny', 'wiersze'], kroki: ['tytul', 'kroki', 'wyjasnienie'],
  zapamietaj: ['haslo', 'rozwiniecie'], schemat: ['svg']
};
const SOFT = { tresc: 420, analogia: 200, odpowiedz: 520, wyjasnienie: 360, rozwiniecie: 260, haslo: 110, zdanie: 220, twierdzenie: 200, pytanie: 160, podpis: 190, opis: 320 };
const errs = [], warns = [], ids = new Set(), cards = [];

const files = fs.readdirSync(cdir).filter(f => /^q\d+\.json$/.test(f)).sort();
for (const f of files) {
  const q = +f.match(/\d+/)[0];
  if (!meta[q]) errs.push(`${f}: brak wpisu ${q} w _meta.json`);
  let arr; try { arr = JSON.parse(fs.readFileSync(path.join(cdir, f), 'utf8')); } catch (e) { errs.push(`${f}: ${e.message}`); continue; }
  for (const c of arr) {
    const w = `${f}/${c.id}`;
    if (c.q !== q) errs.push(`${w}: q=${c.q}, plik dotyczy ${q}`);
    if (!new RegExp(`^q${q}-\\d\\d$`).test(c.id || '')) errs.push(`${w}: id musi mieć postać q${q}-NN`);
    if (ids.has(c.id)) errs.push(`${w}: duplikat id`); ids.add(c.id);
    if (!FIELDS[c.typ]) { errs.push(`${w}: nieznany typ ${c.typ}`); continue; }
    if (![1, 2, 3].includes(c.poziom)) errs.push(`${w}: poziom 1–3`);
    if (!c.zrodlo) errs.push(`${w}: brak zrodlo`);
    if (c.typ === 'schemat' && !(c.tytul || c.pytanie)) errs.push(`${w}: schemat wymaga tytul albo pytanie`);
    if (c.svg !== undefined) {
      if (!/^<svg[^>]*viewBox="[^"]+"/.test(c.svg) || !/<\/svg>$/.test(c.svg)) errs.push(`${w}: svg musi zaczynać się od <svg viewBox=…> i kończyć </svg>`);
      if (/<script|\son\w+\s*=|href\s*=|<image|<foreignObject/i.test(c.svg)) errs.push(`${w}: svg zawiera zabronione elementy`);
    }
    const czN = meta[q] && meta[q].cz ? meta[q].cz.length : 0;
    if (czN && !(Number.isInteger(c.cz) && c.cz >= 1 && c.cz <= czN)) errs.push(`${w}: cz musi być 1–${czN}`);
    if (!czN && c.cz !== undefined) errs.push(`${w}: cz bez definicji części w _meta`);
    for (const k of FIELDS[c.typ]) if (c[k] === undefined || c[k] === '') errs.push(`${w}: brak pola ${k}`);
    if (c.typ === 'pf' && typeof c.prawda !== 'boolean') errs.push(`${w}: prawda musi być boolean`);
    if (c.typ === 'luka' && !(Array.isArray(c.opcje) && c.opcje.length >= 2 && Number.isInteger(c.poprawna) && c.poprawna >= 0 && c.poprawna < c.opcje.length)) errs.push(`${w}: opcje/poprawna`);
    if (c.typ === 'luka' && !/___/.test(c.zdanie || '')) errs.push(`${w}: zdanie bez ___`);
    if (c.typ === 'kroki' && !(Array.isArray(c.kroki) && c.kroki.length >= 3 && c.kroki.length <= 8)) errs.push(`${w}: kroki 3–8`);
    if (c.typ === 'porownanie' && !(Array.isArray(c.kolumny) && c.wiersze?.every(r => r.length === c.kolumny.length + 1))) errs.push(`${w}: wiersz porównania = etykieta + ${c.kolumny?.length} komórek`);
    for (const [k, lim] of Object.entries(SOFT)) if (typeof c[k] === 'string' && c[k].length > lim) warns.push(`${w}: ${k} ${c[k].length} > ${lim}`);
    cards.push(c);
  }
}
for (const q of Object.keys(meta)) if (!files.includes(`q${String(q).padStart(2, '0')}.json`)) errs.push(`_meta: pytanie ${q} nie ma pliku kart`);
warns.forEach(w => console.log('uwaga:', w));
if (errs.length) { errs.forEach(e => console.log('BŁĄD:', e)); process.exit(1); }

const qs = Object.keys(meta).map(Number).sort((a, b) => a - b);
const topics = qs.map(q => `  ${q}:{t:${JSON.stringify(meta[q].t)},h:${meta[q].h}${meta[q].cz ? ',cz:' + JSON.stringify(meta[q].cz) : ''}}`).join(',\n');
const pages = '{' + qs.map(q => `${q}:${JSON.stringify(meta[q].page)}`).join(',') + '}';
const block = `/*CARDS:BEGIN*/\nconst CARDS = [\n${cards.map(c => JSON.stringify(c)).join(',\n')}\n];\nconst TOPICS = {\n${topics}\n};\nconst PAGES = ${pages};\n/*CARDS:END*/`;

let h = fs.readFileSync(out, 'utf8');
if (h.includes('/*CARDS:BEGIN*/')) h = h.replace(/\/\*CARDS:BEGIN\*\/[\s\S]*?\/\*CARDS:END\*\//, () => block);
else h = h.replace(/const CARDS = \[[\s\S]*?\];\nconst TOPICS = \{[\s\S]*?\n\};\nconst PAGES = \{[^\n]*\};/, () => block);
fs.writeFileSync(out, h);
console.log(`OK: ${cards.length} kart, ${qs.length} pytań`);
