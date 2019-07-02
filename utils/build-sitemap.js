#!/usr/bin/env node

/**
 * buildsitemap.js
 * Builds an [XML sitemap](https://www.sitemaps.org/) with all the URLs used by the app
 * 
 * Usage:
 * ./build-sitemap.js [PUBLIC_PATH]
 * 
 */

const fs = require('fs');
const path = require('path');
const xml = require('xml');
const zlib = require('zlib');

const PUBLIC_DIR = (process.argv.length > 2 && path.resolve(process.argv[2])) || path.resolve(process.cwd(), '../public');
const DATA = path.resolve(PUBLIC_DIR, 'data');
const BASE = 'https://innovacio.xtec.gencat.cat';
const ROOT = `${BASE}/#`;
const WORK_DIR = path.resolve(process.cwd(), 'sitemap');
const NOW = new Date();
const TAG_BASE = `tag:innovacio@xtec.cat,${NOW.getFullYear()}`;
const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';

const langs = ['ca'];
const dict = {
  ca: {
    langName: 'català',
    title: 'Mapa de la innovació pedagògica a Catalunya',
    subTitle: 'Programes, projectes i activitats d\'innovació pedagògica reconeguts pel Departament d\'Educació de la Generalitat de Catalunya',
    author: 'Departament d\'Educació de la Generalitat de Catalunya',
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
 * @param {string} lang - Language associated to this atom file
 */
function buildAtom({ dataFile, rootPath, section, atomFile, fieldAtom }, lang) {

  const lastModified = new Date(fs.statSync(dataFile).mtime);
  const fields = require(dataFile);

  // Data with the main feed attributes
  const data = {
    feed: [
      { _attr: { 'xmlns': 'http://www.w3.org/2005/Atom' } },
      { title: `${dict[lang].title} | ${section}` },
      { subtitle: dict[lang].subTitle },
      { link: [{ _attr: { href: `${ROOT}/${rootPath}`, hreflang: lang } }] },
      { link: [{ _attr: { href: `${BASE}/${atomFile}`, rel: 'self', hreflang: lang } }] },
      {
        author: [
          { name: dict[lang].author },
          { uri: 'http://xtec.gencat.cat/ca/innovacio/' },
          { email: 'innovacio@xtec.cat' },
        ]
      },
      { id: `${TAG_BASE}:${rootPath}:${lang}` },
      { updated: lastModified.toISOString() },
    ]
  };

  // Process each field on the dataset and add it to `data` as a `entry` elements
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
 * Writes the Atom data in XML format
 * @param {string} fileName - Path of the file to be generated
 * @param {object} data - Complex object with the Atom data
 */
function writeXMLFile(fileName, data) {
  return fs.writeFileSync(
    fileName,
    `${XML_HEADER}\n${xml(data, { indent: '  ' })}`
  );
}

/**
 * Compress the given file in gzip format
 * @param {string} fileName - The name of the file to compress
 * @param {string} srcDir - The directory where the file is currently located
 * @param {string} outDir - The directory where to write the compressed file
 */
function gzipFile(fileName, srcDir, outDir) {
  const inFileName = path.resolve(srcDir, fileName);
  const outFileName = `${path.resolve(outDir, fileName)}.gz`;
  console.log(`Compressing ${inFileName} into ${outFileName}`);
  const buffer = fs.readFileSync(inFileName);
  return fs.writeFileSync(outFileName, zlib.gzipSync(buffer));
}

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
          { loc: `${BASE}/${file}.gz` },
          { lastmod: NOW.toISOString() },
        ],
      }))
    ],
  });
}


// Main process starts here:

// Check for valid data path
if (!fs.existsSync(path.resolve(DATA, 'programes.json'))) {
  console.log(`ERROR: Invalid data path: "${DATA}"`);
  process.exit(1);
}

// Create working dir if not exists
if (!fs.existsSync(WORK_DIR))
  fs.mkdirSync(WORK_DIR);

const files = [];

// process each language (currently only 'ca')
langs.forEach(lang => {

  // Build the Atom file for `programes`
  let atomFile = `atom_programes_${lang}.xml`;
  let fileName = path.resolve(WORK_DIR, atomFile);
  const programes = buildAtom({
    dataFile: path.resolve(DATA, 'programes.json'),
    rootPath: 'programes',
    section: 'Programes',
    atomFile,
    fieldAtom: f => ({
      title: f.nom,
      href: `${ROOT}/programa/${f.id}`,
      id: `${TAG_BASE}:programes:${lang}:${f.id}`,
      summary: f.descripcio,
    }),
  }, lang);
  writeXMLFile(fileName, programes);
  files.push(atomFile);
  console.log(`File "${fileName}" created`);

  // Build the Atom file for `poligons`
  atomFile = `atom_poligons_${lang}.xml`;
  fileName = path.resolve(WORK_DIR, atomFile);
  const poligons = buildAtom({
    dataFile: path.resolve(DATA, 'poligons.json'),
    rootPath: 'programes',
    section: 'Zones',
    atomFile,
    fieldAtom: f => ({
      title: `Mapa de la innovació pedagògica - ${f.nom}`,
      href: `${ROOT}/zona/${f.key}`,
      id: `${TAG_BASE}:zona:${lang}:${f.key}`,
      summary: `Programes, projectes i pràctiques d'innovació pedagògica amb presència al${f.nom.startsWith('Serveis') ? 's' : ''} ${f.nom}`,
    }),
  }, lang);
  writeXMLFile(fileName, poligons);
  files.push(atomFile);
  console.log(`File "${fileName}" created`);

  // Build the Atom file for `centres`
  atomFile = `atom_centres_${lang}.xml`;
  fileName = path.resolve(WORK_DIR, atomFile);
  const centres = buildAtom({
    dataFile: path.resolve(DATA, 'centres.json'),
    rootPath: 'programes',
    section: 'Centres',
    atomFile,
    fieldAtom: f => ({
      title: `Mapa de la innovació pedagògica - ${f.nom} (${f.municipi})`,
      href: `${ROOT}/centre/${f.id}`,
      id: `${TAG_BASE}:centre:${lang}:${f.id}`,
      summary: `Programes, projectes i pràctiques d'innovació pedagògica al centre "${f.nom}" (${f.municipi})`,
    }),
  }, lang);
  writeXMLFile(fileName, centres);
  files.push(atomFile);
  console.log(`File "${fileName}" created`);
});

// Build main index
const atomFile = 'sitemap.xml';
const fileName = path.resolve(WORK_DIR, atomFile);
writeXMLFile(fileName, buildMainIndex(files));
console.log(`File "${fileName}" created`);

// Compress and save files to `public` dir
gzipFile(atomFile, WORK_DIR, PUBLIC_DIR);
files.forEach(f => gzipFile(f, WORK_DIR, PUBLIC_DIR));

console.log('Done!');

