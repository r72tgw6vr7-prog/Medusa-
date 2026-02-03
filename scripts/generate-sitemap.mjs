#!/usr/bin/env node

/**
 * Legacy entry point. Use scripts/generate-sitemap.js
 */

import generateSitemap from './generate-sitemap.js';

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export default generateSitemap;