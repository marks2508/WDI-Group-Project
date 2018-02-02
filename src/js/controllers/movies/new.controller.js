angular
  .module('movieApp')
  .controller('MoviesNewCtrl', MoviesNewCtrl);

MoviesNewCtrl.$inject = ['$state', 'Movie'];
function MoviesNewCtrl($state, Movie) {
  const vm  = this;
  vm.movie = {};
  vm.create = moviesCreate;

  function moviesCreate(){
    Movie
      .save(vm.movie)
      .$promise
      .then(() => {
        $state.go('moviesIndex');
      });
  }
}
