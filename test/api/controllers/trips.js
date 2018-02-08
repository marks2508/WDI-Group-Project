/* globals api, expect, it, describe, afterEach, beforeEach */
require('../../spec_helper');

const Trip = require('../../../models/trip');
const User = require('../../../models/user');

describe('Trips Controller Test', () => {
  afterEach(done => {
    User.collection.drop();
    done();
  });

  // INDEX ROUTE
  describe('GET /api/trips', () => {
    beforeEach(done => {

      User
        .create({
          username: 'JackD',
          email: 'jack@ga.com',
          password: 'password',
          passwordConfirmation: 'password',
          picture: 'http://static2.businessinsider.com/image/5899ffcf6e09a897008b5c04-1200/.jpg'
        })
        .then((user) => {
          Trip
            .create({
              title: 'The Red Centre Way',
              description: 'There is plenty to do and see in this region.',
              createdBy: user
            })
            .then(() => done());
        })
        .catch(done);

    });

    it('should return a 200 response', done => {
      api
        .get('/api/trips')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    //   it('should return an array of trips', done => {
    //     api
    //       .get('/api/shoes')
    //       .set('Accept', 'application/json')
    //       .end((err, res) => {
    //         expect(res.body).to.be.an('array');
    //         done();
    //       });
    //   });
    //
    //   it('should return an array of shoe objects with specific properties', done => {
    //     api
    //       .get('/api/shoes')
    //       .set('Accept', 'application/json')
    //       .end((err, res) => {
    //         expect(res.body)
    //           .to.be.an('array')
    //           .and.have.property(0)
    //           .and.have.all.keys([
    //             '_id',
    //             'id',
    //             '__v',
    //             'brand',
    //             'color',
    //             'material',
    //             'laced',
    //             'price',
    //             'createdAt',
    //             'updatedAt'
    //           ]);
    //         done();
    //       });
    //   });

  });


});
