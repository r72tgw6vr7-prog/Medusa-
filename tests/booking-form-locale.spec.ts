import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

const de = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'locales', 'de.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'locales', 'en.json'), 'utf8'));

const outDir = path.join(process.cwd(), 'reports', 'locale-scan');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Run separate tests for each language to avoid page context issues
for (const lang of ['de', 'en'] as const) {
  test(`booking form localization check (${lang})`, async ({ page }) => {
    const expected = lang === 'de' ? de : en;

    // Navigate to booking page
    await page.goto('/booking', { waitUntil: 'networkidle' });

    // Set language in localStorage and reload
    await page.evaluate((l) => {
      localStorage.setItem('language', l);
      document.documentElement.lang = l;
    }, lang);
    await page.reload({ waitUntil: 'networkidle' });

    // Wait for the booking modal to be visible
    await expect(page.locator('.booking-modal-mobile')).toBeVisible({ timeout: 10000 });

    // Verify service cards are present
    const serviceCards = page.locator('.service-card');
    await expect(serviceCards).toHaveCount(2);

    // Click on the first service (Tattoo)
    await serviceCards.first().click();

    // Click the "Next" button to proceed to personal details step
    const nextButton = page.locator('button', { hasText: expected.booking?.modal?.next || 'Weiter' });
    await expect(nextButton).toBeVisible({ timeout: 5000 });
    await nextButton.click();

    // Wait for the personal details form to appear
    await expect(page.locator('#name')).toBeVisible({ timeout: 10000 });

    // Check placeholders are localized correctly
    const namePlaceholder = await page.locator('#name').getAttribute('placeholder');
    const emailPlaceholder = await page.locator('#email').getAttribute('placeholder');

    // Verify placeholders match expected translations
    expect(namePlaceholder).toBe(expected.booking?.placeholders?.name);
    expect(emailPlaceholder).toBe(expected.booking?.placeholders?.email);

    // Take a screenshot for documentation
    await page.screenshot({
      path: path.join(outDir, `booking_${lang}.png`),
      fullPage: true,
    });
  });
}
