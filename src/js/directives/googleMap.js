angular
  .module('roadTrippers')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
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
      const infoWindow = new $window.google.maps.InfoWindow({
        content: `${scope.center.lat} ${scope.center.lng}`
      });
      const marker = new $window.google.maps.Marker({
        position: scope.center,
        map
      });
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
      map.addListener('click', (e) => {
        console.log(e);
        new $window.google.maps.Marker({
          position: { lat: e.latLng.lat['[[scopes]]'][0].a, lng: e.latLng.lng['[[scopes]]'][0].a },
          map
        });
      });
    }
  };
}
