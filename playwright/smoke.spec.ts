import { test, expect } from '@playwright/test';

test('home renders nav and heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

// D3: v1 ติดต่อผ่าน GitHub อย่างเดียว — ไม่มีฟอร์ม และไม่มีอีเมล placeholder
test('contact page links to GitHub without a form', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('link', { name: 'ไปที่ GitHub' })).toHaveAttribute('href', /^https:\/\/github\.com\//);
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.getByText('demo@example.com')).toHaveCount(0);
});
