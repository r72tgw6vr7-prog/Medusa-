/**
 * Pre-render SEO Meta Tags for Static Routes
 *
 * Generates per-route HTML files with correct <title>, description, OG, and
 * Twitter meta tags baked into the HTML.  This runs as a pure Node.js script
 * after `vite build` — no browser / Puppeteer required, so it works
 * everywhere including Vercel's build environment.
 *
 * How it works:
 *   1. Reads the built dist/index.html (the SPA shell)
 *   2. For every known route, swaps in the correct meta tags
 *   3. Writes dist/<route>/index.html so the static file server
 *      delivers the right meta to crawlers & social-media bots
 *   4. React hydrates and takes over on the client as usual
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const BASE_URL = 'https://www.muenchen-tattoo-studio.de';
const OG_IMAGE = `${BASE_URL}/assets/images/og/og-image.jpg`;
const SITE_NAME = 'Medusa Tattoo München';

// ---------------------------------------------------------------------------
// Route → meta-tag map  (DE = German primary, EN = English alternate)
// ---------------------------------------------------------------------------

const DE_META = {
    '/': {
        title: 'Medusa Tattoo München – Premium Tattoo & Piercing Studio am Marienplatz',
        description:
            'Premium Tattoo- und Piercing-Studio in München. Beratung, transparente Preise, höchste Hygiene und erfahrene Artists.',
    },
    '/services/tattoos': {
        title: 'Medusa Tattoo München | Leistungen – Tattoo',
        description:
            'Tattoo- und Piercing-Leistungen – transparente Preise, Beratung und höchste Hygienestandards.',
    },
    '/services/piercings': {
        title: 'Medusa Tattoo München | Leistungen – Piercing',
        description:
            'Professionelles Piercing-Studio in München – höchste Hygiene, erfahrene Piercer und transparente Preise.',
    },
    '/artists': {
        title: 'Medusa Tattoo München | Künstler',
        description:
            'Lernen Sie unser Team aus spezialisierten Tattoo-Künstlern kennen. Portfolios und Termine.',
    },
    '/about': {
        title: 'Über uns | Medusa Tattoo München',
        description:
            'Über Medusa Tattoo München – Founder-geführte Piercing-Expertise, Hygiene und fortgeschrittene Implantat-Techniken.',
    },
    '/gallery': {
        title: 'Galerie | Medusa Tattoo München',
        description:
            'Eine Auswahl unserer Arbeiten – entdecken Sie Stile und Inspiration.',
    },
    '/booking': {
        title: 'Termin vereinbaren | Medusa Tattoo München',
        description:
            'Vereinbaren Sie einen Beratungstermin für Ihr nächstes Tattoo oder Piercing.',
    },
    '/faq': {
        title: 'FAQ | Medusa Tattoo München',
        description: 'Antworten zu Termin, Pflege, Preisen und Hygiene.',
    },
    '/contact': {
        title: 'Kontakt | Medusa Tattoo München',
        description: 'Kontakt – Adresse, Telefon, E-Mail und Öffnungszeiten.',
    },
    '/aftercare': {
        title: 'Nachsorge Anleitung | Medusa Tattoo München',
        description:
            'Professioneller Nachsorge-Guide für Tattoos und Piercings mit Heilungsphasen und Warnzeichen.',
    },
    '/legal': {
        title: 'Allgemeine Geschäftsbedingungen | Medusa Tattoo München',
        description:
            'Allgemeine Geschäftsbedingungen für Tattoo- und Piercing-Leistungen in München.',
    },
    '/impressum': {
        title: 'Impressum | Medusa Tattoo München',
        description:
            'Rechtliche Angaben und Unternehmensinformationen für Medusa Tattoo & Piercing Studio.',
    },
    '/datenschutz': {
        title: 'Datenschutzerklärung | Medusa Tattoo München',
        description:
            'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
    },
    '/agb': {
        title: 'AGB | Medusa Tattoo München',
        description: 'Allgemeine Geschäftsbedingungen für Leistungen und Buchungen.',
    },
};

const EN_META = {
    '/en': {
        title: 'Medusa Tattoo Munich – Premium Tattoo & Piercing Studio in Munich',
        description:
            'Premium tattoo and piercing studio in Munich. Consultation, transparent pricing, highest hygiene standards and experienced artists.',
    },
    '/en/services/tattoos': {
        title: 'Medusa Tattoo Munich | Services – Tattoo',
        description:
            'Tattoo and piercing services – transparent pricing, consultation and hygiene standards.',
    },
    '/en/services/piercings': {
        title: 'Medusa Tattoo Munich | Services – Piercing',
        description:
            'Professional piercing studio in Munich – highest hygiene, experienced piercers and transparent pricing.',
    },
    '/en/artists': {
        title: 'Medusa Tattoo Munich | Artists',
        description:
            'Meet our team of specialized tattoo artists. Portfolios and booking information.',
    },
    '/en/about': {
        title: 'About | Medusa Tattoo Munich',
        description:
            'About Medusa Tattoo Munich — founder-led piercing expertise, strict hygiene standards, and advanced implant techniques.',
    },
    '/en/gallery': {
        title: 'Gallery | Medusa Tattoo Munich',
        description:
            'A collection of works from our artists – explore styles and inspiration.',
    },
    '/en/booking': {
        title: 'Book Appointment | Medusa Tattoo Munich',
        description: 'Schedule a consultation for your next tattoo or piercing.',
    },
    '/en/faq': {
        title: 'FAQ | Medusa Tattoo Munich',
        description: 'Answers about appointments, aftercare, pricing and hygiene.',
    },
    '/en/contact': {
        title: 'Contact | Medusa Tattoo Munich',
        description: 'Contact us — address, phone, email and opening hours.',
    },
};

const ALL_ROUTES = { ...DE_META, ...EN_META };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Replace or inject meta tags into the HTML template.
 * Works by swapping known patterns inside <head>.
 */
