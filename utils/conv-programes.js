#!/usr/bin/env node

// Usage: ./conv-programes.js > ../public/data/programes.json
// Debug: ./conv-programes.js debug

const { createReadStream } = require('fs');
const csv = require('csv');
const CSV_FILE = 'programes.csv';
const DEBUG = process.argv.length > 2 && process.argv[2] === 'debug';
const instancies = DEBUG ? require('../public/data/instancies.json') : [];
const centres = DEBUG ? require('../public/data/centres.json') : [];
const chalk = require('chalk');

const warnings = [];

const readCsv = (file) => {
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
            const programa = {
              id: reg.id_programa, // Is a string!
              nom: reg.Nom_programa.trim(),
              nomCurt: reg.Nom_curt || '',
              descripcio: reg.Descripcio || '',
              link: reg.Enllac || null,
              ambCurr: reg.Ambits_curriculars ? reg.Ambits_curriculars.trim().split(',').map(t => t.trim()) : [],
              ambInn: reg.Ambits_innovacio ? reg.Ambits_innovacio.trim().split(',').map(t => t.trim()) : [],
              arees: [],
              simbol: reg.Simbol || 'generic.png',
              tipus: reg.Etapes_objectiu ? reg.Etapes_objectiu.trim().split(',').map(t => t.trim()) : [],
              fitxa: reg.Fitxa || null,
              video: reg.Video || null,
              objectius: reg.Objectius || null,
              requisits: reg.Requisits || null,
              compromisos: reg.Compromisos || null,
              contacte: reg.Contacte || null,
              normativa: reg.Normativa || null,
            };
            if (DEBUG) {
              if (programa.tipus.length === 0) {
                warnings.push(`${chalk.bold.bgRed.white('ERROR:')} El programa ${programa.id} (${chalk.italic(programa.nom)}) no té definides les etapes objectiu`);
              } else {
                const instProg = instancies.filter(ins => ins.programa === programa.id);
                if (instProg.length === 0)
                  warnings.push(`${chalk.bold.bgYellowBright.red('ATENCIÓ:')} El programa ${programa.id} (${chalk.italic(programa.nom)}) no té cap centre participant`);
                else {
                  const warned = [];
                  instProg.forEach(ins => {
                    const codi = ins.centre;
                    if (!warned.includes(codi)) {
                      const centre = centres.find(c => c.id === codi);
                      if (!centre) {
                        warned.push(codi);
                        warnings.push(`${chalk.bold.bgRed.white('ERROR:')} Hi ha una instància del programa ${programa.id} (${chalk.italic(programa.nom)}) associada a un centre inexistent: "${chalk.bold(codi)}"`);
                      }
                      else {
                        const k = centre.estudis.find(es => programa.tipus.find(pes => pes === es));
                        if (!k) {
                          warned.push(codi);
                          warnings.push(`${chalk.bold.bgYellowBright.red('ATENCIÓ:')} El centre amb codi "${chalk.bold(codi)}" participa al programa ${programa.id} (${chalk.italic(programa.nom)}) sense tenir cap dels estudis requerits (centre: ${chalk.bold(centre.estudis.join(', '))} | programa: ${chalk.bold(programa.tipus.join(', '))})`);
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

readCsv(CSV_FILE)
  .then(programes => {
    //programes.forEach(p => console.log(`${p.id} - ${p.nom} - ${p.nomCurt}`));
    if (DEBUG) {
      warnings.forEach(inc => console.log(inc));
      console.log(chalk.bold.green(`${programes.length} programes comprovats`));
    }
    else
      console.log(JSON.stringify(programes, 1));
  })
  .catch(err => console.log(chalk.bold.red(`ERROR: ${err}`)));
