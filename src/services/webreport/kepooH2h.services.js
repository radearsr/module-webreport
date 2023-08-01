const axios = require("axios");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const qs = require("qs");

const postLoginWeb = async (username, password) => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  // Perform actions on the page
  await page.goto("https://kepooh2h.com/login", { waitUntil: "networkidle2" });

  const usernameSelector = "input[name='username']";
  const passwordSelector = "input[name='password']";
  const loginButtonSelector = "button.login100-form-btn";

  await page.waitForSelector(usernameSelector);
  await page.type(usernameSelector, username);
  await page.waitForSelector(passwordSelector);
  await page.type(passwordSelector, password);

  const htmlContent = await page.content();
  const $ = cheerio.load(htmlContent);
  const token = $('input[type="hidden"]').attr("value");

  await page.waitForSelector(loginButtonSelector);
  await page.click(loginButtonSelector);

  const responseCookies = await page.cookies();
  const formatedCookie = responseCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  await browser.close();
  return {
    token,
    cookie: formatedCookie,
  };
};

const getPriceLists = async (xCsrfToken, cookie, product) => {
  const PostData = qs.stringify({
    produk: `${product}`,
  });

  const config = {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "x-csrf-token": xCsrfToken,
      "x-requested-with": "XMLHttpRequest",
      Cookie: cookie,
    },
    data: PostData,
    url: "https://kepooh2h.com/datatables/product",
    method: "POST",
    mode: "cors",
    credentials: "include",
  };
  const { data } = await axios(config);
  return data;
};

module.exports = {
  postLoginWeb,
  getPriceLists,
};
