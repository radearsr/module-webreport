const { postLoginWeb } = require("../webreport/monitoringBsi.services");
const dbService = require("../database/sqlite.services");
const loggingService = require("../../utils/logging/logging.utils");

const handleMonitoringBsi = async (title, data, electronMainProccess) => {
  const { username, password } = data;
  try {
    loggingService.showLogging("INFO", JSON.stringify(data));
    const availableLists = await dbService.readListByTitle(title);
    if (!availableLists) {
      await dbService.createLists(title, username, password);
    }
    const list = await dbService.readListByTitle(title);
    loggingService.showLogging("WARN", JSON.stringify(list));
    if (list.status) {
      return electronMainProccess.send("login-success", {
        formId: title,
      });
    }
    const loginResponse = await postLoginWeb(username, password);
    loggingService.showLogging("INFO", JSON.stringify(loginResponse));
    const token = loginResponse?.token;
    const dataAcc = loginResponse?.dataAcc;
    if (!token || !dataAcc) throw new Error("INVALID_TOKEN");
    const newTokenFormat = `${token}&-&${dataAcc}`;
    const availableToken = await dbService.readAuthByListId(list.id);
    if (!availableToken) {
      await dbService.createAuth(list.id, newTokenFormat);
    }
    await dbService.updateAuthByListId(list.id, newTokenFormat);
    await dbService.updateListStatus(list.id, true);
    electronMainProccess.send("login-success", {
      formId: title,
    });
  } catch (error) {
    console.error("Login atau pengambilan data daftar harga gagal:", error);
    event.sender.send(
      "error",
      "Login atau pengambilan data daftar harga gagal"
    );
  }
};

module.exports = handleMonitoringBsi;
