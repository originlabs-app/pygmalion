import { test, expect } from '@playwright/test';
import { expectNoConsoleErrors } from './utils';

test('Login + MFA (flow de base)', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('foundation+student@galileoprotocol.io');
  await page.getByLabel('Mot de passe').fill('password123');
  await page.getByRole('button', { name: 'Se connecter' }).click();

  // Si MFA requis, saisir OTP mock (adapter si backend exige un vrai OTP)
  if (await page.getByLabel('Code OTP').isVisible().catch(() => false)) {
    await page.getByLabel('Code OTP').fill('000000');
    await page.getByRole('button', { name: 'Vérifier' }).click();
  }

  // Redirection dashboard
  await page.waitForURL(/dashboard|student/i, { timeout: 15000 });
  await expectNoConsoleErrors(page);
  await expect(page.locator('body')).toContainText(/Tableau de bord|Bienvenue/i);
});

