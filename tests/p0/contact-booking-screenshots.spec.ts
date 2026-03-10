import { test, expect } from '@playwright/test';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ARTIFACTS_DIR = path.join(process.cwd(), 'tests/p0/artifacts');

async function ensureArtifactsDir() {
  await fs.mkdir(ARTIFACTS_DIR, { recursive: true });
}

test.describe('Contact vs Booking screenshots', () => {
  test('capture booking and contact and build side-by-side composite', async ({ page }) => {
    await ensureArtifactsDir();

    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto('/booking');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.booking-modal-mobile')).toBeVisible();

    const bookingPath = path.join(ARTIFACTS_DIR, 'booking.png');
    await page.screenshot({ path: bookingPath, fullPage: true, type: 'png' });

    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.booking-modal-mobile')).toBeVisible();

    const contactPath = path.join(ARTIFACTS_DIR, 'contact.png');
    await page.screenshot({ path: contactPath, fullPage: true, type: 'png' });

    const sharpModule = await import('sharp');
    const sharp = sharpModule.default;

    const bookingImg = sharp(bookingPath);
    const contactImg = sharp(contactPath);

    const bookingMeta = await bookingImg.metadata();
    const contactMeta = await contactImg.metadata();

    const targetHeight = Math.max(bookingMeta.height ?? 0, contactMeta.height ?? 0);

    const bookingResized = await sharp(bookingPath).resize({ height: targetHeight }).png().toBuffer();
    const contactResized = await sharp(contactPath).resize({ height: targetHeight }).png().toBuffer();

    const bookingResizedMeta = await sharp(bookingResized).metadata();
    const contactResizedMeta = await sharp(contactResized).metadata();

    const compositeWidth = (bookingResizedMeta.width ?? 0) + (contactResizedMeta.width ?? 0);

    const compositePath = path.join(ARTIFACTS_DIR, 'booking-vs-contact.png');

    await sharp({
      create: {
        width: compositeWidth,
        height: targetHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      },
    })
      .composite([
        { input: bookingResized, left: 0, top: 0 },
        { input: contactResized, left: bookingResizedMeta.width ?? 0, top: 0 },
      ])
      .png()
      .toFile(compositePath);
  });
});
