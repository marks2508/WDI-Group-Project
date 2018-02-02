angular
  .module('roadTrippers')
  .controller('TripsIndexCtrl', TripsIndexCtrl);

TripsIndexCtrl.$inject = ['Trip', '$http'];
function TripsIndexCtrl(Trip, $http) {
  const vm = this;
  vm.all = [];
  // vm.all = Trip.query();
  $http
    .get('api/trips')
    .then((res) => {
      vm.all = res.data;
      return vm.all;
    });
}
