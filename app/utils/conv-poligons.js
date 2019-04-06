#!/usr/bin/env node

// Usage: node conv-poligons.js > ../public/data/poligons.json

const raw = require('./poligons-raw.json');
const centres = require('./centres-total.json');

const result = raw
  .filter(p => p.tipus !== 'CREDA')
  .map(({ tipus, id, nom, poligons }) => {
    return {
      tipus,
      id,
      nom,
      poligons: poligons.map(arr => arr.map(({ lat, lng }) => `${lat}|${lng}`).join(',')),
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

const tipus = [];

centres.forEach(c => {
  const cst = st[c.sstt];
  const csez = sez[c.se];
  c.estudis.forEach(e => {

    if (!tipus.includes(e))
      tipus.push(e);

    if (cst)
      cst.centres[e]++;
    // else
    //  console.log(`Warning: El centre ${c.id} ${c.nom} no té indicat el servei territorial!`);

    if (csez)
      csez.centres[e]++;
    // else
    //  console.log(`Warning: El centre ${c.id} ${c.nom} no té indicat el servei educatiu de zona!`);
  });
});

//console.log(centres.length)
//console.log(JSON.stringify(tipus.sort(), 1));

console.log(JSON.stringify(result, 1));
