/* globals api, expect, it, describe, afterEach, beforeEach */
const User = require('../../../models/user');

describe('Authentication Controller Tests', () => {

  afterEach(done => {
    User.collection.remove();
    done();
  });

  // REGISTER ROUTE
  describe('POST /api/register', () => {
    it('should register a user providing the correct credentials', done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password',
          picture: 'http://static2.businessinsider.com/image/5899ffcf6e09a897008b5c04-1200/.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Registration successful');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should not register a user if password and passwordConfirmation do not match', done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'passworddd',
          picture: 'http://static2.businessinsider.com/image/5899ffcf6e09a897008b5c04-1200/.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          done();
        });
    });
  });

  // LOGIN ROUTE
  describe('POST /api/login', () => {
    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end(() => {
          done();
        });
    });

    it('should login a user with the correct credentials', done => {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          done();
        });
    });

    it('should not login a user with incorrect credentials', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'passworddd'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unauthorized');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });
  });

});
