const User = require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('trips')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.json(user);
    })
    .catch(next);
}

function indexRoute(req, res, next) {
  User
    .find()
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}

module.exports = {
  show: showRoute,
  index: indexRoute
};
