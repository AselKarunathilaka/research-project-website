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

    const heroSection = document.querySelector('.hero');
    const matrixCanvas = document.querySelector('.hero-matrix-bg');

    if (heroSection && matrixCanvas && matrixCanvas.getContext) {
        const ctx = matrixCanvas.getContext('2d');
        if (ctx) {
            const state = {
                width: 0,
                height: 0,
                dpr: Math.max(1, Math.min(window.devicePixelRatio || 1, 2)),
                fontSize: 16,
                columns: 0,
                drops: []
            };

            const glyphs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-<>/\\|';
            let animationFrameId = 0;
            let observer;

            const buildDrops = () => {
                state.columns = Math.max(1, Math.floor(state.width / state.fontSize));
                state.drops = Array.from({ length: state.columns }, () => Math.random() * state.height / state.fontSize);
            };

            const resizeCanvas = () => {
                const rect = heroSection.getBoundingClientRect();
                if (!rect.width || !rect.height) return;

                state.dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
                state.width = rect.width;
                state.height = rect.height;
                matrixCanvas.width = Math.floor(rect.width * state.dpr);
                matrixCanvas.height = Math.floor(rect.height * state.dpr);
                matrixCanvas.style.width = `${rect.width}px`;
                matrixCanvas.style.height = `${rect.height}px`;
                ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
                ctx.font = `${state.fontSize}px monospace`;
                ctx.textBaseline = 'top';
                ctx.lineCap = 'round';
                buildDrops();
            };

            const drawFrame = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, state.width, state.height);

                ctx.font = `${state.fontSize}px monospace`;
                ctx.shadowColor = 'rgba(0, 255, 200, 0.24)';
                ctx.shadowBlur = 6;

                for (let column = 0; column < state.columns; column += 1) {
                    const glyph = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
                    const x = column * state.fontSize;
                    const y = state.drops[column] * state.fontSize;

                    ctx.fillStyle = 'rgba(0, 255, 200, 0.15)';
                    ctx.fillText(glyph, x, y);

                    if (Math.random() > 0.975) {
                        state.drops[column] = 0;
                    }

                    state.drops[column] += 0.55;

                    if (y > state.height && Math.random() > 0.985) {
                        state.drops[column] = 0;
                    }
                }

                animationFrameId = window.requestAnimationFrame(drawFrame);
            };

            resizeCanvas();

            const handleResize = () => {
                resizeCanvas();
            };

            window.addEventListener('resize', handleResize, { passive: true });

            if ('ResizeObserver' in window) {
                observer = new ResizeObserver(() => {
                    resizeCanvas();
                });
                observer.observe(heroSection);
            }

            if (!prefersReducedMotion) {
                animationFrameId = window.requestAnimationFrame(drawFrame);
            } else {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, state.width, state.height);
            }

            window.addEventListener('beforeunload', () => {
                window.cancelAnimationFrame(animationFrameId);
                if (observer) observer.disconnect();
            });
        }
    }
});
