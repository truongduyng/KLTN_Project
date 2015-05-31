bussinessAdmin.controller('branchManageCtrl', ['$scope', '$http', 'Auth', 'branch','Flash', function($scope, $http, Auth, branch, Flash){
  $scope.branch = branch.data.branch;

}]);
