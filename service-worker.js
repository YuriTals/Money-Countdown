const CACHE_NAME = 'countdown-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/src/Styles/styles.css',
    '/src/Scripts/script.js',
    '/src/Media/icon.png',
    '/src/Scripts/manifest.json',
    '/src/Media/icon-192x192.png',
    '/src/Media/icon-512x512.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.error('Caching error during installation:', error);
            })
    );
    // Force the waiting service worker to become active
    self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                // Clone the request stream
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest)
                    .then(function(response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            })
                            .catch(function(error) {
                                console.error('Caching new resource failed:', error);
                            });

                        return response;
                    })
                    .catch(function(error) {
                        console.error('Fetch error:', error);
                        // You could return a custom offline page here
                        // return caches.match('/offline.html');
                    });
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                }).filter(Boolean) // Remove undefined entries
            );
        })
        // Claim all clients to start controlling them immediately
        .then(() => self.clients.claim())
    );
});

// Optional: Handle message events to prevent communication channel issues
self.addEventListener('message', function(event) {
    // Respond to messages from the main script
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});