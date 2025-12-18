//
// ZetteNote - Service Worker
// Offline-first caching strategy
//

const CACHE_NAME = 'zettenote-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './styles/main.css',
  './src/app.js',
  './src/router.js',
  './src/storage/db.js',
  './src/storage/idb-helpers.js',
  './src/ui/NoteListView.js',
  './src/ui/NoteView.js',
  './src/ui/EditorView.js',
  './src/ui/SearchView.js',
  './src/ui/SettingsView.js',
  './src/ui/ResolveLinkView.js',
  './src/utils/markdown.js',
  './src/utils/tags.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install event – cache core assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate – clean old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch – serve from cache first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // Clone the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        // Return offline page if available
        return caches.match('./index.html');
      })
  );
});