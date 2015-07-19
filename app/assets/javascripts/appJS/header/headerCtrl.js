app.controller('headerCtrl', ['$scope', '$http','$state', function($scope, $http, $state){


  function init (){
    $scope.results = {};
    $scope.results.branches = [];
    $scope.results.posts = [];
    $scope.results.clubs = [];

  }
  $scope.search_query = "";
  init();

  $('div.search_result').width($('div#search_box').width());

  $scope.search_fast = function(){
    init();
    $scope.isloading = true;
    $http.get("/search/"+ $scope.search_query).success(function(data){
      console.log(data);
      $scope.isloading = false;
      $scope.results.branches = data.branches;
      $scope.results.posts = data.posts;
      $scope.results.clubs = data.clubs;
    });
  };

  $scope.search = function(){
    $scope.overred = false;
    if($scope.search_query != ''){
      $state.go('search',{search_word: $scope.search_query});
    }
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
    return ($scope.results.branches.length > 0 && $scope.isfocus);
  }

  $scope.showbranch = function(result){
    if (result.isvenue){
      $state.go('venueDetail', {id: result.url});
    }else{
      $state.go('booking', {branch_url_alias: result.url});
    }
    init();
    $scope.search_query = "";
  }

  $scope.showpost = function(result){
    $state.go('chiTietBaiViet', {id: result._id.$oid});
    init();
    $scope.search_query = "";
  }

  $scope.showclub = function(result){
    $state.go('club', {club_id: result.id.$oid, club_post_id: null});
    init();
    $scope.search_query = "";
  }

}]);