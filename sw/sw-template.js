/* eslint-disable no-restricted-globals */
/* global importScripts */

if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
  );

  // Catch possible "SKIP_WAITING" events
  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  // Clean old caches created with `sw-precache`
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames
              .filter(cacheName => /^(sw-precache-v3|\$\$\$toolbox-cache\$\$\$)+/.test(cacheName))
              .map(cacheName => {
                console.log(`SW - Deleting old cache "${cacheName}"`);
                return caches.delete(cacheName);
              })
          );
        })
    );
  });

  /* global workbox */
  if (workbox) {

    // Set debug mode based on search params when registering, like: `sw.js?debug`
    // From: https://stackoverflow.com/questions/50795315/workbox-set-debug-mode-dynamically
    const url = new URL(location.href);
    const debug = url.searchParams.has('debug');
    workbox.setConfig({ debug });

    // Set a specific prefix for this SW, used in cache names
    workbox.core.setCacheNameDetails({
      prefix: 'mapa',
    });

    // use Google Analytics also when off-line
    // DISABLED because of errors when loading "analytics.js"
    // workbox.googleAnalytics.initialize();

    // Take control immediatly (not needed)
    // workbox.core.clientsClaim();

    // injection point for manifest files
    workbox.precaching.precacheAndRoute([], {});

    // custom cache rules
    workbox.routing.registerNavigationRoute(
      // was '/index.html',
      workbox.precaching.getCacheKeyForURL('./index.html'),
      {
        blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
      }
    );

    // Cache for images
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    // Cache for school logos
    workbox.routing.registerRoute(
      /^https:\/\/clic\.xtec\.cat\/pub\/logos\//,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'school-logos',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 500,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      }),
    );

    // Cache for map tiles
    workbox.routing.registerRoute(
      /^https:\/\/(?:maps\.wikimedia\.org\/osm-intl|api\.tiles\.mapbox\.com|[a-z]+\.tile\.openstreetmap\.org)\//,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'maps',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxEntries: 2000,
            maxAgeSeconds: 90 * 24 * 60 * 60, // 90 Days
          }),
        ],
      }),
    );

    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.googleapis\.com/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
      })
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
      })
    );

  } else
    console.log('Workbox could not be loaded. No offline support!');

}