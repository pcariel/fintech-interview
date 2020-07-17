const { transports, format, createLogger } = require('winston');

const logger = createLogger({
  level: process.env.LOGGER_LEVEL || 'debug',
  format: format.json(),
  defaultMeta: { service: 'fintech-interview' },
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
