/* ================================================
   L'ARDOISE — Script principal
   ================================================ */

// --- Navbar : effet au scroll ---
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// --- Menu burger mobile ---
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Fermer le menu sur clic de lien
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// --- Reveal au scroll ---
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));
}

// --- Tabs menu (carte.html) ---
const tabs   = document.querySelectorAll('.menu-tab');
const panels = document.querySelectorAll('.menu-panel');
if (tabs.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

// --- Formulaire réservation ---
const reservForm = document.getElementById('reservForm');
if (reservForm) {
  reservForm.addEventListener('submit', (e) => {
    e.preventDefault();
    reservForm.style.display = 'none';
    const success = document.getElementById('reservSuccess');
    if (success) success.classList.add('show');
    window.scrollTo({ top: success.offsetTop - 100, behavior: 'smooth' });
  });
}

// --- Formulaire commande ---
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    orderForm.style.display = 'none';
    const success = document.getElementById('orderSuccess');
    if (success) success.classList.add('show');
    window.scrollTo({ top: success.offsetTop - 100, behavior: 'smooth' });
  });
}

// --- Marquer le lien actif selon la page ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
