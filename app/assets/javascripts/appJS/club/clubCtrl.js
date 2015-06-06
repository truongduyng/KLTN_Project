app.controller('clubCtrl',['$scope', '$modal','club', 'clubs', '$http', 'Flash', 'Auth', '$state', '$modal', function($scope, $modal, club, clubs, $http, Flash, Auth, $state, $modal){
  console.log(club.data);

  $scope.club = club.data;
  $scope.club_update = {
    id: $scope.club.id,
    name: $scope.club.name,
    description: $scope.club.description
  };

  $scope.users_list= [];

  $scope.update_club = function(){
    clubs.update($scope.club_update).success(function(result){
      $scope.club = result;
      Flash.create('success', "Cap nhat thong tin CLB thanh cong!", 'myalert');
    })
    .error(function(){
      Flash.create('danger', "Cap nhat thong tin CLB that bai!", 'myalert');
    })
  }

  $scope.leave_club = function(){

  }

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

    if(!ismemberof($scope.club.members, user.id.$oid)){
      clubs.addmember($scope.club.id.$oid, user.id.$oid).success(function(result){
        if (result.status = "ok"){
          $scope.club.members.push(user);
          Flash.create('success', 'Bingo! Them thanh vien ' + user.fullname + "thanh cong!", 'myalert');
        }
      })
    }else{
      Flash.create('success', user.fullname + " da la thanh vien cua clb", 'myalert');
    }
    $scope.users_list = [];
    $scope.user_find = "";
  }

  $scope.remove_member = function(member){

    clubs.removemember($scope.club.id.$oid, member.id.$oid, null).success(function(result){
      if (result.status = "ok"){
        $scope.club.members.splice($scope.club.members.indexOf(member),1);
        Flash.create('success', "khai tru thanh vien " + member.fullname + " thanh cong!", 'myalert');
      }
    })
    .error(function(){
      Flash.create('danger', "loai " + member.fullname + " that bai!", 'myalert');
    })
  }

  $scope.make_admin = function(member){

    clubs.makeadmin($scope.club.id.$oid, member.id.$oid).success(function(result){
      if (result.status = "ok"){
        $scope.club.admins.push({id:member.id});
        Flash.create('success', "Chi dinh " + member.fullname + " thanh admin thanh cong!", 'myalert');
      }
    })
    .error(function(){
      Flash.create('danger', "Chi dinh that bai!", 'myalert');
    })
  }

  $scope.remove_admin = function(member){
    if($scope.club.admins.length == 1){
      Flash.create('warning', "Can it nhat mot 1 admin cho CLB", 'myalert');
      return false;
    }

    clubs.removeadmin($scope.club.id.$oid, member.id.$oid).success(function(result){
      if (result.status = "ok"){
        $scope.club.admins.splice($scope.club.admins.indexOf(member.id),1);
        Flash.create('success', "Chi dinh " + member.fullname + "la thanh vien thanh cong!", 'myalert');
      }
    })
    .error(function(){
      Flash.create('danger', "Chi dinh that bai!", 'myalert');
    })
  }

  $scope.member_is_admin = function(member_id){
    return ismemberof($scope.club.admins, member_id);
  }

  $scope.current_user_is_admin = function(){
    return ismemberof($scope.club.admins, Auth._currentUser._id.$oid);
  }

  function ismemberof(array, user_id){
    result = false;
    for (var i = 0; i < array.length; i++) {
      if(array[i].id.$oid == user_id){
        result = true;
      }
    };
    return result;
  }

}]);
