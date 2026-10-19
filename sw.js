// ==========================================
// Service Worker for Shivam Portfolio & Vault
// ==========================================
const CACHE_NAME = 'shivam-portfolio-v2';

const STATIC_ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './favicon.ico',
    './favicon.png',
    './apple-touch-icon.png',
    './apple-touch-icon-precomposed.png',
    './assets/favicon.png',
    './assets/favicon-32x32.png',
    './assets/favicon-16x16.png',
    './assets/apple-touch-icon.png',
    './assets/icon-192.png',
    './assets/icon-512.png',
    './assets/resume.pdf',
    './assets/cv.pdf'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Activate Event - Clean up outdated caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Only handle GET requests
    if (request.method !== 'GET') return;

    // Do not cache external analytics or form submissions
    if (request.url.includes('formspree.io') || request.url.includes('chrome-extension')) {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            // Return cached response immediately if available, then update cache in background
            const fetchPromise = fetch(request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // If offline and request fails, cachedResponse will be returned
                return cachedResponse;
            });

            return cachedResponse || fetchPromise;
        })
    );
});
