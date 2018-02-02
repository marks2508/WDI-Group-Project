const express = require('express');
const router  = express.Router();
const posts = require('../controllers/trips');
// const auth = require('../controllers/auth');
// const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

// Routes go here

router.route('/trips')
  .get(posts.index)
  .post(posts.create);

router.route('/trips/new')
  .post(posts.create);

router.route('/trips/:id')
  .get(posts.show);

module.exports = router;
