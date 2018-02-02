angular
  .module('movieApp')
  .controller('MoviesIndexCtrl', MoviesIndexCtrl);

MoviesIndexCtrl.$inject = [ 'Movie'];
function MoviesIndexCtrl(Movie) {
  const vm = this;
  vm.all = Movie.query();
}
