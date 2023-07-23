const {
  getPriceLists,
  postLoginWeb,
} = require("../webreport/monitoringBsi.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    // const list = await dbService.readListByTitle("monitoringBsi");
    // if (!list) throw new Error("MONITORINGBSI_LIST_NOT_FOUND");
    // const auth = await dbService.readAuthByListId(list.id);
    const { token, dataAcc } = await postLoginWeb("pmk", "pmk123");
    const priceLists = await getPriceLists(token, dataAcc);
    const getDataPrice = priceLists.data;
    console.log(getDataPrice);
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
