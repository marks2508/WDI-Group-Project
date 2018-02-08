angular
  .module('roadTrippers')
  .directive('googlePlaces', googlePlaces);

googlePlaces.$inject = ['$window'];
function googlePlaces($window) {
  return {
    restrict: 'A',
    scope: {
      'location': '=',
      'type': '=',
      'map': '='
    },
    link: function(scope, element)  {
      let map = null;
      let infoWindow = null;
      let markers = [];

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
            markers.forEach(marker => marker.setMap(null));
            markers = [];

            results.forEach(place => {
              createMarker(place);
            });
            map.setCenter(location);
            map.setZoom(14);
          });
        }
      });
      function createMarker(place) {

        if (!place) return false;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const posish = {lat: lat, lng: lng};

        const marker = new $window.google.maps.Marker({
          position: posish,
          icon: {
            url: place.icon,
            scaledSize: new $window.google.maps.Size(20, 20)
          },
          map: map,
          animation: $window.google.maps.Animation.DROP
        });

        markers.push(marker);

        marker.addListener('click', () => {
          if(infoWindow) infoWindow.close();

          infoWindow = new $window.google.maps.InfoWindow({
            content: `<p>${place.name}</p>`
          });

          infoWindow.open(map, marker);
        });

      }
    }
  };
}
