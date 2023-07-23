const { postLoginWeb } = require("../webreport/pluslink.services");
const loggingUtils = require("../../utils/logging/logging.utils");
const dbService = require("../database/sqlite.services");

const handlePlusLink = async (title, data, electronMainProccess) => {
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
    const loginResponse = await postLoginWeb(username, password);
    loggingUtils.showLogging("INFO", JSON.stringify(loginResponse));
    const token = loginResponse?.token;
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

module.exports = handlePlusLink;
