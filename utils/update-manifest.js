#!/usr/bin/env node

/**
 * Updates `manifest.json` based on the current value of `homepage` in package.json.
 * `homepage` should point to the app root directory, without any leading slash.
 * Leave it as empty string when using the server root directory; this is the default behavior.
 */

const { homepage: HOMEPAGE = '' } = require('../package.json');

if (HOMEPAGE === '') {
  // No changes needed when HOMEPAGE is empty
  console.log('INFO: Application already configured to run at the server root.');
}
else {

  const { join, dirname } = require('path');
  const { existsSync, readFileSync, writeFileSync } = require('fs');

  const TEMPLATE = process.argv[2] || join(__dirname, '../public/manifest.json');
  const DEST = process.argv[3] || join(__dirname, '../build/manifest.json');

  if (!existsSync(TEMPLATE) || !existsSync(dirname(DEST))) {
    console.log('ERROR: Invalid template or dest file.\nUsage: node update-manifest.js [template] [dest]');
    process.exit(1);
  }

  console.log(`INFO: Adding "${HOMEPAGE}" at the beggining of all paths declared in ${TEMPLATE}`);

  const manifest = readFileSync(TEMPLATE, 'utf8');
  writeFileSync(DEST, manifest.replace(/"\//g, `"${HOMEPAGE}/`));

  console.log(`INFO: Manifest file successfully updated`);
}