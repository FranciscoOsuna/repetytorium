// node dumpfigs.js fig01 fig02 ... -> figs.json + ostrzeżenia
const L = require('./svg'); const fs = require('fs');
const out = {};
for (const m of process.argv.slice(2)) { const mod = require('./' + m); for (const [k, f] of Object.entries(mod)) { L.warns.length = 0; out[m + '.' + k] = f(); L.warns.forEach(w => console.log('UWAGA', m + '.' + k, w)); } }
fs.writeFileSync('figs.json', JSON.stringify(out));
console.log(Object.keys(out).length, 'rysunków');
