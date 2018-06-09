var staticCacheName = 'restaurant-cache';

var filesToCache = [
  '/',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

self.addEventListener('install', function (event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function (cache) {
      return cache.addAll(filesToCache);
    })
    .then(self.skipWaiting())
  );
});

self.addEventListener('activate', function (event) {
  console.log('Activating new service worker...');
  var cacheWhitelist = [staticCacheName];
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheWhitelist.indexOf(cacheName)=== -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
    .catch(function (error) {
      console.log(error, event.request);
    }));
});