const config = require('../config');
const AbstractClient = require('./abstract-client');
const logging = require('../logging');

class OpenWeather extends AbstractClient {
  constructor() {
    super(config.openWeather.host);
  }

  /**
   * Response JSON IP=API
   * @typedef {{lon: number, lat: number}} Coord
   * @typedef {{id: number, main: string, description: string, icon: string}} Weather
   * @typedef {{temp: number, pressure: number, humidity: number, temp_min: number, temp_max: number}} Main
   * @typedef {{speed: number, deg: number}} Wind
   * @typedef {{all: number}} Clouds
   * @typedef {{type: number, id: number, message: number, country: string, sunrise: number, sunset:number}} Sys
   * @typedef {Object} JsonCurrentResponse
   * @property {number} id
   * @property {string} name
   * @property {number} cod
   * @property {Coord} coord
   * @property {Weather[]} weather
   * @property {string} base
   * @property {Main} main
   * @property {number} visibility
   * @property {Wind} wind
   * @property {Clouds} clouds
   * @property {number} dt
   * @property {Sys} sys
   */

  /**
   *  Current By City Name OpenWeather
   * @param {string} q city name, state code and country code divided by comma, use ISO 3166 country codes.
   * @return {Promise<JsonCurrentResponse>} A promise to the json response IP-API
   * @see {@link https://openweathermap.org/current|OpenWeather}
   */
  async currentByCityName(q) {
    logging.info('Retrieve OpenWeather /weather');
    return this.client.get('/weather', {
      params: {
        q,
        appid: config.openWeather.appID,
      },
    });
  }

  /**
   *
   * @typedef {Object} JsonForecastResponse
   */

  /**
   * Forecast By City Name OpenWeather
   * @param {string} q city name, state code and country code divided by comma, use ISO 3166 country codes.
   * @return {Promise<JsonForecastResponse>} A promise to the json response IP-API
   * @see {@link https://openweathermap.org/api/hourly-forecast|OpenWeather}
   */
  async forecastByCityName(q) {
    logging.info('Retrieve OpenWeather /forecast');
    return this.client.get('/forecast', {
      params: {
        q,
        appid: config.openWeather.appID,
      },
    });
  }

  /**
   * Convert Kelvin To Celsius
   * @param {Main} main
   */
  static convertKelvinToCelsius(main) {
    const func = (kelvin) => (kelvin - 273.15).toFixed(2);
    return {
      temp: func(main.temp),
      temp_min: func(main.temp_min),
      temp_max: func(main.temp_max),
    };
  }
}

module.exports = OpenWeather;
