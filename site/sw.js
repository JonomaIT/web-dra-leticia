// Network-first: sempre tenta a versão nova; o cache só serve offline.
// Ao mudar a lista abaixo, suba a versão (o cache antigo é apagado na ativação).
const CACHE_NAME = 'dra-leticia-v3.0.0'
const PRECACHE = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/base.css',
  '/css/components.css',
  '/css/sections.css',
  '/main.js',
  '/assets/icomoon/style.css',
  '/assets/icomoon/fonts/icomoon.woff',
  '/fonts/dm-sans-latin-400-normal.woff2',
  '/fonts/dm-sans-latin-500-normal.woff2',
  '/fonts/dm-sans-latin-700-normal.woff2',
  '/fonts/poppins-latin-600-normal.woff2',
  '/fonts/poppins-latin-700-normal.woff2',
  '/img/hero-480.webp',
  '/img/hero-800.webp',
  '/img/about-poster-800.webp',
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).catch(() => {}))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      await self.clients.claim()
    })()
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  // Só o próprio site; mapas e outros domínios seguem direto. Vídeo (Range) também.
  if (request.method !== 'GET' || url.origin !== self.location.origin || request.headers.has('range')) return

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
