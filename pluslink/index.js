const axios = require("axios");

const loginWeb = async () => {
  let data = JSON.stringify({
    username: "HH77356",
    password: "Unitedtronik.17*",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://report.pluslinkcorp.com/data/api/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const { data: response } = await axios(config);
  const getToken = response.token;
  return getToken;
};

const getDataProduct = async (token) => {
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

const result = async () => {
  const token = await loginWeb();
  const resultProduct = await getDataProduct(token);
  const data = resultProduct.data;
  data.forEach((kategori) => {
    console.log(`ID Kategori: ${kategori.id_kategori}`);
    console.log(`Nama Kategori: ${kategori.nama_kategori}`);
    console.log("Data:");

    kategori.data.forEach((obj) => {
      console.log(obj);
    });

    console.log("------------------------");
  });
};

result();
