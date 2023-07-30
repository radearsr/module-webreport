const { getCookieWeb, postLoginWeb } = require("../webreport/cyrus.services");
const loggingUtils = require("../../utils/logging/logging.utils");
const dbService = require("../database/sqlite.services");

const handleCyrus = async (title, data, electronMainProccess) => {
  const { username, password } = data;
  try {
    loggingUtils.showLogging("INFO", JSON.stringify(data));
    const availableLists = dbService.readListByTitle(title);
    if (!availableLists) {
      dbService.createLists(title, username, password);
    }
    const list = dbService.readListByTitle(title);
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
    loggingUtils.showLogging("INFO", JSON.stringify(loginResponse));
    const newFormatToken = `${loginResponse?.cookieKey}&-&${loginResponse?.cookieValue}`;
    if (!loginResponse?.cookieKey || !loginResponse?.cookieValue) throw new Error("INVALID_TOKEN");
    const availableToken = dbService.readAuthByListId(list.id);
    if (!availableToken) {
      dbService.createAuth(list.id, newFormatToken);
    }
    dbService.updateAuthByListId(list.id, newFormatToken);
    dbService.updateListStatus(list.id, true);
    electronMainProccess.send("res-login-auth", {
      formId: title,
    });
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = handleCyrus;
