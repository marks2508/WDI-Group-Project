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
      let start = null;
      let end   = null;

      const map = new $window.google.maps.Map(element[0], {
        zoom: 5,
        center: scope.center
      });

      $rootScope.$on('NewPlaceEntered', (e, data) => {
        if (start === null) {
          start = data.location;
          createMarker(start);
        } else {
          end = data.location;
          createMarker(end);
        }
        if(start && end) calcRoute();
      });

      function createMarker(location) {
        new $window.google.maps.Marker({
          position: location,
          map: map
        });


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
      map-update


      // scope.$watch('start', addStartMarker);
      // scope.$watch('end', addEndMarker);

      // function addStartMarker() {
      //   if(!scope.start) return false;
      //   console.log(scope.start);
      //   const marker = new $window.google.maps.Marker({
      //     position: scope.start,
      //     map: map
      //   });
      //   map.setCenter(scope.start);
      // }
      //
      // function addEndMarker() {
      //   if(!scope.end) return false;
      //   console.log(scope.end);
      //   const marker = new $window.google.maps.Marker({
      //     position: scope.end,
      //     map: map
      //   });
      //   map.setCenter(scope.end);
      // }


      // const marker = new $window.google.maps.Marker({
      //   position: scope.center,
      //   map: map
      // });
      // marker.addListener('click', () => {
      //   infoWindow.open(map, marker);
      // });




      $rootScope.$on('newAddressFound', (e, data) => {
        console.log('listening for a new address');
        console.log(data.address);
        console.log(data.address.geometry.location);
        console.log(data.address.geometry.location.lat);
        // create marker for new address
        // set center of map to the new marker
      });

      // routing stuff
      let directionsDisplay = null;
      const directionsService = new $window.google.maps.DirectionsService();

      directionsDisplay = new $window.google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map);

      function calcRoute() {
        const request = {
          origin: start,
          destination: end,
          travelMode: $window.google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, (response, status) => {
          if (status === $window.google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
          } else {
            alert('Directions Request from ' + start.toUrlValue(6) + ' to ' + end.toUrlValue(6) + ' failed: ' + status);
          }
        });
      }
    }};
}
