angular
  .module('movieApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html'
    })
    .state('moviesIndex', {
      url: '/movies',
      templateUrl: '/js/views/movies/index.html',
      controller: 'MoviesIndexCtrl as vm'
    })
    .state('moviesNew', {
      url: '/movies/new',
      templateUrl: '/js/views/movies/new.html',
      controller: 'MoviesNewCtrl as vm',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .state('moviesShow', {
      url: '/movies/:id',
      templateUrl: '/js/views/movies/show.html',
      controller: 'MoviesShowCtrl as vm'
    })
    .state('moviesEdit', {
      url: '/movies/:id/edit',
      templateUrl: '/js/views/movies/edit.html',
      controller: 'MoviesEditCtrl as vm',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as vm'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as vm'
    });

  $urlRouterProvider.otherwise('/');

  loginRequired.$inject = ['$q', '$location', '$auth'];
  function loginRequired($q, $location, $auth) {
    const deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }
}
