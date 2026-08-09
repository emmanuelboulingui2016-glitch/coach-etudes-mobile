const CACHE = "coach-etudes-consult-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (!event.request.url.includes("googleapis.com") && !event.request.url.includes("gsi/client") && !event.request.url.includes("jsdelivr")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
