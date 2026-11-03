/* =============================================================
   Dra. Letícia Penin — scripts (sem dependências)
   Tudo aqui melhora a página; sem JS ela continua completa.
   ============================================================= */

const header = document.querySelector('.site-header')
const menuToggle = document.querySelector('.menu-toggle')
const menuLinks = document.querySelectorAll('.menu a')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---- Menu do celular ---- */
function setMenu(open) {
  header.classList.toggle('menu-open', open)
  document.body.style.overflow = open ? 'hidden' : ''
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
  menuToggle.classList.toggle('icon-menu', !open)
  menuToggle.classList.toggle('icon-close', open)
}

menuToggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')))
menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)))
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && header.classList.contains('menu-open')) {
    setMenu(false)
    menuToggle.focus()
  }
})
window.matchMedia('(min-width: 992px)').addEventListener('change', (e) => e.matches && setMenu(false))

/* ---- Cabeçalho com sombra ao rolar + link da seção atual ---- */
const sections = [...document.querySelectorAll('main section[id]')]

function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 8)
  const checkpoint = window.scrollY + window.innerHeight / 2
  for (const section of sections) {
    const inView = checkpoint >= section.offsetTop && checkpoint < section.offsetTop + section.offsetHeight
    const link = document.querySelector(`.menu a[href="#${section.id}"]`)
    if (!link) continue
    if (inView) link.setAttribute('aria-current', 'true')
    else link.removeAttribute('aria-current')
  }
}

let ticking = false
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      onScroll()
      ticking = false
    })
    ticking = true
  }
}, { passive: true })
onScroll()

/* ---- Entrada das seções ao rolar ---- */
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      revealObserver.unobserve(entry.target)
    }
  }
}, { rootMargin: '0px 0px -10% 0px' })
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

/* ---- Vídeo do "Sobre": só baixa e toca quando aparece ----
   Com "reduzir animações" no sistema, não toca sozinho: aparecem os controles e a pessoa escolhe.
   Se o navegador bloquear a reprodução automática (ex.: iPhone em economia de bateria), idem. */
const video = document.querySelector('#about video')
if (video) {
  const showControls = () => video.setAttribute('controls', '')
  if (reducedMotion) {
    showControls()
  } else {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(showControls)
      else video.pause()
    }, { threshold: 0.25 }).observe(video)
  }
}

/* ---- Carrossel de depoimentos: pontos, setas e troca automática ---- */
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel__track')
  const slides = [...track.children]
  const controls = carousel.querySelector('.carousel__controls')
  const dotsBox = carousel.querySelector('[data-dots]')

  const perView = () => Math.max(1, Math.round(track.clientWidth / slides[0].getBoundingClientRect().width))
  const pages = () => Math.max(1, slides.length - perView() + 1)
  const current = () => Math.round(track.scrollLeft / (slides[0].getBoundingClientRect().width + 16))
  const goTo = (i) => {
    const target = slides[Math.max(0, Math.min(i, pages() - 1))]
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft - 8, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  function renderDots() {
    dotsBox.replaceChildren(...Array.from({ length: pages() }, (_, i) => {
      const dot = document.createElement('button')
      dot.type = 'button'
      dot.className = 'carousel__dot'
      dot.setAttribute('aria-label', `Ir para o depoimento ${i + 1}`)
      dot.addEventListener('click', () => goTo(i))
      return dot
    }))
    updateDots()
  }

  function updateDots() {
    const active = Math.min(current(), pages() - 1)
    dotsBox.querySelectorAll('.carousel__dot').forEach((dot, i) => dot.setAttribute('aria-current', String(i === active)))
  }

  carousel.querySelector('[data-prev]').addEventListener('click', () => goTo(current() - 1))
  carousel.querySelector('[data-next]').addEventListener('click', () => goTo(current() + 1 >= pages() ? 0 : current() + 1))
  track.addEventListener('scroll', () => requestAnimationFrame(updateDots), { passive: true })
  window.addEventListener('resize', renderDots)
  controls.hidden = false
  renderDots()

  // Troca sozinha a cada 6 s; para com o mouse em cima, com foco dentro ou com "movimento reduzido".
  if (!reducedMotion) {
    let paused = false
    const pause = () => (paused = true)
    const resume = () => (paused = false)
    carousel.addEventListener('mouseenter', pause)
    carousel.addEventListener('mouseleave', resume)
    carousel.addEventListener('focusin', pause)
    carousel.addEventListener('focusout', resume)
    setInterval(() => {
      if (!paused && !document.hidden) goTo(current() + 1 >= pages() ? 0 : current() + 1)
    }, 6000)
  }
})

/* ---- Ano no rodapé ---- */
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

/* ---- Service worker (funciona offline com a última versão vista) ---- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}
