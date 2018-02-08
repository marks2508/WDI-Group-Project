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
      end: '=',
      waypoints: '=',
      showPage: '='
      // waypoints: '='
    },
    link(scope, element) {
      let start = null;
      let end = null;
      let intrestMarker = null;

      const bounds = new $window.google.maps.LatLngBounds();
      const map = new $window.google.maps.Map(element[0], {
        zoom: 5,
        center: scope.center
      });

      $rootScope.$broadcast('mapInit', { map });





      $rootScope.$on('NewPlaceEntered', (e, data) => {
        let start = null;
        let end   = null;
        if (start === null) {
          start = data.location;
          createMarker(start);
        } else {
          end = data.location;
          createMarker(end);
        }
        if(start && end) calcRoute();
      });

      scope.$watch('start', createMarker);
      scope.$watch('end', createMarker);

      function createMarker(location) {
        if (!location) return false;

        new $window.google.maps.Marker({
          position: location,
          map: map
        });

        bounds.extend(location);
        map.fitBounds(bounds);
        if(scope.start && scope.end) {
          calcRoute();
        }

      }



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
          origin: scope.start,
          destination: scope.end,
          travelMode: $window.google.maps.TravelMode.DRIVING,
          waypoints: scope.waypoints
          // optimizeWaypoints: true

        };

        directionsService.route(request, (response, status) => {
          if (status === $window.google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
          } else {
            alert('Directions Request from ' + start.toUrlValue(6) + ' to ' + end.toUrlValue(6) + ' failed: ' + status);
          }
        });

        const markers = [scope.start];

        if (scope.waypoints.length === 0) markers.push(scope.end);

        for (let i=0; i<(scope.waypoints.length); i++) {
          markers.push(scope.waypoints[i].location.location);
          if (i === (scope.waypoints.length-1)) {
            markers.push(scope.end);
          }
        }
        console.log(markers);

        $rootScope.$broadcast('waypoints', { markers: markers, map: map });




      }

    }};
}
