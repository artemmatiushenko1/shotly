import { test, expect } from '@playwright/test';

test.describe('Auth', () => {
  test('user can sign up using email and password', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-up');

    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Artem');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Matiushenko');
    await page.getByRole('textbox', { name: 'Email' }).click();
    // TODO: this is strage workaround, because if we use the same string
    // we'll get user already exists error.
    await page
      .getByRole('textbox', { name: 'Email' })
      .fill(`test-${Date.now()}-@example.com`);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty-12345');
    await page.getByRole('button', { name: 'Sign Up', exact: true }).click();

    await expect(page).toHaveURL('http://localhost:3000/');
  });
});
