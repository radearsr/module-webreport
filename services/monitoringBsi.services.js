const axios = require("axios");
const utilsMonitoringBsi = require("../utils/monitoringBsi/monitoringBsi.utils");
const { applicationId, dsguid, restApiKey } = utilsMonitoringBsi;

const postLoginWeb = async (username, password) => {
  try {
    const resultEncryptPassword = utilsMonitoringBsi.encryptedPassword(password);
    const config = {
      url: "http://122.248.38.30:1028/services",
      headers: {
        "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        Authorization: "8b00f05162d63f1de06dadc47207a2b48aab076805423850dcca54216149f6ec",
        "X-DS-Application-Id": applicationId,
        "X-DS-REST-API-Key": restApiKey,
        "X-DS-GUID": dsguid
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      data: {
        service:"loginws",
        data: { 
          param: username,
          param2: resultEncryptPassword,
          guid: dsguid,
        }
      },
      method: "POST",
      mode: "cors",
      credentials: "include"
    };
    const response = await axios(config);
    const actualData = response.data.data[0].data;
    const splitedActualData = actualData.split(";");
    const tokenAuth = splitedActualData[splitedActualData.length - 1];
    return {
      token: tokenAuth,
      dataAcc: splitedActualData[0],
    };
  } catch (error) {
    console.log(error);
  }
};

const getPriceLists = async (token, dataAcc) => {
  try {
    const config = {
      url: "http://122.248.38.30:1028/services",
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "access-control-allow-headers": "Content-Type, Accept, Authorization",
        "access-control-allow-methods": "*",
        "access-control-allow-origin": "*",
        Authorization: token,
        "X-DS-Application-Id": applicationId,
        "X-DS-REST-API-Key": restApiKey,
        "X-DS-GUID": dsguid,
      },
      data: {
        service: "getProductPriceList",
        data: {
          acc: dataAcc,
        },
      },
      method: "POST",
      mode: "cors",
      credentials: "include"
    }
    const response = await axios(config);
    return {
      data: response.data.data,
      token: response.data.token,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postLoginWeb,
  getPriceLists,
}