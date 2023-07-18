const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  '_token': 'azkMuUbxafQUqZJVr7HzOxl6Pf30NCzabLJC91Wb',
  'username': 'H2O0599',
  'password': '175758' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://kepooh2h.com/loginagent',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded',
    "Content-Length": Buffer.byteLength(data),
    'Cookie': 'XSRF-TOKEN=eyJpdiI6IkJ1bHNCQ0J4MXo4WEF2aE1EVkJLUGc9PSIsInZhbHVlIjoiaEFEazhmNU1DZ3BYVEFuNm1rRGdTWHJyXC9leEtUb0dsNzFrWWZiQ1p1MHM1NUxhb2NoempSWEg0dVVybUVYUEciLCJtYWMiOiI2ODFmMGM5MTIzMmY4NTZmYTEyZDUwMDE4NzViOWI4NTNmM2Q5OWFhZGFlYTRhZjBjNDM3N2UxNjRhZWM4Y2UwIn0%3D; kepoo_session=eyJpdiI6IkRXZjZYb1wvdzNXQ0pNeElXelhiY0J3PT0iLCJ2YWx1ZSI6IkN0MTFWSGFON0t6eWVabW5MWWhOUXZFWnFBaUp1MHBrVnZyNDdKNFFHTnU5TCtObUZYUk5jenFQc0hEcFwvWnVBIiwibWFjIjoiMjUxZWY0YmIzYTQ1MDVlMDhhYTQ4ZGU0NjRiMzQzY2JmMDk4Yjc0YTRiNmE5ZDFhMWFiNDhjZDk4NTM0MzdkOSJ9; serial=eyJpdiI6IkY4MThBaUxEXC9RbEQrMXozSXRVM2JnPT0iLCJ2YWx1ZSI6IlpSUFM1cW14XC90SFwvcHFhalRmcHk1dz09IiwibWFjIjoiMmZkNGJlZGMxYWMwNzBlOGEzNWQ1M2M4MDQ1MjVjNjVlYTQ3ZmU1ZGZiMTQ2NWIzN2EyMjliYmQ4MTdhNjM4ZSJ9'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(response);
})
.catch((error) => {
  console.log(error);
});
