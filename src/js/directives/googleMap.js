angular
  .module('roadTrippers')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">GOOGLE MAP GOES HERE</div>',
    link(scope, element) {
      new $window.google.maps.Map(element[0], {
        zoom: 4,
        center: { lat: 51.5, lng: -0.07 }
      });
    }
  };
}
