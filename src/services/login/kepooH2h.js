const { postLoginWeb } = require("../webreport/kepooH2h.services");
const dbService = require("../database/sqlite.services");
const loggingUtils = require("../../utils/logging/logging.utils");

const handleLoginKepooH2h = async (title, data, electronMainProccess) => {
  const { username, password } = data;
  try {
    loggingUtils.showLogging("INFO", `REQ_LOGIN_${title.toUpperCase()} ${JSON.stringify(data)}`);
    const availableLists = await dbService.readListByTitle(title);
    if (!availableLists) {
      loggingUtils.showLogging("INFO", "CREATE_NEW_LIST");
      dbService.createLists(title, username, password);
    }
    const list = await dbService.readListByTitle(title);
    loggingUtils.showLogging("WARN", JSON.stringify(list));
    if (list.status) {
      return electronMainProccess.send("res-login-auth", {
        formId: title,
      });
    }
    const loginResponse = await postLoginWeb(username, password);
    loggingUtils.showLogging("INFO", `RES_LOGIN ${JSON.stringify(loginResponse)}`);
    const token = loginResponse?.token;
    const cookie = loginResponse?.cookie;
    if (!token || !cookie) throw new Error("INVALID_TOKEN");
    const availableToken = await dbService.readAuthByListId(list.id);
    const newTokenFormat = `${token}&-&${cookie}`;
    if (!availableToken) {
      loggingUtils.showLogging("INFO", "CREATE_NEW_AUTH_TOKEN");
      await dbService.createAuth(list.id, newTokenFormat);
    }
    loggingUtils.showLogging("INFO", "UPDATE_NEW_AUTH_TOKEN");
    await dbService.updateAuthByListId(list.id, newTokenFormat);
    loggingUtils.showLogging("INFO", "UPDATE_AUTH_STATUS");
    await dbService.updateListStatus(list.id, true);
    electronMainProccess.send("res-login-auth", {
      formId: title,
    });
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = handleLoginKepooH2h;