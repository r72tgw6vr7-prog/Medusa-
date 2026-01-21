import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { parseStringPromise } from 'xml2js';

const root = process.cwd();
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
const outDir = path.join(root, 'reports', 'locale-scan');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(path.join(outDir, 'screenshots'))) fs.mkdirSync(path.join(outDir, 'screenshots'), { recursive: true });

async function getUrlsFromSitemap() {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const parsed = await parseStringPromise(xml);
  const urls = parsed.urlset.url.map((u: any) => u.loc[0]);
  return urls;
}

function slugFromUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/[\/?#]+/g, '_');
}

test.setTimeout(120000);

test('bilingual site scan', async ({ page, browser }) => {
  const urls = await getUrlsFromSitemap();
  const rows = [['url','element','de_text','en_text','issue','screenshot_de','screenshot_en']];

  for (const url of urls) {
    // navigate to page in German
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // ensure language cookie/localStorage is set to 'de'
    await page.evaluate(() => {
      try { localStorage.setItem('language', 'de'); document.documentElement.lang = 'de'; } catch (e) { }
    });
    await page.reload({ waitUntil: 'networkidle' });

    // capture German text
    const titleDe = await page.title();
    const metaDescDe = await page.evaluate(() => document.querySelector('meta[name="description"]')?.getAttribute('content') || '');
    const h1De = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
    const navDe = await page.evaluate(() => document.querySelector('nav')?.textContent || '');

    const screenshotDe = path.join(outDir, 'screenshots', `de_${slugFromUrl(url)}.png`);
    await page.screenshot({ path: screenshotDe, fullPage: true });

    // switch to English
    await page.evaluate(() => {
      try { localStorage.setItem('language', 'en'); document.documentElement.lang = 'en'; } catch (e) { }
    });
    await page.reload({ waitUntil: 'networkidle' });

    // capture English text
    const titleEn = await page.title();
    const metaDescEn = await page.evaluate(() => document.querySelector('meta[name="description"]')?.getAttribute('content') || '');
    const h1En = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
    const navEn = await page.evaluate(() => document.querySelector('nav')?.textContent || '');

    const screenshotEn = path.join(outDir, 'screenshots', `en_${slugFromUrl(url)}.png`);
    await page.screenshot({ path: screenshotEn, fullPage: true });

    // Compare basic elements
    if (titleDe === titleEn) rows.push([url,'title',titleDe,titleEn,'identical_title',screenshotDe,screenshotEn]);
    if (!metaDescEn && metaDescDe) rows.push([url,'meta.description',metaDescDe,metaDescEn,'missing_en_meta',screenshotDe,screenshotEn]);
    if (h1De === h1En) rows.push([url,'h1',h1De,h1En,'identical_h1',screenshotDe,screenshotEn]);
    if (navDe === navEn) rows.push([url,'nav',navDe,navEn,'identical_nav',screenshotDe,screenshotEn]);

    // Add a row if any empty or clearly untranslated fields
    if (!h1En && h1De) rows.push([url,'h1',h1De,h1En,'missing_en_h1',screenshotDe,screenshotEn]);

  }

  // Write CSV
  const csv = rows.map(r => r.map(cell => `"${(cell||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
  fs.writeFileSync(path.join(outDir, 'locale-scan.csv'), csv, 'utf8');
  console.log('Locale scan written to', path.join(outDir, 'locale-scan.csv'));

});
