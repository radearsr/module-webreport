const { getCookieWeb, postLoginWeb } = require("../webreport/cyrus.services");
const loggingUtils = require("../../utils/logging/logging.utils");
const dbService = require("../database/sqlite.services");

const handleCyrus = async (title, data, electronMainProccess) => {
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
    const responseGetWeb = await getCookieWeb();
    const loginResponse = await postLoginWeb(
      responseGetWeb.cookieKey,
      responseGetWeb.cookieValue,
      username,
      password
    );
    loggingUtils.showLogging("INFO", `RES_LOGIN ${JSON.stringify(loginResponse)}`);
    const newFormatToken = `${loginResponse?.cookieKey}&-&${loginResponse?.cookieValue}`;
    if (!loginResponse?.cookieKey || !loginResponse?.cookieValue) throw new Error("INVALID_TOKEN");
    const availableToken = await dbService.readAuthByListId(list.id);
    if (!availableToken) {
      loggingUtils.showLogging("INFO", "CREATE_NEW_AUTH_TOKEN");
      await dbService.createAuth(list.id, newFormatToken);
    }
    loggingUtils.showLogging("INFO", "UPDATE_NEW_AUTH_TOKEN");
    await dbService.updateAuthByListId(list.id, newFormatToken);
    loggingUtils.showLogging("INFO", "UPDATE_AUTH_STATUS");
    await dbService.updateListStatus(list.id, true);
    electronMainProccess.send("res-login-auth", {
      formId: title,
    });
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = handleCyrus;
