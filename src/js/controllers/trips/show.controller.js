angular
  .module('roadTrippers')
  .controller('TripsShowCtrl', TripsShowCtrl);

TripsShowCtrl.$inject = ['Trip', 'TripComment', '$state', '$http'];
function TripsShowCtrl(Trip, TripComment, $state, $http) {
  const vm = this;
  vm.trip = Trip.get($state.params);
  // vm.geocode = geocode;

  Trip
    .get($state.params)
    .$promise
    .then((trip) => {
      vm.trip = trip;
    });



  // function geocode() {
  //   $http
  //     .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${vm.address}&key=AIzaSyDFdykQIbI6dMLCGyov2befnGnaHEtKA5w`,
  //       { skipAuthorization: true })
  //     .then(res => {
  //       if (res.data.results.length) {
  //         $rootScope.$broadcast('newAddressFound', { address: res.data.results[0] });
  //         vm.error = false;
  //       } else {
  //         vm.result = null;
  //         vm.error = true;
  //       }
  //     });
  // }

  function TripsDelete() {
    vm.trip
      .$remove()
      .then(() => $state.go('tripsIndex'));
  }

  function addComment() {
    TripComment
      .save({ tripId: vm.trip.id }, vm.newComment)
      .$promise
      .then((comment) => {
        vm.trip.comments.push(comment);
        vm.newComment = {};
      });
  }

  function deleteComment(comment) {
    TripComment
      .delete({ tripId: vm.trip.id, id: comment.id })
      .$promise
      .then(() => {
        const index = vm.trip.comments.indexOf(comment);
        vm.trip.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;
  vm.addComment = addComment;
  vm.delete = TripsDelete;
}
