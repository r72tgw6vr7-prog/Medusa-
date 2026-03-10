#!/usr/bin/env node

/**
 * Sitemap Generator for Vite + React Router
 * Generates sitemap.xml from App.tsx route definitions
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as ts from 'typescript';

const BASE_URL = process.env.VITE_SITE_URL || 'https://www.muenchen-tattoo-studio.de';
const APP_PATH = join(process.cwd(), 'src', 'App.tsx');
const OUTPUT_PATH = join(process.cwd(), 'public', 'sitemap.xml');
const CURRENT_DATE = new Date().toISOString().split('T')[0];

const ROUTE_EXCLUSIONS = new Set(['*']);

const normalizeRoute = (route) => {
  if (route === '/en') return '/';
  if (route.startsWith('/en/')) return route.slice(3);
  return route;
};

const getRouteMeta = (route) => {
  const normalized = normalizeRoute(route);

  if (normalized === '/') {
    return { changefreq: 'weekly', priority: '1.0' };
  }
  if (normalized.startsWith('/artists')) {
    return { changefreq: 'weekly', priority: '0.9' };
  }
  if (normalized.startsWith('/services')) {
    return { changefreq: 'monthly', priority: '0.9' };
  }
  if (normalized.startsWith('/gallery')) {
    return { changefreq: 'weekly', priority: '0.8' };
  }
  if (normalized.startsWith('/contact') || normalized.startsWith('/booking')) {
    return { changefreq: 'monthly', priority: '0.8' };
  }
  if (normalized.startsWith('/aftercare')) {
    return { changefreq: 'monthly', priority: '0.7' };
  }
  if (normalized.startsWith('/faq')) {
    return { changefreq: 'monthly', priority: '0.6' };
  }
  if (
    normalized.startsWith('/legal') ||
    normalized.startsWith('/impressum') ||
    normalized.startsWith('/datenschutz') ||
    normalized.startsWith('/agb')
  ) {
    return { changefreq: 'yearly', priority: '0.3' };
  }

  return { changefreq: 'monthly', priority: '0.5' };
};

const getJsxAttribute = (node, name) => {
  return node.attributes.properties.find(
    (prop) => ts.isJsxAttribute(prop) && prop.name.getText() === name,
  );
};

const getAttributeValue = (attr) => {
  if (!attr || !attr.initializer) return null;

  if (ts.isStringLiteral(attr.initializer)) {
    return attr.initializer.text;
  }

  if (
    ts.isJsxExpression(attr.initializer) &&
    attr.initializer.expression &&
    ts.isStringLiteral(attr.initializer.expression)
  ) {
    return attr.initializer.expression.text;
  }

  return null;
};

const isRedirectRoute = (attr, sourceFile) => {
  if (!attr || !attr.initializer) return false;

  if (ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
    return attr.initializer.expression.getText(sourceFile).includes('Navigate');
  }

  return false;
};

const collectRoutesFromApp = () => {
  const source = readFileSync(APP_PATH, 'utf8');
  const sourceFile = ts.createSourceFile(APP_PATH, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const routes = [];

  const visit = (node) => {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(sourceFile) === 'Route') {
      const pathAttr = getJsxAttribute(node, 'path');
      const elementAttr = getJsxAttribute(node, 'element');
      const pathValue = getAttributeValue(pathAttr);

      if (pathValue) {
        routes.push({
          path: pathValue,
          isRedirect: isRedirectRoute(elementAttr, sourceFile),
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return routes;
};

const generateSitemap = () => {
  const discoveredRoutes = collectRoutesFromApp();
  const routeMap = new Map();

  discoveredRoutes.forEach(({ path, isRedirect }) => {
    if (isRedirect) return;
    if (!path || ROUTE_EXCLUSIONS.has(path)) return;
    if (path.includes('*') || path.includes(':')) return;

    if (!routeMap.has(path)) {
      routeMap.set(path, getRouteMeta(path));
    }
  });

  const sortedRoutes = Array.from(routeMap.entries()).sort((a, b) => {
    if (a[0] === '/') return -1;
    if (b[0] === '/') return 1;
    return a[0].localeCompare(b[0]);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sortedRoutes
  .map(
    ([route, meta]) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  writeFileSync(OUTPUT_PATH, xml, 'utf8');

  console.log(`✅ Sitemap generated: ${OUTPUT_PATH}`);
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📄 Routes: ${sortedRoutes.length}`);
};

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  generateSitemap();
}

export default generateSitemap;
