const { getPriceLists } = require("../webreport/gamma.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const list = await dbService.readListByTitle("gamma");
    if (!list) throw new Error("GAMMA_LIST_NOT_FOUND");
    const auth = await dbService.readAuthByListId(list.id);
    const priceLists = await getPriceLists(auth.token);
    const getDataPrice = priceLists.data.body;
    let keyword = name.toLowerCase();

    // Game Product
    if (keyword === "game") {
      keyword = "topup";
      // PPOB Product
    } else if (keyword === "ppob") {
      keyword = "pln";
      // Brizi Product
    } else if (keyword === "brizzi") {
      keyword = "brizii";
    }

    // All Product
    const result = getDataPrice.filter((data) =>
      data.category_name.toLowerCase().includes(keyword)
    );
    if (result.length === 0) {
      throw new Error("GAMMA_DATA_NOT_FOUND");
    }

    const resultMapped = result.map((data) => ({
      kodeProduk: data.product_alias,
      namaProduk: data.product_name,
      harga: data.jpp_sellprice,
    }));

    return resultMapped;
  } catch (error) {
    // Error Product NotFound
    if (error.message === "GAMMA_DATA_NOT_FOUND") {
      loggingUtils.showLogging("ERROR", error.message);
      return [];
      // Error Unauthorize
    } else if (error.response && error.response.status === 401) {
      try {
        const list = await dbService.readListByTitle("gamma");
        await dbService.updateListStatus(list.id, false);
      } catch (dbError) {
        loggingUtils.showLogging("ERROR", dbError.stack);
      }
    }
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
