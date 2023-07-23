const { getPriceLists } = require("../webreport/hotspotReload.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const list = await dbService.readListByTitle("hotspot");
    if (!list) throw new Error("HOTSPOT_LIST_NOT_FOUND");
    const auth = await dbService.readAuthByListId(list.id);
    console.log(auth);
    const priceLists = await getPriceLists(auth.token);
    if (priceLists.msg === "Unauthorize") {
      await dbService.updateListStatus(list.id, false);
    } 
    console.log(priceLists);
  } catch (error) {
    
  }
};

module.exports = sortingPriceListByName;
