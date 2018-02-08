angular
  .module('roadTrippers')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$transitions', '$rootScope', '$state','$auth'];
function MainCtrl($transitions, $rootScope, $state, $auth) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;
  vm.logout = logout;


  const protectedStates = ['postsNew'];

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message;

    if(err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  $transitions.onSuccess({}, (transition) => {
    // closes the mobile menu each time the state changes
    vm.menuIsOpen = false;
    // attaches the state name to the main controller to be used as a class name on the body
    vm.pageName = transition.to().name;

    if (vm.stateHasChanged) vm.message = null;
    if (!vm.stateHasChanged) vm.stateHasChanged = true;
  });
  if(vm.stateHasChanged) vm.messgae = null;
  if(!vm.stateHasChanged) vm.stateHasChanged = true;
  if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;

  if(!$auth.isAuthenticated() && protectedStates.includes(vm.pageName)) {
    vm.message = 'You must be logged in';
    return $state.go('login');
  }
  if (vm.stateHasChanged) vm.message = null;
  if (!vm.stateHasChanged) vm.stateHasChanged = true;


  vm.slides = [
    { image: 'https://images.unsplash.com/photo-1498637841888-108c6b723fcb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=54d1fa94e704450bcdd1aa84dae243cf&auto=format&fit=crop&w=2691&q=80' },
    { image: 'https://images.unsplash.com/photo-1502366475726-4ae3fa56825f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=125d51e684298d892780fbd7859d364c&auto=format&fit=crop&w=1650&q=80' },
    { image: 'https://images.unsplash.com/photo-1508795849723-cdc075b66fa9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cae9502fe2d40e3c33e7d33848903aa6&auto=format&fit=crop&w=1650&q=80' },
    { image: 'https://images.unsplash.com/photo-1469535933002-df571c1c6713?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=19c1b791f36f833c3b6ae5b91d08b377&auto=format&fit=crop&w=1650&q=80' },
    { image: 'https://images.unsplash.com/photo-1464974196937-6e6220ad7247?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=59a1334fb1395c37f5760bc64d7e54f7&auto=format&fit=crop&w=1650&q=80' }
  ];

}
