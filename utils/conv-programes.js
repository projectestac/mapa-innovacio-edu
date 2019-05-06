#!/usr/bin/env node

// Usage: ./conv-programes.js > ../public/data/programes.json
// Debug: ./conv-programes.js debug

const { createReadStream } = require('fs');
const csv = require('csv');
const CSV_FILE = 'programes.csv';


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
            programes.push({
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
            });
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
    console.log(JSON.stringify(programes, 1));
  })
  .catch(err => console.log(`ERROR: ${err}`));
