angular
  .module('roadTrippers')
  .controller('TripsNewCtrl', TripsNewCtrl);

TripsNewCtrl.$inject = ['Trip', '$state'];
function TripsNewCtrl(Trip, $state) {
  const vm = this;
  vm.trip = {
    waypoints: []
  };

  function tripsCreate() {
    vm.trip.images = [vm.trip.images];
    Trip
      .save(vm.trip)
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  function addWaypoint() {
    if (vm.waypoint) {
      vm.trip.waypoints.push({ location: vm.waypoint });
      vm.waypoint = {};
    }
  }

  vm.create      = tripsCreate;
  vm.addWaypoint = addWaypoint;
}
