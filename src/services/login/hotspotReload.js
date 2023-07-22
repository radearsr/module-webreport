const {
  postLoginWeb,
  getPriceLists,
} = require("../webreport/hotspotReload.services");

const handleHotspotReload = async (event, data, elecktronMainProccess) => {
  const { username, password } = data;
  try {
    const loginResponse = await postLoginWeb(username, password);
    const token = loginResponse.token;
    console.log(token);
    const priceListsResponse = await getPriceLists(token);
    console.log(priceListsResponse);
    elecktronMainProccess.send("price-lists", priceListsResponse);
  } catch (error) {
    console.error("Login atau pengambilan data daftar harga gagal:", error);
    event.sender.send(
      "error",
      "Login atau pengambilan data daftar harga gagal"
    );
  }
};

module.exports = handleHotspotReload;
