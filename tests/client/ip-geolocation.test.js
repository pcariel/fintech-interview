const MockAdapter = require('axios-mock-adapter');
const should = require('should');
const { IPGeolocation } = require('../../src/client');

describe('IPGeolocation Tests', () => {
  const ipGeolocation = new IPGeolocation();
  const mock = new MockAdapter(ipGeolocation.client);

  it('should test Current', async (done) => {
    const ip = '24.48.0.1';
    const lang = 'en';

    mock.onGet(`/json/${ip}?lang=${lang}`).reply(200, {
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

    try {
      const response = await ipGeolocation.getJson(ip);
      should(response).have.property('status').with.equal('success');
      should(response).have.property('city').with.equal('Montreal');
      should(response).have.property('country').with.equal('Canada');
      done();
    } catch (error) {
      done(error);
    }
  });
});
