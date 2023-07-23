const { getPriceLists } = require("../webreport/pluslink.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const list = await dbService.readListByTitle("pluslink");
    if (!list) throw new Error("PLUSLINK_LIST_NOT_FOUND");
    const auth = await dbService.readAuthByListId(list.id);
    const priceLists = await getPriceLists(auth.token);
    const getDataPrice = priceLists.data;
    const keyword = name.toLowerCase();
    const sortByKeyword = (keyword, array) => {
      const filteredData = array.filter((produk) =>
        produk.namaProduk.toLowerCase().includes(keyword.toLowerCase())
      );
      return filteredData.sort((a, b) => {
        return a.namaProduk.localeCompare(b.namaProduk);
      });
    };

    if (
      keyword === "dana" ||
      keyword === "shopee" ||
      keyword === "link" ||
      keyword === "ovo" ||
      keyword === "gopay"
    ) {
      const financeObject = getDataPrice.find(
        (item) => item.nama_kategori === "E-MONEY"
      );

      if (financeObject) {
        const resultMapped = financeObject.data.map((data) => ({
          kodeProduk: data.kode,
          namaProduk: data.nama,
          harga: data.nominal,
        }));

        if (keyword === "gopay") {
          const produkSortedByKeyword = sortByKeyword("gojek", resultMapped);
          return produkSortedByKeyword;
        } else {
          const produkSortedByKeyword = sortByKeyword(keyword, resultMapped);
          return produkSortedByKeyword;
        }
      }
    } else {
      const financeObject = getDataPrice.find(
        (item) => item.nama_kategori === "PULSA"
      );

      if (financeObject) {
        const resultMapped = financeObject.data.map((data) => ({
          kodeProduk: data.kode,
          namaProduk: data.nama,
          harga: data.nominal,
        }));
        const produkSortedByKeyword = sortByKeyword(keyword, resultMapped);
        return produkSortedByKeyword;
      }
    }
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
    if (error.response && error.response.status === 401) {
      try {
        const list = await dbService.readListByTitle("pluslink");
        await dbService.updateListStatus(list.id, false);
      } catch (dbError) {
        loggingUtils.showLogging("ERROR", dbError.stack);
      }
    }
  }
};

module.exports = sortingPriceListByName;
