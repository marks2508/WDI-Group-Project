angular
  .module('instagramApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('postsIndex', {
      url: '/trips',
      templateUrl: 'js/views/trips/index.html',
      controller: 'TripsIndexCtrl as vm'
    });
}
