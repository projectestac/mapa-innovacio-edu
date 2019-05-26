#!/usr/bin/env node

// Usage:
//   ./conv-instancies.js instancies > ../public/data/instancies.json
//   ./conv-instancies.js centres > ../public/data/centres.json
// Debug: ./conv-instancies.js debug

const { sortObjectArrayBy } = require('./utils');
const { createReadStream } = require('fs');
const csv = require('csv');
const ch = require('chalk');

// Saltar-se els "centres" que no imparteixen estudis o estan donats de baixa, i sumaritzar dades
const centresValids = require('./centres-total.json')
  .filter(c => c.tipus !== 'BAIXA' && c.estudis && c.estudis.length > 0)
  .map(c => ({
    id: c.id,
    nom: c.nom,
    municipi: c.municipi,
    comarca: c.comarca,
    lat: c.lat,
    lng: c.lng,
    estudis: c.estudis,
    adreca: c.adreca,
    web: c.nodes || c.web || c.web_propi || '', // Just one web!
    logo: c.logo,
    tel: c.tel,
    mail: c.mail,
    twitter: c.twitter,
    sstt: c.sstt,
    se: c.se,
    pb: c['public'], // Reserved word
  }));

const programes = require('../public/data/programes.json');
const poligons = require('../public/data/poligons.json');
const zers = require('./zer.json');
const estudis = require('../public/data/estudis.json');
const logos = require('./logos.json');

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
            // Conversió manual
            if (Number(reg.id_programa) === 46)
              reg.id_programa = 39;
            // ----------------
            reg.id_programa = reg.id_programa.toString();

            const codiCentre = reg.Codi_centre;
            let centre = centresValids.find(c => c.id === codiCentre);
            const programa = reg.id_programa;
            let prog = programes.find(p => p.id === programa);
            const result = [];

            if (!centre)
              warnings.push(`${ch.bold.bgRed.white('ERROR:')} Instància del programa ${programa} assignada a un centre inexistent: ${codiCentre}`);
            else if (!prog)
              warnings.push(`${ch.bold.bgRed.white('ERROR:')} Instància d'un programa inexistent (${programa}) assignada al centre "${centre.nom}" (${codiCentre})`);
            else if (!estudis.cursos.includes(reg.Curs))
              warnings.push(`${ch.bold.bgRed.white('ERROR:')} Instància del programa ${programa} assignada a un curs fora de rang: ${reg.Curs || '???'}`);
            else {
              const instancia = {
                centre: codiCentre,
                programa,
                curs: reg.Curs,
                cert: reg.Certificat === 'S',
              }

              if (reg.Titol)
                instancia.titol = reg.Titol;
              if (reg.Nom_Fitxa)
                instancia.fitxa = reg.Nom_Fitxa;
              if (reg.URL_Video)
                instancia.video = reg.URL_Video;

              // Comprovar ZERs
              const zer = zers.find(z => z.codi === codiCentre);
              if (zer) {
                warnings.push(`${ch.bold.green('INFO:')} La instància del programa ${programa} assignada a la ZER ${centre.nom} (${centre.id}) per al curs ${instancia.curs} s'expandeix als ${zer.centres.length} centres de la zona.`);
                zer.centres.forEach(cz => {
                  const centreZer = centresValids.find(c => c.id === cz.codi);
                  if (!centreZer)
                    warnings.push(`${ch.bold.bgRed.white('ERROR:')} El centre ${cz.centre} (${cz.codi}) pertanyent a la ZER ${zer.nom} no es troba a la llista de centres vàlids!`);
                  else {
                    if (!centreZer.logo && centre.logo)
                      centreZer.logo = `${centre.id}.png`;
                    centreZer.web = centreZer.web || centre.web || null;
                    centreZer.twitter = centreZer.twitter || centre.twitter || null;
                    centreZer.mail = centreZer.mail || centre.mail || null;
                    const inst = Object.assign({}, instancia);
                    inst.centre = cz.codi;
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
                  // Afegir instància al resultat final
                  instancies.push(ins);
                }
              })
            }
          });

          // Change the original SE code of centres, fom short name to "codi"
          centres.forEach(c => {
            const se = poligons.find(p => p.nomcurt === c.se);
            if (se)
              c.se = se.key;
            else
              warnings.push(`${ch.bold.bgRed.white('ERROR:')} El centre "${c.nom}" (${c.id}) té assignat un SE desconegut: ${c.se}`);
          });

          resolve({ instancies, centres, certificats });
        }
      }
    ));
  });
};

const getDuplicates = instancies => instancies.map(({ centre, programa, curs }) => `${centre}|${programa}|${curs}`).sort().filter((ii, n, arr) => ii === arr[n + 1]);

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

// Main process start here
readCSV(CSV_FILE)
  .then(({ instancies, centres, certificats }) => {
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
      console.log(JSON.stringify(sortObjectArrayBy(filterDuplicates(instancies), ['programa', 'centre', 'curs']), 1));
    else if (DUMP_CENTRES)
      // Send the resulting JSON to the standard output (usually redirected to '../public/data/centres.json' )
      console.log(JSON.stringify(sortObjectArrayBy(centres, ['sstt', 'municipi', 'nom']), 1));
    else
      console.log(`${ch.bold.red('ERROR:')} Heu d'indicar un d'aquests paràmetres: ${ch.italic('debug')}, ${ch.italic('instancies')}, ${ch.italic('centres')}`);
  })
  .catch(err => {
    console.log(ch.bold.red(`ERROR: ${err}`));
  });
