const { getPriceLists } = require("../webreport/kopNus.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const keyword = name.toLowerCase();
    const list = await dbService.readListByTitle("kopnus");
    if (!list) throw new Error("KOPNUS_LIST_NOT_FOUND");
    const auth = await dbService.readAuthByListId(list.id);
    loggingUtils.showLogging("WARN", JSON.stringify(auth));
    const priceLists = await getPriceLists(auth.token);
    if (priceLists.msg === "Unauthorize") {
      dbService.updateListStatus(list.id, false);
    }
    // Dana Product
    if (keyword === "dana") {
      const result = priceLists.pulsa.find(
        (data) => data.namaoperator === "SALDO DANA"
      );
      let resultMapped = [];
      resultMapped = result.data.map((data) => ({
        kodeProduk: data.kodeproduk,
        namaProduk: data.namaproduk,
        harga: data.harga,
      }));

      return resultMapped;

      // Binding Product
    } else if (
      keyword === "shopee" ||
      keyword === "gopay" ||
      keyword === "indosat" ||
      keyword === "telkomsel" ||
      keyword === "three" ||
      keyword === "smart" ||
      keyword === "xl" ||
      keyword === "game"
    ) {
      const resultFiltered = priceLists.pulsa.filter((data) =>
        data.namaoperator.toLowerCase().includes(keyword)
      );

      const allDatas = [];
      resultFiltered.forEach((result) => {
        result.data.forEach((data) => {
          allDatas.push({
            kodeProduk: data.kodeproduk,
            namaProduk: data.namaproduk,
            harga: data.harga,
          });
        });
      });
      return allDatas;

      // ALL product
    } else {
      const resultIndex = priceLists.pulsa.findIndex((data) =>
        data.namaoperator.toLowerCase().includes(keyword)
      );
      const result = priceLists.pulsa[resultIndex]?.data;
      if (!result) throw new Error("KOPNUS_DATA_NOT_FOUND");
      const resultMapped = result.map((data) => ({
        kodeProduk: data.kodeproduk,
        namaProduk: data.namaproduk,
        harga: data.harga,
      }));
      return resultMapped;
    }
  } catch (error) {
    if (error.message === "KOPNUS_DATA_NOT_FOUND") {
      loggingUtils.showLogging("ERROR", error.message);
      return [];
    }
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
