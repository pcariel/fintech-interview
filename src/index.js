const express = require('express');
const morgan = require('morgan');
const api = require('./api');

const app = express();

app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API
app.use('/v1', api);

module.exports = app;
