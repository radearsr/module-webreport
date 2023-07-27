const { getPriceLists } = require("../webreport/kepooH2h.services");

const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const list = await dbService.readListByTitle("kepooH2h");
    if (!list) throw new Error("KEPOH2H_LIST_NOT_FOUND");
    const auth = await dbService.readAuthByListId(list.id);
    loggingUtils.showLogging("WARN", JSON.stringify(auth));
    const [token, cookie] = auth.token.split("&-&");
    console.log(token);
    console.log(cookie);
    const response = await getPriceLists(token, cookie);
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;