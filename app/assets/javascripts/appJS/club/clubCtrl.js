app.controller('clubCtrl',['$scope', '$modal','club', 'clubsFtry', '$http', 'Flash', 'Auth', '$state', '$modal', 'FileUploader','$cookies','userService', function($scope, $modal, club, clubsFtry, $http, Flash, Auth, $state, $modal, FileUploader, $cookies, userService){

  $scope.club = club.data;

  Auth.currentUser().then(function(user){
    userService.currentUser = user;
    $scope.user = user;
  });

  $scope.$on('devise:new-session', function(e, user) {
    $scope.user = user;
    angular.copy(user, userService.currentUser);

  });

  $scope.$on('devise:new-registration', function(e, user) {
    $scope.user = user;
    angular.copy(user, userService.currentUser);

  });

  $scope.$on('devise:login', function(e, user) {
    $scope.user = user;
    angular.copy(user, userService.currentUser);

  });

  $scope.$on('devise:logout', function(e, user) {
    $scope.user = {};
    angular.copy({}, userService.currentUser);
  });

  $scope.user = userService.currentUser;
  console.log(club.data, $scope.user);

  $scope.signedIn = Auth.isAuthenticated;

  $scope.club_update = {
    id: $scope.club.id,
    name: $scope.club.name,
    description: $scope.club.description
  };

  // Cover-----------------
  $scope.uploader = new FileUploader({
    queueLimit: 1,
    headers: {
      'X-CSRF-TOKEN': $cookies.get('XSRF-TOKEN'),
    },
    url: "/clubs/" + $scope.club.id.$oid + '/add_cover.json',
    alias: 'cover_image'
  });

  $scope.uploader.filters.push({
    name: 'imageFilter',
    fn: function(item, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  $scope.uploader.onAfterAddingFile =  function(item){
    $scope.uploader.uploadAll();
  }

  $scope.uploader.onCompleteItem = function(item, response, status, headers) {
    $scope.club.cover_image = response.image.url;
    $scope.uploader.clearQueue();
  }

  $scope.choose_cover = function(){
    $('#choosecover').click();
  }


  $('ul#list_add_member').width('293');

  $scope.users_list= [];

  $scope.update_club = function(){
    clubsFtry.update($scope.club_update).success(function(result){
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
        clubsFtry.removemember($scope.club.id.$oid, $scope.user._id.$oid, admins).success(function(result){

          for (var i = 0; i < clubsFtry.clubs.length; i++) {
            if (clubsFtry.clubs[i].id.$oid == $scope.club.id.$oid) {
              clubsFtry.clubs.splice(i,1);
              break;
            }
          };

          $state.go('home');
        })
        .error(function(){
        })
      }, function () {
      });
    } else {
      if ($scope.club.members.length == 1) {
        var last_member_modal = $modal.open({
          templateUrl: 'appJS/club/_last_member.html',
          controller: 'lastmemberCtrl'
        });

        last_member_modal.result.then(function () {
          clubsFtry.removemember($scope.club.id.$oid, $scope.user._id.$oid, null).success(function(result){

            for (var i = 0; i < clubsFtry.clubs.length; i++) {
              if (clubsFtry.clubs[i].id.$oid == $scope.club.id.$oid) {
                clubsFtry.clubs.splice(i,1);
                break;
              }
            };

            $state.go('home');
          })
          .error(function(){
          })
        }, function () {
        });
      } else {
        if ($scope.club.admins.length >= 1 && $scope.club.members.length > 1) {
          clubsFtry.removemember($scope.club.id.$oid, $scope.user._id.$oid, null).success(function(result){

            for (var i = 0; i < clubsFtry.clubs.length; i++) {
              if (clubsFtry.clubs[i].id.$oid == $scope.club.id.$oid) {
                clubsFtry.clubs.splice(i,1);
                break;
              }
            };

            $state.go('home');
          })
          .error(function(){
          })
        };
      }
    }

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
      clubsFtry.addmember($scope.club.id.$oid, user.id.$oid).success(function(result){

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

    clubsFtry.removemember($scope.club.id.$oid, member.id.$oid, null).success(function(result){
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

    clubsFtry.makeadmin($scope.club.id.$oid, member.id.$oid).success(function(result){

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

    clubsFtry.removeadmin($scope.club.id.$oid, member.id.$oid).success(function(result){

      $scope.club.admins.splice($scope.club.admins.indexOf(member.id),1);
      Flash.create('success', "Chỉ định " + member.fullname + " là thành viên thành công!", 'myalert');

    })
    .error(function(){
      Flash.create('danger', "Chỉ định thất bại!", 'myalert');
    })
  }

  $scope.join_club_request = function(){

    clubsFtry.new_request_member($scope.club.id.$oid, $scope.user._id.$oid).success(function(data){

      Flash.create('success', "Gửi yêu cầu gia nhập CLB thành công. Xin chờ xác nhận của quản trị CLB!", 'myalert');

    })
    .error(function(){
      Flash.create('danger', "Gửi yêu cầu thất bại!", 'myalert');
    })
  }

  $scope.accept_request_member = function(member_request){
    clubsFtry.accept_request_member($scope.club.id.$oid, member_request.id.$oid).success(function(data){
      $scope.club.member_requests.splice($scope.club.member_requests.indexOf(member_request),1);
      $scope.club.member_requests_count --;
      Flash.create('success', "Cho phép " + $scope.user.fullname + " gia nhập CLB thành công!", 'myalert');
    })
    .error(function(){
      Flash.create('danger', "Cho phép thất bại!", 'myalert');
    })
  }

  $scope.deny_request_member = function(member_request){
    clubsFtry.deny_request_member($scope.club.id.$oid, member_request.id.$oid).success(function(data){
      $scope.club.member_requests.splice($scope.club.member_requests.indexOf(member_request),1);
      $scope.club.member_requests_count --;
      Flash.create('success', "Từ chối " + $scope.user.fullname + " gia nhập CLB thành công!", 'myalert');
    })
    .error(function(){
      Flash.create('danger', "Từ chối thất bại!", 'myalert');
    })
  }

  $scope.member_is_admin = function(member_id){
    return ismemberof($scope.club.admins, member_id);
  }

  $scope.current_user_is_admin = function(){
    return ismemberof($scope.club.admins, $scope.user._id.$oid);
  }

  $scope.current_user_is_member = function(){
    return ismemberof($scope.club.members, $scope.user._id.$oid);
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


app.controller('lastmemberCtrl', ['$scope','$modalInstance','$http', function($scope, $modalInstance, $http){

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
