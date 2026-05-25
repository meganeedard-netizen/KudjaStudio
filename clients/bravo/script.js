/* ====================================================
   LA MIE BRAVO — Scripts
   ==================================================== */

(function () {
  'use strict';

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Hero image animation ----
  document.querySelector('.hero').classList.add('loaded');

  // ---- Burger menu ----
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav__overlay';
  document.body.appendChild(overlay);

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
    burger.classList.toggle('open', isOpen);
    navLinks.classList.toggle('open', isOpen);
    overlay.classList.toggle('show', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));

  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav__link[href^="#"]');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  sections.forEach(s => observer.observe(s));

  // ---- Contact form ----
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    // Simulate async send (replace with real fetch/emailjs)
    setTimeout(() => {
      successMsg.hidden = false;
      form.reset();
      btn.textContent = 'Envoyer ma demande';
      btn.disabled = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1200);
  });

  // ---- Carousel créations ----
  const carousel = document.getElementById('creations-carousel');
  const dotsWrap = document.getElementById('carousel-dots');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  const slides = carousel ? Array.from(carousel.querySelectorAll('.creation-slide')) : [];

  if (carousel && slides.length) {
    // Créer les dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Carte ${i + 1}`);
      dot.setAttribute('role', 'tab');
      dot.addEventListener('click', () => scrollToSlide(i));
      dotsWrap.appendChild(dot);
    });

    function getSlideWidth() {
      const gap = parseFloat(getComputedStyle(carousel).gap) || 16;
      return slides[0].offsetWidth + gap;
    }

    function scrollToSlide(index) {
      carousel.scrollTo({ left: index * getSlideWidth(), behavior: 'smooth' });
    }

    function updateDots() {
      const sw = getSlideWidth();
      const index = Math.min(Math.round(carousel.scrollLeft / sw), slides.length - 1);
      dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      if (prevBtn) prevBtn.style.opacity = index === 0 ? '0.4' : '1';
      if (nextBtn) nextBtn.style.opacity = index === slides.length - 1 ? '0.4' : '1';
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
      const sw = getSlideWidth();
      const cur = Math.round(carousel.scrollLeft / sw);
      scrollToSlide(Math.max(0, cur - 1));
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const sw = getSlideWidth();
      const cur = Math.round(carousel.scrollLeft / sw);
      scrollToSlide(Math.min(slides.length - 1, cur + 1));
    });

    carousel.addEventListener('scroll', updateDots, { passive: true });
    updateDots();
  }

  // ---- Scroll reveal ----
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(
    '.creation-card, .specialite__content, .specialite__images, .apropos__content, .apropos__img-wrap, .galerie__img'
  ).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

})();
