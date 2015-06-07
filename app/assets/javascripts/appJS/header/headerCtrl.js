app.controller('headerCtrl', ['$scope', '$http','$state', function($scope, $http, $state){

  $scope.results = [];
  $scope.search_query = "";

  $('ul.list_recommend').width($('div#search_box').width());

  $scope.search = function(){
    $http.get("/searchnameadd/all").success(function(data){
      console.log(data);
      $scope.results = data;
    });
  };

  $scope.focused = function(){
    $scope.isfocus = true;
  }

  $scope.blurred = function(){

    // $scope.isfocus = false;
  }

  $scope.show_recommend_result = function(){
    return ($scope.results.length > 0 && $scope.isfocus);
  }

  $scope.showresult = function(result){
    $state.go('booking', {branch_url_alias: result.url});
    $scope.results = [];
    $scope.search_query = "";
  }
}]);