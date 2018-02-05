angular
  .module('roadTrippers')
  .controller('TripsShowCtrl', TripsShowCtrl);

TripsShowCtrl.$inject = ['Trip', '$state'];
function TripsShowCtrl(Trip, $state) {
  const vm = this;
  // vm.trip = Trip.get($state.params);
  Trip
    .get($state.params)
    .$promise
    .then((trip) => {
      vm.trip = trip;
    });

  function TripsDelete() {
    vm.post
      .$remove()
      .then(() => $state.go('tripsIndex'));
  }


  // function addComment() {
  //   PostComment
  //     .save({ tripId: vm.trip.id }, vm.newComment)
  //     .$promise
  //     .then((comment) => {
  //       vm.trip.comments.push(comment);
  //       vm.newComment = {};
  //     });
  // }
  //
  // function deleteComment(comment) {
  //   PostComment
  //     .delete({ tripId: vm.trip.id, id: comment.id })
  //     .$promise
  //     .then(() => {
  //       const index = vm.trip.comments.indexOf(comment);
  //       vm.trip.comments.splice(index, 1);
  //     });
  // }
  //
  // vm.deleteComment = deleteComment;
  // vm.addComment = addComment;
  vm.delete = TripsDelete;
}
