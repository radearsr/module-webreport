const axios = require('axios');
const { CookieJar } = require('tough-cookie');

async function sendRequestWithCookies() {
  try {
    const jar = new CookieJar();
    
    // Set the cookies received in a previous response
    const previousCookies = ['XSRF-TOKEN=eyJpdiI6IlFNXC95K0FQd0ZrWmJXODRYWFg2dXRRPT0iLCJ2YWx1ZSI6IllJbDVreHhlS3BzS05mSUpZNFExSzJ0U1lOWW9BXC9IMUtpRzV5M2RTS0xRU1JLZGxlalZtQnpCeWQ3bEJVSlV0IiwibWFjIjoiNTIxNDI2MjBmN2I3M2IyOTQ2NDdiZWM4NTE5NTg1OGFmYmI0ZDNmNGVjZDVmMzA2NzRkNzBiM2NjMGExMTU4ZiJ9', 'kepoo_session=eyJpdiI6ImhMaHRhenczRFNEbWZld205UFpFUVE9PSIsInZhbHVlIjoiMWxRUmdkeG4zRDg5SlNyT1VPNllmdm5KNGZRekVWZ2wrK002MG84UjJhMm5URHdEc1Q0N3NUcW5ldThuMDRlYSIsIm1hYyI6ImFkYTZjMGVkODNkMWQwY2Q4NDk0NzBjNTBkMDQ2ZThmZDIzMjhmOGUzMTdmMzFlOWVlYmY1N2FmN2ZlZDkzMzQifQ%3D%3D'];

    previousCookies.forEach(cookie => {
      jar.setCookieSync(cookie, 'https://kepooh2h.com');
    });
    
    const config = {
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
      },
      url: 'https://kepooh2h.com/loginagent',
      method: 'POST',
      jar: jar,
      body: "_token=wJoCNn59zbnUXN4cmepatrFcedQvnLxGcnDoby28&username=H2O0599&password=175758"
    };
    
    const response = await axios(config);
    
    // Get the cookies from the response headers
    // const cookies = jar.getCookiesSync('http://example.com');
    
    // Do something with the response and cookies
    console.log('Response:', response);
    // console.log('Cookies:', cookies);
  } catch (error) {
    console.error(error);
  }
}

sendRequestWithCookies();