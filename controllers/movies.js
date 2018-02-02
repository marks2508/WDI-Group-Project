const Movie = require('../models/movie');

function indexRoute(req, res, next) {
  Movie
    .find()
    .exec()
    .then((movies) => res.json(movies))
    .catch(next);
}

function createRoute(req, res, next) {
  Movie
    .create(req.body)
    .then((movie) => res.status(201).json(movie))
    .catch(next);
}

function showRoute(req, res, next) {
  Movie
    .findById(req.params.id)
    .exec()
    .then((movie) => {
      if(!movie) return res.notFound();

      res.json(movie);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Movie
    .findById(req.params.id)
    .exec()
    .then((movie) => {
      if(!movie) return res.notFound();

      Object.assign(movie, req.body);
      return movie.save();
    })
    .then((movie) => res.json(movie))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Movie
    .findById(req.params.id)
    .exec()
    .then((movie) => {
      if(!movie) return res.notFound();

      return movie.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
