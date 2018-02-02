angular
  .module('movieApp')
  .controller('MoviesEditCtrl', MoviesEditCtrl);

MoviesEditCtrl.$inject = ['$state', 'Movie'];
function MoviesEditCtrl($state, Movie) {
  const vm = this;
  
  Movie.get($state.params)
    .$promise
    .then((movie) => {
      vm.movie = movie;
      vm.movie.release = new Date(vm.movie.release);
    });

  vm.update = moviesUpdate;

  function moviesUpdate(){
    Movie
      .update($state.params, vm.movie)
      .$promise
      .then(() => {
        $state.go('moviesShow', $state.params);
      });
  }
}
