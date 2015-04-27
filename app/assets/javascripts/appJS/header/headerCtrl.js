app.controller('headerCtrl', ['$scope', '$http','$window', '$location',function($scope, $http, $window, $location){
  var branches = [];
  $http.get("/searchnameadd/all").success(function(data){
    for (i=0;i<data.length; i++) {
      branches.push({"label": data[i].name + ", " + data[i].address, "value": data[i].url});
    }
  });
  $("#search_box").autocomplete({
    source: branches,
    select: function (event, item) {
      $location.path("/#"+item.item.value);
      $window.location.href = "/#"+item.item.value;
    }
  });
}]);