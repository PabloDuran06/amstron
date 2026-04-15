/* ============================================
   AMSTRON — Main JavaScript
   ============================================ */

// Siempre modo claro
document.documentElement.setAttribute('data-theme', 'light');

// ─── Scroll-aware header + sync --header-height CSS var ───
document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('site-header');
  const header = document.querySelector('.header');
  if (!header) return;

  function syncHeaderHeight() {
    const h = siteHeader ? siteHeader.getBoundingClientRect().height : header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', h + 'px');
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight, { passive: true });

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  }, { passive: true });
});

// ─── Mobile Nav ───
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const closeBtn = document.querySelector('.nav__mobile-close');

  if (!burger || !mobileMenu) return;

  const open = () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // ESC key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});

// ─── Active nav link ───
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});

// ─── Scroll reveal ───
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// ─── Contact form (generic) ───
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const success = form.querySelector('.form-message--success');
      const error = form.querySelector('.form-message--error');

      // Basic validation
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'var(--color-primary)';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (!valid) {
        if (error) { error.style.display = 'block'; error.textContent = 'Por favor rellena todos los campos obligatorios.'; }
        return;
      }

      if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
      setTimeout(() => {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Enviar'; }
        if (success) { success.style.display = 'block'; }
        if (error) { error.style.display = 'none'; }
        form.reset();
        setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
      }, 1200);
    });
  });
});

// ─── Stats counter animation ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); }
    else { el.textContent = Math.floor(current) + (el.dataset.suffix || ''); }
  }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
});

// ─── Tabs ───
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tabs').forEach(tabsEl => {
    const btns = tabsEl.querySelectorAll('.tab-btn');
    const panels = tabsEl.querySelectorAll('.tab-panel');
    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        panels[i] && panels[i].classList.add('active');
      });
    });
  });
});

// ─── Pillars slider (homepage) ───
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.pillars-slider');
  if (!slider) return;
  const items = slider.querySelectorAll('.pillar-item');
  const dots = slider.querySelectorAll('.pillar-dot');
  let current = 0;
  let timer;

  function show(i) {
    items.forEach((item, idx) => item.classList.toggle('active', idx === i));
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
    current = i;
  }
  function next() { show((current + 1) % items.length); }

  show(0);
  timer = setInterval(next, 4000);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { clearInterval(timer); show(i); timer = setInterval(next, 4000); });
  });
});
