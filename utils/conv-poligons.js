#!/usr/bin/env node

// Usage: ./conv-poligons.js > ../public/data/poligons.json
// Debug: ./conv-poligons.js debug

const { createReadStream } = require('fs');
const csv = require('csv');
const ch = require('chalk');

const centres = require('./centres-total.json');
// Saltar-se els "centres" que no imparteixen estudis o estan donats de baixa
const centresValids = centres.filter(c => c.tipus !== 'BAIXA' && c.estudis && c.estudis.length > 0);

const CSV_FILE = 'zones.csv';
const DEBUG = process.argv.length > 2 && process.argv[2] === 'debug';

// Array of warnings to be displayed at the end
const warnings = [];

// Object used to count detected educational levels
const tipus = {};

// Schools counter template
const COUNT_CENTRES = {
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
};

/**
 * Read the main CSV file
 * @param {string} file - The name of the file to read
 * @returns {Promise} - A Promise resolving with a list of `program` objects
 */
const readCSV = (file) => {
  const zones = [];
  return new Promise((resolve, reject) => {
    createReadStream(`${__dirname}/${file}`, { encoding: 'utf8' }).pipe(csv.parse(
      {
        delimiter: ',',
        columns: true,
      },
      (err, data) => {
        if (err)
          reject(err);
        else {
          data.forEach(reg => {
            const poligons = JSON.parse(reg.poli);
            // Calc the bounds of each polygon
            let bounds = null;
            poligons.forEach(arr => arr.forEach(([lat, lng]) => {
              if (!bounds)
                bounds = [[lat, lng], [lat, lng]];
              else {
                bounds[0][0] = Math.min(bounds[0][0], lat);
                bounds[0][1] = Math.min(bounds[0][1], lng);
                bounds[1][0] = Math.max(bounds[1][0], lat);
                bounds[1][1] = Math.max(bounds[1][1], lng);
              }
            }));

            const poligon = {
              key: reg.key,
              tipus: reg.tipus,
              id: reg.id,
              nom: reg.nom,
              adreca: reg.adreça,
              tel: reg.telèfon,
              fax: reg.fax,
              cp: reg.cp,
              municipi: reg.municipi,
              comarca: reg.comarca,
              correu: reg.correu,
              web: reg.web,
              logo: reg.logo,
              pos: [Number(reg.lat), Number(reg.lng)],
              poligons: poligons.map(arr => arr.map(([lat, lng]) => `${lat}|${lng}`).join(',')),
              bounds,
              centres: Object.assign({}, COUNT_CENTRES),
            };

            zones.push(poligon);
          });

          resolve(countLevels(zones));
        }
      }
    ));
  });
};

const countLevels = zones => {

  const st = {};
  zones.filter(p => p.tipus === 'ST')
    .forEach(p => {
      st[p.key] = p;
    });

  const sez = {};
  zones.filter(p => p.tipus === 'SEZ')
    .forEach(p => {
      sez[p.key] = p;
    });

  centresValids.forEach(c => {

    const cst = st[c.sstt];
    if (!cst && DEBUG)
      warnings.push(`${ch.bold.bgYellowBright.red('ATENCIÓ:')} El centre ${c.id} ${c.nom} no té indicat el servei territorial`);

    const csez = sez[c.se];
    if (!csez && DEBUG)
      warnings.push(`${ch.bold.bgYellowBright.red('ATENCIÓ:')} El centre ${c.id} ${c.nom} no té indicat el servei educatiu de zona`);

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

  return zones;
};

// Main process start here
readCSV(CSV_FILE)
  .then(zones => {
    if (DEBUG) {
      // Display the summary and possible warnings
      console.log(ch.bold.green(`S'han processat ${centresValids.length} centres`));
      console.log(ch.bold.green(`\nS'han detectat ${Object.keys(tipus).length} tipus d'estudis:`));
      Object.keys(tipus).sort().forEach(k => console.log(`${ch.bold.green('-')} ${k}: ${tipus[k]}`));
      console.log(ch.bold.green(`\nS'han comprovat ${zones.length} polígons:`));
      zones.forEach(z => console.log(`${ch.bold.green('✔')} ${z.nom}`));
      warnings.forEach(inc => console.log(inc));
    }
    else
      // Send the resulting JSON to the standard output (usually redirected to '../public/data/programes.json' )
      console.log(JSON.stringify(zones, 1));
  })
  .catch(err => {
    console.log(ch.bold.red(`ERROR: ${err}`));
  });
