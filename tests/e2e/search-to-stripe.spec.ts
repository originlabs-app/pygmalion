import { test, expect } from '@playwright/test';
import { expectNoConsoleErrors } from './utils';

test('Recherche → Détail → Stripe (mock) → Confirmation', async ({ page, context }) => {
  await page.goto('/courses');
  await page.getByPlaceholder(/recherche|formation/i).fill('sécurité');
  await page.keyboard.press('Enter');
  await page.getByRole('link', { name: /voir|détail/i }).first().click();

  // Sélection session
  const sessionCard = page.locator('[data-testid="session-card"]').first();
  if (await sessionCard.count()) {
    await sessionCard.click();
  }

  // Intercepter appel Stripe et simuler succès
  await context.route('**/payments/create-checkout', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ url: '/payment/success' }),
    });
  });

  await page.getByRole('button', { name: /s'inscrire|payer/i }).click();
  await page.waitForURL(/payment\/success/i);

  await expect(page.locator('body')).toContainText(/Confirmation|Merci/i);
  await expectNoConsoleErrors(page);
});

