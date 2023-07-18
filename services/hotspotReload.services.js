const axios = require("axios");
const utilsHotspotReload = require("../utils/hotspotReload/hotspot.utils");

const postLoginWeb = async (username, password) => {
  const payload = utilsHotspotReload.getEncryptedPayload(username, password);
  const config = {
    method: "POST",
    url: "http://123.231.239.170:8181/auth/authenticate",
    headers: {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "x-requested-with": "XMLHttpRequest",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "mode": "cors",
      "credentials": "omit"
    },
    data: payload,
  };
  const { data: responseData } = await axios(config);
  return responseData;
}

const getPriceLists = async () => {
  const config = {
    method: "GET",
    url: "http://123.231.239.170:8181/api/pricelist",
    headers: {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "authorization": `Bearer ${token}`,
      "x-requested-with": "XMLHttpRequest",
      "Referer": "http://123.231.239.170:8181/daftarharga",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  };
  const { data: responseData } = await axios(config);
  return responseData;
};

module.exports = {
  postLoginWeb,
  getPriceLists,
};
