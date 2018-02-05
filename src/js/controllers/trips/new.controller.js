angular
  .module('roadTrippers')
  .controller('TripsNewCtrl', TripsNewCtrl);

TripsNewCtrl.$inject = ['Trip', '$state'];
function TripsNewCtrl(Trip, $state) {
  const vm = this;
  vm.trip = {};

  function tripsCreate() {
    // if(vm.post.$valid) {
    Trip
      .save(vm.trip)
      .$promise
      .then(() => $state.go('tripsIndex'));
  }
  // }

  vm.create = tripsCreate;
}
