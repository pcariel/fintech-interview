const request = require('supertest');

jest.mock('../../src/client/ip-geolocation', () => jest.requireActual('../../src/client/__mocks__/ip-geolocation'));

const app = require('../../src');

describe('Sample Testaaa', () => {
  const agent = request.agent(app);

  it('should test that true === true', (done) => {
    agent.get('/v1/location').expect(200, done);
  });
});
