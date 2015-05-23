app.controller('navCtrl', ['$scope', 'Auth', '$http', 'tickets', '$modal',
  function($scope, Auth, $http, tickets, $modal) {
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;

    Auth.currentUser().then(function(user) {
      $scope.user = user;
    }, function(error) {
    });

    $scope.open_signin = function(){
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
      });
    };
    $scope.open_signup = function(){
      $modal.open({
        templateUrl: 'appJS/auth/_register.html',
        controller: 'authCtrl'
      });
    };

    $scope.$on('devise:new-session', function(e, user) {
      $scope.user = user;
      tickets.update_view();
    });

    $scope.$on('devise:new-registration', function(e, user) {
      $scope.user = user;
      tickets.update_view();
    });

    $scope.$on('devise:login', function(e, user) {
      $scope.user = user;
      tickets.update_view();
    });

    $scope.$on('devise:logout', function(e, user) {
      $scope.user = {};
      tickets.update_view();
    });
  }
  ]);