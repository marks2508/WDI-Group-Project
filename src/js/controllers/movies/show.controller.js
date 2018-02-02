angular
  .module('movieApp')
  .controller('MoviesShowCtrl', MoviesShowCtrl);

MoviesShowCtrl.$inject = ['$state', '$sce', 'Movie'];
function MoviesShowCtrl($state, $sce, Movie) {
  const vm = this;

  Movie.get($state.params)
    .$promise
    .then((movie) => {
      vm.movie = movie;

      // https://code.angularjs.org/1.6.8/docs/api/ng/service/$sce
      vm.movie.youtubePlayer = $sce.trustAsHtml(`<iframe width="100%" height="315" src="https://www.youtube.com/embed/${vm.movie.trailerId}" frameborder="0" allowfullscreen></iframe>`);
    });

  vm.delete = moviesDelete;

  function moviesDelete(){
    Movie.delete($state.params)
      .$promise
      .then(() => {
        $state.go('moviesIndex');
      });
  }
}
