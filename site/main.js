/* =============================================================
   Dra. Letícia Penin — scripts
   ============================================================= */

const header = document.querySelector('#header')
const nav = document.querySelector('#header nav')
const toggles = document.querySelectorAll('nav .toggle')
const navLinks = document.querySelectorAll('nav .menu a')
const menuButton = document.querySelector('.toggle.icon-menu')

/* ---- Menu mobile (abrir/fechar) ---- */
function setMenu(open) {
  nav.classList.toggle('show', open)
  document.body.style.overflow = open ? 'hidden' : ''
  if (menuButton) menuButton.setAttribute('aria-expanded', String(open))
}

toggles.forEach((el) => el.addEventListener('click', () => setMenu(!nav.classList.contains('show'))))
navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)))

/* Fechar com ESC e focar o botão do menu */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('show')) {
    setMenu(false)
    menuButton?.focus()
  }
})

/* ---- Vídeo da seção "Sobre": play/pause conforme visibilidade + fade ---- */
const video = document.querySelector('#about video')
if (video) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  })
  videoObserver.observe(video)

  video.addEventListener('timeupdate', () => {
    const timeLeft = video.duration - video.currentTime
    if (timeLeft <= 0.5) {
      video.style.opacity = timeLeft / 0.5
    } else if (video.currentTime <= 0.5) {
      video.style.opacity = video.currentTime / 0.5
    } else {
      video.style.opacity = 1
    }
  })
}

/* ---- Carrossel de depoimentos (Swiper) ---- */
new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletActiveClass: 'swiper-pagination-bullet-active',
  },
  keyboard: { enabled: true, onlyInViewport: true },
  a11y: {
    prevSlideMessage: 'Depoimento anterior',
    nextSlideMessage: 'Próximo depoimento',
    paginationBulletMessage: 'Ir para depoimento {{index}}',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
})

/* ---- Animações de entrada (ScrollReveal) ---- */
if (window.ScrollReveal) {
  const sr = ScrollReveal({ origin: 'bottom', distance: '30px', duration: 700, reset: false })
  sr.reveal(
    `#home .image, #home .text,
     #about .image, #about .text,
     #services header, #services .card,
     #testimonials header, #testimonials .testimonials,
     #contact .text, #contact .links,
     footer .brand, footer .social`,
    { interval: 100 }
  )
}

/* ---- Header com sombra ao rolar + link ativo da seção atual ---- */
const navHeight = header.offsetHeight
const sections = document.querySelectorAll('main section[id]')

function onScroll() {
  header.classList.toggle('scroll', window.scrollY >= navHeight)

  const checkpoint = window.scrollY + window.innerHeight / 2
  sections.forEach((section) => {
    const id = section.id
    const inView = checkpoint >= section.offsetTop && checkpoint <= section.offsetTop + section.offsetHeight
    document.querySelector(`nav .menu a[href*="${id}"]`)?.classList.toggle('active', inView)
  })
}

/* ---- Utilitários ---- */
function throttle(fn, limit) {
  let waiting = false
  return function (...args) {
    if (!waiting) {
      fn.apply(this, args)
      waiting = true
      setTimeout(() => (waiting = false), limit)
    }
  }
}

function debounce(fn, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), wait)
  }
}

window.addEventListener('scroll', throttle(onScroll, 100))

/* Fechar o menu ao redimensionar para desktop */
window.addEventListener(
  'resize',
  debounce(() => {
    if (window.innerWidth >= 992 && nav.classList.contains('show')) {
      setMenu(false)
    }
  }, 200)
)

/* ---- Ano atual no rodapé ---- */
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

/* ---- Service Worker (PWA) ---- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
