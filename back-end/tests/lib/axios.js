const axios = require('axios');
require('node-axios-cookiejar')(axios);
const tough = require('tough-cookie');

module.exports = axios.create({
  baseURL: 'http://localhost:7007/api/',
  withCredentials: true,
  jar: new tough.CookieJar()
});
