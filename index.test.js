'use strict';

const request = require('supertest');

const app = require('./app');

describe('Deployer', () => {
  describe('POST Deploy', () => {
    it('Should execute bash script and return its output', async () => {
      const {text} = await request(app.callback())
      .post(`/v1.0.0/deployments`)
      .send({accessToken: 'trustedToken'})
      .expect(200);
      expect(text).toBeTruthy();
    });
    it('Should return 401 if token is invalid or not sent', async () => {
      await request(app.callback())
      .post(`/v1.0.0/deployments`)
      .expect(401);
    });
  });
});
