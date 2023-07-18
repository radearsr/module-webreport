const axios = require("axios");



(async () => {
  try {
    const response = await axios(config);
    console.log(response.data.body.secret);
    const token = response.data.body.secret;
    const configGet = {
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
    }

    const responseData = await axios(configGet);
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
})();