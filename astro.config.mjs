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
        applyMiArmarioV2();
        document.addEventListener('DOMContentLoaded', applyMiArmarioV2);
        window.addEventListener('pageshow', applyMiArmarioV2);
        window.setTimeout(applyMiArmarioV2, 250);
        new MutationObserver(applyMiArmarioV2).observe(document.documentElement, { childList: true, subtree: true });
      `);
    },
  },
};

export default defineConfig({
  site: 'https://conexionmetropoli.com',
  output: 'static',
  integrations: [carouselGradient],
});
