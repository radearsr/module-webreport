const axios = require("axios");

const config = {
  headers: {
    "x-csrf-token": "Q3MykRpGaM6aLPCqh0AFDa1EC7GwjIhpj6gjIoFN",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://kepooh2h.com/informasi/produk",
  "referrerPolicy": "strict-origin-when-cross-origin",
  data: "draw=1&columns%5B0%5D%5Bdata%5D=kode&columns%5B0%5D%5Bname%5D=kode&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=nama&columns%5B1%5D%5Bname%5D=nama&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=harga_jual&columns%5B2%5D%5Bname%5D=harga_jual&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=gangguan&columns%5B3%5D%5Bname%5D=gangguan&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&order%5B1%5D%5Bcolumn%5D=1&order%5B1%5D%5Bdir%5D=asc&order%5B2%5D%5Bcolumn%5D=3&order%5B2%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&produk=I",
  method: "POST",
  mode: "cors",
  credentials: "include",
  url: "https://kepooh2h.com/datatables/product",
};

( async () => {
  try {
    const response = await axios(config);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();

