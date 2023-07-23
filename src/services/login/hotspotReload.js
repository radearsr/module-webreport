const webReportService = require("../webreport/hotspotReload.services");
const dbService = require("../database/sqlite.services");
const loggingService = require("../../utils/logging/logging.utils");

const handleHotspotReloadLogin = async (title, data, electronMainProccess) => {
  const { username, password } = data;
  try {
    loggingService.showLogging("INFO", JSON.stringify(data));
    const availableLists = await dbService.readListByTitle(title);
    if (!availableLists) {
      await dbService.createLists(title, username, password);
    }
    const list = await dbService.readListByTitle(title);
    if (list.status) {
      return electronMainProccess.send("login-success", {
        formId: title,
      });
    }
    const loginResponse = await webReportService.postLoginWeb(username, password);
    const token = loginResponse?.token;
    if (!token) throw new Error("INVALID_TOKEN");
    await dbService.createAuth(list.id, token);
    await dbService.updateListStatus(list.id, true);
    electronMainProccess.send("login-success", {
      formId: title,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = handleHotspotReloadLogin;