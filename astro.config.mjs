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
             * Active navigation: premium translucent glass.
             * Every desktop item keeps identical geometry, so the active state
             * never changes menu width, spacing or vertical alignment.
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
              white-space: nowrap;
              color: inherit;
              font-weight: 750;
              background: transparent;
              background-size: 240% 100%;
              box-shadow: inset 0 0 0 1px transparent, 0 8px 24px transparent;
              backdrop-filter: blur(0) saturate(1);
              -webkit-backdrop-filter: blur(0) saturate(1);
              transition:
                color .24s ease,
                background-color .24s ease,
                box-shadow .28s ease,
                filter .28s ease;
            }

            /* Reserve the dot's exact space on every item to prevent reflow. */
            .site-header .desktop-nav a::before {
              content: '';
              width: 5px;
              height: 5px;
              flex: 0 0 5px;
              border-radius: 999px;
              background: transparent;
              box-shadow: 0 0 0 0 rgba(22,111,255,0);
              opacity: 0;
              transform: scale(.55);
            }

            .site-header .desktop-nav a.cm-nav-current {
              color: #0b63ef !important;
              background:
                linear-gradient(112deg,
                  rgba(255,255,255,.68) 0%,
                  rgba(238,246,255,.62) 18%,
                  rgba(22,111,255,.12) 38%,
                  rgba(255,255,255,.58) 51%,
                  rgba(22,111,255,.075) 72%,
                  rgba(255,255,255,.46) 100%);
              background-size: 230% 100%;
              box-shadow:
                inset 0 0 0 1px rgba(22,111,255,.17),
                inset 0 1px 0 rgba(255,255,255,.82),
                0 9px 26px rgba(22,111,255,.085),
                0 0 0 1px rgba(255,255,255,.28);
              backdrop-filter: blur(12px) saturate(1.18);
              -webkit-backdrop-filter: blur(12px) saturate(1.18);
              animation:
                cm-nav-glass-in .62s cubic-bezier(.16,1,.3,1) both,
                cm-nav-glass-flow 5.8s 1s ease-in-out infinite,
                cm-nav-glass-breathe 4.4s 1.15s ease-in-out infinite;
              isolation: isolate;
            }

            .site-header .desktop-nav a.cm-nav-current::before {
              background: #166fff;
              opacity: 1;
              box-shadow:
                0 0 0 4px rgba(22,111,255,.10),
                0 0 15px rgba(22,111,255,.42);
              animation:
                cm-nav-dot-in .52s .08s cubic-bezier(.16,1,.3,1) both,
                cm-nav-dot-pulse 3.2s .8s ease-in-out infinite;
            }

            .site-header .desktop-nav a.cm-nav-current::after {
              content: '' !important;
              position: absolute !important;
              left: 50% !important;
              right: auto !important;
              bottom: -10px !important;
              width: 28px !important;
              height: 2px !important;
              border-radius: 999px !important;
              background: linear-gradient(90deg,
                transparent 0%,
                rgba(22,111,255,.25) 14%,
                #166fff 38%,
                #6fb0ff 50%,
                #166fff 62%,
                rgba(22,111,255,.25) 86%,
                transparent 100%) !important;
              transform: translateX(-50%) scaleX(1) !important;
              transform-origin: center !important;
              box-shadow: 0 0 12px rgba(22,111,255,.34);
              opacity: .95 !important;
              pointer-events: none;
              animation: cm-nav-line-in .58s .12s cubic-bezier(.16,1,.3,1) both;
            }

            .site-header .desktop-nav a.cm-nav-current:hover {
              box-shadow:
                inset 0 0 0 1px rgba(22,111,255,.23),
                inset 0 1px 0 rgba(255,255,255,.9),
                0 11px 30px rgba(22,111,255,.12),
                0 0 0 1px rgba(255,255,255,.34);
              filter: saturate(1.05);
            }

            .site-header .desktop-nav a:not(.cm-nav-current):hover {
              color: #0b63ef;
              background: rgba(22,111,255,.035);
              box-shadow: inset 0 0 0 1px rgba(22,111,255,.065), 0 7px 18px rgba(22,111,255,.035);
            }

            @keyframes cm-nav-glass-in {
              0% {
                opacity: .58;
                background-position: 100% 50%;
                box-shadow:
                  inset 0 0 0 1px rgba(22,111,255,.05),
                  inset 0 1px 0 rgba(255,255,255,.3),
                  0 5px 14px rgba(22,111,255,0),
                  0 0 0 1px rgba(255,255,255,.08);
              }
              100% {
                opacity: 1;
                background-position: 52% 50%;
              }
            }

            @keyframes cm-nav-glass-flow {
              0%, 100% { background-position: 8% 50%; }
              50% { background-position: 92% 50%; }
            }

            @keyframes cm-nav-glass-breathe {
              0%, 100% {
                box-shadow:
                  inset 0 0 0 1px rgba(22,111,255,.16),
                  inset 0 1px 0 rgba(255,255,255,.82),
                  0 9px 26px rgba(22,111,255,.075),
                  0 0 0 1px rgba(255,255,255,.28);
              }
              50% {
                box-shadow:
                  inset 0 0 0 1px rgba(22,111,255,.21),
                  inset 0 1px 0 rgba(255,255,255,.92),
                  0 10px 31px rgba(22,111,255,.12),
                  0 0 0 1px rgba(255,255,255,.36);
              }
            }

            @keyframes cm-nav-dot-in {
              0% { opacity: 0; transform: scale(.35); }
              72% { opacity: 1; transform: scale(1.22); }
              100% { opacity: 1; transform: scale(1); }
            }

            @keyframes cm-nav-dot-pulse {
              0%, 100% {
                box-shadow: 0 0 0 4px rgba(22,111,255,.09), 0 0 14px rgba(22,111,255,.34);
              }
              50% {
                box-shadow: 0 0 0 5px rgba(22,111,255,.12), 0 0 18px rgba(22,111,255,.5);
              }
            }

            @keyframes cm-nav-line-in {
              0% { opacity: 0; transform: translateX(-50%) scaleX(.08); filter: blur(3px); }
              70% { opacity: 1; transform: translateX(-50%) scaleX(1.12); filter: blur(0); }
              100% { opacity: .95; transform: translateX(-50%) scaleX(1); filter: blur(0); }
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
              opacity: 0;
            }

            .site-header .mobile-nav > a.cm-nav-current:not(.button) {
              color: #0b63ef !important;
              background: linear-gradient(135deg, rgba(255,255,255,.80), rgba(22,111,255,.075));
              box-shadow:
                inset 3px 0 0 #166fff,
                inset 0 0 0 1px rgba(22,111,255,.10),
                0 7px 20px rgba(22,111,255,.055);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
            }

            .site-header .mobile-nav > a.cm-nav-current:not(.button)::before {
              background: #166fff;
              opacity: 1;
              box-shadow: 0 0 0 4px rgba(22,111,255,.10), 0 0 13px rgba(22,111,255,.32);
              animation: cm-nav-dot-in .48s cubic-bezier(.16,1,.3,1) both;
            }

            @media (max-width: 1100px) and (min-width: 901px) {
              .site-header .desktop-nav { gap: 12px; }
              .site-header .desktop-nav a {
                padding-inline: 10px;
                gap: 6px;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .site-header .desktop-nav a,
              .site-header .desktop-nav a::before,
              .site-header .desktop-nav a::after,
              .site-header .mobile-nav > a:not(.button),
              .site-header .mobile-nav > a:not(.button)::before {
                animation: none !important;
                transition: none !important;
              }
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
