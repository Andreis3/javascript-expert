const { describe, it } = require('mocha');
const request = require('supertest');
const { expect } = require('chai');
const app = require('./api');

describe('API Suite test', () => {
    describe('/contact', () => {
        it('should return contact us page', async () => {
            const response = await request(app)
                .get('/contact');

            expect(response.statusCode).to.equal(200);
            expect(response.text).to.equal('contact us page');
        })
    });

    describe('/hello', () => {
        it('should request an nonexistent route /hi and redirect to /hello ', async () => {
            const response = await request(app)
                .get('/hi');

            expect(response.statusCode).to.equal(200);
            expect(response.text).to.equal('Hello world');
        });
    });

    describe('/login', () => {
        it('should login successfully on the login route and return HTTP Status 200', async () => {
            const response = await request(app)
                .post('/login')
                .send({username: 'admin', password: 'admin'});

            expect(response.statusCode).to.equal(200);
            expect(response.text).to.equal('Logging has succeeded');
        });

        it('should unauthorized a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
            const response = await request(app)
                .post('/login')
                .send({username: 'test', password: 'test'});

            expect(response.statusCode).to.equal(401);
            expect(response.text).to.equal('Logging failed');
        });
    });
});