angular
  .module('roadTrippers')
  .directive('googleAutocomplete', googleAutocomplete);

googleAutocomplete.$inject = ['$window', '$rootScope'];
function googleAutocomplete($window, $rootScope) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      location: '='
    },
    link: function(scope, element, attrs, model)  {
      const autocomplete = new $window.google.maps.places.Autocomplete(element[0]);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        scope.location = place.geometry.location.toJSON();
        model.$setViewValue(element.val());

        $rootScope.$broadcast('NewPlaceEntered', { location: scope.location });
      });
    }
  };
}
