class IPGeolocation {
  constructor() { }

  // @ts-ignore
  // eslint-disable-next-line class-methods-use-this
  async getJson(ip, _fields = [], lang = 'en') {
    return Promise.resolve({
      query: '24.48.0.1',
      status: 'success',
      country: 'Canada',
      countryCode: 'CA',
      region: 'QC',
      regionName: 'Quebec',
      city: 'Montreal',
      zip: 'H1S',
      lat: 45.5808,
      lon: -73.5825,
      timezone: 'America/Toronto',
      isp: 'Le Groupe Videotron Ltee',
      org: 'Videotron Ltee',
      as: 'AS5769 Videotron Telecom Ltee',
    });
  }
}
module.exports = IPGeolocation;
