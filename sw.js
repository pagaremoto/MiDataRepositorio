// Nombre y versión del caché
const CACHE_NAME = "esp32-cache-v1";

// Archivos que se guardarán para funcionar offline
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  // Añade aquí tus archivos del ESP32:
  // "/estilos.css",
  // "/script.js",
];

// INSTALACIÓN: se guarda el contenido en caché
self.addEventListener("install", event => {
  console.log("[SW] Instalando Service Worker…");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Archivos cacheados");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting(); // activa el SW sin esperar
});

// ACTIVACIÓN: limpia cachés antiguas
self.addEventListener("activate", event => {
  console.log("[SW] Activado");

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Borrando caché antigua:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  clients.claim(); // controla la página inmediatamente
});

// FETCH: estrategia "cache first, network fallback"
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si está en caché → lo devuelve
      if (response) {
        return response;
      }

      // Si no → intenta descargarlo
      return fetch(event.request).catch(() => {
        // Si falla la red → puedes devolver una página offline opcional
        // return caches.match("/offline.html");
      });
    })
  );
});
