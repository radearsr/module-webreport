const axios = require('axios');
const qs = require('qs');

(async () => {
  try {
    let configGet = {
      method: 'GET',
      url: 'https://kepooh2h.com/login',
      headers: { 
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "User-Agent": "PostmanRuntime/7.32.3"
      },
    };
    const { data: html, headers } = await axios(configGet);
    console.log(html);
    const cookies = headers['set-cookie'];
    const splitedHtml = html.split('"');
    const token = splitedHtml[189];
    console.log(token);
    const [xsrfToken] = cookies[0].split(";");
    const [kepoSession] = cookies[1].split(";");

    let payloadData = qs.stringify({
      '_token': `${token}`,
      'username': 'H2O0599',
      'password': '175758' 
    });

    let config = {
      method: 'POST',
      url: 'https://kepooh2h.com/loginagent',
      headers: { 
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Length": Buffer.byteLength(payloadData),
        "Cookie": `${xsrfToken}; ${kepoSession}`,
        "Connection": "keep-alive",
        "User-Agent": "PostmanRuntime/7.32.3"
      },
      data : payloadData
    };
    const response = await axios(config);
    console.log(response.data);
    console.log(response.headers["set-cookie"]);
  } catch (error) {
    console.log(error);
  }
})();