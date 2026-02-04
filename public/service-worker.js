const CACHE_NAME = "puskesmas-v4";

// Install – cache hanya file statis
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/kegiatan.html",
        "/style.css",
        "/menu.html",
        "/manifest.json"
      ])
    )
  );
});

// Activate – hapus semua cache lama
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // 🚫 API TIDAK BOLEH DI CACHE
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Static files: cache-first
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
