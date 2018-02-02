const express = require('express');
const router  = express.Router();
const trips = require('../controllers/trips');
const auth = require('../controllers/auth');
// const users = require('../controllers/users')
// const auth = require('../controllers/auth');
// const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

// Routes go here

router.route('/trips')
  .get(trips.index)
  .post(trips.create);

router.route('/trips/:id')
  .get(trips.show)
  .delete(trips.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

module.exports = router;
