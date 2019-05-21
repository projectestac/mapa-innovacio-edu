// From: https://github.com/zeit/next.js/issues/512#issuecomment-322026199

import React from 'react';
import FontFaceObserver from 'fontfaceobserver';
import IconButton from '@material-ui/core/IconButton';
import PdfIcon from 'mdi-material-ui/FilePdf';
import VideoIcon from 'mdi-material-ui/FileVideo';

const FITXA_PROJ_BASE = process.env.REACT_APP_FITXA_PROJ_BASE || 'https://clic.xtec.cat/pub/projectes/';

/**
 * Asynchronous loading of Google fonts
 */
export function loadGFont(fontName = 'Roboto', weights = '300,400,500,600') {
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
export function handleFetchErrors(response) {
  if (!response.ok)
    throw Error(response.statusText || 'Error desconegut');
  return response;
}

/**
 * Return the addition of all values in an object of type `{key: value, key: value, ...}` where all values are numbers.
 * @param {object} obj 
 */
export function sumAll(obj) {
  return Object.values(obj).reduce((acc, v) => acc + v, 0);
}

/**
 * Used in objects of type {curs1: [prog1, prog2, prog3, ...], curs2: [prog1, ...], ...}
 * Returns a single array of type: [{id: prog1.id, nom: prog1.nom, cursos: [curs1, curs2, ...]}, {id: prog2.id, nom: prog2.nom, cursos: [curs1, ...]}, ...]
 * @param {object} obj - Object structured as in the description
 * @returns {object[]} - The resulting array of objects of type 'program', with a 'cursos' field.
 */
export function plainArray(obj) {
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
export function cursCurt(curs) {
  return curs.length === 9 ? `${curs.substr(0, 5)}${curs.substr(7, 2)}` : curs;
}

/**
 * Builds a `span` with all the information related to a specific project (titles, courses, cards. videos)
 * @param {Object} info - Array of objects with mandatory fields `titol` and `curs`, and optional fields `video` and `fitxa`
 * @returns {React.Component}
 */
export function getInfoSpan(info) {
  return (
    <>
      {info.map(({ titol, fitxa, video, curs }, n) => {
        return (
          <span key={n}>
            <span>{`"${titol}" (${curs})`}</span>
            {fitxa &&
              <IconButton
                className="small-media-element"
                aria-label="Fitxa del projecte"
                title="Fitxa del projecte"
                href={`${/^http.?:\/\//.test(fitxa) ? '' : FITXA_PROJ_BASE}${fitxa}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PdfIcon />
              </IconButton>
            }
            {video &&
              <IconButton
                className="small-media-element"
                aria-label="Video sobre aquest projecte"
                title="Vídeo sobre aquest projecte"
                href={`${/^http.?:\/\//.test(video) ? '' : FITXA_PROJ_BASE}${video}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <VideoIcon />
              </IconButton>
            }
            {n < info.length - 1 && <span>, </span>}
          </span>
        );
      })}
    </>
  );
}

