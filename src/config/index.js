/**
 * Config by ENV Fintech Interview
 */
const config = {
  // Config Open Weather API
  openWeather: {
    // Host of Open Weather API
    host: process.env.OPENWEATHER_HOST,
    // Token of Open Weather API
    appID: process.env.OPENWEATHER_APPID,
  },
  // Config IP-API
  ipGeolocation: {
    // Host of IP-API
    host: process.env.IPGEOLOCATION_HOST,
  },
};

module.exports = config;
