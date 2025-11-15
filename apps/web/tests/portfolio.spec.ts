import test, { expect } from '@playwright/test';
import { PHOTOGRAPHER_EMAIL, PHOTOGRAPHER_PASSWORD } from './constants';

test.describe('Portfolio page', () => {
  test('create new collection and see the details page', async ({ page }) => {
    // 1. Вхід до системи
    await page.goto('http://localhost:3000/auth/sign-in');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(PHOTOGRAPHER_EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page
      .getByRole('textbox', { name: 'Password' })
      .fill(PHOTOGRAPHER_PASSWORD);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    // 2. Створення колекції
    await page.getByRole('link', { name: 'Portfolio' }).click();
    await page.getByRole('button', { name: 'Collection' }).click();

    // 3. Введення деталей колекції
    await page.getByRole('textbox', { name: 'Collection Name' }).click();
    await page
      .getByRole('textbox', { name: 'Collection Name' })
      .fill('My new collection');
    await page.getByRole('textbox', { name: 'Description' }).click();
    await page
      .getByRole('textbox', { name: 'Description' })
      .fill('Beautiful wedding');
    await page.getByRole('combobox', { name: 'Category' }).click();
    await page.getByRole('option', { name: 'Wedding' }).click();
    await page.getByRole('button', { name: 'Shoot Date' }).click();
    await page
      .getByRole('button', { name: 'Wednesday, November 19th,' })
      .click();
    await page.getByRole('button', { name: 'Continue' }).click();

    // 4. Перевірка інформації на сторінці деталей колекції
    expect(
      page.getByRole('heading', { name: 'My new collection' }),
    ).toBeVisible();
    expect(page.getByText('Beautiful wedding')).toBeVisible();
    expect(page.getByText('Private')).toBeVisible();
    expect(page.getByText('Wedding', { exact: true })).toBeVisible();
    expect(page.getByText('18th Nov')).toBeVisible();
  });
});
