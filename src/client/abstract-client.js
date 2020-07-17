const axios = require('axios');
const http = require('http');
const https = require('https');
const logging = require('../logging');

class AbstractClient {
  /**
   * Construct AbstractClient
   * @param {string} baseURL BaseURL from API Client Service
   */
  constructor(baseURL) {
    this.client = axios.default.create({
      baseURL,
      headers: {
        'User-Agent': 'Fintech-Interview V1.0',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // 5 sec timeout
      timeout: 5000,
      // keepAlive pools and reuses TCP connections, so it's faster
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    });

    this.client.interceptors.response.use((response) => {
      logging.debug(response);
      return response.data;
    });
  }
}

module.exports = AbstractClient;
