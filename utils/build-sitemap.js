#!/usr/bin/env node

/**
 * buildsitemap.js
 * Builds an [XML sitemap](https://www.sitemaps.org/) with all the URLs used in this app
 * 
 * Usage:
 * ./build-sitemap.js [SRC_DIR] [DEST_DIR]
 * 
 * SRC_DIR defaults to `../public/data` and DEST_DIR to `../public`
 */

// Read environment variables from .env
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const xml = require('xml');
const zlib = require('zlib');

const SRC_DIR = (process.argv.length > 2 && path.resolve(process.argv[2])) || path.resolve(__dirname, '../public/data');
const DEST_DIR = (process.argv.length > 3 && path.resolve(process.argv[3])) || path.resolve(__dirname, '../build');
const BASE = process.env.REACT_APP_BASE_URL || 'https://innovacio.xtec.gencat.cat/';
const HASH_TYPE = process.env.REACT_APP_HASH_TYPE || 'no-hash';
const HASH = HASH_TYPE === 'no-hash' ? '' : HASH_TYPE === 'hashbang' ? '#!/' : HASH_TYPE === 'slash' ? '#/' : '#';
const ROOT = `${BASE}${HASH}`;
const TEMP_DIR = path.resolve(DEST_DIR, '.tmp');
const NOW = new Date();
const TAG_BASE = `tag:innovacio@xtec.cat,${NOW.getFullYear()}`;

const LANGS = ['ca'];
const DICT = {
  ca: {
    langName: 'català',
    title: 'Mapa de la innovació pedagògica de Catalunya',
    subTitle: 'Programes, projectes i activitats d\'innovació pedagògica reconeguts pel Departament d\'Educació de la Generalitat de Catalunya',
    titleMin: 'Mapa de la innovació pedagògica',
    author: 'Departament d\'Educació de la Generalitat de Catalunya',
    descCentres: 'Programes, projectes i pràctiques d\'innovació pedagògica',
    descPoly: 'Programes, projectes i pràctiques d\'innovació pedagògica amb presència al',
    descPolys: 'Programes, projectes i pràctiques d\'innovació pedagògica amb presència als',
  },
};

/**
 * Builds an object ready to be encapsulated into an Atom XML file with
 * the URLs related to a specific dataset 
 * @param {object} params - Complex object containing the followuing fields:
 *                            - dataFile: Path to the JSON file where the dataset is stored 
 *                            - rootPath: Relative path to the root page of this dataset
 *                            - section: The section name, to be used in the main title
 *                            - atomFile: Name of the Atom file finally generated
 *                            - fieldAtom: Function invoked for each field on the dataset
 *                              to obtain its `title`, `href`, `id` and `summary`
 *                            - includeRoot: When `true`, an entry with the root page will be also included
 * @param {string} lang - Language associated to this atom file
 */
function buildAtom({ dataFile, rootPath, section, atomFile, fieldAtom, includeRoot = false }, lang) {

  const lastModified = new Date(fs.statSync(dataFile).mtime);
  const fields = require(dataFile);

  // Data with the main feed attributes
  const data = {
    feed: [
      { _attr: { 'xmlns': 'http://www.w3.org/2005/Atom' } },
      { title: `${DICT[lang].title} | ${section}` },
      { subtitle: DICT[lang].subTitle },
      { link: [{ _attr: { href: `${ROOT}${rootPath}`, hreflang: lang } }] },
      { link: [{ _attr: { href: `${BASE}${atomFile}`, rel: 'self', hreflang: lang } }] },
      {
        author: [
          { name: DICT[lang].author },
          { uri: 'http://xtec.gencat.cat/ca/innovacio/' },
          { email: 'innovacio@xtec.cat' },
        ]
      },
      { id: `${TAG_BASE}:${rootPath}:${lang}` },
      { updated: lastModified.toISOString() },
    ]
  };

  if (includeRoot) {
    data.feed.push({
      entry: [
        { title: `${DICT[lang].title} | ${section}` },
        { link: [{ _attr: { href: `${ROOT}${rootPath}`, rel: 'alternate', hreflang: lang } }] },
        { id: `${TAG_BASE}:${rootPath}:${lang}` },
        { updated: lastModified.toISOString() },
        { summary: DICT[lang].subTitle },
      ],
    });
  }

  // Process each field on the dataset and add them to `data` as `entry` elements
  fields.forEach(f => {
    const { title, href, id, summary } = fieldAtom(f);
    const entry = [
      { title },
      { link: [{ _attr: { href, rel: 'alternate', hreflang: lang } }] },
      { id },
      { updated: lastModified.toISOString() },
      { summary },
    ];
    data.feed.push({ entry });
  });

  return data;
}

/**
 * Generates an XML file based on a data object with the format expected by [node-xml](https://github.com/dylang/node-xml)
 * @param {string} fileName - Path and name of the file to be generated
 * @param {object} data - The node-xml data object
 */
function writeXMLFile(fileName, data, log = false) {
  fs.writeFileSync(
    fileName,
    `<?xml version="1.0" encoding="UTF-8"?>\n${xml(data, { indent: '  ' })}`
  );
  if (log)
    console.log(`INFO: File "${fileName}" has been created`);
}

