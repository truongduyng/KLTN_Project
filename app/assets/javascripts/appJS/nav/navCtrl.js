app.controller('navCtrl', ['$scope', 'Auth', '$http', 'notificationService', 'tickets', '$modal', 'userService', '$state', function($scope, Auth, $http, notificationService, tickets, $modal, userService, $state) {

  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

  Auth.currentUser().then(function(user) {
    $scope.user = user;
    angular.copy(user, userService.currentUser);
  }, function(error) {});


  $scope.$on('devise:new-session', function(e, user) {
    $scope.user = user;
    angular.copy(user, userService.currentUser);

  });

  $scope.$on('devise:new-registration', function(e, user) {
    $scope.user = user;
    angular.copy(user, userService.currentUser);

  });

  $scope.$on('devise:login', function(e, user) {
    $scope.user = user;
    angular.copy(user, userService.currentUser);

  });

  $scope.$on('devise:logout', function(e, user) {
    $scope.user = {};
    angular.copy({}, userService.currentUser);
    $state.go('home');
  });

  $scope.open_signin = function() {
    $modal.open({
      templateUrl: 'appJS/auth/_login.html',
      controller: 'authCtrl',
      size: 'sm'
    });
  };

  $scope.isbussinessadmin = function() {
    if($scope.user){
      return _.some($scope.user.roles, function(role){
        return role == 'bussiness admin';
      });
    }else{
      return false;
    }
  };

  $scope.isSystemAdmin = function() {
    if($scope.user){
      return _.some($scope.user.roles, function(role){
        return role == 'system admin';
      });
    }else{
      return false;
    }
  };

  $scope.open_signup = function() {
    $modal.open({
      templateUrl: 'appJS/auth/_register.html',
      controller: 'authCtrl'
    });
  };

  $scope.$on('onChangeUserProfile', function(event, user){
    angular.copy(user, $scope.user);
    userService.currentUser = user;
  });

}]);