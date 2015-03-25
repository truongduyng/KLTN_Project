app.controller('replyCtrl', ['$scope', 'replyService',
	function($scope, replyService) {

		$scope.reply = {};

		$scope.isReplying = false;
		$scope.isEditing = false;
		$scope.addReply = function(comment) {
			$scope.isReplying = true;
			// console.log("comment for reply", comment);
			replyService.create(comment, $scope.reply).success(function() {
				$scope.reply.content = "";
				comment.isReply = false;
				$scope.isReplying = false;
			}).error(function(data, status) {
				$scope.isReplying = false;
				if (status == 401) {
					$scope.$emit("onRequireLogin");
				}
			});
		};

		$scope.deleteReply = function(comment, reply) {
			replyService.destroy(comment, reply);
		};

		$scope.editReplay = function(comment, reply) {
			$scope.isEditing = true;
			replyService.update(comment, reply).success(function() {
				$scope.reply.content = "";
				reply.isEdit = false;
				$scope.isEditing = false;
			}).error(function() {
				$scope.isEditing = false;
			});
		}


		$scope.like = function(comment, reply) {
			replyService.like(comment, reply).success(function() {
				reply.isLiked = true;
			});
		};

		$scope.unlike = function(comment, reply) {
			replyService.unlike(comment, reply).success(function() {
				reply.isLiked = false;
			});
		};
	}
]);