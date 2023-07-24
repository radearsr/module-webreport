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
    const auth = await dbService.readAuthByListId(list.id);
    const [token, dataAcc] = auth.token.split("&-&");
    const priceLists = await getPriceLists(token, dataAcc);
    
    if (!priceLists?.token) {
      await dbService.updateListStatus(list.id, false);
      return;
    }

    if (!priceLists?.data) throw new Error("MONITORINGBSI_DATA_NOT_FOUND");

    const newTokenFormat = `${priceLists.token}&-&${dataAcc}`;
    await dbService.updateAuthByListId(list.id, newTokenFormat);
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
    if (error.message === "MONITORINGBSI_DATA_NOT_FOUND") {
      loggingUtils.showLogging("ERROR", error.message);
      return [];
    }
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
