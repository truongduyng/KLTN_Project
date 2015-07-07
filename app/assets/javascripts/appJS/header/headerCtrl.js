app.controller('headerCtrl', ['$scope', '$http','$state', function($scope, $http, $state){

  $scope.results = [];
  $scope.search_query = "";

  $('ul.list_recommend').width($('div#search_box').width());

  $scope.search_fast = function(){
    $scope.results = [];
    $scope.isloading = true;
    $http.get("/searchnameadd/"+ $scope.search_query).success(function(data){
      $scope.isloading = false;
      $scope.results = data;
    });
  };

  $scope.search = function(){
    $scope.overred = false;
    $state.go('search',{search_word: $scope.search_query});
  };

  $scope.focused = function(){
    $scope.isfocus = true;
  }

  $scope.blurred = function(){
    if(!$scope.overred){
      $scope.isfocus = false;
    }
  }

  $scope.over_search= function(){
    $scope.overred = true;
  }

  $scope.out_search= function(){
    $scope.overred = false;
  }

  $scope.show_recommend_result = function(){
    return ($scope.results.length > 0 && $scope.isfocus);
  }

  $scope.showresult = function(result){
    if (result.isvenue){
      $state.go('venueDetail', {id: result.url});
    }else{
      $state.go('booking', {branch_url_alias: result.url});
    }

    $scope.results = [];
    $scope.search_query = "";
  }
}]);