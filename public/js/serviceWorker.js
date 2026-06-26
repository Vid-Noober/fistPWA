var CACHE_NAME = "my-test-pwa-v2";

var assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/manifest.json"
];

self.addEventListener("install", function(installEvent) {
  self.skipWaiting();
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", function(activateEvent) {
  activateEvent.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(fetchEvent) {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(function(res) {
      return res || fetch(fetchEvent.request);
    })
  );
});