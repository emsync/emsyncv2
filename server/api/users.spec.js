/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/users/', () => {
    const rickEmail = 'rick@rick.com';

    beforeEach(() => {
      return User.create({
        name: 'Rick',
        email: rickEmail,
        imageUrl: 'http://google.com',
        spotifyDisplayName: 'wormat23',
        accessToken: 'accessTokenHere',
        refreshToken: 'refreshTokenHere'
      });
    });

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/user/users')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].email).to.be.equal(rickEmail);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
