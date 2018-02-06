const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const User = require('../models/user');
const { secret } = require('../config/environment');

function secureRoute(req,res,next) {
  if(!req.headers.Authorization) return res.unauthorized();

  const token = req.headers.Authorization.replace('Bearer ', '');

  jwt
    .verifyAsync(token, secret)
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