function injectMeta(html, routePath, { title, description }) {
    const url = `${BASE_URL}${routePath}`;
    const locale = routePath.startsWith('/en') ? 'en_US' : 'de_DE';
    const altLocale = locale === 'de_DE' ? 'en_US' : 'de_DE';
    const hreflangSelf = locale === 'de_DE' ? 'de' : 'en';
    const hreflangAlt = locale === 'de_DE' ? 'en' : 'de';

    // Build the alternate path for hreflang
    let altPath;
    if (routePath.startsWith('/en')) {
        altPath = routePath.replace(/^\/en/, '') || '/';
    } else {
        altPath = `/en${routePath === '/' ? '' : routePath}`;
    }
    const altUrl = `${BASE_URL}${altPath}`;

    const safeTitle = escapeHtml(title);
    const safeDesc = escapeHtml(description);

    // 1. Replace <title>
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);

    // 2. Replace meta description
    html = html.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${safeDesc}">`,
    );

    // 3. Replace canonical
    html = html.replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
        `<link rel="canonical" href="${escapeHtml(url)}">`,
    );

    // 4. Inject OG + Twitter + hreflang right after canonical (if not already present)
    const ogBlock = [
        '',
        `    <!-- Open Graph (route-specific) -->`,
        `    <meta property="og:type" content="website">`,
        `    <meta property="og:url" content="${escapeHtml(url)}">`,
        `    <meta property="og:site_name" content="${SITE_NAME}">`,
        `    <meta property="og:title" content="${safeTitle}">`,
        `    <meta property="og:description" content="${safeDesc}">`,
        `    <meta property="og:image" content="${OG_IMAGE}">`,
        `    <meta property="og:image:width" content="1200">`,
        `    <meta property="og:image:height" content="630">`,
        `    <meta property="og:locale" content="${locale}">`,
        `    <meta property="og:locale:alternate" content="${altLocale}">`,
        '',
        `    <!-- Twitter Card (route-specific) -->`,
        `    <meta name="twitter:card" content="summary_large_image">`,
        `    <meta name="twitter:site" content="@medusa_tattoo_munich">`,
        `    <meta name="twitter:title" content="${safeTitle}">`,
        `    <meta name="twitter:description" content="${safeDesc}">`,
        `    <meta name="twitter:image" content="${OG_IMAGE}">`,
        '',
        `    <!-- Hreflang -->`,
        `    <link rel="alternate" hreflang="${hreflangSelf}" href="${escapeHtml(url)}">`,
        `    <link rel="alternate" hreflang="${hreflangAlt}" href="${escapeHtml(altUrl)}">`,
        `    <link rel="alternate" hreflang="x-default" href="${escapeHtml(url)}">`,
    ].join('\n');

    // Remove any existing OG/Twitter/hreflang blocks from the template
    html = html.replace(/\s*<!-- Open Graph \(route-specific\) -->[\s\S]*?hreflang="x-default"[^>]*>/g, '');
    html = html.replace(/\s*<!-- Open Graph -->[\s\S]*?<!-- Hreflang -->[\s\S]*?hreflang="x-default"[^>]*>/g, '');
    // Remove individual OG, Twitter, hreflang tags that may exist outside the blocks
    html = html.replace(/\s*<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>/g, '');
    html = html.replace(/\s*<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*\/?>/g, '');
    html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>/g, '');

    // Insert after canonical link
    html = html.replace(
        /(<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>)/,
        `$1\n${ogBlock}`,
    );

    return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
    const indexPath = path.join(DIST, 'index.html');

    if (!fs.existsSync(indexPath)) {
        console.error('❌ dist/index.html not found. Run `vite build` first.');
        process.exit(1);
    }

    const template = fs.readFileSync(indexPath, 'utf-8');
    let generated = 0;

    for (const [routePath, meta] of Object.entries(ALL_ROUTES)) {
        // Skip the root — it's already dist/index.html
        if (routePath === '/') {
            // Still inject proper OG tags into the root index.html
            const rootHtml = injectMeta(template, '/', meta);
            fs.writeFileSync(indexPath, rootHtml, 'utf-8');
            generated++;
            continue;
        }

        const dir = path.join(DIST, routePath);
        const filePath = path.join(dir, 'index.html');

        fs.mkdirSync(dir, { recursive: true });
        const html = injectMeta(template, routePath, meta);
        fs.writeFileSync(filePath, html, 'utf-8');
        generated++;
    }

    console.log(`✅ Pre-rendered ${generated} route(s) with SEO meta tags`);

    // List what was generated
    for (const routePath of Object.keys(ALL_ROUTES)) {
        const rel = routePath === '/' ? '/index.html' : `${routePath}/index.html`;
        console.log(`   ${routePath} → dist${rel}`);
    }
}

main().catch((err) => {
    console.error('❌ Prerender failed:', err);
    process.exit(1);
});
