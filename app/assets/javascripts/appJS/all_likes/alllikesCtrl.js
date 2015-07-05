app.controller('alllikesCtrl', ['$scope', 'service_get_like', 'object_get_like', '$state', function($scope, service_get_like, object_get_like, $state) {

  $scope.isLoading = true;

  $scope.go_to_user_page = function(username){
    $scope.$close();
    $state.go("trangCaNhan",{username:username});
  }

  service_get_like.getAllLikes(object_get_like).success(function(data){
    $scope.allLikes = data;
    $scope.isLoading = false;

  }).error(function(data){
    $scope.isLoading = false;
  });
}]);