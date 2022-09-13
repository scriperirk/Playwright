const { expect, default: test } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password } = require("../user.js");
const { wrongEmail, wrongPassword } = require("../user.js");

test("Should log in with valid user", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 2000,
  });

  const page = await browser.newPage();
  await page.goto("https://netology.ru/");
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').fill(email);
  await page.locator('[placeholder="Пароль"]').fill(password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  const header = await page.locator('[text="Мои курсы и профессии"]');
  await expect(header).toBeVisible;

  await page.close();
  await browser.close();
});

test("Should not log in with invalid user", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 2000,
  });

  const page = await browser.newPage();
  await page.goto("https://netology.ru/");
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').fill(wrongEmail);
  await page.locator('[placeholder="Пароль"]').fill(wrongPassword);
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toBeVisible;

  await page.close();
  await browser.close();
});