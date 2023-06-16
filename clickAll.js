const { chromium } = require('playwright');

async function login(page) {
  await page.fill('#loginEmail', 'test@gmail.com');
  await page.click('#signInSubmitBtn');

  await page.fill('#signin-password', 'Test@1234!');
  await page.click('#signin-submit');
  // await page.waitForTimeout(50000);

  await page.waitForNavigation();

  const loggedIn = await page.$('#logoutButton');
  if (loggedIn) {
    console.log('Login successful!');
  } else {
    console.log('Login failed.');
  }
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('https://google.com');

  await login(page);

  const elements = await page.$$('*');

  for (const element of elements) {
    const isVisible = await element.isVisible();
    const boundingBox = await element.boundingBox();

    if (isVisible && boundingBox !== null) {
      try {
        if (element.tagName === 'input') {
          await element.fill('Example value');
          await element.press('Enter');
          await element.clear();
          console.log(`Processed input field: '${element.toString()}'`);
        } else {
          await element.click();
          console.log(`Clicked on element: '${element.toString()}'`);
        }
      } catch (error) {
        console.error(`Error clicking element: '${element.toString()}'`);
        console.error(error);
      }
    }
  }

  await browser.close();
})();
