#!/usr/bin/env node

/**
 * Builds the final `service-worker.js` file, filled with the list of assets to be pre-cached
 * Based on: https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/
 */

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

// Generate the service worker, injecting the list of files to be precached
function buildSW(globPatterns = ['**/*.{html,js,css,png}'], globIgnores = []) {

  // Check if DEST already exists
  // if (fs.existsSync(DEST)) {
    // console.log(`WARNING: file "${DEST}" already exists. Will be overwritten.`);
    // TODO: Remove also the file "build/precache-manifest.*.js" (unused, but not critical)
  // }

  return workboxBuild.injectManifest({
    swSrc: TEMPLATE,
    swDest: DEST,
    globDirectory: BUILD_DIR,
    globPatterns,
    globIgnores,
  })
    .then(({ count, size, warnings }) => {
      console.log(`Created "${DEST}" from template "${TEMPLATE}"`);
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
}

// Launch the main process
buildSW(
  // Included paths
  [
    '*.{html,css,json}',
    'static/**/*.{js,css,html,png}',
    'data/*',
    'ico/favicon.ico',
    'ico/icon144.png',
    'images/*.{png,jpg,svg}',
    'logos/mini/*.png',
    'logos/portada.png',
  ],
  // Ignored paths
  [
    'precache-manifest.*.js',
    'service-worker.js'
  ])
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
