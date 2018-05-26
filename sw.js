var cacheName = 'restaurant-reviews-v1';
var cacheFiles = [
    '/',
    'css/styles.css',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
];
//
self.addEventListener('install', function(e) {
   console.log('[Service worker] installed');
    
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[serviceWorker] caching cacheFIles')
            return cache.addAll(cacheFiles)
        }) //caches.open returns a promise. waitUntil receives a promise and when it resolve, the browser knows that install is complete
    )
});



self.addEventListener('fetch', function(e) {
   console.log('[Service worker] fetching', e.request.url);
    
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('[serviceworker] found in cache', e.request.url);
                return response;
            } //return the response if found in cache
            
            var clonedRequest = e.request.clone();
            
            fetch(clonedRequest)
                .then(function(response) {
                
                    var clonedResponse = response.clone();
                
                    caches.open(cacheName).then(function(cache) {
                        cache.put(e.request, clonedResponse);
                        return response;
                    })
                })  //if no match is found, fetch from the network
        })
    )
    
});