import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';

const outDir = path.join(process.cwd(), 'reports', 'locale-scan');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

test('404 content localization', async ({ page }) => {
  const url = 'https://www.muenchen-tattoo-studio.de/this-page-does-not-exist';
  const results: any[] = [];

  for (const lang of ['de', 'en']) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.evaluate((l) => { localStorage.setItem('language', l); document.documentElement.lang = l; }, lang);
    await page.reload({ waitUntil: 'networkidle' });

    const heading = await page.locator('h1').first().textContent().catch(() => '');
    const bodyText = await page.locator('main').first().textContent().catch(() => '');

    results.push({ lang, heading: heading?.trim(), bodyText: (bodyText||'').trim() });
    await page.screenshot({ path: path.join(outDir, `404_${lang}.png`), fullPage: true }).catch(()=>{});
  }

  fs.writeFileSync(path.join(outDir, '404-pages.json'), JSON.stringify(results, null, 2), 'utf8');
});
