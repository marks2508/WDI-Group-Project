angular
  .module('roadTrippers')
  .factory('Trip', Trip);

Trip.$inject = ['$resource'];
function Trip($resource) {
  return new $resource('/api/trips/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
