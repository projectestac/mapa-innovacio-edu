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

export default { loadGFont, handleFetchErrors };
