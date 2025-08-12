import { test, expect } from '@playwright/test';
import { login } from './utils';

test('Guards par rôle — accès refusé hors périmètre', async ({ page }) => {
  await login(page, 'foundation+student@galileoprotocol.io', 'password123');
  await page.waitForURL(/student/i);

  // Tente d'accéder à une page Manager
  await page.goto('/manager-dashboard');
  await expect(page).toHaveURL(/login|access|forbidden|student/i);
});

