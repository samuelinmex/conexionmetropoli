import { defineConfig } from 'astro/config';

const carouselGradient = {
  name: 'conexion-metropoli-carousel-gradient',
  hooks: {
    'astro:config:setup': ({ injectScript }) => {
      injectScript('page-ssr', 'import "/src/styles/carousel-gradient.css";');
      injectScript('page', `
        const applyMiArmarioV2 = () => {
          document.querySelectorAll('img').forEach((img) => {
            const alt = (img.getAttribute('alt') || '').toLowerCase();
            const src = img.getAttribute('src') || '';
            if (alt.includes('mi armario cancún') || alt.includes('mi armario cancun') || src.includes('miarmario-story')) {
              const next = '/assets/miarmario-story-v2.png?v=12';
              if (img.getAttribute('src') !== next) img.setAttribute('src', next);
              img.removeAttribute('srcset');
            }
          });
        };

        const ensureNavigationIndicatorStyles = () => {
          if (document.getElementById('cm-navigation-indicator-styles')) return;
          const style = document.createElement('style');
          style.id = 'cm-navigation-indicator-styles';
          style.textContent = \`
            .site-header .desktop-nav a,
            .site-header .mobile-nav > a:not(.button) {
              position: relative;
              transition: color .22s ease, opacity .22s ease;
            }

            /* El estado activo NO altera padding, gap, ancho, alto ni peso tipográfico. */
            .site-header .desktop-nav a.cm-nav-current {
              color: #0b63ef !important;
              isolation: isolate;
            }

            .site-header .desktop-nav a.cm-nav-current::before {
              content: '';
              position: absolute;
              z-index: -1;
              left: -11px;
              right: -11px;
              top: -7px;
              bottom: -7px;
              border-radius: 999px;
              background: linear-gradient(135deg, rgba(22,111,255,.10), rgba(22,111,255,.035));
              box-shadow: inset 0 0 0 1px rgba(22,111,255,.13), 0 7px 20px rgba(22,111,255,.06);
              pointer-events: none;
            }

            .site-header .desktop-nav a.cm-nav-current::after {
              content: '' !important;
              position: absolute !important;
              left: 50% !important;
              right: auto !important;
              bottom: -9px !important;
              width: 22px !important;
              height: 2px !important;
              border-radius: 999px !important;
              background: linear-gradient(90deg, transparent, #166fff 28%, #166fff 72%, transparent) !important;
              transform: translateX(-50%) !important;
              box-shadow: 0 0 10px rgba(22,111,255,.28);
              opacity: .95;
              pointer-events: none;
            }

            .site-header .mobile-nav > a.cm-nav-current:not(.button) {
              color: #0b63ef !important;
              background: rgba(22,111,255,.07);
              box-shadow: inset 3px 0 0 #166fff, inset 0 0 0 1px rgba(22,111,255,.09);
              border-radius: 12px;
            }

            .site-header .mobile-nav > a.cm-nav-current:not(.button)::before {
              content: '';
              position: absolute;
              left: 7px;
              top: 50%;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: #166fff;
              transform: translateY(-50%);
              box-shadow: 0 0 0 4px rgba(22,111,255,.09);
            }

            @media (prefers-reduced-motion: reduce) {
              .site-header .desktop-nav a,
              .site-header .mobile-nav > a:not(.button) { transition: none !important; }
            }
          \`;
          document.head.appendChild(style);
        };

        const applyNavigationIndicator = () => {
          ensureNavigationIndicatorStyles();
          const normalizePath = (path) => {
            if (!path || path === '/') return '/';
            return path.replace(/\\/+$/, '');
          };
          const currentPath = normalizePath(window.location.pathname);
          document.querySelectorAll('.desktop-nav a, .mobile-nav > a:not(.button)').forEach((link) => {
            if (!(link instanceof HTMLAnchorElement)) return;
            const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
            const isCurrent = linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath + '/'));
            link.classList.toggle('cm-nav-current', isCurrent);
            if (isCurrent) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
          });
        };

        applyMiArmarioV2();
        applyNavigationIndicator();
        document.addEventListener('DOMContentLoaded', () => {
          applyMiArmarioV2();
          applyNavigationIndicator();
        });
        window.addEventListener('pageshow', () => {
          applyMiArmarioV2();
          applyNavigationIndicator();
        });
        window.setTimeout(() => {
          applyMiArmarioV2();
          applyNavigationIndicator();
        }, 250);
        new MutationObserver(() => {
          applyMiArmarioV2();
          applyNavigationIndicator();
        }).observe(document.documentElement, { childList: true, subtree: true });
      `);
    },
  },
};

export default defineConfig({
  site: 'https://conexionmetropoli.com',
  output: 'static',
  integrations: [carouselGradient],
});
