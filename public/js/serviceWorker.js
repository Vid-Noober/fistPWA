var CACHE_NAME = "my-test-pwa-v5";

var assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/manifest.json",
  "/icons/icon_32x32.png",
  "/icons/icon_128x128.png",
  "/icons/icon_256x256.png",
  "/icons/icon_512x512.png"
];

self.addEventListener("install", function(installEvent) {
  self.skipWaiting();
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.allSettled(
        assets.map(function(asset) {
          return cache.add(asset).catch(function(err) {
            console.log("Failed to cache: " + asset, err);
          });
        })
      );
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