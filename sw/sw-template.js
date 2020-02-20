/* eslint-disable no-restricted-globals */
/* global importScripts */

if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
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
    //workbox.precaching.precacheAndRoute([], {});
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    // custom cache rules

    /* SW 4
    // was '/index.html',
    const appShellCacheKey = workbox.precaching.getCacheKeyForURL('./index.html');
    workbox.routing.registerNavigationRoute(
      appShellCacheKey,
      {
        blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
      }
    );
    */

    const handler = workbox.precaching.createHandlerBoundToURL('./index.html');
    const navigationRoute = new workbox.routing.NavigationRoute(handler, {
      denylist: [/^\/_/, /\/[^/]+\.[^/]+$/],
    });
    workbox.routing.registerRoute(navigationRoute);

    // Cache for school logos
    workbox.routing.registerRoute(
      /^https:\/\/clic\.xtec\.cat\/pub\/logos\//,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'school-logos',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    );

    // Cache for map tiles
    workbox.routing.registerRoute(
      /^https?:\/\/(?:maps\.wikimedia\.org\/osm-intl|api\.tiles\.mapbox\.com|[a-z]+\.tile\.openstreetmap\.org|mapcache\.icc\.cat)\//,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'maps',
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 500,
            maxAgeSeconds: 60 * 60 * 24 * 90, // 90 Days
            purgeOnQuotaError: true,
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
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365, // One year
            maxEntries: 30,
          }),
        ],
      })
    );

    // Cache for big logos and miscellaneous icons (small logos are always pre-cached)
    workbox.routing.registerRoute(
      /\/(?:logos|ico)\/[/\w]*\.(?:png|gif|jpg|jpeg|svg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days            
          }),
        ],
      })
    );

  } else
    console.log('Workbox could not be loaded. No offline support!');

}