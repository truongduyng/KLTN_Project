app.controller('headerCtrl', ['$scope', '$http','$location', function($scope, $http, $location){
  var branches = [];
  $http.get("/searchnameadd/all").success(function(data){
    for (i=0;i<data.length; i++) {
      branches.push(data[i].name + ", " + data[i].address);
    }
    $scope.branches = data;
  });
  $("#search_box").autocomplete({
    source: branches,
    select: function (event, item) {
      window.location = "/linktobranch";
    }
  });
}]);