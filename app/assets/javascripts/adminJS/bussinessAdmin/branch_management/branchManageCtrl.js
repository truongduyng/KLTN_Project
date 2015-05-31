bussinessAdmin.controller('branchManageCtrl', ['$scope', '$http', 'Auth', 'branch','Flash', function($scope, $http, Auth, branch, Flash){
  console.log(branch.data);
  $scope.branch = branch.data.branch;
  $scope.categories = branch.data.asset_categories;
}]);
