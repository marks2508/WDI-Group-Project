angular
  .module('roadTrippers')
  .controller('TripsShowCtrl', TripsShowCtrl);

TripsShowCtrl.$inject = ['Trip', '$http', 'TripComment', '$state', '$rootScope'];
function TripsShowCtrl(Trip, $http, TripComment, $state, $rootScope) {
  const vm = this;
  vm.userModalOpen = null;
  vm.albumModalOpen = null;
  vm.trip = Trip.get($state.params);
  vm.users = [];
  vm.slides = vm.trip.images;

  vm.closeAlbumModal = closeAlbumModal;
  vm.openAlbumModal = openAlbumModal;
  vm.closeUserModal = closeUserModal;
  vm.openUserModal = openUserModal;
  vm.addUser = addUser;
  vm.removeUser = removeUser;
  vm.deleteComment = deleteComment;
  vm.addComment = addComment;
  vm.delete = TripsDelete;
  vm.adduser = addUser;
  vm.savePic = savePic;
  vm.saveUsers = saveUsers;




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
  function addUser(user) {
    vm.trip.users.push(user);
  }
  function removeUser(user) {
    vm.trip.users.splice(user);
  }

  function saveUsers() {
    Trip
      .update({ tripId: vm.trip.id}, vm.trip);
  }

  function savePic() {
    Trip
      .update({ tripId: vm.trip.id}, vm.trip)
      .$promise
      .then((res) => {
        console.log(res.url);
      });
  }

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
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o'];
  let selectDone = null;
  vm.place = null;
  vm.log = log;
  vm.interest = 'amusement_park';
  function log() {
    console.log(vm.place);
  }
  $rootScope.$on('waypoints', (e, data) => {
    if(!selectDone) {
      vm.locations = data.markers;
      console.log(vm.locations);
      selectDone = true;
    }
    if(selectDone) {
      for (let i=0; i<vm.locations.length; i++) {
        vm.locations[i].letter = alphabet[i];
        console.log(vm.locations);
      }
    }
  });
}
