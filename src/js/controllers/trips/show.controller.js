angular
  .module('roadTrippers')
  .controller('TripsShowCtrl', TripsShowCtrl);
// .filter('contains', function() {
//   return function (array, needle) {
//     return array.indexOf(needle) >= 0;
//   };
// });

TripsShowCtrl.$inject = ['Trip', '$http', 'TripComment', '$state'];
function TripsShowCtrl(Trip, $http, TripComment, $state) {
  const vm = this;
  vm.userModalOpen = null;
  vm.albumModalOpen = null;
  vm.trip = Trip.get($state.params);
  // vm.geocode = geocode;
  vm.users = [];
  vm.trip.image = [];
  Trip
    .get($state.params)
    .$promise
    .then((trip) => {
      vm.trip = trip;
    });

  $http
    .get('/api/users')
    .then((res) => {
      vm.users = res.data;
      console.log('users', vm.users);
    });

  function openAlbumModal() {
    vm.albumModalOpen = true;
  }
  function closeAlbumModal() {
    vm.albumModalOpen = false;
  }
  function openUserModal() {
    vm.userModalOpen = true;
  }
  function closeUserModal() {
    vm.userModalOpen = false;
  }
  vm.closeAlbumModal = closeAlbumModal;
  vm.openAlbumModal = openAlbumModal;
  vm.closeUserModal = closeUserModal;
  vm.openUserModal = openUserModal;
  vm.addUser = addUser;
  vm.removeUser = removeUser;
  function addUser(user) {
    vm.trip.users.push(user);
    console.log(vm.trip);
  }
  function removeUser(user) {
    vm.trip.users.splice(user);
    console.log(vm.trip);
  }

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
