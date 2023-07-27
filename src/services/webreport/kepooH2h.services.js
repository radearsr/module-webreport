const axios = require("axios");
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const postLoginWeb = async (username, password) => {
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
  await page.type(usernameSelector, username);
  await page.waitForSelector(passwordSelector);
  await page.type(passwordSelector, password);
  
  const htmlContent = await page.content();
  const $ = cheerio.load(htmlContent);
  const token = $('input[type="hidden"]').attr("value")
  
  await page.waitForSelector(loginButtonSelector);
  await page.click(loginButtonSelector);
  
  const responseCookies = await page.cookies();
  const formatedCookie = responseCookies.map((cookie) => (`${cookie.name}=${cookie.value}`)).join("; ");
  await browser.close();
  return {
    token,
    cookie: formatedCookie,
  };
};

const getPriceLists = async (xCsrfToken, cookie) => {
  const config = {
    headers: {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "x-csrf-token": xCsrfToken,
      "x-requested-with": "XMLHttpRequest",
      Cookie: cookie,
    },
    data: "draw=1&columns%5B0%5D%5Bdata%5D=kode&columns%5B0%5D%5Bname%5D=kode&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=nama&columns%5B1%5D%5Bname%5D=nama&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=harga_jual&columns%5B2%5D%5Bname%5D=harga_jual&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=gangguan&columns%5B3%5D%5Bname%5D=gangguan&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=kode_operator&columns%5B4%5D%5Bname%5D=kode_operator&columns%5B4%5D%5Bsearchable%5D=false&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=4&order%5B0%5D%5Bdir%5D=asc&order%5B1%5D%5Bcolumn%5D=0&order%5B1%5D%5Bdir%5D=asc&order%5B2%5D%5Bcolumn%5D=1&order%5B2%5D%5Bdir%5D=asc&order%5B3%5D%5Bcolumn%5D=3&order%5B3%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&produk=G",
    url: "https://kepooh2h.com/datatables/product",
    method: "POST",
    mode: "cors",
    credentials: "include",
  };
  const { data } = await axios(config);
  console.log(data);
  return data;
}

module.exports = {
  postLoginWeb,
  getPriceLists,
}
