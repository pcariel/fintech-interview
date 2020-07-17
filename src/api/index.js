const express = require('express');
const weather = require('./weather');

const api = express.Router();

// Register WeatherAPI
api.get('/location', weather.location);
api.get('/current', weather.current);
api.get('/current/:city', weather.current);
api.get('/forecast', weather.forecast);
api.get('/forecast/:city', weather.forecast);

// Handler Error Axios
api.use(async (error, req, res, next) => {
  if (error.isAxiosError) {
    const { status, statusText } = error.response;
    res.status(status).send(statusText);
  }
});

module.exports = api;
