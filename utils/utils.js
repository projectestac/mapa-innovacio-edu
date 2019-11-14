// Miscellaneous utilities

const { createReadStream } = require('fs');
const csv = require('csv');

/**
 * Sort an array of objects having the same string property
 * @param {Array} array - The array to be sorted
 * @param {string|string[]]} fields - The name or names of the attributes to be compared between array elements
 * @returns {Array} - The sorted array
 */
function sortObjectArrayBy(array, fields) {
  return typeof fields === 'string'
    ? array.sort((a, b) => a[fields].localeCompare(b[fields]))
    : array.sort((a, b) => fields.map(f => a[f]).join(' ').localeCompare(fields.map(f => b[f]).join(' ')));
}

/**
 * Read and parse a CSV file
 * @param {string} file - The name of the file to read
 * @returns {Promise} - A Promise resolving with the resulting array of objects
 */
function readCSVFile(file) {
  return new Promise((resolve, reject) => {
    createReadStream(`${__dirname}/${file}`, { encoding: 'utf8' }).pipe(csv.parse(
      {
        delimiter: ',',
        columns: true,
      },
      (err, data) => {
        if (err)
          reject(err);
        else
          resolve(data);
      }
    ));
  });
}

async function readDadesCentres(file) {
  const centres = await readCSVFile(file);
  const result = centres
    .filter(c => c.tipus !== 'BAIXA')
    .map(c => ({
      id: c.id,
      nom: c.nom,
      municipi: c.municipi,
      comarca: c.comarca,
      lat: c.lat.toString().replace(',', '.'),
      lng: c.lng.toString().replace(',', '.'),
      estudis: c.estudis.split('|'),
      adreca: c.adreca,
      cp: c.cp,
      web: c.web || '', // Just one web!
      logo: c.logo,
      tel: c.tel,
      mail: c.mail,
      twitter: c.twitter,
      sstt: c.sstt,
      se: c.se,
      pb: c['public'] === 'TRUE', // Reserved word
    }));

  // Manual corrections
  const deia = result.find(c => c.id === '08044156');
  if (deia) {
    deia.lat = '41.444515';
    deia.lng = '2.167170';
  }

  return result;
}


module.exports = { sortObjectArrayBy, readCSVFile, readDadesCentres };
