app.controller('navCtrl', ['$scope', 'Auth', '$http', 'tickets',
  function($scope, Auth, $http, tickets) {
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;

    Auth.currentUser().then(function(user) {
      $scope.user = user;
    }, function(error) {
    });


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