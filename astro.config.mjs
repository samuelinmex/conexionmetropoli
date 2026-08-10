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
              transition: color .22s ease, background .22s ease, box-shadow .22s ease, transform .22s ease;
            }

            .site-header .desktop-nav a.cm-nav-current {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 8px 13px;
              border-radius: 999px;
              color: #0b63ef !important;
              background: linear-gradient(135deg, rgba(22,111,255,.11), rgba(22,111,255,.045));
              box-shadow: inset 0 0 0 1px rgba(22,111,255,.16), 0 8px 22px rgba(22,111,255,.08);
              font-weight: 750;
            }

            .site-header .desktop-nav a.cm-nav-current::before {
              content: '';
              width: 5px;
              height: 5px;
              flex: 0 0 5px;
              border-radius: 999px;
              background: #166fff;
              box-shadow: 0 0 0 4px rgba(22,111,255,.10), 0 0 14px rgba(22,111,255,.38);
            }

            .site-header .desktop-nav a.cm-nav-current::after {
              content: '';
              position: absolute;
              left: 50%;
              bottom: -10px;
              width: 20px;
              height: 2px;
              border-radius: 999px;
              background: linear-gradient(90deg, transparent, #166fff, transparent);
              transform: translateX(-50%);
              opacity: .9;
            }

            .site-header .mobile-nav > a.cm-nav-current:not(.button) {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 11px 13px;
              border-radius: 13px;
              color: #0b63ef !important;
              background: rgba(22,111,255,.08);
              box-shadow: inset 3px 0 0 #166fff, inset 0 0 0 1px rgba(22,111,255,.10);
              font-weight: 800;
            }

            .site-header .mobile-nav > a.cm-nav-current:not(.button)::before {
              content: '';
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #166fff;
              box-shadow: 0 0 0 4px rgba(22,111,255,.10);
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
