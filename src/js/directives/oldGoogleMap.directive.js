angular
  .module('roadTrippers')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  let firstMarker = null;
  let secondMarker = null;
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
      function addFirstMarker(e) {
        if (firstMarker === null) {
          firstMarker = new $window.google.maps.Marker({
            position: e.latLng,
            map
          });
          const infoWindow = new $window.google.maps.InfoWindow({
            content: `${e.latLng}`
          });
          firstMarker.addListener('click', () => {
            infoWindow.open(map, firstMarker);
          });
        } else {
          firstMarker.position = e.latLng;
        }

      }
      function addSecondMarker(e) {
        if ( secondMarker === null) {
          secondMarker = new $window.google.maps.Marker({
            position: e.latLng,
            map
          });
          const infoWindow = new $window.google.maps.InfoWindow({
            content: `${e.latLng}`
          });
          secondMarker.addListener('click', () => {
            infoWindow.open(map, secondMarker);
          });
        }
      }
      map.addListener('click', (e) => {
        addFirstMarker(e);

      });
    }
  };
}
