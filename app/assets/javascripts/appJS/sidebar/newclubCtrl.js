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

  $scope.add_to_members = function(user){

    for (var i = 0; i < $scope.club.members.length; i++) {
      if ($scope.club.members[i].id == user.id.$oid){
        $scope.users_list = [];
        $scope.user_find = "";
        return false;
      }
    };

    $scope.club.members.push({id: user.id.$oid, fullname: user.fullname});
    $scope.users_list = [];
    $scope.user_find = "";
  }

  $scope.remove_member = function(member){

    for (var i = 0; i < $scope.club.members.length; i++) {
      if ($scope.club.members[i].id == member.id){
        $scope.club.members.splice(i,1);
        return true;
      }
    };
  }

  $scope.ok = function () {
    $modalInstance.close($scope.club);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);