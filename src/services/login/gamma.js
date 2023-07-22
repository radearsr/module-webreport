const { postLoginWeb, getPriceLists } = require("../webreport/gamma.services");

const handleGamaForm = async (event, data, elecktronMainProccess) => {
  const { username, password } = data;
  try {
    const loginResponse = await postLoginWeb(username, password);
    const token = loginResponse.data.body.secret;
    console.log(token);
    const priceListsResponse = await getPriceLists(token);
    console.log(priceListsResponse.data.body);
    elecktronMainProccess.send("price-lists", priceListsResponse.data.body);
  } catch (error) {
    console.error("Login atau pengambilan data daftar harga gagal:", error);
    event.sender.send(
      "error",
      "Login atau pengambilan data daftar harga gagal"
    );
  }
};

module.exports = handleGamaForm;
