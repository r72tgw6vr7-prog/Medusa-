const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', (msg) => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err));
  page.on('crash', () => console.log('PAGE CRASHED'));
  page.on('close', () => console.log('PAGE CLOSED'));

  await context.addInitScript({ content: `localStorage.setItem('language', 'de'); document.documentElement.lang='de';` });
  await page.goto('http://localhost:5173/booking', { waitUntil: 'domcontentloaded' });
  console.log('Loaded');
  await page.waitForSelector('.service-card', { timeout: 20000 });
  console.log('Found service card');
  await page.locator('.service-card').first().click();
  console.log('Clicked service card');
  await page.waitForSelector('button:has-text("Weiter")', { timeout: 10000 });
  await page.locator('button:has-text("Weiter")').first().click();
  console.log('Clicked Weiter');

  // wait a bit
  await page.waitForTimeout(5000);
  await browser.close();
})();