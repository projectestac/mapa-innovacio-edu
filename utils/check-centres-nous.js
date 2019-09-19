#!/usr/bin/env node

// Usage:
// ./check-centres-nous.js

const csv = require('csv');
const { createReadStream } = require('fs');


const centres = require('./centres-total.json');

const CSV_FILE = 'centres-nous.csv';


/**
 * Read the main CSV file
 * @param {string} file - The name of the file to read
 * @returns {Promise} - A Promise resolving with a list of `program` objects
 */
const readCSV = (file) => {

  const centresNous = [];

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
            centresNous.push({
              id: reg.Codi,
              nom: reg.Nom,
              municipi: reg.Municipi,
              comarca: reg.Comarca,
              lat: Number(reg.Latitud),
              lng: Number(reg.Longitud),
              // Continuar...
            });
          });
          resolve(centresNous);
        }
      }
    ));
  });
};


// Main process starts here
readCSV(CSV_FILE)
  .then(centresNous => {
    console.log(JSON.stringify(centresNous, 1));
  })
  .catch(err => console.log(`ERROR: ${err}`));


