const CACHE_NAME = "midata-cache-v1";
const APP_PREFIX = "/MiDataRepositorio/"; // 👈 MUY IMPORTANTE

const FILES_TO_CACHE = [
  `${APP_PREFIX}`,
  `${APP_PREFIX}index.html`,
  `${APP_PREFIX}manifest.json`,
  `${APP_PREFIX}sw.js`,
  `${APP_PREFIX}icon-192.png`,
  `${APP_PREFIX}icon-512.png`
];

// INSTALACIÓN
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVACIÓN
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
