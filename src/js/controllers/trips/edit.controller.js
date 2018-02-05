angular
  .module('roadTrippers')
  .controller('TripsEditCtrl', TripsEditCtrl);

TripsEditCtrl.$inject = ['$state', 'Trip'];
function TripsEditCtrl($state, Trip) {
  const vm = this;
  vm.bird = Trip.get($state.params);
  vm.update = birdsUpdate;

  function birdsUpdate(){
    Trip
      .update($state.params, vm.bird)
      .$promise
      .then(() => {
        $state.go('birdsShow', $state.params);
      });
  }
}
