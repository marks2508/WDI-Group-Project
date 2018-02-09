const Trip = require('../models/trip');

function indexRoute(req, res, next) {
  Trip
    .find()
    .populate('createdBy')
    .exec()
    .then((trips) => res.json(trips))
    .catch(next);
}

function showRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    // .populate('createdBy')
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      res.json(trip);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Trip
    .create(req.body)
    .then((trip) => res.status(201).json(trip))
    .catch(next);
}


function addCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      const comment = trip.comments.create(req.body);
      trip.comments.push(comment);

      return trip.save()
        .then(() => res.json(comment));
    })
    .catch(next);
}


function tripsUpdate(req, res) {
  Trip
    .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .exec()
    .then(shoe => res.status(200).json(shoe))
    .catch(err => res.status(500).json(err));
}


function deleteCommentRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      const comment = trip.comments.id(req.params.commentId);
      comment.remove();

      return trip.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}


function deleteRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      return trip.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  delete: deleteRoute,
  update: tripsUpdate,
  addComment: addCommentRoute,
  deleteComment: deleteCommentRoute
};
