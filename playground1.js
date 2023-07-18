const axios = require("axios");


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
      param2: encryptedPassword,
      guid: dsguid,
    }
  },
  method: "POST",
  mode: "cors",
  credentials: "include"
};

console.log(config);

// const configPost2 = {
//   url: "http://122.248.38.30:1028/services",
//   headers: {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "access-control-allow-headers": "Content-Type, Accept, Authorization",
//     "access-control-allow-methods": "*",
//     "access-control-allow-origin": "*",
//     "authorization": tokenAuth2,
//     "x-ds-application-id": applicationId,
//     "x-ds-guid": dsguid,
//     "x-ds-rest-api-key": restApiKey
//   },
//   data: {
//     service: "getProductPriceList",
//     data: {
//       acc: splitedActualData[0],
//     },
//   },
//   method: "POST",
//   mode: "cors",
//   credentials: "include"
// }
(async () => {
  try {
    const response = await axios(config);
    console.log(response.data.data);
    const actualData = response.data.data[0].data;
    const splitedActualData = actualData.split(";");
    const tokenAuth2 = splitedActualData[splitedActualData.length - 1];
    console.log(tokenAuth2);
    // const configGet2 = {
    //   url: "http://122.248.38.30:1028/services",
    //   headers: {
    //     "accept": "*/*",
    //     "accept-language": "en-US,en;q=0.9",
    //     "access-control-allow-headers": "Content-Type, Accept, Authorization",
    //     "access-control-allow-methods": "*",
    //     "access-control-allow-origin": "*",
    //     Authorization: tokenAuth2,
    //     "X-DS-Application-Id": applicationId,
    //     "X-DS-REST-API-Key": restApiKey,
    //     "X-DS-GUID": dsguid,
    //   },
    //   method: "GET",
    //   mode: "cors",
    //   credentials: "include"
    // }

    const configPost2 = {
      url: "http://122.248.38.30:1028/services",
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "access-control-allow-headers": "Content-Type, Accept, Authorization",
        "access-control-allow-methods": "*",
        "access-control-allow-origin": "*",
        Authorization: tokenAuth2,
        "X-DS-Application-Id": applicationId,
        "X-DS-REST-API-Key": restApiKey,
        "X-DS-GUID": dsguid,
      },
      data: {
        service: "getProductPriceList",
        data: {
          acc: splitedActualData[0],
        },
      },
      method: "POST",
      mode: "cors",
      credentials: "include"
    }
    console.log(configPost2);
    const response2 = await axios(configPost2);
    console.log(response2);
  } catch (error) {
    console.log(error);
  }
})();