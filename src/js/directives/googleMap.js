angular
  .module('roadTrippers')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  const markers = [];
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">GOOGLE MAP GOES HERE</div>',
    scope: {
      center: '='
    },
    link(scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 4,
        center: scope.center
      });

      // const marker = new $window.google.maps.Marker({
      //   position: scope.center,
      //   map
      // });
      function addMarker(e) {
        const marker = new $window.google.maps.Marker({
          position: e.latLng,
          map
        });
        console.log(marker);
        const infoWindow = new $window.google.maps.InfoWindow({
          content: `${marker.lat} ${marker.lng}`
        });
        markers.push(marker);
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        return marker;
      }
      map.addListener('click', (e) => {
        addMarker(e);

      });
    }
  };
}
