app.controller('sidebarCtrl',['$scope', '$modal', 'clubs', function($scope, $modal, clubs){

  $scope.opennewclub = function(){
    var newclubmodal = $modal.open({
      templateUrl: 'appJS/sidebar/_new_club.html',
      controller: 'newclubmodalCtrl'
      // animation: false
      // windowClass: 'newclubmodal'
    });

    newclubmodal.result.then(function (club) {
      clubs.create(club);
    }, function () {
    });
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
    if($scope.club.members.indexOf(user) == -1){
      $scope.club.members.push(user._id.$oid);
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