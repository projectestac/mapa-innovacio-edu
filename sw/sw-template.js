/* eslint-disable no-restricted-globals */
/* global importScripts */

if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

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

    // Import statements
    const {
      core: { setCacheNameDetails, clientsClaim },
      precaching: { precacheAndRoute, createHandlerBoundToURL },
      routing: { NavigationRoute, registerRoute },
      strategies: { StaleWhileRevalidate, CacheFirst },
      expiration: { ExpirationPlugin },
      cacheableResponse: { CacheableResponsePlugin },
      recipes: { googleFontsCache },
    } = workbox;

    // Set a specific prefix for this SW, used in cache names
    setCacheNameDetails({
      prefix: 'mapa',
    });

    // Take control immediatly
    clientsClaim();

    // Injection point for manifest files
    precacheAndRoute(self.__WB_MANIFEST);

    // custom cache rules

    const handler = createHandlerBoundToURL('./index.html');
    const navigationRoute = new NavigationRoute(handler, {
      denylist: [/^\/_/, /\/[^/]+\.[^/]+$/],
    });
    registerRoute(navigationRoute);

    // Cache for app dynamic data
    registerRoute(
      /^https:\/\/clic\.xtec\.cat\/pub\/innovacio\//,
      new StaleWhileRevalidate({
        cacheName: 'app-data',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 Days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    );

    // Cache for school logos
    registerRoute(
      /^https:\/\/(?:clic\.xtec\.cat\/pub\/logos\/|serveiseducatius\.xtec\.cat\/).+\.(?:jpg|gif|png|svg|jpeg|webp|avif)$/,
      new CacheFirst({
        cacheName: 'school-logos',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    );

    // Cache for map tiles
    registerRoute(
      /^https?:\/\/(?:\w+\.basemaps\.cartocdn\.com|maps\.wikimedia\.org\/osm-intl|api\.tiles\.mapbox\.com|\w+\.tile\.openstreetmap\.org|mapcache\.icc\.cat)\//,
      new CacheFirst({
        cacheName: 'maps',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [200],
          }),
          new ExpirationPlugin({
            maxEntries: 1000,
            maxAgeSeconds: 60 * 60 * 24 * 90, // 90 Days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    );


    // Use the new recipe for Google Fonts in WorkBox 6, instead of the full pattern
    googleFontsCache();

    // Cache for big logos and miscellaneous icons (small logos are always pre-cached)
    registerRoute(
      /\/(?:logos|ico)\/[/\w]*\.(?:jpg|gif|png|svg|jpeg|webp|avif)$/,
      new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days            
          }),
        ],
      })
    );

  } else
    console.log('Workbox could not be loaded. No offline support!');

}
