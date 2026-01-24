import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';

const outDir = path.join(process.cwd(), 'reports', 'locale-scan');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

test('404 content localization', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  const baseURL =
    typeof testInfo.project.use.baseURL === 'string'
      ? testInfo.project.use.baseURL
      : 'http://localhost:5173';
  const url = new URL('/this-page-does-not-exist', baseURL).toString();
  const results: any[] = [];

  for (const lang of ['de', 'en']) {
    await page.goto(url, { waitUntil: 'commit' });
    await page.locator('h1').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await page.evaluate((l) => { localStorage.setItem('language', l); document.documentElement.lang = l; }, lang);
    await page.reload({ waitUntil: 'commit' });
    await page.locator('h1').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(200);

    const heading = await page.locator('h1').first().textContent().catch(() => '');
    const bodyText = await page
      .locator('main, body')
      .first()
      .textContent({ timeout: 1000 })
      .catch(() => '');

    results.push({ lang, heading: heading?.trim(), bodyText: (bodyText||'').trim() });
    await page.screenshot({ path: path.join(outDir, `404_${lang}.png`), fullPage: false }).catch(()=>{});
  }

  fs.writeFileSync(path.join(outDir, '404-pages.json'), JSON.stringify(results, null, 2), 'utf8');
});
