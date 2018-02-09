angular
  .module('roadTrippers')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource) {
  return $resource('/api/users/:id', { id: '@id' });
}
