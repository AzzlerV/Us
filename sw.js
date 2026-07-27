const CACHE_NAME = 'muskan-cache-v' + new Date().getTime();

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  // We want to force network fetch and bypass cache for HTML/JS/CSS, 
  // but we can just use a simple network-first or network-only strategy.
  // Using cache: 'no-store' forces the browser to skip the HTTP cache.
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .catch(() => fetch(event.request))
  );
});
