#!/usr/bin/env node

/**
 * Sitemap Generator for Vite + React Router
 * Generates sitemap.xml for SEO optimization
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.env.VITE_SITE_URL || 'https://medusa-tattoo.com';

const routes = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/artists', changefreq: 'weekly', priority: '0.9' },
  { url: '/services', changefreq: 'monthly', priority: '0.9' },
  { url: '/gallery', changefreq: 'weekly', priority: '0.8' },
  { url: '/contact', changefreq: 'monthly', priority: '0.8' },
  { url: '/booking', changefreq: 'monthly', priority: '0.8' },
  { url: '/aftercare', changefreq: 'monthly', priority: '0.7' },
  { url: '/faq', changefreq: 'monthly', priority: '0.6' },
  { url: '/impressum', changefreq: 'yearly', priority: '0.3' },
  { url: '/datenschutz', changefreq: 'yearly', priority: '0.3' },
  { url: '/agb', changefreq: 'yearly', priority: '0.3' }
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, xml, 'utf8');
  
  console.log(`✅ Sitemap generated: ${outputPath}`);
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📄 Routes: ${routes.length}`);
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export default generateSitemap;