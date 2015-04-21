app.controller('headerCtrl', ['$scope', '$http', function($scope, $http){
  $scope.main_search = function(){
    $http.get("/search/"+$scope.query).success(function(data){

    });
  };
}]);