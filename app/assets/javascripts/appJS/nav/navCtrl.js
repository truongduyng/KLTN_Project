// <<<<<<< HEAD
// app.controller('navCtrl', ['$scope', 'Auth', '$http', 'notificationService', function($scope, Auth, $http, notificationService) {
//  $scope.signedIn = Auth.isAuthenticated;
//  $scope.logout = Auth.logout;

//  Auth.currentUser()
//    .then(function(user) {
//      $scope.user = user;
//    }, function(error) {});

//  $scope.$on('devise:new-session', function(e, user) {
//    $scope.user = user;
//  });

//  $scope.$on('devise:new-registration', function(e, user) {
//    $scope.user = user;
//  });

//  $scope.$on('devise:login', function(e, user) {
//    $scope.user = user;
//  });

//  $scope.$on('devise:logout', function(e, user) {
//    $scope.user = {};
//  });

//  $scope.onLogin = function() {
//    console.log("on Login");
//    $scope.$emit("onLogin");
//  };

//  $scope.onRegister = function() {
//    console.log("on register");
//    $scope.$emit("onRegister");
//  };
// }]);

// //Khi vao bam vao de xem thi set tat ca cac notification thanh loaded

// //Su dung multiview de resolve user khi load nav, xem nav nhu 1 ui-view
// =======
// app.controller('navCtrl', ['$scope', 'Auth', '$http', 'tickets', '$modal',
//   function($scope, Auth, $http, tickets, $modal) {
//     $scope.signedIn = Auth.isAuthenticated;
//     $scope.logout = Auth.logout;

//     Auth.currentUser().then(function(user) {
//       $scope.user = user;
//     }, function(error) {
//     });

//     $scope.open_signin = function(){
//       $modal.open({
//         templateUrl: 'appJS/auth/_login.html',
//         controller: 'authCtrl'
//       });
//     };

//     $scope.isbussinessadmin = function(){
//       return ($scope.user != null && $scope.user.role_name == "bussiness admin")
//     };

//     $scope.open_signup = function(){
//       $modal.open({
//         templateUrl: 'appJS/auth/_register.html',
//         controller: 'authCtrl'
//       });
//     };

//     $scope.$on('devise:new-session', function(e, user) {
//       $scope.user = user;
//     });

//     $scope.$on('devise:new-registration', function(e, user) {
//       $scope.user = user;
//     });

//     $scope.$on('devise:login', function(e, user) {
//       $scope.user = user;
//     });

//     $scope.$on('devise:logout', function(e, user) {
//       $scope.user = {};
//     });
//   }
//   ]);
// >>>>>>> merge_bussiness_admin


app.controller('navCtrl', ['$scope', 'Auth', '$http', 'notificationService', 'tickets', '$modal', function($scope, Auth, $http, notificationService, tickets, $modal) {
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;

    Auth.currentUser()
      .then(function(user) {
        $scope.user = user;
      }, function(error) {});


    $scope.$on('devise:new-session', function(e, user) {
      $scope.user = user;
    });

    $scope.$on('devise:new-registration', function(e, user) {
      $scope.user = user;
    });

    $scope.$on('devise:login', function(e, user) {
      $scope.user = user;
    });

    $scope.$on('devise:logout', function(e, user) {
      $scope.user = {};
    });

    $scope.onLogin = function() {
      console.log("on Login");
      $scope.$emit("onLogin");
    };

    $scope.onRegister = function() {
      console.log("on register");
      $scope.$emit("onRegister");
    };



    //// BN
    $scope.open_signin = function() {
      $modal.open({
        templateUrl: 'appJS/auth/_login.html',
        controller: 'authCtrl'
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
    ////EN

    //Cap nhat $scope.user trong navBar khi thay doi thong tin user dau do
    $scope.$on('onChangeUserProfile', function(event, user){
      console.log("onChangeUserProfile: ", user);
      angular.copy(user, $scope.user);
    });

  }]);