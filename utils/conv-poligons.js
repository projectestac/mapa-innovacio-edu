#!/usr/bin/env node

// Usage: ./conv-poligons.js > ../public/data/poligons.json
// Debug: ./conv-poligons.js debug

const raw = require('./poligons-raw.json');
const centres = require('./centres-total.json');
const DEBUG = process.argv.length > 2 && process.argv[2] === 'debug';
// Max bounds:
// const MAP_BOUNDS = [[40.50, 0.15], [42.90, 3.34]];

const result = raw
  .filter(p => p.tipus !== 'CREDA')
  .map(({ tipus, id, nom, poligons }) => {
    // Calc the bounds of each polygon
    let bounds = null;
    poligons.forEach(arr => arr.forEach(({ lat, lng }) => {
      if (!bounds)
        bounds = [[lat, lng], [lat, lng]];
      else {
        bounds[0][0] = Math.min(bounds[0][0], lat);
        bounds[0][1] = Math.min(bounds[0][1], lng);
        bounds[1][0] = Math.max(bounds[1][0], lat);
        bounds[1][1] = Math.max(bounds[1][1], lng);
      }
    }));
    
    return {
      key: tipus === 'ST' ? id : nom,
      tipus,
      id,
      nom,
      poligons: poligons.map(arr => arr.map(({ lat, lng }) => `${lat}|${lng}`).join(',')),
      bounds,
      centres: {
        ADR: 0,
        ADULTS: 0,
        BATX: 0,
        CFAM: 0,
        CFAS: 0,
        CFPM: 0,
        CFPS: 0,
        CRBC: 0,
        DANE: 0,
        DANP: 0,
        DANS: 0,
        EE: 0,
        EINF1C: 0,
        EINF2C: 0,
        EPRI: 0,
        ESDI: 0,
        ESO: 0,
        ESTR: 0,
        IDI: 0,
        MUSE: 0,
        MUSP: 0,
        MUSS: 0,
        PA01: 0,
        PA02: 0,
        PFI: 0,
        TEGM: 0,
        TEGS: 0,
      },
    }
  });

const st = {};
result.filter(p => p.tipus === 'ST')
  .forEach(p => {
    st[p.id] = p;
  });

const sez = {};
result.filter(p => p.tipus === 'SEZ')
  .forEach(p => {
    sez[p.nom] = p;
  });

const tipus = {};

// Saltar-se els "centres" que no imparteixen estudis o estan donats de baixa
const centresValids = centres.filter(c => c.tipus !== 'BAIXA' && c.estudis && c.estudis.length > 0);

centresValids.forEach(c => {

  const cst = st[c.sstt];
  if (!cst && DEBUG)
    console.log(`Warning: El centre ${c.id} ${c.nom} no té indicat el servei territorial!`);

  const csez = sez[c.se];
  if (!csez && DEBUG)
    console.log(`Warning: El centre ${c.id} ${c.nom} no té indicat el servei educatiu de zona!`);

  c.estudis.forEach(e => {

    if (!tipus[e])
      tipus[e] = 1;
    else
      tipus[e]++;

    if (cst)
      cst.centres[e]++;

    if (csez)
      csez.centres[e]++;
  });
});

if (DEBUG) {
  console.log(`S'han processat ${centresValids.length} centres`);
  console.log(`\nS'han detectat ${Object.keys(tipus).length} tipus d'estudis:`);
  Object.keys(tipus).sort().forEach(k => console.log(`${k}: ${tipus[k]}`));
} else {
  console.log(JSON.stringify(result, 1));
}

