app.controller('chiTietBaiVietCtrl', ['$scope', 'postDetailService', 'Flash', 'userService', '$state', '$modal', '$rootScope','Auth', 'commentService', function($scope, postDetailService, Flash, userService, $state, $modal, $rootScope, Auth, commentService) {

	$scope.signedIn = Auth.isAuthenticated;

	Auth.currentUser().then(function(user){
		angular.copy(user, userService.currentUser);
		$scope.currentUser = userService.currentUser;
	});

	$scope.post = postDetailService.post;

	$scope.likePost = function() {
		postDetailService.like().success(function() {
			$scope.post.isLiked = true;
				//Khi like post mac dinh theo doi post do neu no chua dc followed = false
				if(!$scope.post.followed && $scope.post.user._id.$oid != $scope.currentUser._id.$oid){
					postDetailService.follow();
				}
			});
	};

	$scope.unlikePost = function() {
		postDetailService.unlike().success(function() {
			$scope.post.isLiked = false;
		});
	};


	$scope.showImage = function(photo) {
		var modalInstance = $modal.open({
			templateUrl: 'appJS/show_image_modal/show_image_modal.html',
			controller: 'showImageModalCtrl',
			size: 'lg',
			resolve: {
				photo: function() {
					return photo;
				},
				listPhotos: function() {
					return $scope.post.photos;
				}
			}
		});

	};

	$scope.likesHtml = "<p>Đang tải...</p>";
	$scope.getKFirstLikes = function(){
		$scope.likesHtml = "<p>Đang tải...</p>";
		//Tai du lieu khi chua tai
		postDetailService.getKFirstLike(5).success(function(){
			//Tao ra html de hien thi nhieu nhat la 5 nguoi va so luong nguoi khac
			var likesHtmlTmp ="";
			$scope.post.likes.forEach(function(like){
				var p = "<p class='text-tooltip'>" + like.user.username  + "</p>";
				likesHtmlTmp = likesHtmlTmp + p;
			});
			if($scope.post.number_of_remains >= 1){
				likesHtmlTmp = likesHtmlTmp + 'và ' +   $scope.post.number_of_remains + " người khác";
			}
			$scope.likesHtml = likesHtmlTmp;
		});
	};

	///Hien thi modal show like cua post
	$scope.showAllLikes = function() {
		var modalInstance = $modal.open({
			templateUrl: 'appJS/all_likes/all_likes_modal.html',
			controller: 'alllikesCtrl',
			size: '',
			resolve: {
				service_get_like: function(){
					return postDetailService;
				},
				object_get_like: function(){
					return $scope.post;
				}
			}
		});
	};

	//thich bai viet
	$scope.favorite = function(){
		postDetailService.favorite();
	};

	//bo thich bai viet
	$scope.unfavorite = function(){
		postDetailService.unfavorite();
	};

	//Xoa bai viet
	$scope.delete = function(){
		postDetailService.destroy().success(function(){
			Notifier.success('Bạn đó xóa thành công bài viết')
			Flash.create("success", "Bạn đó xóa thành công bài viết",'myalert');
			$state.go("trangCaNhan", {
				username: $scope.currentUser.username,
			});
		});
	};

	//theo doi bai post
	$scope.followPost = function(){
		postDetailService.follow();
	};

	//Bo theo bai post
	$scope.unfollowPost = function(){
		postDetailService.unfollow();
	};
}]);
