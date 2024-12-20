#!/usr/bin/env node

// Usage:
//   ./conv-instancies.js instancies > ../public/data/instancies.json
//   ./conv-instancies.js centres > ../public/data/centres.json
// Debug: ./conv-instancies.js debug

const { sortObjectArrayBy, readCSVFile, readDadesCentres } = require('./utils');
const ch = require('chalk');

const zers = require('./zer.json');
const { cursos: cursosDisp, cursMin, cursMax } = require('../public/data/estudis.json');
const logos = require('./logos.json');
const instanciesMod = require('./instancies-mod.json');

const DADES_CENTRES = 'dades-centres.csv';
const PROGRAMES = 'programes.csv';
const MAIN_CSV_FILE = 'instancies.csv';
const DEBUG = process.argv.length > 2 && process.argv[2] === 'debug';

const DUMP_INSTANCIES = process.argv.length > 2 && process.argv[2] === 'instancies';
const DUMP_CENTRES = process.argv.length > 2 && process.argv[2] === 'centres';

const TODAY = new Date();
const DEFAULT_END_CURS = TODAY.getMonth() >= 8 ? `${TODAY.getFullYear()}-${TODAY.getFullYear() + 1}` : `${TODAY.getFullYear() - 1}-${TODAY.getFullYear()}`;

// Array of warnings to be displayed at the end
const warnings = [];

/**
 * Read the main CSV file
 * @param {string} file - The name of the file to read
 * @returns {Promise} - A Promise resolving with a list of `program` objects
 */
