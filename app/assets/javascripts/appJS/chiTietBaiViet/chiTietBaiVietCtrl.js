//5510dcd56875751cdb030000
app.controller('chiTietBaiVietCtrl', ['$scope', 'postDetailService','Flash' , 'currentUser', 'userService',
 function ($scope,postDetailService, Flash, currentUser, userService) {

 	angular.copy(currentUser, userService.currentUser);

 	$scope.currentUser = userService.currentUser;
 	$scope.post = postDetailService.post;


 	//Update tinh trang user de xet cac quyen them xoa sua
	$scope.$on('devise:new-session', function(e, user) {
		angular.copy(user, userService.currentUser);
	});

	$scope.$on('devise:new-registration', function(e, user) {
		angular.copy(user, userService.currentUser);
	});

	$scope.$on('devise:login', function(e, user) {
		angular.copy(user, userService.currentUser);
	});

	$scope.$on('devise:logout', function(e, user) {
		angular.copy({}, userService.currentUser);
	});


 	// $scope.addComment = function(){
 	// 	// $scope.comment.content = "this is comment 1";
 	// 	// postDetailService.addComment($scope.comment);
 	// 	// console.log("post: ", $scope.post);
 	// 	$scope.isCommenting = true;
 	// 	postDetailService.addComment($scope.comment)
 	// 		.success(function(){
 	// 			$scope.comment.content = '';
 	// 			$scope.isCommenting = false;
 	// 		}).error(function(){
 	// 			$scope.isCommenting = false;
 	// 		});
 	// };

 	// $scope.deleteComment = function(comment){
 	// 	postDetailService.deleteComment(comment).success(function(){
 	// 		var index = $scope.post.comments.indexOf(comment);
 	// 		$scope.post.comments.splice(index, 1);
 	// 	});
 	// };


}]);