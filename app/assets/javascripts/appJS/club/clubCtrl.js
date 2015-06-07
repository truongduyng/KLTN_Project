app.controller('clubCtrl',['$scope', '$modal','club', 'clubs', '$http', 'Flash', 'Auth', '$state', '$modal', function($scope, $modal, club, clubs, $http, Flash, Auth, $state, $modal){
  console.log(club.data);

  $scope.club = club.data;
  $scope.club_update = {
    id: $scope.club.id,
    name: $scope.club.name,
    description: $scope.club.description
  };

  $('ul.list_recommend').width($('input#user_find').outerWidth());

  $scope.users_list= [];

  $scope.update_club = function(){
    clubs.update($scope.club_update).success(function(result){
      $scope.club = result;
      Flash.create('success', "Cập nhật thông tin CLB thành công!", 'myalert');
    })
    .error(function(){
      Flash.create('danger', "Cập nhật thông tin CLB thất bại!", 'myalert');
    })
  }

  $scope.leave_club = function(){

    if ($scope.current_user_is_admin() && $scope.club.admins.length == 1 && $scope.club.members.length > 1) {

      var last_admin_modal = $modal.open({
        templateUrl: 'appJS/club/_last_admin.html',
        controller: 'lastadminCtrl',
        resolve:{
          club_id: function(){
            return $scope.club.id.$oid
          }
        }
      });

      last_admin_modal.result.then(function (admins) {
        clubs.removemember($scope.club.id.$oid, Auth._currentUser._id.$oid, admins).success(function(result){
          $state.go('home');
        })
        .error(function(){
        })
      }, function () {
      });
    };

    if ($scope.club.members.length == 1) {
      var last_member_modal = $modal.open({
        templateUrl: 'appJS/club/_last_member.html',
        controller: 'lastmemberCtrl'
      });

      last_member_modal.result.then(function () {
        clubs.removemember($scope.club.id.$oid, Auth._currentUser._id.$oid, null).success(function(result){
          $state.go('home');
        })
        .error(function(){
        })
      }, function () {
      });
    };

    if ($scope.club.admins.length > 1 && $scope.club.members.length > 1) {
      clubs.removemember($scope.club.id.$oid, Auth._currentUser._id.$oid, null).success(function(result){

        $state.go('home');

      })
      .error(function(){
      })
    };

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

        $scope.club.members.push(user);
        Flash.create('success', 'Bingo! Thêm thành viên ' + user.fullname + " thành công!", 'myalert');

      })
    }else{
      Flash.create('success', user.fullname + " đã là thành viên của CLB.", 'myalert');
    }
    $scope.users_list = [];
    $scope.user_find = "";
  }

  $scope.remove_member = function(member){

    clubs.removemember($scope.club.id.$oid, member.id.$oid, null).success(function(result){
      if (result.status = "ok"){
        $scope.club.members.splice($scope.club.members.indexOf(member),1);

        if ($scope.club.members.length == 0){
          $state.go('home');
        }

        Flash.create('success', "Khai trừ thành viên " + member.fullname + " thành công!", 'myalert');
      }
    })
    .error(function(){
      Flash.create('danger', "Loại " + member.fullname + " thất bại!", 'myalert');
    })
  }

  $scope.make_admin = function(member){

    clubs.makeadmin($scope.club.id.$oid, member.id.$oid).success(function(result){

      $scope.club.admins.push({id:member.id});
      Flash.create('success', "Chỉ định " + member.fullname + " thành quản trị thành công!", 'myalert');

    })
    .error(function(){
      Flash.create('danger', "Chỉ định thất bại!", 'myalert');
    })
  }

  $scope.remove_admin = function(member){
    if($scope.club.admins.length == 1){
      Flash.create('warning', "Cần ít nhất một quản trị viên cho CLB!", 'myalert');
      return false;
    }

    clubs.removeadmin($scope.club.id.$oid, member.id.$oid).success(function(result){

      $scope.club.admins.splice($scope.club.admins.indexOf(member.id),1);
      Flash.create('success', "Chỉ định " + member.fullname + " là thành viên thành công!", 'myalert');

    })
    .error(function(){
      Flash.create('danger', "Chỉ định thất bại!", 'myalert');
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

app.controller('lastmemberCtrl', function($scope, $modalInstance, $http){

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

app.controller('lastadminCtrl',['$scope', '$modalInstance', '$http', 'club_id', function($scope, $modalInstance, $http, club_id){

  $scope.admins = [];
  $scope.members_list = [];
  console.log(club_id);

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
    console.log(member);
    if($scope.admins.indexOf(member) == -1){
      $scope.admins.push(member.fullname);
    }
    $scope.members_list = [];
    $scope.member_find = "";
  }

  $scope.remove_admin = function(admin){
    $scope.club.members.splice($scope.admins.indexOf(admin),1);
  }

  $scope.ok = function () {
    $modalInstance.close($scope.admins);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
