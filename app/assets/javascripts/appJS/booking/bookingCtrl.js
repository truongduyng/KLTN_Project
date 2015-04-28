app.controller('bookingCtrl', ['$scope', '$http','$stateParams', 'Auth', '$modal',
  function($scope, $http, $stateParams, Auth, $modal){
  $scope.rate = 4;
  $scope.isReadonly = false;
  $scope.minibooking = false;
  $scope.miniedit = false;
  $scope.dt = new Date();

  Auth.currentUser().then(function(user) {
    $scope.user = user;
  }, function(error) {
  });

  $scope.hoveringOver = function(value) {
    $scope.overstar = value;
    $scope.ishoverstar = true;
  };

  $scope.fast_book_open = function(hour,event) {
    Auth.currentUser().then(function(user) {
      $scope.user = user;
      $scope.minibooking = true;
      if(hour>Math.floor(hour))
      {
        $scope.hour_begin = Math.floor(hour) + ":30";
        $scope.hour_end = Math.ceil(hour) + ":30";
        $('#td_'+Math.floor(hour)+'_half').css("background-color", "black");
      }
      else
      {
        $scope.hour_begin = hour + ":00";
        $scope.hour_end = (hour + 1) + ":00";
      }

      $('.minibooking').css({top: event.pageY - $(window).scrollTop(), left: event.pageX-100}); // 180 is $('.minibooking').width()/2
    }, function(error) {
      $scope.user = null;
      alert("Ban can dang nhap de dat san!");
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
      });
    });
  };

  $scope.close_minibooking = function(){
    $scope.minibooking = false;
  };

  $http.get("/"+$stateParams.branch_url_alias).success(function(data){
    if (data != null){
      $scope.branch = data;
      $scope.isfounddata = true;
    }
    else
    {
      $scope.isfounddata = false;
    }
  });
}]);