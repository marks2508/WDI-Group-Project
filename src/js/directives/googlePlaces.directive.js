angular
  .module('roadTrippers')
  .directive('googlePlaces', googlePlaces);

googlePlaces.$inject = ['$window', '$rootScope'];
function googlePlaces($window, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      'location': '=',
      'type': '=',
      'map': '='
    },
    link: function(scope, element)  {

      let map = null;


      $rootScope.$on('mapInit', (e, data) => {
        // map = data.map;
        console.log(data);
      });


      // $rootScope.$on('newIntrestLocation', (e, data) => location = data.location);

      element.bind('click', () => {
        map = scope.map;
        const selectedIntrest = scope.type;
        const location = scope.location;
        if(location) {
          const service = new $window.google.maps.places.PlacesService(map);

          service.nearbySearch({
            location: {lat: location.lat, lng: location.lng},
            radius: 1000,
            type: [selectedIntrest]
          }, (results) => {
            console.log(results);
            results.forEach(place => {
              createMarker(place);
            });
            map.setCenter(location);
            map.setZoom(14);
            console.log('places map ========>',map);
            // set map center to be location
            // set zoom
          });
        }
      });

      function createMarker(place) {
        console.log('inside create marker');
        if (!place) return false;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const posish = {lat: lat, lng: lng};
        const infoWindow = new $window.google.maps.InfoWindow();
        const marker = new $window.google.maps.Marker({
          position: posish,
          icon: {
            url: place.icon,
            scaledSize: new $window.google.maps.Size(20, 20)
          },
          map: map,
          animation: $window.google.maps.Animation.DROP
        });
        infoWindow.setContent(place.name);
        infoWindow.open(map, marker);

      }
    }
  };
}
