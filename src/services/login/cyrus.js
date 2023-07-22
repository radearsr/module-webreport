const {
  getCookieWeb,
  postLoginWeb,
  getPriceLists,
} = require("../webreport/cyrus.services");

const handleCyrus = async (event, data) => {
  const { username, password } = data;
  try {
    const responseCookie = await getCookieWeb();
    console.log(responseCookie);
    // const loginResponse = await postLoginWeb(
    //   responseCookie,
    //   username,
    //   password
    // );
    // console.log(loginResponse);
    // const token = loginResponse.token;
    // console.log(token);
    // const priceListsResponse = await getPriceLists(token);
    // console.log(priceListsResponse);
    // event.sender.send("price-lists", priceListsResponse);
  } catch (error) {
    console.error("Login atau pengambilan data daftar harga gagal:", error);
    event.sender.send(
      "error",
      "Login atau pengambilan data daftar harga gagal"
    );
  }
};

module.exports = handleCyrus;
