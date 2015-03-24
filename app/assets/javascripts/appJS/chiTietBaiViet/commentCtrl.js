app.controller('commentCtrl', ['$scope', 'postDetailService',
	'Flash', 'userService', 'replyService',
	function($scope, postDetailService, Flash, userService, replyService) {



		$scope.currentUser = userService.currentUser;
		$scope.comments = postDetailService.post.comments;
		$scope.comment = {};
		$scope.isCommenting = false;
		$scope.isEditing = false;


		$scope.addComment = function() {
			$scope.isCommenting = true;
			postDetailService.addComment($scope.comment)
				.success(function() {
					$scope.comment.content = '';
					$scope.isCommenting = false;
				}).error(function(data, status) {
					$scope.isCommenting = false;
					if (status == 401) {
						$scope.$emit("onRequireLogin");
					}
				});
		};

		$scope.deleteComment = function(comment) {
			postDetailService.deleteComment(comment);
		};



		$scope.editComment = function(comment) {
			$scope.isEditing = true;
			postDetailService.editComment(comment).success(function() {
				comment.isEdit = false;
				$scope.isEditing = false;
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

		$scope.onTestCurrentUser = function() {
			console.log("currentUser on commentCtrl", $scope.currentUser);
		};
	}
]);

//Hien thi time ago cho comment
//Lam tuong tu cho reply
//Thich bai post, thich comment, thich reply
//Hien thi so nguoi like cho bai post, cho comment, cho reply
//Chinh lai time ago
//Chinh lai modal anh
//Tim cach lam avatar mac dinh
//