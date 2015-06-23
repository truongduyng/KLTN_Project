app.controller('commentCtrl', ['$scope', 'postDetailService', 'Flash', 'userService', 'replyService', 'commentService', '$modal', 'clubpostFtry', function($scope, postDetailService, Flash, userService, replyService, commentService, $modal, clubpostFtry) {

	$scope.currentUser = userService.currentUser;
	$scope.comment = {};
	$scope.isCommenting = false;
	$scope.isEditing = false;

	$scope.addComment = function(post) {

		$scope.isCommenting = true;

		if (post.title){
			commentService.target_object = {post_id: post._id.$oid};
		}else {
			commentService.target_object = {club_post_id: post._id.$oid};
		}

		commentService.create($scope.comment).success(function(data){

			$scope.comment.content = '';
			$scope.isCommenting = false;


			if (post.comments == null) {
				post.comments = [];
			}

			post.comments.splice(0, 0, data);

			if(!post.followed  && post.user._id.$oid != $scope.currentUser._id.$oid){
				if (post.title){
					postDetailService.follow();
				}else{
					clubpostFtry.follow(post);
				}
			}

		}).error(function(data, status) {
			$scope.isCommenting = false;
			if (status == 401) {
				$scope.$emit("onRequireLogin");
			}
		});
	};

	$scope.deleteComment = function(comment, post) {
		commentService.destroy(comment).success(function() {

			var index = post.comments.indexOf(comment);
			post.comments.splice(index, 1);

		});
	};

	$scope.editComment = function(comment) {
		$scope.isEditing = true;
		commentService.update(comment).success(function(data) {
			comment.isEdit = false;
			$scope.isEditing = false;
			angular.copy(data, comment);
		});
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

	$scope.likeComment = function(comment){
		commentService.like(comment).success(function(){
			comment.isLiked = true;
		});
	};

	$scope.unlikeComment = function(comment){
		commentService.unlike(comment).success(function(){
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

	});
	};

	///Hien thi modal show like cua post
	$scope.showAllLikes = function(comment) {
		var modalInstance = $modal.open({
			templateUrl: 'appJS/all_likes/all_likes_modal.html',
			controller: 'alllikesCtrl',
			size: '',
			resolve: {
				service_get_like: function(){
					return commentService;
				},
				object_get_like: function(){
					return comment;
				}
			}
		});
	};

}]);

