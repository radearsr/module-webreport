const CryptoJS = require("crypto-js");

function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

const dsguid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
const applicationId = "dbb28fda-31c6-4579-0671-de10146c4b83";
const restApiKey = "b6478c6f-3074-43c9-03d4-d52b6ef9005f";

const encryptedPassword = (password) => {
  return CryptoJS.MD5("pmk123").toString();
}

module.exports = {
  encryptedPassword,
  restApiKey,
  applicationId,
  dsguid,
};


