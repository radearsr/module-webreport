const { getCookieWeb, postLoginWeb } = require("../webreport/cyrus.services");
const loggingUtils = require("../../utils/logging/logging.utils");
const dbService = require("../database/sqlite.services");

const handleCyrus = async (title, data, electronMainProccess) => {
  const { username, password } = data;
  try {
    loggingUtils.showLogging("INFO", JSON.stringify(data));
    const availableLists = await dbService.readListByTitle(title);
    if (!availableLists) {
      await dbService.createLists(title, username, password);
    }
    const list = await dbService.readListByTitle(title);
    loggingUtils.showLogging("WARN", JSON.stringify(list));
    if (list.status) {
      return electronMainProccess.send("login-success", {
        formId: title,
      });
    }
    const responseCookie = await getCookieWeb();
    const loginResponse = await postLoginWeb(
      responseCookie,
      username,
      password
    );
    // const token = loginResponse;
    // const priceListsResponse = await getPriceLists(token);
    loggingUtils.showLogging("INFO", JSON.stringify(loginResponse));
    const token = loginResponse;
    if (!token) throw new Error("INVALID_TOKEN");
    const availableToken = await dbService.readAuthByListId(list.id);
    if (!availableToken) {
      await dbService.createAuth(list.id, token);
    }
    await dbService.updateAuthByListId(list.id, token);
    await dbService.updateListStatus(list.id, true);
    electronMainProccess.send("login-success", {
      formId: title,
    });
  } catch (error) {
    loggingUtils.showLogging("ERROR", error.stack);
  }
};

module.exports = handleCyrus;
