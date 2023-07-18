const axios = require('axios');

async function sendPostRequestWithCookies() {
  try {
    const cookies = [
      'XSRF-TOKEN=eyJpdiI6IlFNXC95K0FQd0ZrWmJXODRYWFg2dXRRPT0iLCJ2YWx1ZSI6IllJbDVreHhlS3BzS05mSUpZNFExSzJ0U1lOWW9BXC9IMUtpRzV5M2RTS0xRU1JLZGxlalZtQnpCeWQ3bEJVSlV0IiwibWFjIjoiNTIxNDI2MjBmN2I3M2IyOTQ2NDdiZWM4NTE5NTg1OGFmYmI0ZDNmNGVjZDVmMzA2NzRkNzBiM2NjMGExMTU4ZiJ9',
      'kepoo_session=eyJpdiI6ImhMaHRhenczRFNEbWZld205UFpFUVE9PSIsInZhbHVlIjoiMWxRUmdkeG4zRDg5SlNyT1VPNllmdm5KNGZRekVWZ2wrK002MG84UjJhMm5URHdEc1Q0N3NUcW5ldThuMDRlYSIsIm1hYyI6ImFkYTZjMGVkODNkMWQwY2Q4NDk0NzBjNTBkMDQ2ZThmZDIzMjhmOGUzMTdmMzFlOWVlYmY1N2FmN2ZlZDkzMzQifQ%3D%3D'
    ];

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
        Cookie: cookies.join('; '), // Combine the cookies into a single string
      },
      method: "POST",
      url: "https://kepooh2h.com/loginagent",
      body: "_token=wJoCNn59zbnUXN4cmepatrFcedQvnLxGcnDoby28&username=H2O0599&password=175758"

    }

    const response = await axios(config);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

sendPostRequestWithCookies();