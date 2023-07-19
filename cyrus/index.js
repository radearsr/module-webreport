const axios = require("axios");
const qs = require("qs");
const cheerio = require("cheerio");

const getCookie = async () => {
  try {
    const response = await axios.get(
      "https://cyrusku.cyruspad.com/customerh2h/login.asp"
    );
    const setCookieHeader = response.headers["set-cookie"];

    if (setCookieHeader) {
      const matches = setCookieHeader[0].match(/ASPSESSIONIDCQETQBRQ=([^;]+)/);
      if (matches) {
        const sessionId = matches[1];
        return sessionId;
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const loginWeb = async (cookie) => {
  let data = qs.stringify({
    username: "unitedtroweb",
    password: "un1t3dw36",
  });

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "https://cyrusku.cyruspad.com/customerh2h/login.asp",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: `CSYSBLAZTCUSTOMER=autologin=; ASPSESSIONIDCQETQBRQ=${cookie}`,
    },
    data: data,
  };

  const response = await axios(config);
  const setCookieHeader = response.headers["set-cookie"];
  return setCookieHeader;
};

const getDataProduct = async (cookie) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://cyrusku.cyruspad.com/customerh2h/customer_agen_pricelist.asp?t=customer_agen_price&recperpage=500
    `,
    headers: {
      Cookie: `CSYSBLAZTCUSTOMER=autologin=; ASPSESSIONIDCQETQBRQ=${cookie}`,
    },
  };

  try {
    const response = await axios.request(config);
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
  } catch (error) {
    console.log(error);
  }
};

const getResult = async () => {
  const cookie = await getCookie();
  console.log(cookie);
  const getSesi = await loginWeb(cookie);
  // const product = "GOPAY";
  const result = await getDataProduct(cookie);
  console.log(result);
};

getResult();
