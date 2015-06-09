app.controller('sidebarCtrl',['$scope', '$modal', 'clubs', '$state', 'Auth', function($scope, $modal, clubs, $state, Auth){

  Auth.currentUser().then(function(user) {
    $scope.user = user;
    clubs.index().success(function(data){
      $scope.clubs = data;
    }).error(function(data){
    });
  }, function(error) {
  });

  $scope.opennewclub = function(){
    var newclubmodal = $modal.open({
      templateUrl: 'appJS/sidebar/_new_club.html',
      controller: 'newclubmodalCtrl'
      // animation: false
      // windowClass: 'newclubmodal'
    });

    newclubmodal.result.then(function (club) {
      clubs.create(club).success(function(result){
        $state.go('club',{club_id: result._id.$oid});
      });
    }, function () {
    });
  }

  $scope.gotoclub = function(club_id){
    $state.go('club',{club_id: club_id});
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

app.controller('newclubmodalCtrl', function($scope, $modalInstance, $http){

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

  $scope.add_to_members = function(user){
    console.log(user);
    if($scope.club.members.indexOf(user) == -1){
      $scope.club.members.push(user.fullname);
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
});