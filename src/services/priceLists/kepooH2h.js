const { getPriceLists } = require("../webreport/kepooH2h.services");

const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const sortingPriceListByName = async (name) => {
  try {
    const list = dbService.readListByTitle("kepooH2h");
    if (!list) throw new Error("KEPOH2H_LIST_NOT_FOUND");
    const auth = dbService.readAuthByListId(list.id);
    loggingUtils.showLogging("WARN", JSON.stringify(auth));
    const [token, cookie] = auth.token.split("&-&");
    let keyword = name.toLowerCase();

    const convertHargaToNumber = (harga_jual) => {
      const regex = /<div class='pull-right'>([\d.,]+)<\/div>/;
      const match = harga_jual.match(regex);
      const harga_jual_string = match ? match[1].replace(/\./g, "") : null;
      const harga_jual_number = harga_jual_string
        ? parseFloat(harga_jual_string.replace(/,/g, ""))
        : null;
      return harga_jual_number;
    };

    if (keyword === "indosat") {
      keyword = "I";
    } else if (keyword === "telkomsel") {
      keyword = "S";
    } else if (keyword === "telkomsel") {
      keyword = "S";
    } else if (keyword === "smartfren") {
      keyword = "SM";
    } else if (keyword === "three") {
      keyword = "T";
    } else if (keyword === "xl") {
      keyword = "X";
    } else if (keyword === "ppob") {
      keyword = "PLN";
    } else {
      keyword;
    }

    if (
      keyword === "dana" ||
      keyword === "link" ||
      keyword === "cvo" ||
      keyword === "shopee" ||
      keyword === "gopay" ||
      keyword === "brizzi" ||
      keyword === "mandiri" ||
      keyword === "maxim"
    ) {
      const response = await getPriceLists(token, cookie, "G");
      const getDataPrice = response.data;

      const resultMapped = getDataPrice.map((data) => ({
        kodeProduk: data.kode,
        namaProduk: data.nama,
        harga: convertHargaToNumber(data.harga_jual),
      }));

      const result = resultMapped.filter((data) =>
        data.namaProduk.toLowerCase().includes(keyword)
      );

      if (resultMapped.length === 0) {
        loggingUtils.showLogging("ERROR", "KEPOO_DATA_NOT_FOUND");
      }
      return result;
    } else {
      const response = await getPriceLists(token, cookie, keyword);
      const getDataPrice = response.data;

      const resultMapped = getDataPrice.map((data) => ({
        kodeProduk: data.kode,
        namaProduk: data.nama,
        harga: convertHargaToNumber(data.harga_jual),
      }));

      if (resultMapped.length === 0) {
        loggingUtils.showLogging("ERROR", "KEPOO_DATA_NOT_FOUND");
      }

      return resultMapped;
    }
  } catch (error) {
    if (error.response && error.response.status === 419) {
      try {
        const list = dbService.readListByTitle("kepooH2h");
        dbService.updateListStatus(list.id, false);
      } catch (dbError) {
        loggingUtils.showLogging("ERROR", dbError.stack);
      }
    }
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
