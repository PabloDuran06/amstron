/* ============================================
   AMSTRON — Animaciones homepage
   GSAP 3 + ScrollTrigger
   Solo para index.html — NO se guarda en GitHub
   ============================================ */

(function () {
  /* ── Solo en la homepage ── */
  const isHome = window.location.pathname === '/' ||
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/amstron/');
  if (!isHome) return;

  /* ── Cargar GSAP + ScrollTrigger desde CDN ── */
  function loadScript(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', function () {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', function () {
      gsap.registerPlugin(ScrollTrigger);
      initAnimations();
    });
  });

  function initAnimations() {
    /* ─────────────────────────────────────────────
       1. HERO — ENTRADA CINÉTICA
       El hero__content entra con un efecto split por línea
    ───────────────────────────────────────────── */

    /* Cancelar el reveal genérico para el hero */
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.add('anim-override');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    const heroContent = document.querySelector('.hero__content');
    const heroVisual  = document.querySelector('.hero__visual');

    if (heroContent) {
      /* Split el título en palabras */
      const title = heroContent.querySelector('.hero__title');
      if (title) {
        const text = title.textContent;
        const words = text.split(' ');
        title.innerHTML = words.map(w =>
          `<span class="anim-word" style="display:inline-block; overflow:hidden; vertical-align:bottom; padding-bottom:2px;">` +
          `<span class="anim-word-inner" style="display:inline-block;">${w}&nbsp;</span></span>`
        ).join('');
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      /* Tag entra desde abajo */
      tl.fromTo(heroContent.querySelector('.tag'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );

      /* Palabras del título entran como cortina */
      const wordInners = heroContent.querySelectorAll('.anim-word-inner');
      if (wordInners.length) {
        tl.fromTo(wordInners,
          { y: '100%' },
          { y: '0%', duration: 0.75, stagger: 0.04 },
          '-=0.2'
        );
      }

      /* Subtítulo */
      tl.fromTo(heroContent.querySelector('.hero__sub'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      /* Botones */
      const ctas = heroContent.querySelectorAll('.btn');
      tl.fromTo(ctas,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );
    }

    /* Visual del hero: stats card + chip grid */
    if (heroVisual) {
      const statsCard = heroVisual.querySelector('.hero__stats-card');
      const chipGrid  = heroVisual.querySelector('.hero__chip-grid');

      if (statsCard) {
        gsap.fromTo(statsCard,
          { x: 60, opacity: 0, rotateY: 8 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
        );
      }

      if (chipGrid) {
        const chips = chipGrid.querySelectorAll('.chip-card');
        gsap.fromTo(chips,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.7 }
        );
      }
    }

    /* ─────────────────────────────────────────────
       2. PARALLAX DEL FONDO DEL HERO
    ───────────────────────────────────────────── */
    const heroBg = document.querySelector('.hero__bg-pattern');
    if (heroBg) {
      gsap.to(heroBg, {
        y: '40%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }

    /* También paralaxear el propio hero__inner levemente */
    gsap.to('.hero__inner', {
      y: 80,
      opacity: 0.4,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'center top',
        end: 'bottom top',
        scrub: true,
      }
    });

    /* ─────────────────────────────────────────────
       3. PILLARS — entrada escalonada al hacer scroll
    ───────────────────────────────────────────── */
    const pillarItems = document.querySelectorAll('.pillar-item');
    if (pillarItems.length) {
      gsap.fromTo(pillarItems,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7, stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillars-section',
            start: 'top 75%',
          }
        }
      );
    }

    /* ─────────────────────────────────────────────
       4. STATS SECTION — números que suben con wipe
    ───────────────────────────────────────────── */
    const statBlocks = document.querySelectorAll('.stats-section .stat-block');
    if (statBlocks.length) {
      gsap.fromTo(statBlocks,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.65, stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 78%',
          }
        }
      );

      /* Línea de barrido que se expande entre stats */
      gsap.fromTo('.stats-section',
        { '--line-scale': 0 },
        {
          '--line-scale': 1,
          duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.stats-section', start: 'top 80%' }
        }
      );
    }

    /* ─────────────────────────────────────────────
       5. ABOUT INTRO — imagen entra con clip-path
    ───────────────────────────────────────────── */
    const aboutImg = document.querySelector('.about-intro__image');
    if (aboutImg) {
      gsap.fromTo(aboutImg,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 1,
          duration: 1.1, ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.about-intro',
            start: 'top 70%',
          }
        }
      );
    }

    /* Check items entran en cascada */
    const checkItems = document.querySelectorAll('.check-item');
    if (checkItems.length) {
      gsap.fromTo(checkItems,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.5, stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-intro__checks',
            start: 'top 78%',
          }
        }
      );
    }

    /* ─────────────────────────────────────────────
       6. FABRICANTES — entran como mosaico escalonado
    ───────────────────────────────────────────── */
    const fabCards = document.querySelectorAll('.fab-card');
    if (fabCards.length) {
      gsap.fromTo(fabCards,
        { y: 30, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.45, stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.fabricantes-section',
            start: 'top 75%',
          }
        }
      );
    }

    /* ─────────────────────────────────────────────
       7. NOTICIAS — fade-in con slide alternado
    ───────────────────────────────────────────── */
    function animateNoticias() {
      const cards = document.querySelectorAll('.noticia-card');
      if (!cards.length) return;
      gsap.fromTo(cards,
        (i) => ({ y: 50, opacity: 0, x: i % 2 === 0 ? -30 : 30 }),
        {
          y: 0, opacity: 1, x: 0,
          duration: 0.65, stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.noticias-section',
            start: 'top 75%',
          }
        }
      );
    }

    /* Las noticias se cargan async — esperamos a que aparezcan */
    const noticiasGrid = document.getElementById('noticias-grid');
    if (noticiasGrid) {
      const mo = new MutationObserver(function (mutations) {
        const firstCard = noticiasGrid.querySelector('.noticia-card');
        if (firstCard) {
          mo.disconnect();
          setTimeout(animateNoticias, 50);
        }
      });
      mo.observe(noticiasGrid, { childList: true });
      /* Por si ya estaban cargadas */
      if (noticiasGrid.querySelector('.noticia-card')) animateNoticias();
    }

    /* ─────────────────────────────────────────────
       8. CTA BAND — scale + fade dramático
    ───────────────────────────────────────────── */
    const ctaBand = document.querySelector('.cta-band');
    if (ctaBand) {
      gsap.fromTo(ctaBand,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaBand,
            start: 'top 82%',
          }
        }
      );
    }

    /* ─────────────────────────────────────────────
       9. LOGO HOVER — bounce escalonado por letra
    ───────────────────────────────────────────── */
    function initLogoHover() {
      const logos = document.querySelectorAll('.nav__logo svg, .nav__mobile-header svg');
      logos.forEach(svg => {
        const rects = svg.querySelectorAll('rect');
        svg.addEventListener('mouseenter', () => {
          gsap.fromTo(rects,
            { y: 0 },
            {
              y: -5,
              duration: 0.25,
              stagger: 0.04,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1,
            }
          );
        });
      });
    }

    /* El logo se inyecta via components.js — esperamos al DOMContentLoaded */
    if (document.readyState === 'complete') {
      initLogoHover();
    } else {
      window.addEventListener('load', initLogoHover);
    }
    /* También re-intentar tras 500ms por si el inject tarda */
    setTimeout(initLogoHover, 500);

    /* ─────────────────────────────────────────────
       10. SCROLL PROGRESS BAR (detalle sutil)
    ───────────────────────────────────────────── */
    const progressBar = document.createElement('div');
    progressBar.id = 'anim-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      height: 2.5px;
      background: linear-gradient(90deg, #D94F42, #f07065);
      z-index: 9999;
      width: 0%;
      pointer-events: none;
      transition: opacity 0.3s;
    `;
    document.body.appendChild(progressBar);

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressBar.style.width = (self.progress * 100) + '%';
        progressBar.style.opacity = self.progress > 0.99 ? '0' : '1';
      }
    });

    /* ─────────────────────────────────────────────
       11. MAGNETIC BUTTONS (hero CTAs)
    ───────────────────────────────────────────── */
    document.querySelectorAll('.hero__ctas .btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width  / 2;
        const y = e.clientY - r.top  - r.height / 2;
        gsap.to(btn, { x: x * 0.18, y: y * 0.18, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      });
    });

    /* ─────────────────────────────────────────────
       12. CHIP CARDS — solo entrada, luego estáticas
    ───────────────────────────────────────────── */
    // Las chip-cards ya entran animadas con el chipGrid (pop escalonado arriba)
    // No se añade ningún loop — se quedan estáticas tras la entrada

  } /* fin initAnimations */

})();
