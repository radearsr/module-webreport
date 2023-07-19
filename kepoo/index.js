const axios = require("axios");
const qs = require("qs");
const cheerio = require("cheerio");

const getCookie = async () => {
  try {
    const response = await axios.get("https://kepooh2h.com/login");
    const setCookieHeader = response.headers["set-cookie"];

    const xsrfTokenMatch = setCookieHeader[0].match(/XSRF-TOKEN=([^;]+)/);
    const kepooSessionMatch = setCookieHeader[1].match(/kepoo_session=([^;]+)/);

    if (xsrfTokenMatch && kepooSessionMatch) {
      const xsrfToken = xsrfTokenMatch[1];
      const kepooSession = kepooSessionMatch[1];

      const $ = cheerio.load(response.data);
      const token = $('input[name="_token"]').val();

      return {
        xsrfToken,
        kepooSession,
        token,
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

const loginWeb = async () => {
  //   const { token, xsrfToken, kepooSession } = cookie;
  //   console.log(token);
  //   console.log(xsrfToken);
  //   console.log(kepooSession);
  let data = qs.stringify({
    _token: `4ZmoiDjNUUzoPWFKLSCd5IUlmzXlgV5JAMraP44F`,
    username: "H2O0599",
    password: "175758",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://kepooh2h.com/loginagent",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //   Cookie: `XSRF-TOKEN=${xsrfToken}; kepoo_session=${kepooSession}`,
      Cookie:
        "XSRF-TOKEN=eyJpdiI6Ik5KRDBMaDIzeVF6bFFncmF5VlQ4cWc9PSIsInZhbHVlIjoiK21WZjdoR05yczBNNmg1QTVyOFJVWlU0QUh4UWZkemhrc1Bmb1g1T0tzXC9JVVBpVHR6VjZab2QwQXNJcHJlOFAiLCJtYWMiOiJjZDkxMWEyOGU0ZjVlNThjZThiMjE0ZGUxYzJlYTFlYTUwNTdhMDEwZDBlZDRiMzZlYWExNTYzOWUyOTVkMzZjIn0%3D; kepoo_session=eyJpdiI6IlQxUHNsd0dRV2RNVzRkcXppUXF4TXc9PSIsInZhbHVlIjoiQnRaMEk0NkxcLzIwRGJLcUZCc25RNVwvODd3ZGlVd3NTQnZHM3dpQUYrUHZ4UTVHTUxJbWZWNDhNaHV0OE1iVEtJIiwibWFjIjoiZGRmY2E1ZmUxYWQ2MDYyMDA1Y2ZkZmQ0ZWEwY2ZkZjVkMGZkNGRlZGUyZTIyNTM2ZDk3ZTBjNzRlYzUxZTYwNyJ9; serial=eyJpdiI6IndrZjh5M1pFZVVVZGg3a3VDMWczcGc9PSIsInZhbHVlIjoiU3A0SmR6SGNKUCtiMU1PK1A2Z1FuQT09IiwibWFjIjoiMDVmN2RjMzY0M2ExYTViNzk3YTViZTE2OTlhZTRlODA4ZTIyYTBlZWZkYzhlMDJjYzA4NTFiOWI0NDQwYmNlYiJ9",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const result = async () => {
  const getCokkie = await getCookie();
  const getSesi = await loginWeb();
};

result();
