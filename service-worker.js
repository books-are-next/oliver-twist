/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-0f33bd4';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./oliver_twist_002.html","./oliver_twist_005.html","./oliver_twist_006.html","./oliver_twist_007.html","./oliver_twist_008.html","./oliver_twist_009.html","./oliver_twist_010.html","./oliver_twist_011.html","./oliver_twist_012.html","./oliver_twist_013.html","./oliver_twist_014.html","./oliver_twist_015.html","./oliver_twist_016.html","./oliver_twist_017.html","./oliver_twist_018.html","./oliver_twist_019.html","./oliver_twist_020.html","./oliver_twist_021.html","./oliver_twist_022.html","./oliver_twist_023.html","./oliver_twist_024.html","./oliver_twist_025.html","./oliver_twist_026.html","./oliver_twist_027.html","./oliver_twist_028.html","./oliver_twist_029.html","./oliver_twist_030.html","./oliver_twist_031.html","./oliver_twist_032.html","./oliver_twist_033.html","./oliver_twist_034.html","./oliver_twist_035.html","./oliver_twist_036.html","./oliver_twist_037.html","./oliver_twist_038.html","./oliver_twist_039.html","./oliver_twist_040.html","./oliver_twist_041.html","./oliver_twist_042.html","./oliver_twist_043.html","./oliver_twist_044.html","./oliver_twist_045.html","./oliver_twist_046.html","./oliver_twist_047.html","./oliver_twist_048.html","./oliver_twist_049.html","./oliver_twist_050.html","./oliver_twist_051.html","./oliver_twist_052.html","./oliver_twist_053.html","./oliver_twist_054.html","./oliver_twist_055.html","./oliver_twist_056.html","./oliver_twist_057.html","./oliver_twist_058.html","./oliver_twist_059.html","./oliver_twist_060.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_oliver_twist.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
