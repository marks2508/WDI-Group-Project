angular
  .module('roadTrippers')
  .controller('TripsNewCtrl', TripsNewCtrl);

TripsNewCtrl.$inject = ['Trip', '$state'];
function TripsNewCtrl(Trip, $state) {
  const vm = this;
  vm.post = {};

  

  function tripsCreate() {
    if(vm.newForm.$valid) {
      Trip
        .save(vm.trip)
        .$promise
        .then(() => $state.go('tripsIndex'));
    }
  }

  vm.create = tripsCreate;
}
