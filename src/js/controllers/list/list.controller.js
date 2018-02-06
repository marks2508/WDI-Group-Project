angular
  .module('roadTrippers')
  .controller('ListCtrl', ListCtrl);

ListCtrl.$inject = ['$scope'];
function ListCtrl($scope) {
  $scope.skills = [];

  $scope.addSkill = function() {
    $scope.skills.push({'title': $scope.newSkill, 'done': false});
    $scope.newSkill = '';
  };

  $scope.deleteSkill = function(index) {
    $scope.skills.splice(index);
  };
}
