angular
  .module('roadTrippers')
  .directive('googleMap', googleMap);
googleMap.$inject =['$window', '$rootScope'];
function googleMap($window, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google map goes here"</div>',
    scope: {
      center: '='
    },
    link(scope, element) {
      new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: scope.center
      });


      $rootScope.$on('newAddressFound', (e, data) => {
        console.log('listening for a new address');
        console.log(data.address);
        console.log(data.address.geometry.location);

        // create marker for new address
        // set center of map to the new marker
      });

    }
  };
}
