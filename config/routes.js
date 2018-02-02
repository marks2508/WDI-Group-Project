const router = require('express').Router();
const movies = require('../controllers/movies');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/movies')
  .get(movies.index)
  .post(secureRoute, movies.create);

router.route('/movies/:id')
  .get(movies.show)
  .put(secureRoute, movies.update)
  .delete(secureRoute, movies.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

module.exports = router;
