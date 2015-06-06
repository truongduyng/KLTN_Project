app.controller('sidebarCtrl',['$scope', '$modal', 'clubs', '$state', function($scope, $modal, clubs, $state){

  clubs.index().success(function(data){
    $scope.clubs = data;
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