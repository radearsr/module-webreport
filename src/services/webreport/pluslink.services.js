const axios = require("axios");

const postLoginWeb = async (username, password) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://report.pluslinkcorp.com/data/api/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      password,
    },
  };

  const { data: response } = await axios(config);
  return response;
};

const getPriceLists = async (token) => {
  const config = {
    method: "get",
    url: "https://report.pluslinkcorp.com/data/api/list-product/6/3",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data: response } = await axios(config);
  return response;
};

module.exports = {
  postLoginWeb,
  getPriceLists,
};
