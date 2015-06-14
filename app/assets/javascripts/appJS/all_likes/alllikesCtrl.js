app.controller('alllikesCtrl', ['$scope', 'service_get_like', 'object_get_like', function($scope, service_get_like, object_get_like) {

  $scope.isLoading = true;
  service_get_like.getAllLikes(object_get_like).success(function(data){
    $scope.allLikes = data;
    $scope.isLoading = false;

  }).error(function(data){
    $scope.isLoading = false;
  });
}]);