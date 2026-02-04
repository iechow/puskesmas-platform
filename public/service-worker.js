const CACHE = "puskesmas-v6";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/kegiatan.html",
  "/style.css",
  "/menu.html"
];

// Install
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate (hapus cache lama)
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // JANGAN cache API
  if (url.pathname.startsWith("/api/")) {
    return; // biarkan browser fetch normal
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
