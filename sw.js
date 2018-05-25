self.addEventListener('install', function(e) {    
    e.waitUntil(
        caches.open("restaurant-reviews-v1")
        .then(cache => {
            console.log(cache);
            return cache.addAll([
                '/',
                'css/styles.css',
                'js/main.js',
                'js/dbhelper.js',
                'js/restaurant_info.js',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg',
                'data/restaurants.JSON',
            ]);
        })
    ); //waitUntil receives a promise. WHen the promise resolve, the browser knows that the install is completed
});

self.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    
    e.respondWith(
      caches.match(e.request) //it accepts a request or a url. It returns a promise that resolves to a response if a match is found
      .then(response => {
        if(response) {
             return response; //return the response from the cache
        } else {
             return fetch(e.request); //return from the network
        }
      })
    );
});

