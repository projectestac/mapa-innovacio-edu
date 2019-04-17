// From: https://github.com/zeit/next.js/issues/512#issuecomment-322026199

import FontFaceObserver from 'fontfaceobserver';

/**
 * Asynchronous loading of Google fonts
 */
function loadGFont(fontName = 'Roboto', weights = '300,400,500') {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css?family=${fontName}:${weights}`;
  link.rel = 'stylesheet';

  document.head.appendChild(link);
  const fontLoader = new FontFaceObserver(fontName);
  fontLoader.load()
    .then(() => document.documentElement.classList.add(fontName.toLowerCase()))
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
 * returns the addition of all values in an object of type `{key: value, key: value, ...}` where all values are numbers.
 * @param {object} obj 
 */
function sumAll(obj) {
  return Object.values(obj).reduce((acc, v) => acc + v, 0);
}

export default { loadGFont, handleFetchErrors, sumAll };
