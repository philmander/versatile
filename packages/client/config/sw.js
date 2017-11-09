self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.open('versatile').then(cache => {
            return fetch(ev.request).then(res => {
                if(ev.request.url.indexOf('http') === 0) {
                    cache.put(ev.request, res.clone());
                }
                return res;
            }).catch(() => {
                return caches.match(ev.request);
            })
        })
    );
});