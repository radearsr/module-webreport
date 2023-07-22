const {
  postLoginWeb,
  getPriceLists,
} = require("../webreport/monitoringBsi.services");

const handleMonitoringBsi = async (event, data, elecktronMainProccess) => {
  const { username, password } = data;
  try {
    const loginResponse = await postLoginWeb(username, password);
    const token = loginResponse.token;
    const dataAcc = loginResponse.dataAcc;
    console.log(token);
    console.log(dataAcc);
    const priceListsResponse = await getPriceLists(token, dataAcc);
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

module.exports = handleMonitoringBsi;
