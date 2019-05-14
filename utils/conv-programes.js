#!/usr/bin/env node

// Usage: ./conv-programes.js > ../public/data/programes.json
// Debug: ./conv-programes.js debug

const { createReadStream } = require('fs');
const csv = require('csv');
const CSV_FILE = 'programes.csv';
const DEBUG = process.argv.length > 2 && process.argv[2] === 'debug';
const instancies = DEBUG ? require('../public/data/instancies.json') : [];
const centres = DEBUG ? require('../public/data/centres.json') : [];
const estudis = require('../public/data/estudis.json');
const ch = require('chalk');

// Array to be filled with the warnings found in debug mode
const warnings = [];

/**
 * Read the main CSV file
 * @param {string} file - The name of the file to read
 * @returns {Promise} - A Promise resolving with a list of `program` objects
 */
const readCSV = (file) => {
  const programes = [];
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
            // Build a program object with each row
            const programa = {
              id: reg.id_programa, // It's a string!
              nom: reg.Nom_programa.trim(),
              nomCurt: reg.Nom_curt || '',
              descripcio: reg.Descripcio || '',
              link: reg.Enllac || null,
              ambCurr: reg.Ambits_curriculars ? reg.Ambits_curriculars.trim().split(',').map(t => t.trim()) : [],
              ambInn: reg.Ambits_innovacio ? reg.Ambits_innovacio.trim().split(',').map(t => t.trim()) : [],
              arees: [],
              simbol: reg.Simbol || 'generic.png',
              tipus: reg.Etapes_objectiu ? reg.Etapes_objectiu.trim().split(',').map(t => t.trim()) : [],
              fitxa: reg['Enllaç_fitxa'] || null,
              video: reg.Video || null,
              objectius: reg.Objectius || null,
              requisits: reg.Requisits || null,
              compromisos: reg.Compromisos || null,
              contacte: reg.Contacte || null,
              normativa: reg.Normativa || null,
            };
            // Check for inconsistencies
            if (DEBUG) {

              const unknownAmbCurr = programa.ambCurr.filter(ac => !estudis.ambitsCurr[ac]);
              if (unknownAmbCurr.length > 0) {
                warnings.push(`${ch.bold.bgRed.white('ERROR:')} El programa ${programa.id} (${ch.italic(programa.nom)}) declara àmbits curriculars inexistents: ${unknownAmbCurr.join(', ')}`);
              }

              if (programa.tipus.length === 0) {
                warnings.push(`${ch.bold.bgRed.white('ERROR:')} El programa ${programa.id} (${ch.italic(programa.nom)}) no té definides les etapes objectiu`);
              } else {
                const instProg = instancies.filter(ins => ins.programa === programa.id);
                if (instProg.length === 0)
                  warnings.push(`${ch.bold.bgYellowBright.red('ATENCIÓ:')} El programa ${programa.id} (${ch.italic(programa.nom)}) no té cap centre participant`);
                else {
                  const warned = [];
                  instProg.forEach(ins => {
                    const codi = ins.centre;
                    if (!warned.includes(codi)) {
                      const centre = centres.find(c => c.id === codi);
                      if (!centre) {
                        warned.push(codi);
                        warnings.push(`${ch.bold.bgRed.white('ERROR:')} Hi ha una instància del programa ${programa.id} (${ch.italic(programa.nom)}) associada a un centre inexistent amb codi: "${ch.bold(codi)}"`);
                      }
                      else {
                        const k = centre.estudis.find(es => programa.tipus.find(pes => pes === es));
                        if (!k) {
                          warned.push(codi);
                          warnings.push(`${ch.bold.bgYellowBright.red('ATENCIÓ:')} El centre amb codi "${ch.bold(codi)}" participa al programa ${programa.id} (${ch.italic(programa.nom)}) sense tenir cap dels estudis requerits (centre: ${ch.bold(centre.estudis.join(', '))} | programa: ${ch.bold(programa.tipus.join(', '))})`);
                        }
                      }
                    }
                  });
                }
              }
            }
            programes.push(programa);
          });
          resolve(programes);
        }
      }
    ));
  });
};

// Main process starts here
readCSV(CSV_FILE)
  .then(programes => {
    if (DEBUG) {
      // Display the summary and possible warnings
      console.log(ch.bold.green(`${programes.length} programes comprovats`));
      warnings.forEach(inc => console.log(inc));
    }
    else
      // Send the resulting JSON to the standard output (usually redirected to '../public/data/programes.json' )
      console.log(JSON.stringify(programes, 1));
  })
  .catch(err => {
    console.log(ch.bold.red(`ERROR: ${err}`));
  });
