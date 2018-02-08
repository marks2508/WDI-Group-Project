angular
  .module('roadTrippers')
  .directive('googlePlaces', googlePlaces);

googlePlaces.$inject = ['$window', '$rootScope'];
function googlePlaces($window, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      'location': '=',
      'type': '='
    },
    link: function(scope, element)  {
      let map      = null;
      let location = null;

      $rootScope.$on('mapInit', (e, data) => map = data.map);

      $rootScope.$on('newIntrestLocation', (e, data) => location = data.location);

      element.bind('click', () => {
        console.log(scope.location, scope.type);
        const selectedIntrest = scope.type;
        location = scope.location;
        if(location) {
          const service = new $window.google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: location,
            radius: 1000,
            type: [selectedIntrest]
          }, (results) => {
            console.log(results);
            results.forEach(place => {
              console.log(place.geometry);
              createMarker(place.geometry.location());
            });
            map.setCenter(location);
            map.setZoom(14);
            // set map center to be location
            // set zoom
          });
        }
      });

      function createMarker(place) {
        if (!place) return false;

        new $window.google.maps.Marker({
          position: place.geometry.location,
          icon: {
            url: place.icon,
            scaledSize: new $window.google.maps.Size(20, 20)
          },
          map: map,
          animation: $window.google.maps.Animation.DROP
        });
      }
    }
  };
}
