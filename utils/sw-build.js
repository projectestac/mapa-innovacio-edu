/**
 * Builds the final `sw.js` file, filled with the list of assets to be pre-cached
 * Based on: https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/
 */

 const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'utils/sw-template.js', // this is your sw template file
    swDest: 'build/sw.js', // this will be created in the build step
    globDirectory: 'build',
    globPatterns: [
      '*.{html,css,json}',
      'static/**/*.{js,css,html,png}',
      'data/*',
      'ico/favicon.ico',
      'ico/icon144.png',
      'images/*.{png,jpg,svg}',
      'logos/mini/*.png',
      'logos/portada.png',
    ]
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
}

// Launch main process
buildSW();
