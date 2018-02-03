angular
  .module('roadTrippers')
  .config(Interceptors);

Interceptors.$inject = ['$httpProvider'];
function Interceptors($httpProvider) {
  $httpProvider.interceptors.push('ErrorHandler');
}
