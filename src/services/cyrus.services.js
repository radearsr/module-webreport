const axios = require("axios");
const qs = require("querystring");

const getCookieWeb = async () => {
  const response = await axios.get(
    "https://cyrusku.cyruspad.com/customerh2h/login.asp"
  );
  const setCookieHeader = response.headers["set-cookie"];
  
  if (!setCookieHeader) throw new Error("CYRUS_GET_COOKIE_FAILED");

  const matchesCookie = setCookieHeader[0].match(/ASPSESSIONIDCQETQBRQ=([^;]+)/);

  if (!matchesCookie) throw new Error("CYRUS_MATCHING_COOKIE_FAILED");

  const sessionId = matches[1];
  return sessionId;
};

const postLoginWeb = async (cookie) => {
  const data = qs.stringify({ username, password });

  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "https://cyrusku.cyruspad.com/customerh2h/login.asp",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: `CSYSBLAZTCUSTOMER=autologin=; ASPSESSIONIDCQETQBRQ=${cookie}`,
    },
    data,
  };

  const response = await axios(config);
  const setCookieHeader = response.headers["set-cookie"];
  return setCookieHeader;
};

const getPriceLists = async (cookie) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://cyrusku.cyruspad.com/customerh2h/customer_agen_pricelist.asp?t=customer_agen_price&recperpage=500
    `,
    headers: {
      Cookie: `CSYSBLAZTCUSTOMER=autologin=; ASPSESSIONIDCQETQBRQ=${cookie}`,
    },
  };

  const response = await axios(config);
  const html = response.data;

  const $ = cheerio.load(html);
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
