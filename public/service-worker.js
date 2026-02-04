const CACHE_NAME = "puskesmas-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/kegiatan.html",
  "/laporan.html",
  "/profil.html",
  "/menu.html",
  "/style.css"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
