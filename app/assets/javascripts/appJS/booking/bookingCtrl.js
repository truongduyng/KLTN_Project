app.controller('bookingCtrl', ['$scope', '$http','$stateParams', 'Auth', '$modal',function($scope, $http, $stateParams, Auth, $modal){

  $scope.rate = 4;
  $scope.isReadonly = false;
  $scope.minibooking = false;
  $scope.miniedit = false;
  $scope.dt = new Date();

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

  Auth.currentUser().then(function(user) {
    $scope.user = user;
  }, function(error) {
  });

  $scope.hoveringOver = function(value) {
    $scope.overstar = value;
    $scope.ishoverstar = true;
  };

  $scope.fast_book_open = function(hour,asset_id,event) {
    Auth.currentUser().then(function(user) {

      //repair data
      $scope.user = user;
      if(hour>Math.floor(hour))
      {
        $scope.hour_begin = Math.floor(hour) + ":30";
        $scope.hour_end = Math.ceil(hour) + ":30";
        $('#td_'+Math.floor(hour)+'_half_'+ asset_id).css("background-color", "#8ED763");
      }
      else
      {
        $scope.hour_begin = hour + ":00";
        $scope.hour_end = (hour + 1) + ":00";
        $('#td_'+hour+'_'+ asset_id).css("background-color", "#8ED763");
      }

      // display dialog booking
      $scope.minibooking = true;
      var booking_height = $('.minibooking').height()>0? $('.minibooking').height(): 165;
      var booking_top = event.pageY - $(window).scrollTop()- booking_height-20;
      var booking_right = $(window).width() - event.pageX - 100;
      booking_top = booking_top>0? booking_top : 0;
      booking_right = booking_right>0? booking_right :0;
      $('.minibooking').css({top: booking_top, right: booking_right});

    }, function(error) {
      //not yet sign in
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
}]);