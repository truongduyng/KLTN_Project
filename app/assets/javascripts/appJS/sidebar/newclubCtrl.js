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
    console.log(user);
    if($scope.club.members.indexOf({id: user.id.$oid, fullname: user.fullname}) == -1){
      $scope.club.members.push({id: user.id.$oid, fullname: user.fullname});
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