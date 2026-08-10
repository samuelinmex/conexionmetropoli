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
            /*
             * Misma estética del commit 460c158, pero sin reflow:
             * TODOS los enlaces reservan desde el inicio el espacio de la cápsula
             * y del punto. El activo únicamente cambia color/fondo/sombra.
             */
            .site-header .desktop-nav {
              align-items: center;
            }

            .site-header .desktop-nav a {
              position: relative;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 8px 13px;
              border-radius: 999px;
              background: transparent;
              box-shadow: inset 0 0 0 1px transparent, 0 8px 22px transparent;
              color: inherit;
              font-weight: 750;
              white-space: nowrap;
              transition: color .22s ease, background .22s ease, box-shadow .22s ease;
            }

            /* Reserva exactamente el lugar que ocupaba el punto original. */
            .site-header .desktop-nav a::before {
              content: '';
              width: 5px;
              height: 5px;
              flex: 0 0 5px;
              border-radius: 999px;
              background: transparent;
              box-shadow: none;
              transition: background .22s ease, box-shadow .22s ease;
            }

            .site-header .desktop-nav a.cm-nav-current {
              color: #0b63ef !important;
              background: linear-gradient(135deg, rgba(22,111,255,.11), rgba(22,111,255,.045));
              box-shadow: inset 0 0 0 1px rgba(22,111,255,.16), 0 8px 22px rgba(22,111,255,.08);
            }

            .site-header .desktop-nav a.cm-nav-current::before {
              background: #166fff;
              box-shadow: 0 0 0 4px rgba(22,111,255,.10), 0 0 14px rgba(22,111,255,.38);
            }

            .site-header .desktop-nav a.cm-nav-current::after {
              content: '' !important;
              position: absolute !important;
              left: 50% !important;
              right: auto !important;
              bottom: -10px !important;
              width: 20px !important;
              height: 2px !important;
              border-radius: 999px !important;
              background: linear-gradient(90deg, transparent, #166fff, transparent) !important;
              transform: translateX(-50%) !important;
              opacity: .9 !important;
              pointer-events: none;
            }

            /* Mantiene el hover original sin afectar las dimensiones. */
            .site-header .desktop-nav a:not(.cm-nav-current):hover {
              color: #0b63ef;
              background: rgba(22,111,255,.035);
              box-shadow: inset 0 0 0 1px rgba(22,111,255,.07), 0 7px 18px rgba(22,111,255,.035);
            }

            .site-header .mobile-nav > a:not(.button) {
              position: relative;
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 11px 13px;
              border-radius: 13px;
              font-weight: 800;
              transition: color .22s ease, background .22s ease, box-shadow .22s ease;
            }

            .site-header .mobile-nav > a:not(.button)::before {
              content: '';
              width: 6px;
              height: 6px;
              flex: 0 0 6px;
              border-radius: 50%;
              background: transparent;
              box-shadow: none;
            }

            .site-header .mobile-nav > a.cm-nav-current:not(.button) {
              color: #0b63ef !important;
              background: rgba(22,111,255,.08);
              box-shadow: inset 3px 0 0 #166fff, inset 0 0 0 1px rgba(22,111,255,.10);
            }

            .site-header .mobile-nav > a.cm-nav-current:not(.button)::before {
              background: #166fff;
              box-shadow: 0 0 0 4px rgba(22,111,255,.10);
            }

            @media (max-width: 1100px) and (min-width: 901px) {
              .site-header .desktop-nav {
                gap: 12px;
              }
              .site-header .desktop-nav a {
                padding-inline: 10px;
                gap: 6px;
              }
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
