#!/usr/bin/env node

/**
 * Builds the final `service-worker.js` file, filled with the list of assets to be pre-cached
 * Based on: https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/
 */

// Read environment variables from .env, taking production settings by default
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
require('dotenv-flow').config();

const path = require('path');
const fs = require('fs');
const workboxBuild = require('workbox-build');

const TEMPLATE = process.argv[2] || path.join(path.dirname(process.argv[1]), 'sw-template.js');
const DEST = process.argv[3] || path.join('build', 'service-worker.js');
const BUILD_DIR = process.argv[3] || 'build';

if (!fs.existsSync(TEMPLATE) || !fs.existsSync(path.dirname(DEST)) || !fs.existsSync(BUILD_DIR)) {
  console.log('ERROR: Invalid template or dest file\nUsage: node sw-build.js [template] [dest] [build-dir]');
  process.exit(1);
}

// Default globPattern was: ['**/*.{html,js,css,png}']
// Data files from '/data/*.json' only when JSON_BASE env starts with '/'
// Main logo from '/logos/portada.{png,webp}' only when JSON_BASE env starts with '/'
const GLOB_PATTERNS = [
  '*.{html,css,json}',
  'static/**/*.{js,css,html}',
  'ico/favicon.ico',
  'ico/icon144.png',
  'images/*.{png,jpg,webp,svg}',
];

const PRJLOGOS_BASE = process.env.REACT_APP_PRJLOGOS_BASE || 'https://clic.xtec.cat/pub/innovacio/logos/';
if (PRJLOGOS_BASE.startsWith('/')) {
  GLOB_PATTERNS.push(`${PRJLOGOS_BASE.substr(1)}logos/portada.{png,webp}`);
  console.log(`Caching local main logo from: ${PRJLOGOS_BASE}`);
} else
  console.log(`Main logo will be loaded from: ${PRJLOGOS_BASE}`);

const JSON_BASE = process.env.REACT_APP_JSON_BASE || 'https://clic.xtec.cat/pub/innovacio/data/';
if (JSON_BASE.startsWith('/')) {
  GLOB_PATTERNS.push(`${JSON_BASE.substr(1)}*.json`);
  console.log(`Caching local data files from: ${JSON_BASE}`);
} else
  console.log(`Data files will be loaded from: ${JSON_BASE}`);

const GLOB_IGNORES = [
  'precache-manifest.*.js',
  'service-worker.js'
];

// Generate the service worker, injecting the list of files to be precached
workboxBuild.injectManifest({
  swSrc: TEMPLATE,
  swDest: DEST,
  globDirectory: BUILD_DIR,
  globPatterns: GLOB_PATTERNS,
  globIgnores: GLOB_IGNORES,
})
  .then(({ count, size, warnings }) => {
    console.log(`Created "${DEST}" from template "${TEMPLATE}"`);
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
