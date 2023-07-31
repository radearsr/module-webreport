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
    let keyword = name.toLowerCase();
    const sortByKeyword = (keyword, array) => {
      const filteredData = array.filter((produk) =>
        produk.namaProduk.toLowerCase().includes(keyword.toLowerCase())
      );
      return filteredData.sort((a, b) => {
        return a.namaProduk.localeCompare(b.namaProduk);
      });
    };

    // Emoney Product
    if (
      keyword === "dana" ||
      keyword === "shopee" ||
      keyword === "link" ||
      keyword === "ovo" ||
      keyword === "gopay" ||
      keyword === "brizzi" ||
      keyword === "mandiri" ||
      keyword === "maxim"
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

      // Pulsa Product
    } else if (
      keyword === "indosat" ||
      keyword === "telkomsel" ||
      keyword === "three" ||
      keyword === "smart" ||
      keyword === "xl" ||
      keyword === "byu"
    ) {
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

      //Game Product
    } else if (keyword === "game") {
      const financeObject = getDataPrice.find(
        (item) => item.nama_kategori === "GAME"
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

      // PPOB Product
    } else if (keyword === "ppob") {
      let resultFiltered = [];

      resultFiltered = getDataPrice.filter((data) => {
        return (
          data.nama_kategori === "BPJS" ||
          data.nama_kategori === "PLN" ||
          data.nama_kategori === "E-PAJAK" ||
          data.nama_kategori === "TELEPON" ||
          data.nama_kategori === "TV KABEL" ||
          data.nama_kategori === "TELKOM" ||
          data.nama_kategori === "FINANCE" ||
          data.nama_kategori === "GAS" ||
          data.nama_kategori === "PLN-TOKEN" ||
          data.nama_kategori === "PLN-STANDART"
        );
      });

      resultFiltered = resultFiltered.flatMap((obj) => {
        return obj.data.map((item) => {
          return {
            kodeProduk: item.kode,
            namaProduk: item.nama,
            harga: item.nominal,
          };
        });
      });

      return resultFiltered;

      // Product NotFound
    } else {
      throw new Error("PLUSLINK_DATA_NOT_FOUND");
    }
  } catch (error) {
    // Error Product NotFound
    if (error.message === "PLUSLINK_DATA_NOT_FOUND") {
      loggingUtils.showLogging("ERROR", error.message);
      return [];
      // Error Unauthorize
    } else if (error.response && error.response.status === 401) {
      try {
        const list = await dbService.readListByTitle("pluslink");
        await dbService.updateListStatus(list.id, false);
      } catch (dbError) {
        loggingUtils.showLogging("ERROR", dbError.stack);
      }
    }
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = sortingPriceListByName;
