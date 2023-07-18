const axios = require("axios");

const postLoginWeb = async (username, password) => {
  const config = {
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json;charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    url: "https://proteus-core.konekto.id/api/v1/partner_fe/login",
    data: {
      partner_username: username,
      partner_password: password,
    },
    method: "POST",
    mode: "cors",
    credentials: "omit"
  };

  const response = await axios(config);
  return response;
};

const getPriceLists = async (token) => {
  const config = {
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": `Bearer ${token}`,
      "content-type": "application/json;charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site"
    },
    url: "https://proteus-core.konekto.id/api/v1/join_product_priceplan_fe",
    method: "GET",
    mode: "cors",
    credentials: "include"
  };
  const response = await axios(config);
  return response;
};

module.exports = {
  postLoginWeb,
  getPriceLists,
};
