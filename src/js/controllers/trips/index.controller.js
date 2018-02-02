angular
  .module('roadTrippers')
  .controller('TripsIndexCtrl', TripsIndexCtrl);

TripsIndexCtrl.$inject = ['Trip'];
function TripsIndexCtrl(Trip) {
  const vm = this;
  console.log(vm.all);
  vm.all = Trip.query();
}
