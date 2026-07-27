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
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => fetch(event.request))
    );
  }
});
