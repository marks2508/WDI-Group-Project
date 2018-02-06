angular
  .module('roadTrippers')
  .directive('googlePlaces', googlePlaces);

googlePlaces.$inject = ['$window', '$rootScope'];
function googlePlaces($window, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      'location': '='
    },
    link: function(scope, element)  {
      let map = null;

      $rootScope.$on('mapInit', (e, data) => map = data.map);

      element.bind('change', e => {
        const selectedIntrest = e.target.value;
        const service = new $window.google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: scope.location,
          radius: 500,
          type: [selectedIntrest]
        }, (results) => {
          results.forEach(place => createMarker(place));
          map.setCenter(scope.location);
          map.setZoom(15);
          // set map center to be location
          // set zoom
        });

      });

      function createMarker(place) {
        if (!place) return false;

        new $window.google.maps.Marker({
          position: place.geometry.location,
          icon: {
            url: place.icon,
            scaledSize: new $window.google.maps.Size(20, 20)
          },
          map: map
        });
      }
    }
  };
}
