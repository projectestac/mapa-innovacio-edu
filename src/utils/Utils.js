// From: https://github.com/zeit/next.js/issues/512#issuecomment-322026199

import FontFaceObserver from 'fontfaceobserver';

/**
 * Asynchronous loading of Google fonts
 */
function loadGFont(fontName = 'Roboto', weights = '300,400,500,600') {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css?family=${fontName}:${weights}`;
  link.rel = 'stylesheet';

  document.head.appendChild(link);
  const fontLoader = new FontFaceObserver(fontName);
  fontLoader.load()
    .then(() => document.documentElement.classList.add(fontName.replace(' ', '-').toLowerCase()))
    .catch(err => console.error(`Unable to load ${fontName} font due to: ${err}`));
}

/**
 * Handle errors on fetch calls
 * @param {Object} response 
 */
function handleFetchErrors(response) {
  if (!response.ok)
    throw Error(response.statusText || 'Error desconegut');
  return response;
}

/**
 * Return the addition of all values in an object of type `{key: value, key: value, ...}` where all values are numbers.
 * @param {object} obj 
 */
function sumAll(obj) {
  return Object.values(obj).reduce((acc, v) => acc + v, 0);
}

/**
 * Used in objects of type {curs1: [prog1, prog2, prog3, ...], curs2: [prog1, ...], ...}
 * Returns a single array of type: [{id: prog1.id, nom: prog1.nom, cursos: [curs1, curs2, ...]}, {id: prog2.id, nom: prog2.nom, cursos: [curs1, ...]}, ...]
 * @param {object} obj - Object structured as in the description
 * @returns {object[]} - The resulting array of objects of type 'program', with a 'cursos' field.
 */
function plainArray(obj) {
  const container = {};
  Object.keys(obj).forEach(curs => {
    obj[curs].forEach(prog => {
      if (!container[prog.id]) {
        container[prog.id] = {
          id: prog.id,
          nom: prog.nom,
          simbol: prog.simbol,
          cursos: [],
        };
      }
      container[prog.id].cursos.push(curs);
    });
  });
  return Object.values(container).sort((c1, c2) => c1.nom.localeCompare(c2.nom));
}

/**
 * Converts an expression of type '2015-2016' to '2015-16'
 */
function cursCurt(curs) {
  return curs.length === 9 ? `${curs.substr(0, 5)}${curs.substr(7, 2)}` : curs;
}


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

export default { loadGFont, handleFetchErrors, sumAll, plainArray, sortObjectArrayBy, cursCurt };
