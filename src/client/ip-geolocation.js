const queryString = require('query-string');
const config = require('../config');
const AbstractClient = require('./abstract-client');
const logging = require('../logging');
/**
 * IPGeolocation Client
 * URL: https://ip-api.com/
 */
class IPGeolocation extends AbstractClient {
  constructor() {
    super(config.ipGeolocation.host);
  }

  /**
   * Response JSON IP=API
   * @typedef {Object} JsonResponse
   * @property {string} status - success or fail.
   * @property {string} message - included only when status is fail Can be one of the following: private range, reserved range, invalid query
   * @property {string} continent - Continent name.
   * @property {string} continentCode - Two-letter continent code
   * @property {string} country - Country name
   * @property {string} countryCode - Two-letter country code ISO 3166-1 alpha-2
   * @property {string} region - Region/state short code (FIPS or ISO)
   * @property {string} regionName - Region/state
   * @property {string} city - City
   * @property {string} district - District (subdivision of city)
   * @property {string} zip - Zip code
   * @property {number} lat - Latitude
   * @property {number} lon - Zip Longitude
   * @property {string} timezone - Timezone (tz)
   * @property {number} offset - Timezone UTC DST offset in seconds
   * @property {string} currency - National currency
   * @property {string} isp - ISP name
   * @property {string} org - Organization name
   * @property {string} as - AS number and organization, separated by space (RIR). Empty for IP blocks not being announced in BGP tables.
   * @property {string} asname - AS name (RIR). Empty for IP blocks not being announced in BGP tables.
   * @property {string} reverse - Reverse DNS of the IP (can delay response)
   * @property {boolean} mobile - Mobile (cellular) connection
   * @property {boolean} proxy - Proxy, VPN or Tor exit address
   * @property {boolean} hosting - Hosting, colocated or data center
   * @property {string} query - IP used for the query
   */
  /**
   * IP Geolocation - JSON endpoint
   * @param {string} ip
   * @param {('es'|'en'|'de'|'pt-BR'|'fr'|'ja'|'zh-CN'|'ru')} lang
   * @param {string[]} fields
   * @return {Promise<JsonResponse>} A promise to the json response IP-API
   * @see {@link https://ip-api.com/docs/api:json|IP-API}
   */
  async getJson(ip, fields = [], lang = 'en') {
    // eslint-disable-next-line max-len
    const query = queryString.stringify({ lang, fields }, { skipNull: true, skipEmptyString: true });
    const paht = `/json/${ip}?${query}`;
    logging.info(`Retrieve IP-API Path: ${paht}`);
    return this.client.get(paht);
  }
}

module.exports = IPGeolocation;
