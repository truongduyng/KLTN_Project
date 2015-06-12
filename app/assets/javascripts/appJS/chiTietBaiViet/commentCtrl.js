app.controller('commentCtrl', ['$scope', 'postDetailService', 'Flash', 'userService', 'replyService', 'commentService', '$modal', function($scope, postDetailService, Flash, userService, replyService, commentService, $modal) {

	$scope.currentUser = userService.currentUser;
	$scope.comment = {};
	$scope.isCommenting = false;
	$scope.isEditing = false;

	$scope.addComment = function() {
		$scope.isCommenting = true;
		commentService.create($scope.comment).success(function(data){

			$scope.comment.content = '';
			$scope.isCommenting = false;

			if (postDetailService.post.comments == null) {
				postDetailService.post.comments = [];
			}
			postDetailService.post.comments.splice(0, 0, data);

			if(!postDetailService.post.followed  && postDetailService.post.user._id.$oid != $scope.currentUser._id.$oid){
				postDetailService.follow();
			}

			console.log(data);
		}).error(function(data, status) {
			$scope.isCommenting = false;
			if (status == 401) {
				$scope.$emit("onRequireLogin");
			}
		});
	};

	$scope.deleteComment = function(comment) {
		// postDetailService.deleteComment(comment);
	};

	$scope.editComment = function(comment) {
		$scope.isEditing = true;
		// postDetailService.editComment(comment).success(function() {
		// 	comment.isEdit = false;
		// 	$scope.isEditing = false;
		// });
};

$scope.loadReply = function(comment) {
	comment.isLoadingReply  = true;
	replyService.index(comment).success(function(){
		comment.isLoadingReply  = false;
		comment.isRepliesLoaded = true;
	}).error(function(){
		comment.isLoadingReply  = false;
		comment.isRepliesLoaded = false;
	});
};

$scope.likePost = function(comment){
	commentService.like($scope.post, comment).success(function(){
		comment.isLiked = true;
	});
};

$scope.unlikePost = function(comment){
	commentService.unlike($scope.post, comment).success(function(){
		comment.isLiked = false;
	});
};

$scope.getKFirstLikes = function(comment){

	comment.likesHtml = "<p>Đang tải...</p>";
		//Tai du lieu khi chua tai
		commentService.getKFirstLike(comment, 5).success(function(){
		//Tao ra html de hien thi nhieu nhat la 5 nguoi va so luong nguoi khac
		var likesHtmlTmp ="";
		comment.likes.forEach(function(like){
			var p = "<p class='text-tooltip'>" + like.user.username  + "</p>";
			likesHtmlTmp = likesHtmlTmp + p;
		});
		if(comment.number_of_remains >= 1){
			likesHtmlTmp = likesHtmlTmp  + 'và ' + comment.number_of_remains + " người khác";
		}
		comment.likesHtml = likesHtmlTmp;

		//comment.likesHtml = likesHtmlTmp;
		console.log("comment.likesHtml", comment.likesHtml);
	});
	};

	///Hien thi modal show like cua post
	$scope.showAllLikes = function(comment) {
		var modalInstance = $modal.open({
			templateUrl: 'showAllLikesModal.html',
			controller: 'showAllLikesCommentCtrl',
			size: '',
			resolve: {
				post: function(){
					return $scope.post;
				},
				comment: function(){
					return comment;
				}
			}
		});
	};

}]);


app.controller('showAllLikesCommentCtrl', ['$scope', 'post', 'comment', 'commentService'
	, function($scope, post, comment, commentService) {
		$scope.isLoading = true;
		commentService.getAllLikes(post, comment).success(function(data){
			$scope.allLikes = data;
			$scope.isLoading = false;

		}).error(function(data){
			$scope.isLoading = false;
		});
	}]);
