const CACHE_NAME = 'kalendergajah-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/kal-full.html',
  '/kal-offline.html',
  '/kal-online.html',
  '/app-web.html',
  '/pkb22-24.html',
  '/scan.html',
  '/kal-notes.html',
  '/shiftermp3.html',
  '/alquran.html',
  '/quran-online.html',
  '/murothal.html',
  '/asmaulhusna.html',
  '/sholawat.html',
  '/religi.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
];

// Install & Simpan Semua Halaman ke Memori HP
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ambil dari Memori HP saat Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});