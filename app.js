const axios = require("axios");

const config = {
  url: "https://kepooh2h.com/informasi/produk",
  headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "upgrade-insecure-requests": "1",
    "cookie": "serial=eyJpdiI6IjJMa0RyY1gzbGd2NkFQV3FrV1lwaFE9PSIsInZhbHVlIjoiRU1YMHJVRGVBWElYclVXZVwvWFZVXC93PT0iLCJtYWMiOiIxMWUyNTNiMTJjOTBkZGY5NzNkOTdmNjdmNWIzZGJlOTkzZWI3YmU2ZTVkNGQxZWE1NWM3OWEzNGRhMmU2NTlmIn0%3D; XSRF-TOKEN=eyJpdiI6IlBpQ0U3ZjZoSFMxaUtFXC9JbFJuVHNnPT0iLCJ2YWx1ZSI6IlQwM3RYcTR5S25CN3I0VmJDVVVWejhzZUxhTVdpNGxUK05CR3puTWx4cVNXWGRcL0FNa3grS2dxR0Q0Mm1NaXpwIiwibWFjIjoiNzU0NWM5ODIyOWUyNzA1YWRiZmM3MDc1ZTJjNjg5Y2U5YTZjYjAxNzhiMmM2NzBjMWI2NDk5YzBjNTdmYTJiYyJ9; kepoo_session=eyJpdiI6IkhnN00zamlkRFB1XC9DR2xvMHBXbHJnPT0iLCJ2YWx1ZSI6InlGTGZjQktHU2ZTVXVCemgzYVVubEV0V3B2WnI3OGF2QVdvdmJSMmdRXC9aQnZtUE1aUkJmSEw2TVdUbHk3TXgyIiwibWFjIjoiZjM3ZjJjZTI4OTkzYzkwYWJmYTQ4NjMxMDFhYTI0MGQ5OTVmMWFhZjk0ZDM4NzgyMzUyMmQzNmIwMmQ5NDVhNSJ9",
    "Referer": "https://kepooh2h.com/login",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  method: "GET"
};

const getLoginPage = {
  url: "https://kepooh2h.com/login",
  method: "GET",
}

const postLoginConfig = {
  headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "Cookie": "XSRF-TOKEN=eyJpdiI6IjY1SVBBUmFSOThJSkpSMTdoWmc4ZXc9PSIsInZhbHVlIjoiUUZ6VjlvNkJyV1BZQ293a0dEUTVqMjZYa3B0YjVFT1lvS2xybFNLcEY0WUt5eVwvd2hMeFBTd09JbkxvazR0MmIiLCJtYWMiOiI0ZDQ2ZGQyZjA0NjZkYWVkNzM1NTg5MTNhNjY4ZWQyYzE4ZGU0MTA1OGI3YmJhY2Y3MWYzODAyMTlkZThiYWM1In0%3D;kepoo_session=eyJpdiI6IkJ5eDZ2VmxrenlraWltTWJDOHFpNkE9PSIsInZhbHVlIjoiUTVTOUZMWDZWRU1WQlpNTUFXUk9ndFc5ckF6c3dma2x1XC9YYm51NE5XNDVpVmhyazhcL0FyOG0xSVM1QWVOb1wvTiIsIm1hYyI6IjdkY2YyOWMyNWE4YjI0ZTU2ZDgzOWQxZDdkMjVkZTVjMmQ2OWNhYWMwMGNjZDhiZTMyYzgwMmVkZDdmMTc1MDYifQ%3D%3D",
    "upgrade-insecure-requests": "1"
  },
  method: "POST",
  url: "https://kepooh2h.com/loginagent",
  body: "_token=s6lq6RQXrNo3qPng8X4ZS311tzlLy1mSOyZsHZob&username=H2O0599&password=175758"

};

(async () => {
  try {
    const response = await axios(getLoginPage);
    const cookies = response.headers['set-cookie'];
    console.log(response);
    console.log(cookies);
  } catch (error) {
    console.log(error);
  }
})();
