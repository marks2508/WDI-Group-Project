const express = require('express');
const router  = express.Router();
const trips = require('../controllers/trips');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
// const users = require('../controllers/users');

// Routes go here

router.route('/trips')
  .get(secureRoute, trips.index)
  .post(secureRoute, trips.create);

router.route('/trips/:id')
  .get(secureRoute, trips.show)
  .put(secureRoute, trips.update)
  .delete(secureRoute, trips.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/trips/:id/comments')
  .post(secureRoute, trips.addComment);

router.route('/trips/:id/comments/:commentId')
  .delete(secureRoute, trips.deleteComment);

module.exports = router;
