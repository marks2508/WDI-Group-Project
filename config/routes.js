const express = require('express');
const router  = express.Router();
const posts = require('../controllers/posts');
// const auth = require('../controllers/auth');
// const users = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

// Routes go here

router.route('/posts')
  .get(posts.index);

router.route('/posts/:id')
  .get(posts.show);

module.exports = router;
