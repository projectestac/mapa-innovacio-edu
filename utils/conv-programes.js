#!/usr/bin/env node

// Usage: ./conv-programes.js > ../public/data/programes.json
// Debug: ./conv-programes.js debug

const { sortObjectArrayBy, readCSVFile } = require('./utils');
const CSV_FILE = 'programes.csv';
const DEBUG = process.argv.length > 2 && process.argv[2] === 'debug';
const instancies = require('../public/data/instancies.json');
const centres = require('../public/data/centres.json');
const estudis = require('../public/data/estudis.json');
const ch = require('chalk');

// Array to be filled with the warnings found in debug mode
const warnings = [];

/**
 * Read the main CSV file
 * @param {string} file - The name of the file to read
 * @returns {Promise} - A Promise resolving with a list of `program` objects
 */
async function readCSV(file) {
  const programes = [];
  const data = await readCSVFile(file);

  data.forEach(reg => {
    // Build a program object with each row
    const programa = {
      // id: reg.id_programa, // It's a string!
      id: reg['Id'], // It's a string!
      // nom: reg.Nom_programa.trim(),
      nom: reg['Nom Programa'].trim(),
      // nomCurt: reg.Nom_curt || '',
      nomCurt: reg['Nom Curt'] || '',
      descripcio: reg.Descripcio || '',
      // link: reg.Enllac || null,
      link: reg['Web Programa'] || null,
      // ambCurr: reg.Ambits_curriculars ? reg.Ambits_curriculars.trim().split(',').map(t => t.trim()) : [],
      ambCurr: reg['Ambits Curriculars'] ? reg['Ambits Curriculars'].trim().split(',').map(t => t.trim()) : [],
      // ambInn: reg.Ambits_innovacio ? reg.Ambits_innovacio.trim().split(',').map(t => t.trim()) : [],
      ambInn: reg['Ambits Innovacio'] ? reg['Ambits Innovacio'].trim().split(',').map(t => t.trim()) : [],
      arees: [],
      simbol: reg.Simbol || 'generic.png',
      // tipus: reg.Etapes_objectiu ? reg.Etapes_objectiu.trim().split(',').map(t => t.trim()) : [],
      tipus: reg['Etapes Objectiu'] ? reg['Etapes Objectiu'].trim().split(',').map(t => t.trim()) : [],
      // fitxa: reg['Enllaç_fitxa'] || null,
      fitxa: reg['Enllaç Fitxa'] || null,
      // video: reg.Video || null,
      video: embedVideo(reg['Vídeo']) || null,
      objectius: reg.Objectius || null,
      requisits: reg.Requisits || null,
      compromisos: reg.Compromisos || null,
      // contacte: reg.Contacte || null,
      contacte: reg.Contacte || null,
      // ATENCIÓ: Aquest camp no existeix!
      normativa: reg.Normativa || null,
    };

    const instProg = instancies.filter(ins => ins.programa === programa.id);

    // Ignore programs without participants
    let valid = instProg.length > 0;

    const info = [];
    const allCentresMap = new Map();
    instProg.forEach(ins => {
      if (ins.titol)
        info.push(ins.titol);
      const centre = centres.find(c => c.id === ins.centre);
      allCentresMap.set(centre.id, centre);
    });

    programa.text = [
      programa.nom,
      programa.descripcio,
      programa.ambCurr.map(a => estudis.ambitsCurr[a]).join(', '),
      programa.ambInn.map(a => estudis.ambitsInn[a]).join(', '),
      programa.arees.join(', '),
      programa.objectius || '',
      programa.requisits || '',
      programa.compromisos || '',
      programa.normativa || '',
      programa.contacte || '',
      info.join(', '),
      Array.from(allCentresMap.values()).map(({ nom, municipi, comarca }) => `${nom}, ${municipi}, ${comarca}`).join(' | '),
    ].join(' | ').replace(/([’'\-:]|\n)+/g, ' ').replace(/\s\s+/g, ' ').replace(/\|\s\|+/g, '|');

    // Check for inconsistencies
    if (DEBUG) {

      const unknownAmbCurr = programa.ambCurr.filter(ac => !estudis.ambitsCurr[ac]);
      if (unknownAmbCurr.length > 0) {
        warnings.push(`${ch.bold.bgRed.white('ERROR:')} El programa ${programa.id} (${ch.italic(programa.nom)}) declara àmbits curriculars inexistents: "${unknownAmbCurr.join(', ')}"`);
      }

      if (programa.tipus.length === 0) {
        warnings.push(`${ch.bold.bgRed.white('ERROR:')} El programa ${programa.id} (${ch.italic(programa.nom)}) no té definides les etapes objectiu`);
      } else {
        if (instProg.length === 0)
          warnings.push(`${ch.bold.bgYellowBright.red('ATENCIÓ:')} El programa ${programa.id} (${ch.italic(programa.nom)}) serà exclòs per no tenir cap centre participant`);
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

    if (valid)
      programes.push(programa);
  });

  return sortObjectArrayBy(programes, 'nom');
}

function embedVideo(url) {
  if(!url)
    return null;
  else if(url.indexOf('youtube.com') >= 0 || url.indexOf('youtu.be') >= 0)
    return `<iframe style="margin-top:-2rem" class="proj-video" title="Vídeo del projecte" src="${url.replace('watch', 'embed')}${url.indexOf('?') >=0 ? '&' : '?'}autoplay=0&cc_lang_pref=ca&hl=ca&fs=1&modestbranding=1&rel=0" width="500" height="375" type="text/html" allowfullscreen=""></iframe>`;
  else
    return `<p style="margin-top:-2rem">▶️ <a href="${url}">Vídeo del projecte</a></p>`;
}

async function main() {
  const programes = await readCSV(CSV_FILE);
  if (DEBUG) {
    // Display the summary and possible warnings
    console.log(ch.bold.green(`${programes.length} programes comprovats`));
    warnings.forEach(inc => console.log(inc));
  }
  else
    // Send the resulting JSON to the standard output (usually redirected to '../public/data/programes.json' )
    console.log(JSON.stringify(programes, 1));
}

// Main process starts here
try {
  main();
} catch (err) {
  console.log(ch.bold.red(`ERROR: ${err}`));
}
