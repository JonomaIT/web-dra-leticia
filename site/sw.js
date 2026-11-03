const CACHE_NAME = 'dra-leticia-v2.2.0'
const PRECACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/draleticiapenin-foto.jpeg',
  '/sobre-dra-leticia-poster.jpg',
  '/assets/logo.png',
  '/assets/icomoon/style.css',
  '/assets/icomoon/fonts/icomoon.woff',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;600;700&display=swap',
  'https://unpkg.com/swiper@11/swiper-bundle.min.css',
  'https://unpkg.com/swiper@11/swiper-bundle.min.js',
  'https://unpkg.com/scrollreveal@4/dist/scrollreveal.min.js'
]

// Install: pré-carrega os arquivos e assume controle imediatamente
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).catch(() => {})
  )
})

// Activate: remove caches antigos e passa a controlar as abas já abertas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      await self.clients.claim()
    })()
  )
})

// Fetch: network-first — sempre tenta a versão fresca; usa o cache só como
// fallback (offline). Assim atualizações aparecem no próximo carregamento.
self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  event.respondWith(
    (async () => {
      try {
        const fresh = await fetch(request)
        if (fresh && fresh.status === 200) {
          const cache = await caches.open(CACHE_NAME)
          cache.put(request, fresh.clone())
        }
        return fresh
      } catch (err) {
        const cached = await caches.match(request)
        if (cached) return cached
        if (request.mode === 'navigate') return caches.match('/index.html')
        throw err
      }
    })()
  )
})
