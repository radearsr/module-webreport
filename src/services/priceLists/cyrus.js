const { getPriceLists } = require("../webreport/cyrus.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const list = await dbService.readListByTitle("cyrus");
    if (!list) throw new Error("CYRUS_LIST_NOT_FOUND");
    const auth = await dbService.readAuthByListId(list.id);
    const [cookieKey, cookieValue] = auth.token.split("&-&"); 
    const priceLists = await getPriceLists(cookieKey, cookieValue);
    let keyword = name.toLowerCase();
    const getDataPrice = JSON.parse(priceLists);

    // All Product
    const result = getDataPrice.filter((data) =>
      data.operator.toLowerCase().includes(keyword)
    );
    if (result.length === 0) {
      throw new Error("CYRUS_DATA_NOT_FOUND");
    }

    const resultMapped = result.map((data) => ({
      kodeProduk: data.product_id,
      namaProduk: data.description,
      harga: data.price,
    }));

    return resultMapped;
  } catch (error) {
    if (error.message === "CYRUS_DATA_NOT_FOUND") {
      loggingUtils.showLogging("ERROR", error.message);
      return [];

    } else if (error.message === "CYRUS_NOT_UNAUTHORIZE") {
      try {
        const list = await dbService.readListByTitle("cyrus");
        await dbService.updateListStatus(list.id, false);
      } catch (dbError) {
        loggingUtils.showLogging("ERROR", dbError.stack);
      }
    }
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
