const {
  getPriceLists,
  postLoginWeb,
} = require("../webreport/monitoringBsi.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const list = await dbService.readListByTitle("monitoringBsi");
    if (!list) throw new Error("MONITORINGBSI_LIST_NOT_FOUND");
    // const auth = await dbService.readAuthByListId(list.id);
    const { token, dataAcc } = await postLoginWeb("pmk", "pmk123");
    const priceLists = await getPriceLists(token, dataAcc);
    if (!priceLists) {
      await dbService.updateListStatus(list.id, false);
    }
    const getDataPrice = priceLists.data;
    const keyword = name.toLowerCase();
    const resultMapped = [];

    for (const produk of getDataPrice) {
      if (produk.nama_produk.toLowerCase().includes(keyword)) {
        resultMapped.push({
          kodeProduk: produk.kode_produk,
          namaProduk: produk.nama_produk,
          harga: produk.harga_jual,
        });
      }
    }
    return resultMapped;
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
