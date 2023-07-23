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
    const keyword = name.toLowerCase();
    const result = getDataPrice.filter((data) =>
      data.category_name.toLowerCase().includes(keyword)
    );
    const resultMapped = result.map((data) => ({
      kodeProduk: data.product_alias,
      namaProduk: data.product_name,
      harga: data.jpp_sellprice,
    }));
    return resultMapped;
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
