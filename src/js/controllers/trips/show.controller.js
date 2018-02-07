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
  vm.slides = vm.trip.images;
  Trip
    .get($state.params)
    .$promise
    .then((trip) => {
      vm.trip = trip;
      vm.trip.waypoints = vm.trip.waypoints.map(obj => obj.location);
    });

  $http
    .get('/api/users')
    .then((res) => {
      vm.users = res.data;
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
  }
  function removeUser(user) {
    vm.trip.users.splice(user);
  }

  function saveUsers() {
    Trip
      .update({ tripId: vm.trip.id}, vm.trip)
      .$promise
      .then((res) => {
        console.log(res);
      });
  }
  vm.saveUsers = saveUsers;

  var result = document.getElementsByClassName('file-input');
  var wrappedResult = angular.element(result);
  wrappedResult.bind('change', e => {
    console.log(e);
    vm.trip.images.push(e.url);

  });

  function addPic() {
    vm.trip.images
      .save(vm.newImage)
      .$promise
      .then((image) => {
        vm.trip.images.push(image);
        vm.newImage = {};
      });
  }
  vm.adduser = addUser;
  vm.addPic = addPic;

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
