require('../spec_helper');

describe('Trip Test', () => {
  describe('GET /api/trip', () => {
    it ('should return a 200 response', function(done) {
      api
        .get('/api/trip')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });
});
