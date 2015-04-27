app.controller('bookingCtrl', ['$scope', '$http','$stateParams', 'Auth', function($scope, $http, $stateParams, Auth){
  $scope.rate = 4;
  $scope.isReadonly = false;
  $scope.minibooking = false;
  $scope.hoveringOver = function(value) {
    $scope.overstar = value;
    $scope.ishoverstar = true;
  };
  $http.get("/"+$stateParams.branch_name).success(function(data){
    if (data[0] != null){
      $scope.branch = data[0];
      $scope.isfounddata = true;
    }
    else
    {
      $scope.isfounddata = false;
    }
  });
}]);