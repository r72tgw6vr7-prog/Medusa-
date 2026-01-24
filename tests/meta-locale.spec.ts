import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
const de = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'locales', 'de.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'locales', 'en.json'), 'utf8'));

const outDir = path.join(process.cwd(), 'reports', 'locale-scan');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { path: '/', key: 'home' },
  { path: '/services', key: 'services' },
  { path: '/artists', key: 'artists' },
  { path: '/gallery', key: 'gallery' },
  { path: '/booking', key: 'booking' },
  { path: '/contact', key: 'contact' },
  { path: '/faq', key: 'faq' },
];

test.setTimeout(120000);

test('meta and SEO checks per locale', async ({ page }) => {
  const results: any[] = [];
  for (const lang of ['de', 'en']) {
    const expected = lang === 'de' ? de : en;

    for (const p of pages) {
      const base = process.env.E2E_BASE || 'http://localhost:5173';
      const localizedPath =
        lang === 'en' ? (p.path === '/' ? '/en' : `/en${p.path}`) : p.path;
      const url = `${base}${localizedPath}`;
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      // Set language via localStorage and reload so app picks it up
      await page.evaluate((l) => {
        try { localStorage.setItem('language', l); document.documentElement.lang = l; } catch (e) {}
      }, lang);
      await page.reload({ waitUntil: 'networkidle' });

      const title = await page.title();
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content').catch(() => '');
      const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content').catch(() => '');
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content').catch(() => '');
      const breadcrumbJson = await page.locator('script[type="application/ld+json"]').allTextContents().catch(() => []);
      const imgs = await page.locator('img').all();
      const imgCount = imgs.length;
      let anyNonEmptyAlt = false;
      for (const img of imgs) {
        const alt = await img.getAttribute('alt').catch(() => '');
        if (alt && alt.trim().length > 0) {
          anyNonEmptyAlt = true;
          break;
        }
      }

      const expectedTitle = expected.meta?.[p.key]?.title || '';
      const expectedDesc = expected.meta?.[p.key]?.description || '';

      results.push({
        lang,
        path: p.path,
        title,
        expectedTitle,
        metaDescription,
        expectedDesc,
        ogLocale,
        ogImage,
        breadcrumbJsonPresent: breadcrumbJson.some((s: string) => s.includes('BreadcrumbList')),
        imgCount,
        anyNonEmptyAlt,
      });

      // Basic assertions
      expect(title).toBeTruthy();
      expect(metaDescription).toBeTruthy();
      expect(ogImage).toBeTruthy();
      if (imgCount > 0) expect(anyNonEmptyAlt).toBeTruthy();
      expect(ogLocale).toBe(lang === 'de' ? 'de_DE' : 'en_US');

      // If translations exist in locales, assert title/description match
      if (expectedTitle) expect(title).toContain(expectedTitle.split('|')[0].trim());
      if (expectedDesc) expect(metaDescription).toContain(expectedDesc.split('.')[0].trim());

      // small delay to avoid overloading the server
      await page.waitForTimeout(200);
    }
  }

  fs.writeFileSync(path.join(outDir, 'meta-locale.json'), JSON.stringify(results, null, 2), 'utf8');
});
