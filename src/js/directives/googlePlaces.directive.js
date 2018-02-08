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

      // $rootScope.$on('newIntrestLocation', (e, data) => location = data.location);

      element.bind('click', () => {
        const selectedIntrest = scope.type;
        location = scope.location;
        if(location) {
          const service = new $window.google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: location,
            radius: 1000,
            type: [selectedIntrest]
          }, (results) => {
            results.forEach(place => {
              // const posish = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
              createMarker(place);
            });
            console.log('a');
            map.setCenter(location);
            map.setZoom(14);
            // set map center to be location
            // set zoom
          });
        }
      });

      function createMarker(place) {
        if (!place) return false;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const posish = {lat: lat, lng: lng};
        console.log(posish);
        new $window.google.maps.Marker({
          position: posish,
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
