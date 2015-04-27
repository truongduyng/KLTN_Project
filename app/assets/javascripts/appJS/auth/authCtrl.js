app.controller('authCtrl', ['$scope', 'Auth', '$state',
  function($scope, Auth, $state){

    $scope.user = {};

    $scope.login = function(){
     Auth.login($scope.user).then(function(){
      $('#login-modal').modal('toggle');
      $scope.error = "";
    }, function(){
      $scope.error = "Email hoac password khong hop le";
    });
   };

   $scope.register = function(){
    Auth.register($scope.user).then(function(){
      $('#register-modal').modal('toggle');
    },  function(){
      alert("error");
    });
  };
}]);