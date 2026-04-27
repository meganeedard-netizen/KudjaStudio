// ===================================================
// TENDACAYOU — JavaScript
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------------
    // NAVBAR — scroll behavior + mobile menu
    // ---------------------------------------------------
    const navbar   = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---------------------------------------------------
    // SCROLL ANIMATIONS — fade-in on scroll
    // ---------------------------------------------------
    const fadeEls = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.animationDelay || '0s';
                const ms = parseFloat(delay) * 1000;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, ms);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));

    // ---------------------------------------------------
    // ACTIVE NAV LINK on scroll
    // ---------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === `#${id}`) {
                        a.style.color = 'var(--gold)';
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

    // ---------------------------------------------------
    // SMOOTH SCROLL for anchor links
    // ---------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = navbar.offsetHeight + 20;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ---------------------------------------------------
    // FORM — basic validation & success message
    // ---------------------------------------------------
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Envoi en cours…';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                form.innerHTML = `
                    <div style="
                        text-align:center;
                        padding: 3rem 1rem;
                        display:flex;
                        flex-direction:column;
                        align-items:center;
                        gap:1.2rem;
                    ">
                        <div style="
                            width:64px; height:64px;
                            background: var(--green-mid);
                            border-radius:50%;
                            display:flex; align-items:center; justify-content:center;
                            font-size:1.6rem; color:#fff;
                        ">✓</div>
                        <h3 style="
                            font-family: var(--font-serif);
                            font-size:1.4rem;
                            color: var(--green-deep);
                        ">Demande envoyée !</h3>
                        <p style="
                            font-family: var(--font-sans);
                            font-size:0.9rem;
                            color: var(--text-mid);
                            line-height:1.7;
                            max-width:300px;
                        ">Merci pour votre message. Notre équipe vous répondra dans les 24 heures pour organiser votre séjour de rêve.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // ---------------------------------------------------
    // DATE — set min date to today for the booking form
    // ---------------------------------------------------
    const arriveeInput = document.getElementById('arrivee');
    const departInput  = document.getElementById('depart');

    if (arriveeInput && departInput) {
        const today = new Date().toISOString().split('T')[0];
        arriveeInput.min = today;
        departInput.min = today;

        arriveeInput.addEventListener('change', () => {
            if (departInput.value && departInput.value <= arriveeInput.value) {
                const next = new Date(arriveeInput.value);
                next.setDate(next.getDate() + 1);
                departInput.value = next.toISOString().split('T')[0];
            }
            departInput.min = arriveeInput.value;
        });
    }

    // ---------------------------------------------------
    // HERO SLIDER
    // ---------------------------------------------------
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots   = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;

    function goToSlide(index) {
        heroSlides[currentSlide].classList.remove('active');
        heroDots[currentSlide]?.classList.remove('active');
        currentSlide = index;
        heroSlides[currentSlide].classList.add('active');
        heroDots[currentSlide]?.classList.add('active');
    }

    heroDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(i);
            slideInterval = setInterval(nextSlide, 5500);
        });
    });

    function nextSlide() {
        goToSlide((currentSlide + 1) % heroSlides.length);
    }

    let slideInterval = setInterval(nextSlide, 5500);

    // ---------------------------------------------------
    // HERO TICKER (noms des cabanes)
    // ---------------------------------------------------
    const tickerItems = document.querySelectorAll('.ticker-item');
    let currentTicker = 0;

    function nextTicker() {
        tickerItems[currentTicker].classList.remove('active');
        tickerItems[currentTicker].classList.add('exit');
        const prev = currentTicker;
        setTimeout(() => tickerItems[prev].classList.remove('exit'), 600);
        currentTicker = (currentTicker + 1) % tickerItems.length;
        tickerItems[currentTicker].classList.add('active');
    }

    setInterval(nextTicker, 2200);

    // ---------------------------------------------------
    // CABANES TABS
    // ---------------------------------------------------
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panel = document.getElementById(`tab-${target}`);
            if (panel) {
                panel.classList.add('active');
                panel.querySelectorAll('.fade-in').forEach(el => {
                    el.classList.remove('visible');
                    setTimeout(() => observer.observe(el), 50);
                });
            }
        });
    });

    // ---------------------------------------------------
    // HERO parallax (subtle)
    // ---------------------------------------------------
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

});
