const CACHE_NAME = 'kalendergajah-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
   'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap', 'https://kalendergajah.pages.dev/2024/update/1.webp',
  'https://kalendergajah.pages.dev/2024/update/2.webp',
  'https://kalendergajah.pages.dev/2024/update/3.webp',
  'https://kalendergajah.pages.dev/2024/update/4.webp',
  'https://kalendergajah.pages.dev/2024/update/5.webp',
  'https://kalendergajah.pages.dev/2024/update/6.webp',
  'https://kalendergajah.pages.dev/2024/update/7.webp',
  'https://kalendergajah.pages.dev/2024/update/8.webp',
  'https://kalendergajah.pages.dev/2024/update/9.webp',
  'https://kalendergajah.pages.dev/2024/update/10.webp',
  'https://kalendergajah.pages.dev/2024/update/11.webp',
  'https://kalendergajah.pages.dev/2024/update/12.webp',
  'https://kalendergajah.pages.dev/2024/update/1B.webp',
  'https://kalendergajah.pages.dev/2024/update/2B.webp',
  'https://kalendergajah.pages.dev/2024/update/3B.webp',
  'https://kalendergajah.pages.dev/2024/update/4B.webp',
  'https://kalendergajah.pages.dev/2024/update/5B.webp',
  'https://kalendergajah.pages.dev/2024/update/6B.webp',
  'https://kalendergajah.pages.dev/2024/update/1C.webp',
];

// Install & simpan aset satu per satu agar aman jika ada 1 URL yang gagal
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of ASSETS_TO_CACHE) {
        try {
          const response = await fetch(url, { mode: 'cors' });
          if (response.ok) {
            await cache.put(url, response);
          } else {
            // Fallback mode no-cors untuk aset gambar eksternal jika server blokir CORS
            const opaqueRes = await fetch(url, { mode: 'no-cors' });
            await cache.put(url, opaqueRes);
          }
        } catch (err) {
          console.warn('Gagal cache aset:', url, err);
        }
      }
    })
  );
});

// Hapus cache versi lama otomatis
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First dengan fallback ke Cache saat offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          (networkResponse.status === 200 || networkResponse.type === 'opaque')
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;

        // Fallback ke index.html jika navigasi halaman gagal saat offline
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});