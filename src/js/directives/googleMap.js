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
      center: '=',
      start: '=',
      end: '='
    },
    link(scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 9,
        center: scope.center

      });

      scope.$watch('start', addStartMarker);
      scope.$watch('end', addEndMarker);



      function addStartMarker() {
        if(!scope.start) return false;
        console.log(scope.start);
        new $window.google.maps.Marker({
          position: scope.start,
          map: map,
          bounds: {}
        });
        map.setCenter(scope.start);


      }

      function addEndMarker() {
        if(!scope.end) return false;
        console.log(scope.end);
        new $window.google.maps.Marker({
          position: scope.end,
          map: map,
          bounds: {}
        });
        map.setCenter(scope.end);
      }

      const marker = new $window.google.maps.Marker({
        position: scope.center,
        map: map
      });


      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
      $rootScope.$on('newAddressFound', (e, data) => {
        console.log('listening for a new address');
        console.log(data.address);
        console.log(data.address.geometry.location);
        console.log(data.address.geometry.location.lat);
        marker.setPosition(data.address.geometry.location);
        // create marker for new address
        // set center of map to the new marker
      });
    }};
}
