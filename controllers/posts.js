const Post = require('../models/post');

function indexRoute(req, res, next) {
  Post
    .find()
    .populate('createdBy')
    .exec()
    .then((posts) => res.json(posts))
    .catch(next);
}

function showRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((post) => {
      if(!post) return res.notFound();

      res.json(post);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Post
    .create(req.body)
    .then((post) => res.status(201).json(post))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute
};
