import { test, expect } from '@playwright/test';
import { login, expectNoConsoleErrors } from './utils';

test('Assignation interne Manager → accès étudiant', async ({ page }) => {
  await login(page, 'foundation+manager@galileoprotocol.io', 'password123');
  await page.waitForURL(/manager/i);

  // Ouvre l'interface d'assignation
  await page.goto('/manager/assign-training');
  await page.getByRole('combobox', { name: /collaborateur/i }).selectOption({ index: 0 });
  await page.getByRole('combobox', { name: /formation/i }).selectOption({ index: 0 });
  await page.getByRole('button', { name: /assigner|valider/i }).click();

  await expect(page.locator('body')).toContainText(/Inscription validée|Assignation réussie/i);
  await expectNoConsoleErrors(page);
});

