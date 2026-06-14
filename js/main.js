// WILDGuard website interactions
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: prefersReducedMotion ? 0 : 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 70
        });

        window.refreshAOS = () => window.setTimeout(() => AOS.refresh(), 100);
    } else {
        document.querySelectorAll('[data-aos]').forEach((element) => {
            element.removeAttribute('data-aos');
            element.removeAttribute('data-aos-delay');
        });
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const updateNavbar = () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 24);

        let current = 'home';
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 140) {
                current = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            window.scrollTo({
                top: target.offsetTop - navHeight + 1,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    });

    const year = document.querySelector('.current-year');
    if (year) year.textContent = new Date().getFullYear();
});
