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
    vm.trip.waypoints = vm.trip.waypoints.filter(waypoint => Object.keys(waypoint).length !== 0);

    Trip
      .save(vm.trip)
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  function addWaypoint() {
    if (vm.waypoint) {
      vm.trip.waypoints.push(vm.waypoint);
      vm.waypoint = {};
    }
  }

  vm.create      = tripsCreate;
  vm.addWaypoint = addWaypoint;
}
