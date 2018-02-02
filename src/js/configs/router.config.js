angular
  .module('roadTrippers')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('tripsIndex', {
      url: '/trips',
      templateUrl: 'js/views/trips/index.html',
      controller: 'TripsIndexCtrl as vm'
    })
    .state('tripsNew', {
      url: '/trips/new',
      templateUrl: 'js/views/trips/new.html',
      controller: 'TripsNewCtrl as vm'
    });
}
