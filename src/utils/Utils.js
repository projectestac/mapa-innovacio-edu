/*!
 *  File    : utils/Utils.js
 *  Created : 10/04/2019
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  Map of pedagogical innovation in Catalonia 
 *  https://innovacio.xtec.gencat.cat
 *
 *  @source https://github.com/projectestac/mapa-innovacio-edu
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2019 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

import React from 'react';
import { Link } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import { Parser } from 'json2csv';

/**
 * Asynchronous loading of Google fonts
 * Based on: https://github.com/zeit/next.js/issues/512#issuecomment-322026199
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
export function getInfoSpan(info, proj, centre) {
  return (
    <>
      {info.map(({ titol, fitxa, video, curs }, n) => {
        const quot = titol.indexOf('"') >= 0 ? '' : '"';
        return (
          <span key={n}>
            {(fitxa || video) ?
              <span><Link to={`/projecte/${proj}|${centre}|${n}`}>{`${quot}${titol}${quot}`}</Link>{` (${curs})`}</span> :
              <span>{`${quot}${titol}${quot} (${curs})`}</span>
            }
            {n < info.length - 1 && <span>, </span>}
          </span>
        );
      })}
    </>
  );
}

/**
 * Checks if at least one of the elements of a "info" group has `fitxa` or `video`
 */
export function hasExtraInfo(info) {
  return (info && info.find(inf => inf.fitxa || inf.video)) ? true : false;
}

/**
 * Options passed into YouTube embed URLs
 */
const YOUTUBE_OPTIONS = Object.entries({
  autoplay: 0, // Don't automatically start the video
  cc_lang_pref: 'ca', // Preferred language for captions
  hl: 'ca', // Preferred language for interface
  fs: 1, // Allow full screen
  modestbranding: 1, // Reduced branding
  rel: 0, // related videos (see https://developers.google.com/youtube/player_parameters#release_notes_08_23_2018)
}).map((e) => `${e[0]}=${e[1]}`).join('&');

/**
 * Generates an "iframe" with the provided url
 * When the url matches with a YouTube video player, an "embed" code is used instead.
 */
export function VideoIframe({ url, title = '', width = 800, height = 600, className }) {

  let src = url || '';

  // Check for YouTube
  // See: https://stackoverflow.com/questions/18336873/regex-to-extract-youtube-video-id
  let matches = /(youtu\.be\/|[?&]v=)([^&]+)/.exec(url);
  if (matches && matches.length === 3) {
    const youTubeId = matches[2];
    src = `https://www.youtube.com/embed/${youTubeId}?${YOUTUBE_OPTIONS}`;
  }
  else {
    // Check for Vimeo
    matches = /vimeo\.com\/([\d]+)$/.exec(url);
    if (matches && matches.length === 2) {
      const vimeoId = matches[1];
      src = `https://player.vimeo.com/video/${vimeoId}`;
    }
  }

  return (
    <iframe
      className={className}
      title={title}
      src={src}
      width={width}
      height={height}
      type="text/html"
      allowFullScreen
    />
  );
}

/**
 * Generates a [json2csv](https://github.com/zemirco/json2csv) object
 * containing the data of all items and returns
 * a string with the full CSV file content.
 * @param {Object} data - The data object to be exported
 * @param {Object[]} fields - An array of objects with two string attributes:
 *                            * `name` (the field name to be included in the CSV file)
 *                            * `id` (the attribute name in `data`)
 * @returns {String}
 */
export function csvExport(data, fields) {
  const parser = new Parser({ fields: fields.map(f => f.name) });
  return parser.parse(data.map(item => {
    return fields.reduce((result, field) => {
      result[field.name] = item[field.id] || '';
      return result;
    }, {});
  }));
}

/**
 * Generates a CSV file with the provided data
 * @param {string} fileName - The proposed file name
 * @param {Object} data - The data object to be exported
 * @param {Object[]} fields - An array of objects with two string attributes:
 *                            * `name` (the field name to be included in the CSV file)
 *                            * `id` (the attribute name in `data`)
 */
export function csvExportToFile(fileName, data, fields) {
  const blob = new Blob(['\uFEFF' + csvExport(data, fields)], { type: 'text/csv;charset=utf-16;' });
  if (navigator.msSaveBlob) // IE 10+
    navigator.msSaveBlob(blob, fileName);
  else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

