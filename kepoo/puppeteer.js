const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  // Perform actions on the page
  await page.goto('https://kepooh2h.com/login', { waitUntil: "networkidle2" });

  const usernameSelector = "input[name='username']";
  const passwordSelector = "input[name='password']";
  const loginButtonSelector = "button.login100-form-btn";


  await page.waitForSelector(usernameSelector);
  await page.type(usernameSelector, "H2O0599");
  await page.waitForSelector(passwordSelector);
  await page.type(passwordSelector, "175758");

  const htmlContent = await page.content();
  console.log(htmlContent);

  await page.waitForSelector(loginButtonSelector);
  await page.click(loginButtonSelector);
j6JsfTD8ScQZrF9ltiiBiyPZqLtBa0rVyt1ZDGVF

  // Close the browser
  // await browser.close();
})();