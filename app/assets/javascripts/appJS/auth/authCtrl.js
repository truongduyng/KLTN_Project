app.controller('authCtrl', ['$scope', 'Auth', '$state', '$modal',
  function($scope, Auth, $state, $modal){

    $scope.user = {};

    $scope.close_modal = function(){
      $scope.$close();
    };

    $scope.open_signup_onsignin = function(){
      $scope.close_modal();
      $scope.open_signup();
    };

    $scope.login = function(){
     Auth.login($scope.user).then(function(){
      $scope.$close();
      $scope.error = "";
    }, function(){
      $scope.error = "Email hoac password khong hop le";
    });
   };

   $scope.register = function(){
    Auth.register($scope.user).then(function(){
      $scope.$close();
    },  function(e){
      console.log(e)
      $scope.error = "what error";
    });
  };
}]);