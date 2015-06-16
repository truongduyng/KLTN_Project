app.controller('clubpostCtrl',['$scope', '$modal', 'clubs', '$http', 'Flash', 'Auth', '$state', '$modal', 'FileUploader','$cookies','clubpostFtry', function($scope, $modal, clubs, $http, Flash, Auth, $state, $modal, FileUploader, $cookies, clubpostFtry){
  //Club Posts ----------------------------------
  $scope.clubpost = {};

  $scope.uploader_clubpost = new FileUploader({
    headers: {
      'X-CSRF-TOKEN': $cookies.get('XSRF-TOKEN'),
    },
  });

  $scope.uploader_clubpost.onBeforeUploadItem = function(file) {
    file.url = "/club_posts/" + $scope.clubpost.id + '/add_photo.json';
  };

  $scope.uploader_clubpost.filters.push({
    name: 'imageFilter',
    fn: function(item, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  $scope.uploader_clubpost.onCompleteItem = function(item, response, status, headers) {
    $scope.club.clubposts[0].photos.push({image: {url: response.image.url}, _id: {$oid: response._id.$oid}});
  };

  $scope.uploader_clubpost.onCompleteAll = function(){
    $scope.clubpost.content = "";
    $scope.uploader_clubpost.clearQueue();
  };

  $scope.onShowFileDialog = function() {
    $("#addImageInput").click();
  };

  $scope.onPostclubpost = function() {

    clubpostFtry.create($scope.club.id.$oid, $scope.clubpost).success(function(data) {

      $scope.clubpost.id = data._id.$oid;

      $scope.club.clubposts.splice(0,0,data);

      if (!$scope.uploader_clubpost.queue || $scope.uploader_clubpost.queue.length == 0) {
        $scope.clubpost.content = "";
      }

      $scope.uploader_clubpost.uploadAll();

    }).error(function(data, status) {
      if (status == '401') {
        $scope.$emit("onRequireLogin");
      } else {
        Flash.create("danger", "Lỗi xảy ra khi post, bạn vui lòng thử lại", 'myalert');
      }
    });
  };

  $scope.showImage = function(photo, listPhotos) {
    var modalInstance = $modal.open({
      templateUrl: 'appJS/show_image_modal/show_image_modal.html',
      controller: 'showImageModalCtrl',
      size: 'lg',
      resolve: {
        photo: function() {
          return photo;
        },
        listPhotos: function() {
          return listPhotos;
        }
      }
    });
  };

  $scope.likeclubPost = function(post) {
    clubpostFtry.like(post).success(function() {
      post.isLiked = true;

      // if(!post.followed && post.user._id.$oid != $scope.currentUser._id.$oid){
      //   clubpostFtry.follow();
      // }
    });
  };

  $scope.unlikeclubPost = function(post) {
    clubpostFtry.unlike(post).success(function() {
      post.isLiked = false;
    });
  };

  $scope.likesHtml = "<p>Đang tải...</p>";
  $scope.getKFirstLikes = function(post){
    $scope.likesHtml = "<p>Đang tải...</p>";
    //Tai du lieu khi chua tai
    clubpostFtry.getKFirstLikes(post,5).success(function(data){
      //Tao ra html de hien thi nhieu nhat la 5 nguoi va so luong nguoi khac
      var likesHtmlTmp ="";
      data.likes.forEach(function(like){
        var p = "<p class='text-tooltip'>" + like.user.username  + "</p>";
        likesHtmlTmp = likesHtmlTmp + p;
      });

      if(data.number_of_remains >= 1){
        likesHtmlTmp = likesHtmlTmp + 'và ' +   data.number_of_remains + " người khác";
      }
      $scope.likesHtml = likesHtmlTmp;
    });
  };

  $scope.showAllLikes = function(club_post) {
    var modalInstance = $modal.open({
      templateUrl: 'appJS/all_likes/all_likes_modal.html',
      controller: 'alllikesCtrl',
      size: '',
      resolve: {
        service_get_like: function(){
          return clubpostFtry;
        },
        object_get_like: function(){
          return club_post;
        }
      }
    });
  };

  $scope.can_edit_post = function(post){
    return post.user._id.$oid == $scope.user._id.$oid;
  }

  $scope.update_club_post = function(post){
    post.editing = true;
    $scope.post_update = post;
  }

  $scope.delete_club_post = function(post){

    clubpostFtry.delete($scope.club.id.$oid, post).success(function(data){

      $scope.club.clubposts.splice($scope.club.clubposts.indexOf(post),1);

    }).error(function(){
      Flash.create('danger', "Xoa bai viet thất bại!", 'myalert');
    })
  }

  $scope.update_clubpost_done = function(post){

    for (var i = 0; i < $scope.club.clubposts.length; i++) {
      if ($scope.club.clubposts[i]._id.$oid == post._id.$oid){
        $scope.indexofclubpost = i;
      }
    };

    clubpostFtry.update($scope.club.id.$oid, post, $scope.deletedPhotos).success(function(data){

      $scope.club.clubposts[$scope.indexofclubpost] = data;
      $scope.club.clubposts[$scope.indexofclubpost].editing = false;


      $scope.uploader_clubpost_update.url = "/club_posts/" + data._id.$oid + '/add_photo.json';
      $scope.uploader_clubpost_update.uploadAll();

    }).error(function(){
     Flash.create('danger', "Cập nhật bai viet thất bại!", 'myalert');
   })
  }

  $scope.removeImage_clubpost = function(post, photo){
    if($scope.deletedPhotos == null){
      $scope.deletedPhotos = [];
    }

    $scope.deletedPhotos.splice(0,0, photo._id.$oid);

    var index = post.photos.indexOf(photo);
    post.photos.splice(index, 1);
  };

  $scope.uploader_clubpost_update = new FileUploader({
    headers: {
      'X-CSRF-TOKEN': $cookies.get('XSRF-TOKEN'),
    },
  });

  $scope.uploader_clubpost_update.filters.push({
    name: 'imageFilter',
    fn: function(item, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  $scope.uploader_clubpost_update.onBeforeUploadItem = function(file) {
    file.url = "/club_posts/" + $scope.post_update._id.$oid + '/add_photo.json';
  };

  $scope.uploader_clubpost_update.onCompleteItem = function(item, response, status, headers) {
    $scope.club.clubposts[$scope.indexofclubpost].photos.push({image: {url: response.image.url}});
  };

  $scope.uploader_clubpost_update.onCompleteAll = function(){
    $scope.uploader_clubpost_update.clearQueue();
  };

  $scope.onShowFileDialog_update = function() {
    $("#addImageInput_update").click();
  };

}]);