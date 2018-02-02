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
<<<<<<< HEAD
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as vm'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/trips/register.html',
      controller: 'RegisterCtrl as vm'
=======
    .state('tripsNew', {
      url: '/trips/new',
      templateUrl: 'js/views/trips/new.html',
      controller: 'TripsNewCtrl as vm'
>>>>>>> bf7f5b5481c7504f13b9ce743e41beca894d3f4b
    });

}
