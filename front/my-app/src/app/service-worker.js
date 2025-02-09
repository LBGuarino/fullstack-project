const CACHE_NAME = 'my-app-v1';

self.addEventListener('fetch', (event) => {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request.url).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request).then((fetchedResponse) => {
                        cache.put(event.request, fetchedResponse.clone());
                        return fetchedResponse;
                    })
                })
            }));
    } else {
        return;
    }
})