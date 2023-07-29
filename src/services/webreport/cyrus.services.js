const axios = require("axios");
const qs = require("querystring");
const cheerio = require("cheerio");

const getCookieWeb = async () => {
  const response = await axios.get(
    "https://cyrusku.cyruspad.com/customerh2h/login.asp"
  );
  const [setCookieHeader] = response.headers["set-cookie"];
  const [actualCookie] = setCookieHeader.split(";")
  const [cookieKey, cookieValue] = actualCookie.split("=");
  return { cookieKey, cookieValue };
};

const postLoginWeb = async (cookieKey, cookieValue, username, password) => {
  const data = qs.stringify({ username, password });

  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "https://cyrusku.cyruspad.com/customerh2h/login.asp",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: `CSYSBLAZTCUSTOMER=autologin=; ${cookieKey}=${cookieValue}`,
    },
    data,
  };

  const { data: responseLogin} = await axios(config);
  if (responseLogin !== "") {
    return { cookieKey, cookieValue }
  }
};

const getPriceLists = async (cookieKey, cookieValue) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://cyrusku.cyruspad.com/customerh2h/customer_agen_pricelist.asp?t=customer_agen_price&recperpage=500
    `,
    headers: {
      Cookie: `CSYSBLAZTCUSTOMER=autologin=; ${cookieKey}=${cookieValue}`,
    },
  };

  const response = await axios(config);
  const html = response.data;

  if (html.includes("flogin")) {
    throw new Error("CYRUS_NOT_UNAUTHORIZE");
  }

  const $ = cheerio.load(html);

  const floginForm = $("#flogin");
  if (floginForm.length > 0) {
    const statusLogin = 0;
    return statusLogin;
  }

  const table = $("#tbl_customer_agen_pricelist.ewTable.ewTableSeparate");
  const tbody = table.find("tbody");

  const rows = tbody.find("tr");

  const result = [];

  for (let i = 1; i < rows.length; i++) {
    const row = $(rows[i]);
    const data = {};
    data.product_id = row
      .find(".customer_agen_price_product_id span")
      .text()
      .trim();
    data.description = row
      .find(".customer_agen_price_description span")
      .text()
      .trim();
    data.operator = row
      .find(".customer_agen_price_operator span")
      .text()
      .trim();
    data.amount = row.find(".customer_agen_price_amount span").text().trim();
    data.price = row.find(".customer_agen_price_rs_price span").text().trim();
    result.push(data);
  }
  return JSON.stringify(result, null, 2);
};

module.exports = {
  getCookieWeb,
  postLoginWeb,
  getPriceLists,
};
