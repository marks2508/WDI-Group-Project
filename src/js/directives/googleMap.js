angular
  .module('roadTrippers')
  .directive('googleMap', googleMap)
  .controller('GeoCodeCtrl', GeoCodeCtrl);

googleMap.$inject =['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google map goes here"</div>',
    scope: {
      center: '='
    },
    link(scope, element) {
      new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: scope.center
      });
    }
  };
}
GeoCodeCtrl.$inject = ['$http'];
function GeoCodeCtrl($http) {
  const vm = this;
  vm.all = [];
  vm.address = {postcode: ''};
  vm.submit = submit;
  vm.status = null;

  function submit() {
    $http
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${vm.address.postcode}&key=AIzaSyDWkmuGQBG6zeDihrTekF0yf0OsBMfKHTI`)
      .then(res => {
        vm.all = res.data;
        if (vm.all.status !== 'OK') {
          vm.status = 1;
        } else {
          vm.status = 0;
        }
      });
  }
}
