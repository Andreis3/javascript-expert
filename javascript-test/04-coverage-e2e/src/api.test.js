const { describe, it } = require('mocha');
const request = require('supertest');
const assert = require('assert');

const app = require('./api');

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async() => {
        const response = await request(app)
                    .get('/contact')
                    .expect(200)
        
        assert.deepEqual(response.text, 'contact us page')
    });
  });

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async() => {
        const response = await request(app)
                    .get('/hi')
                    .expect(200)
        
        assert.deepEqual(response.text, 'Hello World')
    });
  });

  describe('/login', () => {
    it('should login successfully on the route and return HTTP Status 200', async() => {
        const response = await request(app)
                    .post('/login')
                    .send({ username: "AndreiSantos", password: "123"})
                    .expect(200)
        
        assert.deepEqual(response.text, 'Logging has succeeded!');
    });
    
    it('should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async() => {
      const response = await request(app)
                  .post('/login')
                  .send({ username: "Test", password: "test"})
                  .expect(401)
      
                  assert.ok(response.unauthorized);
      assert.deepEqual(response.text, 'Logging failed!');
    });
  });
});