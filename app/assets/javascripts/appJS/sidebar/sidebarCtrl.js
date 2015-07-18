app.controller('sidebarCtrl',['$scope', '$modal', 'clubsFtry', '$state', 'Auth', function($scope, $modal, clubsFtry, $state, Auth){

  Auth.currentUser().then(function(user) {
    $scope.user = user;
    $scope.loadClubs();
  }, function(error) {});

  $scope.$on('devise:new-session', function(e, user) {
    $scope.user = user;
    $scope.loadClubs();
  });

  $scope.$on('devise:new-registration', function(e, user) {
    $scope.user = user;
    $scope.loadClubs();
  });

  $scope.$on('devise:login', function(e, user) {
    $scope.user = user;
    $scope.loadClubs();
  });

  $scope.$on('devise:logout', function(e, user) {
    $scope.user = {};
    $scope.clubs ={};
  });

  $scope.$on('onChangeUserProfile', function(event, user){
    angular.copy(user, $scope.user);
  });

  $scope.loadClubs = function(){
    clubsFtry.index().success(function(data){
      $scope.clubs = data;
      console.log(data);
    })
  }

  $scope.opennewclub = function(){
    var newclubmodal = $modal.open({
      templateUrl: 'appJS/sidebar/_new_club.html',
      controller: 'newclubmodalCtrl'
    });

    newclubmodal.result.then(function (club) {
      console.log(club);
      clubsFtry.create(club).success(function(result){
        $state.go('club',{club_id: result.id.$oid, club_post_id: null});
      });
    }, function () {
    });
  }

  $scope.gotoclub = function(club_id){
    $state.go('club',{club_id: club_id, club_post_id: null});
  }

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


    

}]);
