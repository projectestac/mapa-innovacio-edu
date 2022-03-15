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
import info from '../../package.json';
const HOMEPAGE = info.homepage;
const HASH_TYPE = process.env.REACT_APP_HASH_TYPE;

// Detect if webp format is supported
// See: https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
let webpSupported = false;

// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, isSupported)' will be passed back the detection result (in an asynchronous way!)
function check_webp_feature(feature, callback) {
  var kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  };
  var img = new Image();
  img.onload = function () {
    var result = (img.width > 0) && (img.height > 0);
    callback(feature, result);
  };
  img.onerror = function () {
    callback(feature, false);
  };
  img.src = "data:image/webp;base64," + kTestImages[feature];
}

// Perform check, updating `webpSupported`
check_webp_feature('lossy', function (_feature, isSupported) {
  webpSupported = isSupported;
  console.log(`Webp format ${webpSupported ? '' : 'not'} supported!`);
});

/**
 * Converts the provided `src` param from .jpg or .png to .webp if WebP is supported and src is not an absolute URL
 * @param {String} src 
 */
export function getOptimalSrc(src) {
  // Dont't convert unknown file formats or absolute URLs not pointing to remote image repository
  return (!webpSupported || /^https?:\/\/((?!clic.xtec.cat\/pub\/innovacio).)*$/.test(src) || !(/(.png|.jpg)$/.test(src)))
    ? src
    : src.replace(/(.png|.jpg)$/, '.webp');
}

/**
 * Asynchronous loading of Google fonts
 * Based on: https://github.com/zeit/next.js/issues/512#issuecomment-322026199
 */
export function loadGFont(fontName = 'Roboto', weights = '300,400,500,600') {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css?family=${fontName}:${weights}&display=swap`;
  link.rel = 'stylesheet';

  document.head.appendChild(link);
  const fontLoader = new FontFaceObserver(fontName);
  fontLoader.load()
    .then(() => document.documentElement.classList.add(fontName.replace(' ', '-').toLowerCase()))
    .catch(err => console.error(`ERROR: Unable to load ${fontName} font due to:`, err));
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
 * Utility function for getInfoSpan
 * @param {Object} inf - An object of type `info`
 * @returns {string} - String representing the object without the 'curs' attribute, useful for comparisions
 */
export function infoTag(inf) {
  return JSON.stringify((({ titol, fitxa, video }) => ({ titol, fitxa, video }))(inf))
};

/**
 * Builds a `span` with all the information related to a specific project (titles, courses, cards. videos)
 * @param {Object} info - Array of objects with mandatory fields `titol` and `curs`, and optional fields `video` and `fitxa`
 * @returns {React.Component}
 */
export function getInfoSpan(info, proj, centre) {

  // If all the elements of `info` have the same content, then reduce it at one element
  if (info.length > 0) {
    const infoTags = new Set(info.map(infoTag));
    const groupedInfos = [];
    infoTags.forEach(tag => {
      const infos = info.filter(inf => infoTag(inf) === tag);
      const years = infos.map(inf => Number(inf.curs.substr(0, 4))).sort();
      const n = years.length;
      const consecutive = (years[n - 1] === years[0] + n - 1)
      const curs = consecutive ? `${years[0]}-${years[0] + n}` : infos.map(inf => inf.curs).join(', ');
      groupedInfos.push({ ...infos[0], curs });
    })
    info = groupedInfos;
  }

  const stopProp = ev => ev.stopPropagation();

  return (
    <>
      {info.map(({ titol, fitxa, video, curs, url }, n) => {
        const quot = titol.indexOf('"') >= 0 ? '' : '"';
        return (
          <span key={n}>
            {(fitxa || video)
              ? <><Link to={`/projecte/${proj}|${centre}|${n}`} onClick={stopProp}>{`${quot}${titol}${quot}`}</Link>{` (${curs})${n < info.length - 1 ? ', ' : ''}`}</>
              : url
                ? <><a href={url} target="_blank" rel="noopener noreferrer" title={url} onClick={stopProp}>{`${quot}${titol}${quot}`}</a>{` (${curs})${n < info.length - 1 ? ', ' : ''}`}</>
                : <>{`${quot}${titol}${quot} (${curs})${n < info.length - 1 ? ', ' : ''}`}</>
            }
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
  return (info && info.find(inf => inf.fitxa || inf.video || inf.url)) ? true : false;
}

/**
 * Based on an array of "info" objects (objects with title, course and additional properties of a specific project),
 * builds a simplified array, grouping all projects with same "title" into single "info" objects with course intervals.
 * @param {object[]} infoGroup 
 */
export function groupInfosByTitle(infoGroup) {
  const map = new Map();
  infoGroup.forEach(info => {
    const { titol = '*', curs } = info;
    const year = Number(curs.substr(0, 4));
    let prj = map.get(titol);
    if (!prj)
      map.set(titol, { ...info, minYear: year, maxYear: year });
    else {
      prj.minYear = Math.min(year, prj.minYear);
      prj.maxYear = Math.max(year, prj.maxYear);
      prj.curs = `${prj.minYear}-${prj.maxYear + 1}`
    }
  });
  return [...map.values()];
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

/**
 * Redirect legacy hash routes to browser routes when HASH_TYPE is 'no-hash'
 * @param {boolean+} redirect - When `true`, navigation will be redirected to the equivalent browser route
 * @returns {boolean} - `true` when a hash route has been detected in `no-hash` mode, false otherwise
 */
export function checkHashRoute(redirect = true) {
  if (HASH_TYPE === 'no-hash' && window.location.hash && window.location.hash.match(/^[#/!]*(.*)/).length === 2) {
    if (redirect) {
      const newUrl = `${window.location.origin}${HOMEPAGE}/${window.location.hash.match(/^[#/!]*(.*)/)[1]}`;
      console.log(`INFO: Old hash route detected. Redirecting to: ${newUrl}`);
      window.location.replace(newUrl);
    }
    return true;
  }
  return false;
}


/**
 * Combines town names with conty names, taking in account if town name already includes a sub-expression
 * enclosed by parenthesis 
 * @param {string} municipi - Town name
 * @param {string} comarca - County name
 * @returns {string} - A text literal combining town and county names
 */
export function muniComarca(municipi, comarca = '') {
  municipi = municipi.trim();
  if (municipi.endsWith(')'))
    return `${municipi.substr(0, municipi.length - 1)}, ${comarca})`;
  else
    return `${municipi} (${comarca})`;
}

/**
 * Builds a handler function useful to redirect the navigation to a specific target
 * @param {string} href - The target page
 * @param {object} history - A valid [ReactRouter `history`]{@link https://reactrouter.com/web/api/history} object
 * @returns function
 */
export function jumpTo(href, history) {
  return ev => {
    ev.preventDefault();
    history.push(href);
  }
}
