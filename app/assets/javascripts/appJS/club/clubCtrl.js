app.controller('clubCtrl',['$scope', '$modal','club', 'clubs', '$http', 'Flash', 'Auth', function($scope, $modal, club, clubs, $http, Flash, Auth){
  console.log(club.data);
  $scope.club = club.data;
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

    if (isadmin($scope.club.admins, Auth._currentUser)) {
      Flash.create('danger', "Ban khong phai la admin, ko the them thanh vien!", 'myalert');
      return false;
    };

    if(ismember($scope.club.members, user)){
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

    if (isadmin($scope.club.admins, Auth._currentUser)) {
      Flash.create('danger', "Ban khong phai la admin, ko the xoa thanh vien!", 'myalert');
      return false;
    };
    clubs.removemember($scope.club.id.$oid, member.id.$oid).success(function(result){
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

    if (isadmin($scope.club.admins, Auth._currentUser)) {
      Flash.create('danger', "Ban khong phai la admin, ko the xoa thanh vien!", 'myalert');
      return false;
    };
    clubs.makeadmin($scope.club.id.$oid, member.id.$oid).success(function(result){
      if (result.status = "ok"){
        Flash.create('success', "Chi dinh " + member.fullname + "thanh admin thanh cong!", 'myalert');
      }
    })
    .error(function(){
      Flash.create('danger', "Chi dinh that bai!", 'myalert');
    })
  }

  function ismember(array, obj){
    result = true;
    for (var i = 0; i < array.length; i++) {
      if(array[i].id.$oid == obj.id.$oid){
        result = false;
      }
    };
    return result;
  }

  function isadmin(array, obj){
    result = true;
    for (var i = 0; i < array.length; i++) {
      if(array[i].id.$oid == obj._id.$oid){
        result = false;
      }
    };
    return result;
  }

}]);
