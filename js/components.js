/* ============================================
   AMSTRON — Shared Header & Footer Components
   ============================================ */

const AMSTRON_LOGO_SVG = `
<svg width="144" height="18" viewBox="0 0 144 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Amstron">
  <!-- A -->
  <rect x="0" y="0" width="18" height="18" rx="3" fill="#D94F42"/>
  <text x="9" y="13.5" text-anchor="middle" font-family="'Cabinet Grotesk','Satoshi',system-ui,sans-serif" font-weight="800" font-size="12" fill="white">A</text>
  <!-- M -->
  <rect x="21" y="0" width="18" height="18" rx="3" fill="#D94F42"/>
  <text x="30" y="13.5" text-anchor="middle" font-family="'Cabinet Grotesk','Satoshi',system-ui,sans-serif" font-weight="800" font-size="12" fill="white">M</text>
  <!-- S -->
  <rect x="42" y="0" width="18" height="18" rx="3" fill="#D94F42"/>
  <text x="51" y="13.5" text-anchor="middle" font-family="'Cabinet Grotesk','Satoshi',system-ui,sans-serif" font-weight="800" font-size="12" fill="white">S</text>
  <!-- T -->
  <rect x="63" y="0" width="18" height="18" rx="3" fill="#D94F42"/>
  <text x="72" y="13.5" text-anchor="middle" font-family="'Cabinet Grotesk','Satoshi',system-ui,sans-serif" font-weight="800" font-size="12" fill="white">T</text>
  <!-- R -->
  <rect x="84" y="0" width="18" height="18" rx="3" fill="#D94F42"/>
  <text x="93" y="13.5" text-anchor="middle" font-family="'Cabinet Grotesk','Satoshi',system-ui,sans-serif" font-weight="800" font-size="12" fill="white">R</text>
  <!-- O -->
  <rect x="105" y="0" width="18" height="18" rx="3" fill="#D94F42"/>
  <text x="114" y="13.5" text-anchor="middle" font-family="'Cabinet Grotesk','Satoshi',system-ui,sans-serif" font-weight="800" font-size="12" fill="white">O</text>
  <!-- N -->
  <rect x="126" y="0" width="18" height="18" rx="3" fill="#D94F42"/>
  <text x="135" y="13.5" text-anchor="middle" font-family="'Cabinet Grotesk','Satoshi',system-ui,sans-serif" font-weight="800" font-size="12" fill="white">N</text>
</svg>`;

function injectHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  // Split topbar (scrolls away) from header (sticky)
  // Inject topbar before site-header, then fill site-header with just the nav
  const topbarEl = document.createElement('div');
  topbarEl.className = 'topbar';
  topbarEl.innerHTML = `
    <a href="mailto:info@amstron.es">info@amstron.es</a>
    <span class="topbar__sep">―</span>
    <a href="tel:+34912177859">+34 912 177 859</a>
  `;
  el.parentElement.insertBefore(topbarEl, el);

  el.innerHTML = `
    <header class="header">
      <nav class="nav container">
        <a href="index.html" class="nav__logo" aria-label="Amstron inicio">
          ${AMSTRON_LOGO_SVG}
        </a>
        <ul class="nav__links" role="list">
          <li><a href="index.html">Inicio</a></li>
          <li><a href="sobre-nosotros.html">Sobre Nosotros</a></li>
          <li><a href="productos.html">Productos</a></li>
          <li><a href="bom.html">BOM Placas</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
        <div class="nav__actions">
          <a href="productos.html" class="btn btn--primary">Catálogo</a>
          <button class="nav__burger" aria-label="Abrir menú" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>
    <div class="nav__mobile" role="dialog" aria-label="Menú de navegación">
      <div class="nav__mobile-header">
        <a href="index.html">${AMSTRON_LOGO_SVG}</a>
        <button class="nav__mobile-close" aria-label="Cerrar menú">&times;</button>
      </div>
      <ul class="nav__mobile-links" role="list">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="sobre-nosotros.html">Sobre Nosotros</a></li>
        <li><a href="productos.html">Productos</a></li>
        <li><a href="bom.html">BOM Placas</a></li>
        <li><a href="contacto.html">Contacto</a></li>
      </ul>
      <div class="nav__mobile-cta">
        <a href="productos.html" class="btn btn--primary btn--lg" style="width:100%;justify-content:center;">Ver Catálogo</a>
      </div>
    </div>
  `;
}

function injectFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            ${AMSTRON_LOGO_SVG.replace(/fill="#D94F42"/g, 'fill="#F07065"')}
            <p class="footer__tagline">Distribuidor independiente de componentes electrónicos. Más de 25 años de experiencia en el sector.</p>
            <ul class="footer__contact-list">
              <li>
                <a href="mailto:info@amstron.es">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  info@amstron.es
                </a>
              </li>
              <li>
                <a href="tel:+34912177859">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.51-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                  +34 912 177 859
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Calle+del+Pinar+5+28006+Madrid" target="_blank" rel="noopener">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  C/ del Pinar 5, 28006 Madrid
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="footer__heading">Empresa</p>
            <ul class="footer__links">
              <li><a href="sobre-nosotros.html">Sobre Nosotros</a></li>
              <li><a href="sobre-nosotros.html#historia">Historia</a></li>
              <li><a href="sobre-nosotros.html#calidad">Calidad</a></li>
            </ul>
          </div>

          <div>
            <p class="footer__heading">Servicios</p>
            <ul class="footer__links">
              <li><a href="productos.html">Productos</a></li>
              <li><a href="productos.html">Catálogo de Productos</a></li>
              <li><a href="bom.html">BOM Placas Electrónicas</a></li>
              <li><a href="assets/docs/linecard-2021.pdf" download>Descargar Line Card (PDF)</a></li>
            </ul>
          </div>

          <div>
            <p class="footer__heading">Contacto</p>
            <ul class="footer__links">
              <li><a href="contacto.html">Formulario de contacto</a></li>
              <li><a href="mailto:info@amstron.es">Email directo</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} Amstron. Todos los derechos reservados.</span>
          <a href="https://www.amstron.es/wp-content/uploads/2019/05/CONDICIONES-GENERALES-VENTA.pdf" target="_blank" rel="noopener">Condiciones Generales de Venta</a>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
});
