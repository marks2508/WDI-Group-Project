angular
  .module('roadTrippers')
  .factory('Trip', Trip)
  .factory('TripComment', TripComment);

Trip.$inject = ['$resource'];
function Trip($resource) {
  return $resource('/api/trips/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

TripComment.$inject = ['$resource'];
function TripComment($resource) {
  return new $resource('/api/trips/:tripId/comments/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
