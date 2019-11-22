import * as request from 'supertest';

import app from '../app/app';

process.env.TEST_SUITE = 'main';

// API routes tests
describe('Basic server test', () => {
  test('Should answer the GET / request with a 200 status code.', (done) => {
    request(app).get('/').then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
});
