const request = require('supertest');
const app = require('../server/index');

describe(' +++++++++++++++++++++ BACK-END ROUTES  +++++++++++++++++++++', () => {
  describe('GET /users', () => {
    xit('respond with json containing a list of all users', done => {
      request(app)
        .get('/api/user/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
  });

  describe('GET /rooms', () => {
    xit('respond with json containing a list of all rooms', done => {
      request(app)
        .get('/api/rooms')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
  });

  describe('GET /queueItem by room Id', () => {
    xit(`respond with json containing a list of all songs in a room's queue`, done => {
      request(app)
        .get('/api/queues/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
  });

  describe('POST /rooms', () => {
    let wrongData = {
      // name:'',
      description: 'dummy',
      imageUrl: 'dummy'
    };
    let goodData = {
      name: 'dummy Room',
      description: 'dummy',
      imageUrl: 'dummy'
    };
    it('respond with 400 and `Room not created ` when request is sent with the wrong data', done => {
      request(app)
        .post('/api/rooms')
        .send(wrongData)
        .set('Accept', 'application/json')
        .expect('"Room not created"')
        .expect(400, done);
    });
    xit('respond with 201  when request is sent with the correct data', done => {
      request(app)
        .post('/api/rooms')
        .send(goodData)
        .set('Accept', 'application/json')
        .expect(201, done);
    });
  });
});
