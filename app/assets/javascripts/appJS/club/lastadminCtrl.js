app.controller('lastadminCtrl',['$scope', '$modalInstance', '$http', 'club_id', 'Flash', function($scope, $modalInstance, $http, club_id, Flash){

  $scope.admins = [];
  $scope.members_list = [];

  $scope.show_recommend_members= function(){
    return $scope.members_list.length > 0;
  }

  $scope.find_member = function(){
    $scope.members_list = [];
    if($scope.member_find != ""){
      $http.get("clubs/"+ club_id +"/find_members/"+$scope.member_find+".json").success(function(data){
        $scope.members_list = data;
      });
    }
  }

  $scope.add_to_admins = function(member){

    for (var i = 0; i < $scope.admins.length; i++) {
      if ($scope.admins[i].id == member.id.$oid){
        $scope.members_list = [];
        $scope.member_find = "";
        return false;
      }
    };

    $scope.admins.push({id: member.id.$oid, fullname: member.fullname});
    $scope.members_list = [];
    $scope.member_find = "";

  }

  $scope.remove_admin = function(admin){

    for (var i = 0; i < $scope.admins.length; i++) {
      if ($scope.admins[i].id == admin.id){
        $scope.admins.splice(i,1);
        return true;
      }
    };
  }

  $scope.ok = function (){
    if ($scope.admins.length == 0){
      Flash.create("danger", "Bạn cần chỉ định ít nhất một quản trị mới cho CLB!", "myalert");
      return null;
    }
    $modalInstance.close($scope.admins);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);