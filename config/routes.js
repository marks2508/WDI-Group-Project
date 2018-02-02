const express = require('express');
const router  = express.Router();
const trips = require('../controllers/posts');
// const auth = require('../controllers/auth');
// const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

// Routes go here

router.route('/posts')
  .get(trips.index)
  .post(secureRoute, trips.create);

router.route('/posts/:id')
  .get(trips.show);

module.exports = router;
