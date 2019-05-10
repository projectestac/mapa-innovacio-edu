#!/usr/bin/env node

// Usage:
//   ./conv-instancies.js instancies > ../public/data/instancies.json
//   ./conv-instancies.js centres > ../public/data/centres.json
// Debug: ./conv-instancies.js debug

const { createReadStream } = require('fs');
const csv = require('csv');
const ch = require('chalk');

const centresTotal = require('./centres-total.json');
// Saltar-se els "centres" que no imparteixen estudis o estan donats de baixa
const centresValids = centresTotal.filter(c => c.tipus !== 'BAIXA' && c.estudis && c.estudis.length > 0);

const zers = require('./zer.json');

const CSV_FILE = 'instancies.csv';
const DEBUG = process.argv.length > 2 && process.argv[2] === 'debug';

const DUMP_INSTANCIES = process.argv.length > 2 && process.argv[2] === 'instancies';
const DUMP_CENTRES = process.argv.length > 2 && process.argv[2] === 'centres';

// Array of warnings to be displayed at the end
const warnings = [];

/**
 * Read the main CSV file
 * @param {string} file - The name of the file to read
 * @returns {Promise} - A Promise resolving with a list of `program` objects
 */
const readCSV = (file) => {

  const instancies = [];
  const centres = [];
  let certificats = 0;

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
            const codiCentre = reg.Codi_centre;
            const programa = reg.id_programa;
            let centre = centresValids.find(c => c.id === codiCentre);
            const result = [];

            if (!centre)
              warnings.push(`${ch.bold.bgRed.white('ERROR:')} Instància del programa ${programa} assignada a un centre inexistent: ${codiCentre}`);
            else {

              const instancia = {
                centre: codiCentre,
                programa,
                curs: reg.Curs,
                cert: reg.Certificat === 'S',
              }

              if (reg.Titol)
                instancia.titol = reg.Titol;

              // Comprovar ZERs
              const zer = zers.find(z => z.codi === codiCentre);
              if (zer) {
                warnings.push(`${ch.bold.green('INFO:')} La instància del programa ${programa} assignada a la ZER ${centre.nom} (${centre.id}) per al curs ${instancia.curs} s'expandeix als ${zer.centres.length} centres de la zona.`);
                zer.centres.forEach(cz => {
                  const inst = Object.assign({}, instancia);
                  inst.centre = cz.codi;
                  result.push(inst);
                });
              }
              else
                result.push(instancia);

              result.forEach(ins => {
                centre = centresValids.find(c => c.id === ins.centre);
                if (!centre)
                  warnings.push(`${ch.bold.bgRed.white('ERROR:')} Instància del programa ${programa} assignada a un centre inexistent: ${codiCentre}`);
                else {
                  // Afegir centre a la llista de centres
                  if (!centres.find(c => c.id === ins.centre))
                    centres.push(centre);
                  // Actualitzar nombre de certificats
                  if (ins.cert)
                    certificats++;
                  // Afegir instància al resultat final
                  instancies.push(ins);
                }
              })
            }
          });
          resolve({ instancies, centres, certificats });
        }
      }
    ));
  });
};

// Main process start here
readCSV(CSV_FILE)
  .then(({ instancies, centres, certificats }) => {
    if (DEBUG) {
      // Display the summary and possible warnings
      console.log(ch.bold.green(`S'han processat ${instancies.length} instancies (${certificats} ja certificades, ${instancies.length - certificats} en curs)`));
      console.log(ch.bold.green(`Hi ha un total de ${centres.length} centres participants`));
      warnings.forEach(inc => console.log(inc));
    }
    else if (DUMP_INSTANCIES)
      // Send the resulting JSON to the standard output (usually redirected to '../public/data/instancies.json' )
      console.log(JSON.stringify(instancies, 1));
    else if (DUMP_CENTRES)
      // Send the resulting JSON to the standard output (usually redirected to '../public/data/centres.json' )
      console.log(JSON.stringify(centres, 1));
    else
      console.log(`${ch.bold.red('ERROR:')} Heu d'indicar un d'aquests paràmetres: ${ch.italic('debug')}, ${ch.italic('instancies')}, ${ch.italic('centres')}`);
  })
  .catch(err => {
    console.log(ch.bold.red(`ERROR: ${err}`));
  });
