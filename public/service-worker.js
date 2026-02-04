const CACHE = "puskesmas-v5";

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
self.addEventListener("fetch", e => {
  const url = e.request.url;

  // API Supabase → selalu ambil network
  if (url.includes("/api/") || url.includes("supabase")) {
    e.respondWith(fetch(e.request));
    return;
  }

  // File statis → cache first
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
