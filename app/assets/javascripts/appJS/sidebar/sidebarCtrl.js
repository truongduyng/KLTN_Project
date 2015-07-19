app.controller('sidebarCtrl', ['$scope', '$modal', 'clubsFtry', '$state', 'Auth', 'tagService',
  function($scope, $modal, clubsFtry, $state, Auth, tagService) {

    Auth.currentUser().then(function(user) {
      $scope.user = user;
      $scope.loadClubs();
    }, function(error) {});

    $scope.$on('devise:new-session', function(e, user) {
      $scope.user = user;
      $scope.loadClubs();
    });

    $scope.$on('devise:new-registration', function(e, user) {
      $scope.user = user;
      $scope.loadClubs();
    });

    $scope.$on('devise:login', function(e, user) {
      $scope.user = user;
      $scope.loadClubs();
    });

    $scope.$on('devise:logout', function(e, user) {
      $scope.user = {};
      $scope.clubs = {};
    });

    $scope.$on('onChangeUserProfile', function(event, user) {
      angular.copy(user, $scope.user);
    });

    $scope.loadClubs = function() {
      clubsFtry.index().success(function(data) {
        $scope.clubs = data;
        console.log(data);
      })
    }

    $scope.opennewclub = function() {
      var newclubmodal = $modal.open({
        templateUrl: 'appJS/sidebar/_new_club.html',
        controller: 'newclubmodalCtrl'
      });

      newclubmodal.result.then(function(club) {
        console.log(club);
        clubsFtry.create(club).success(function(result) {
          $state.go('club', {
            club_id: result.id.$oid,
            club_post_id: null
          });
        });
      }, function() {});
    }

    $scope.gotoclub = function(club_id) {
      $state.go('club', {
        club_id: club_id,
        club_post_id: null
      });
    }

    $scope.isbussinessadmin = function() {
      if ($scope.user) {
        return _.some($scope.user.roles, function(role) {
          return role == 'bussiness admin';
        });
      } else {
        return false;
      }
    };

    $scope.isSystemAdmin = function() {
      if ($scope.user) {
        return _.some($scope.user.roles, function(role) {
          return role == 'system admin';
        });
      } else {
        return false;
      }
    };


    //Cho so thich
    $scope.openInterestModal = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'modalIntereset.html',
        controller: 'InterestModalCtrl',
        size: "sm",
        resolve: {
          // listTags: function() {
          //   return $scope.listTags;
          // },
          currentUser: function() {
            return $scope.user;
          }
        }
      });
    };

    // tagService.index().success(function() {
    //   $scope.listTags = tagService.tags;
    // });
  }
]);

app.controller('InterestModalCtrl', ['$scope', '$modalInstance', 'currentUser', 'tagService',
  function($scope, $modalInstance, currentUser, tagService) {
    $scope.searchedText = "";
    tagService.index().success(function() {
      listTags = tagService.tags;
      console.log("listTags: ", listTags);
      //chi lay dsanh sach tag ma nguoi dung chua co
      $scope.listTags = _.filter(listTags, function(newTag) {
        findedTag = _.find(currentUser.interests, function(oldTag) {
          if (oldTag._id.$oid == newTag._id.$oid) {
            return true;
          }
        });
        if (findedTag) {
          return false;
        }
        return true;
      });

      $scope.currentUser = currentUser;
      console.log("currentUser: ", $scope.currentUser);
      
      $scope.addInterest = function(tag){
        $scope.currentUser.interests.splice($scope.currentUser.interests.length, 0, tag);

        deletedTag = _.find($scope.listTags, function(item){
          return item._id.$oid == tag._id.$oid;
        });
        $scope.listTags.splice($scope.listTags.indexOf(deletedTag), 1);
      };

      $scope.deleteInterest = function(tag){
        $scope.listTags.splice(0, 0, tag);
        $scope.currentUser.interests.splice($scope.currentUser.interests.indexOf(tag), 1);
      };



    });

  }
]);