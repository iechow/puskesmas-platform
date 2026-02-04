const CACHE_NAME = "puskesmas-v4";

const STATIC_FILES = [
  "/",
  "/index.html",
  "/kegiatan.html",
  "/style.css",
  "/menu.html"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_FILES))
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => k !== CACHE_NAME && caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// FETCH (SAFE MODE)
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // ❌ Jangan pernah cache API atau service worker
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.includes("service-worker")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
