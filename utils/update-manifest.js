#!/usr/bin/env node

/**
 * Updates `manifest.json` based on the current value of `homepage` in package.json
 * `homepage` should point to the app root directory, without any leading slash.
 * Leave it as empty string when using the server root directory; this is the default behavior.
 */

const { join, dirname } = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');

const TEMPLATE = process.argv[2] || join('public', 'manifest.json');
const DEST = process.argv[3] || join('build', 'manifest.json');
const { homepage: HOMEPAGE = '' } = require('../package.json');

if (!existsSync(TEMPLATE) || !existsSync(dirname(DEST))) {
  console.log('ERROR: Invalid template or dest file\nUsage: node update-manifest.js [template] [dest]');
  process.exit(1);
}

console.log(`Replacing all occurrences of "%PUBLIC_URL%" with "${HOMEPAGE}" in ${DEST}`);

const manifest = readFileSync(TEMPLATE, 'utf8');
writeFileSync(DEST, manifest.replace(/%PUBLIC_URL%/g, HOMEPAGE));

console.log(`Manifest file successfully updated!`);
