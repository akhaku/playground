const app = require('app/server').default;

const request = require('supertest');

describe('GET /', () => {
  it('should get 200', done => {
    request(app).get('/').expect(200, done);
  });
});
