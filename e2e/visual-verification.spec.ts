import { test, expect } from '@playwright/test';

test.describe('Super Fusion Cuisine II - Automated Verification Spec', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Single H1 Entity Rule: Page must contain exactly one semantic H1 with local anchor', async ({ page }) => {
    const h1Elements = page.locator('h1');
    const count = await h1Elements.count();
    expect(count).toBe(1);

    const h1Text = await h1Elements.first().textContent();
    expect(h1Text).toContain('Super Fusion Cuisine II');
  });

  test('100% Alt-Text Coverage: Every image must carry non-empty alt text or aria-hidden', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');

      const isCompliant = (alt && alt.trim().length > 0) || ariaHidden === 'true';
      expect(isCompliant).toBeTruthy();
    }
  });

  test('Zero Horizontal Layout Overflow at 375px mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBeFalsy();
  });

  test('Mobile Sticky Action Bar Cap: Must not exceed 15% of mobile viewport height', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const stickyBar = page.locator('aside[aria-label="Quick Actions"]');
    if (await stickyBar.isVisible()) {
      const box = await stickyBar.boundingBox();
      if (box) {
        const percentage = (box.height / 667) * 100;
        // Strictly capped under 15%
        expect(percentage).toBeLessThanOrEqual(15);
      }
    }
  });

  test('1:1 NAP match: Address and Phone must be accurately represented in DOM', async ({ page }) => {
    const pageContent = await page.content();
    expect(pageContent).toContain('54 Mt Auburn St');
    expect(pageContent).toContain('02472');
    expect(pageContent).toContain('617');
    expect(pageContent).toContain('393-0008');
  });

  test('Head-Only Schema Verification: Schema.org JSON-LD exists in head and not visible in UI', async ({ page }) => {
    const jsonLdScripts = page.locator('head script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThan(0);

    const schemaContent = await jsonLdScripts.first().textContent();
    expect(schemaContent).toContain('Restaurant');
    expect(schemaContent).toContain('Super Fusion Cuisine II');
    expect(schemaContent).toContain('Menu');
    expect(schemaContent).toContain('FAQPage');
  });
});