/**
 * Compresses the given file in gzip format
 * @param {string} fileName - The name of the file to compress
 * @param {string} srcDir - The directory where the file is currently located
 * @param {string} outDir - The directory where to write the compressed file
 */
function gzipFile(fileName, srcDir, outDir, log = false) {
  const inFileName = path.resolve(srcDir, fileName);
  const outFileName = `${path.resolve(outDir, fileName)}.gz`;
  const buffer = fs.readFileSync(inFileName);
  fs.writeFileSync(outFileName, zlib.gzipSync(buffer));
  if (log)
    console.log(`INFO: File "${inFileName}" has been compressed to "${outFileName}"`);
}

/**
 * Builds the main sitemap.xml file
 * @param {string[]} files - List of atom xml files to be included in sitemap
 */
function buildMainIndex(files) {
  return ({
    sitemapindex: [
      {
        _attr: {
          'xmlns': 'http://www.google.com/schemas/sitemap/0.84',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation': 'http://www.google.com/schemas/sitemap/0.84 http://www.google.com/schemas/sitemap/0.84/siteindex.xsd'
        },
      },
      ...files.map(file => ({
        sitemap: [
          { loc: `${BASE}${file}.gz` },
          { lastmod: NOW.toISOString() },
        ],
      }))
    ],
  });
}


// Main process starts here:

// Check paths
[
  SRC_DIR,
  DEST_DIR,
  path.resolve(SRC_DIR, 'programes.json'),
  path.resolve(SRC_DIR, 'centres.json'),
  path.resolve(SRC_DIR, 'poligons.json')
].forEach(f => {
  if (!fs.existsSync(f)) {
    console.error(`ERROR: "${f}" does not exist!`);
    process.exit(1);
  }
});

// Create the temp dir if not exists
if (!fs.existsSync(TEMP_DIR))
  fs.mkdirSync(TEMP_DIR);

const files = [];

// Process each language (currently just 'ca')
LANGS.forEach(lang => {

  // Build the Atom file for `programes`
  let atomFile = `atom_programes_${lang}.xml`;
  let fileName = path.resolve(TEMP_DIR, atomFile);
  const programes = buildAtom({
    dataFile: path.resolve(SRC_DIR, 'programes.json'),
    rootPath: 'programes',
    section: 'Programes',
    atomFile,
    fieldAtom: f => ({
      title: `${DICT[lang].titleMin} - ${f.nom}`,
      href: `${ROOT}programa/${f.id}`,
      id: `${TAG_BASE}:programes:${lang}:${f.id}`,
      summary: f.descripcio,
    }),
    includeRoot: true,
  }, lang);
  writeXMLFile(fileName, programes);
  files.push(atomFile);

  // Build the Atom file for `poligons`
  atomFile = `atom_poligons_${lang}.xml`;
  fileName = path.resolve(TEMP_DIR, atomFile);
  const poligons = buildAtom({
    dataFile: path.resolve(SRC_DIR, 'poligons.json'),
    rootPath: 'programes',
    section: 'Zones',
    atomFile,
    fieldAtom: f => ({
      title: `${DICT[lang].titleMin} - ${f.nom}`,
      href: `${ROOT}zona/${f.key}`,
      id: `${TAG_BASE}:zona:${lang}:${f.key}`,
      summary: `${DICT[lang][`descPoly${f.nom.startsWith('Serveis') ? 's' : ''}`]} ${f.nom}`,
    }),
    includeRoot: false,
  }, lang);
  writeXMLFile(fileName, poligons);
  files.push(atomFile);

  // Build the Atom file for `centres`
  atomFile = `atom_centres_${lang}.xml`;
  fileName = path.resolve(TEMP_DIR, atomFile);
  const centres = buildAtom({
    dataFile: path.resolve(SRC_DIR, 'centres.json'),
    rootPath: 'programes',
    section: 'Centres',
    atomFile,
    fieldAtom: f => ({
      title: `${DICT[lang].titleMin} - ${f.nom} (${f.municipi})`,
      href: `${ROOT}centre/${f.id}`,
      id: `${TAG_BASE}:centre:${lang}:${f.id}`,
      summary: `${DICT[lang].descCentres} - ${f.nom} (${f.municipi})`,
    }),
    includeRoot: false,
  }, lang);
  writeXMLFile(fileName, centres);
  files.push(atomFile);
});

// Build the main index
const atomFile = 'sitemap.xml';
const fileName = path.resolve(TEMP_DIR, atomFile);
writeXMLFile(fileName, buildMainIndex(files));

// Compress and save all files into `public`
gzipFile(atomFile, TEMP_DIR, DEST_DIR);
files.forEach(f => gzipFile(f, TEMP_DIR, DEST_DIR));

// Remove uncompressed files and temp dir
fs.unlinkSync(path.join(TEMP_DIR, atomFile));
files.forEach(f => fs.unlinkSync(path.join(TEMP_DIR, f)));
fs.rmdirSync(TEMP_DIR);

// Create `robots.txt`
fs.writeFileSync(path.resolve(DEST_DIR, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}sitemap.xml.gz`);

console.log(`INFO: Sitemap files successfully created in ${DEST_DIR}`);

