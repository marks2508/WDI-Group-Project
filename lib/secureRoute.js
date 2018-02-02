const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const User = require('../models/user');

function secureRoute(req,res,next) {
  if(!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  jwt
    .verifyAsync(token)
    .then((payload) => {
      return User.findById(payload.userId);
    })
    .then((user) => {
      if (!user) return res.unauthorized();
      req.user = user;
      return next();
    })
    .catch(next);
}

module.exports = secureRoute;
