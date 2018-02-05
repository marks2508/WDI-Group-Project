angular
  .module('roadTrippers')
  .controller('TripsEditCtrl', TripsEditCtrl);

TripsEditCtrl.$inject = ['$state', 'Trip'];
function TripsEditCtrl($state, Trip) {
  const vm = this;
  vm.trip = Trip.get($state.params);
  vm.update = tripsUpdate;

  function tripsUpdate(){
    Trip
      .update($state.params, vm.trip)
      .$promise
      .then(() => {
        $state.go('tripsShow', $state.params);
      });
  }
}
