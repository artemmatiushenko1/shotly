import { expect, test } from '@playwright/test';
import { PHOTOGRAPHER_EMAIL, PHOTOGRAPHER_PASSWORD } from './constants';

test.describe('Auth', () => {
  test('user can sign up using email and password', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-up');

    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Artem');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Matiushenko');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page
      .getByRole('textbox', { name: 'Email' })
      .fill(`test-${Date.now()}-@example.com`);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty-12345');
    await page.getByRole('button', { name: 'Sign Up', exact: true }).click();

    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('user can sign in using email and password', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-in');

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(PHOTOGRAPHER_EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page
      .getByRole('textbox', { name: 'Password' })
      .fill(PHOTOGRAPHER_PASSWORD);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    await expect(page).toHaveURL('http://localhost:3000/dashboard');
  });
});
