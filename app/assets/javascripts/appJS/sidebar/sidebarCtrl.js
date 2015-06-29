app.controller('newclubmodalCtrl',['$scope','$modalInstance','$http', function($scope, $modalInstance, $http){

  $scope.club={
    name: "",
    description: "",
    members: []
  };

  $scope.users_list= [];

  $scope.show_recommend_user= function(){
    return $scope.users_list.length > 0;
  }

  $scope.find_user = function(){
    $scope.users_list = [];
    if($scope.user_find != ""){
      $http.get("/find_users/"+$scope.user_find+".json").success(function(data){

        $scope.users_list = data;
      });
    }
  }

  $scope.add_to_members = function(user_name){

    if($scope.club.members.indexOf(user_name) == -1){
      $scope.club.members.push(user_name);
    }
    $scope.users_list = [];
    $scope.user_find = "";
  }

  $scope.remove_member = function(member){
    $scope.club.members.splice($scope.club.members.indexOf(member),1);
  }

  $scope.ok = function () {
    $modalInstance.close($scope.club);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

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
    })
  }

  $scope.opennewclub = function(){
    var newclubmodal = $modal.open({
      templateUrl: 'appJS/sidebar/_new_club.html',
      controller: 'newclubmodalCtrl'
    });

    newclubmodal.result.then(function (club) {
      clubsFtry.create(club).success(function(result){
        $state.go('club',{club_id: result._id.$oid, club_post_id: null});
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