async function readMainCSV(file, programes, centresValids) {

  const instancies = [];
  const centres = [];
  let certificats = 0;

  const data = await readCSVFile(file);

  // Ajustaments previs

  // Adaptació dels nous noms de camp
  const nousNoms = ['Id Programa', 'Codi Centre', 'Curs Inici', 'Curs Final', 'Certifica', 'Nom Fitxa', 'Url Video', 'Url Web']
  const nomsOk = ['id_programa', 'Codi_centre', 'Curs_ini', 'Curs_fin', 'Certificat', 'Nom_Fitxa', 'URL_Video', 'URL_web']
  data.forEach(reg => {
    // Corregeix noms de camp
    for (let i = 0; i < nousNoms.length; i++)
      reg[nomsOk[i]] = reg[nousNoms[i]] ?? null;

    // Conversió manual
    if (Number(reg.id_programa) === 46)
      reg.id_programa = 39;
    // ----------------
    reg.id_programa = reg.id_programa.toString();
  });

  // Procés principal
  data.forEach(reg => {
    let codiCentre = reg.Codi_centre.trim();
    let comment = null;

    // Check if school id has been re-assigned
    if (instanciesMod[codiCentre]) {
      const mod = instanciesMod[codiCentre];
      codiCentre = mod.becomes;
      // Becomes nothing? then skip!
      if (!codiCentre)
        return;
      comment = mod.comment || '';
    }

    // Build curs from Curs_ini and Curs_fin
    if (reg.Curs_fin.trim() === '')
      reg.Curs_fin = DEFAULT_END_CURS;
    reg.Curs = `${reg.Curs_ini.trim().substring(0, 4)}-${reg.Curs_fin.trim().substring(5, 9)}`;

    const zer = zers.find(z => z.codi === codiCentre);
    let centre = centresValids.find(c => c.id === codiCentre);
    const programa = reg.id_programa;
    let prog = programes.find(p => p.id_programa === programa);
    const result = [];

    if (!centre && !zer)
      warnings.push(`${ch.bold.bgRed.white('ERROR:')} Instància del programa ${programa} assignada a un centre inexistent: ${codiCentre}`);
    else if (!prog)
      warnings.push(`${ch.bold.bgRed.white('ERROR:')} Instància d'un programa inexistent (${programa}) assignada a "${centre ? centre.nom : zer.nom}" (${codiCentre})`);
    else if (!checkCursos(reg.Curs))
      warnings.push(`${ch.bold.bgRed.white('ERROR:')} Instància del programa ${programa} assignada a un curs fora de rang: ${reg.Curs || '???'}`);
    else {
      const instancia = {
        centre: codiCentre,
        programa,
        curs: reg.Curs,
        cert: reg.Certificat === 'S',
      }

      if (comment)
        instancia.comentari = comment;
      if (reg.Titol)
        instancia.titol = reg.Titol;
      if (reg.Nom_Fitxa)
        instancia.fitxa = reg.Nom_Fitxa;
      if (reg.URL_Video)
        instancia.video = reg.URL_Video;
      if (reg.URL_web)
        instancia.url = reg.URL_web;

      // Comprovar ZERs
      if (zer) {
        warnings.push(`${ch.bold.green('INFO:')} La instància del programa ${programa} assignada a la ${zer.nom} (${zer.codi}) per al curs ${instancia.curs} s'expandeix als ${zer.centres.length} centres de la zona.`);
        zer.centres.forEach(cz => {
          const centreZer = centresValids.find(c => c.id === cz.codi);
          if (!centreZer)
            warnings.push(`${ch.bold.bgRed.white('ERROR:')} El centre ${cz.centre} (${cz.codi}) pertanyent a la ${zer.nom} no es troba a la llista de centres vàlids!`);
          else {
            centreZer.logo = centreZer.logo || zer.logo || null;
            centreZer.web = centreZer.web || zer.web || null;
            centreZer.twitter = centreZer.twitter || zer.twitter || null;
            centreZer.mail = centreZer.mail || zer.mail || null;
            const inst = Object.assign({}, instancia);
            inst.centre = cz.codi;
            // Comprovar que la instància no estigui ja registrada
            if (!data.find(d => d.id_programa === inst.programa && d.Codi_centre === inst.centre && d.Curs === inst.curs))
              result.push(inst);
          }
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
          if (!centres.find(c => c.id === ins.centre)) {
            // Sobrescriu l'URL del logo si es troba a la llista de logos coneguts
            if (logos.includes(centre.id))
              centre.logo = `${centre.id}.png`;
            centres.push(centre);
          }
          // Actualitzar nombre de certificats
          if (ins.cert)
            certificats++;
          // Afegir el títol a la informació del centre
          if (ins.titol) {
            centre.info = centre.info || [];
            centre.info.push(ins.titol);
          }
          // Afegir instància al resultat final
          instancies.push(ins);
        }
      })
    }
  });

  // Zona adjustements for 'centres'
  centres.forEach(centre => {

    // Compute centre.text
    const txtArray = [
      centre.id,
      centre.nom,
      centre.cp,
      centre.municipi,
      centre.comarca,
    ];

    if (centre.info)
      txtArray.push(centre.info.join(', '));

    centre.text = txtArray.join(' | ').replace(/([’'\-:]|\n)+/g, ' ').replace(/\s\s+/g, ' ').replace(/\|\s\|+/g, '|');

    // Clear centre.info
    if (centre.info)
      delete centre.info;
  });

  return { instancies, centres, certificats };

}

const joinMultipleComentaris = instancies => {
  const vanParticipar = [];
  instancies.forEach(({ centre, programa, curs, comentari }, i) => {
    if (comentari?.startsWith('Va participar'))
      vanParticipar.push({ i, centre, programa, curs, comentari });
  });
  const centresAmbComentari = [...new Set(vanParticipar.map(({ centre, programa }) => `${centre}|${programa}`))];
  const indexsToDelete = [];
  centresAmbComentari.forEach(c => {
    const [centre, programa] = c.split('|');
    const vp = vanParticipar.filter(v => v.centre === centre && v.programa === programa);
    if (vp.length > 1) {
      const first = instancies[vp[0].i];
      for (let c = 1; c < vp.length; c++) {
        first.comentari = `${first.comentari}, ${vp[c].comentari}`;
        indexsToDelete.push(vp[c].i);
      }
    }
    /*
    const identicSenseComentari = instancies.findIndex(ins => ins.centre === centre && ins.programa === programa && ins.curs === vp[0].curs && !ins.comentari);
    if (identicSenseComentari > 0) {
      console.error(`Eliminant idèntic sense comentari per a: ${centre} - ${programa}`)
      indexsToDelete.push(identicSenseComentari);
    }
    */

  });
  return instancies.filter((i, n) => !indexsToDelete.includes(n));
}

const getDuplicates = instancies =>
  instancies
    .map(({ centre, programa, curs, titol = '', comentari = '' }) => `${centre}|${programa}|${curs}|${titol}|${comentari}`)
    .sort()
    .filter((ii, n, arr) => ii === arr[n + 1]);

const filterDuplicates = instancies => {
  const duplicates = getDuplicates(instancies);
  duplicates.forEach(dup => {
    const [centre, programa, curs] = dup.split('|');
    const index = instancies.findIndex(ins => ins.centre === centre && ins.programa === programa && ins.curs === curs);
    if (index >= 0) {
      instancies.splice(index, 1);
    }
  });
  return instancies;
}

const checkCursos = courseRange => {
  if (cursosDisp.indexOf(courseRange) >= 0)
    // Single course
    return true;

  // Multiple courses
  const iniYear = Number(courseRange.substring(0, 4));
  const endYear = Number(courseRange.substring(5, 9));
  if (isNaN(iniYear) || isNaN(endYear) || endYear <= iniYear)
    return false;
  for (let y = Math.max(cursMin, iniYear); y < Math.min(cursMax, endYear); y++)
    if (cursosDisp.indexOf(`${y}-${y + 1}`) < 0)
      return false;

  return true;
}

async function main() {

  const programes = await readCSVFile(PROGRAMES);

  // Corregeix noms de camp
  const prgNomsNous = ['Id', 'Nom Programa', 'Nom Curt', 'Enllaç', 'Ambits Curriculars', 'Ambits Innovacio', 'Etapes Objectiu', 'Enllaç Fitxa', 'Compromisos'];
  const prgNomsOk = ['id_programa', 'Nom_programa', 'Nom_curt', 'Enllac', 'Ambits_curriculars', 'Ambits_innovacio', 'Etapes_objectiu', 'Enllaç_fitxa', 'Copromisos'];
  programes.forEach(reg => {
    for (let i = 0; i < prgNomsNous.length; i++)
      reg[prgNomsOk[i]] = reg[prgNomsNous[i]] ?? '';
  });

  const centresValids = await readDadesCentres(DADES_CENTRES);
  const { instancies, centres, certificats } = await readMainCSV(MAIN_CSV_FILE, programes, centresValids);

  if (DEBUG) {
    // Display the summary and possible warnings
    console.log(ch.bold.green(`S'han processat ${instancies.length} instancies (${certificats} ja certificades, ${instancies.length - certificats} en curs)`));
    console.log(ch.bold.green(`Hi ha un total de ${centres.length} centres participants`));
    getDuplicates(instancies).forEach(d => {
      const [centre, programa, curs] = d.split('|');
      console.log(`${ch.bold.bgRed.white('ERROR:')} Instància duplicada: ${centre} | prog. ${programa} | curs ${curs}`);
    });
    warnings.forEach(inc => console.log(inc));
  }
  else if (DUMP_INSTANCIES)
    // Send the resulting JSON to the standard output (usually redirected to '../public/data/instancies.json' )
    console.log(JSON.stringify(sortObjectArrayBy(joinMultipleComentaris(filterDuplicates(instancies)), ['programa', 'centre', 'curs']), 1));
  else if (DUMP_CENTRES)
    // Send the resulting JSON to the standard output (usually redirected to '../public/data/centres.json' )
    console.log(JSON.stringify(sortObjectArrayBy(centres, ['sstt', 'municipi', 'nom']), 1));
  else
    console.log(`${ch.bold.red('ERROR:')} Heu d'indicar un d'aquests paràmetres: ${ch.italic('debug')}, ${ch.italic('instancies')}, ${ch.italic('centres')}`);
}

// Main process starts here
try {
  main();
} catch (err) {
  console.log(ch.bold.red(`ERROR: ${err}`));
}
