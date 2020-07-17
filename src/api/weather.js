// eslint-disable-next-line no-unused-vars
const express = require('express');
const { IPGeolocation, OpenWeather } = require('../client');
const logging = require('../logging');

const ipGeolocation = new IPGeolocation();
const openWeather = new OpenWeather();

/**
   * WeatherAPI - Retrive location By IP-API
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next middleware function
   */
const location = async (req, res, next) => {
  logging.info('Retrieve Location by Real IP');

  try {
    const ipRespopnse = await ipGeolocation.getJson(req.ip);

    res.json({
      city: ipRespopnse.city,
      country: ipRespopnse.country,
      countryCode: ipRespopnse.countryCode,
    });
  } catch (error) {
    next(error);
  }
};

/**
   * WeatherAPI - Retrive current By IP-API & OpenWeather
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express next middleware function
   */
const current = async (req, res, next) => {
  let { city } = req.params;
  logging.info(`Retrieve Current ${city}`);

  try {
    if (city === undefined) {
      const ipRespopnse = await ipGeolocation.getJson(req.ip);
      city = ipRespopnse.city;
    }

    const openWeatherResponse = await openWeather.currentByCityName(city);

    res.send({
      kelvin: openWeatherResponse.main,
      grad_celsius: OpenWeather.convertKelvinToCelsius(openWeatherResponse.main),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * WeatherAPI - Retrive forecast By IP-API & OpenWeather
 * @param {express.Request} req Express request object
 * @param {express.Response} res Express response object
 * @param {express.NextFunction} next Express next middleware function
 */
const forecast = async (req, res, next) => {
  let { city } = req.params;
  logging.info(`Retrieve Forecast ${city}`);

  try {
    if (city === undefined) {
      const ipRespopnse = await ipGeolocation.getJson('186.137.161.123');
      city = ipRespopnse.city;
    }

    const openWeatherResponse = await openWeather.forecastByCityName(city);

    res.send(openWeatherResponse.list);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  location,
  current,
  forecast,
};
