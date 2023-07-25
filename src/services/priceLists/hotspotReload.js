const { getPriceLists } = require("../webreport/hotspotReload.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const keyword = name.toLowerCase();
    const list = await dbService.readListByTitle("hotspot");
    if (!list) throw new Error("HOTSPOT_LIST_NOT_FOUND");
    const auth = await dbService.readAuthByListId(list.id);
    loggingUtils.showLogging("WARN", JSON.stringify(auth));
    const priceLists = await getPriceLists(auth.token);
    if (priceLists.msg === "Unauthorize") {
      await dbService.updateListStatus(list.id, false);
    }
    if (keyword === "gopay") {
      // Gopay Product
      const result = priceLists.pulsa.find((data) =>
        data.namaoperator.includes("GOJEK")
      );
      let resultMapped = [];
      resultMapped = result.data.map((data) => ({
        kodeProduk: data.kodeproduk,
        namaProduk: data.namaproduk,
        harga: data.harga,
      }));

      return resultMapped;
    } else if (keyword === "three") {
      // Three Product
      const result = priceLists.pulsa.find((data) =>
        data.namaoperator.includes("TRI")
      );
      let resultMapped = [];
      resultMapped = result.data.map((data) => ({
        kodeProduk: data.kodeproduk,
        namaProduk: data.namaproduk,
        harga: data.harga,
      }));

      return resultMapped;
    } else if (
      keyword === "shopee" ||
      keyword === "gopay" ||
      keyword === "indosat" ||
      keyword === "telkomsel" ||
      keyword === "xl"
    ) {
      // Shopee & Gopay Product
      const resultFiltered = priceLists.pulsa.filter((data) =>
        data.namaoperator.toLowerCase().includes(keyword)
      );
      const allDatas = []
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
    } else {
      // All Product
      console.log("HOTSPOTRELOAD ELSE");
      const resultIndex = priceLists.pulsa.findIndex((data) =>
        data.namaoperator.toLowerCase().includes(keyword)
      );
      const result = priceLists.pulsa[resultIndex]?.data;
      if (!result) throw new Error("HOTSPOTRELOAD_DATA_NOT_FOUND");
      const resultMapped = result.map((data) => ({
        kodeProduk: data.kodeproduk,
        namaProduk: data.namaproduk,
        harga: data.harga,
      }));
      return resultMapped;
    }
  } catch (error) {
    if (error.message === "HOTSPOTRELOAD_DATA_NOT_FOUND") {
      loggingUtils.showLogging("ERROR", error.message);
      return [];
    }
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
