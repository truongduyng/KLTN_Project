//5510dcd56875751cdb030000
app.controller('chiTietBaiVietCtrl', ['$scope', 'postDetailService', 'Flash',
 'currentUser', 'userService', '$state',
	function($scope, postDetailService, Flash, currentUser, userService, $state) {

		angular.copy(currentUser, userService.currentUser);

		$scope.currentUser = userService.currentUser;
		$scope.post = postDetailService.post;


		//Update tinh trang user de xet cac quyen them xoa sua
		$scope.$on('devise:new-session', function(e, user) {
			angular.copy(user, userService.currentUser);
			$state.reload();
		});

		$scope.$on('devise:new-registration', function(e, user) {
			angular.copy(user, userService.currentUser);
			$state.reload();
		});

		$scope.$on('devise:login', function(e, user) {
			angular.copy(user, userService.currentUser);
			$state.reload();
		});

		$scope.$on('devise:logout', function(e, user) {
			angular.copy({}, userService.currentUser);
		});


		$scope.likePost = function(){
			postDetailService.like().success(function(){
				$scope.post.isLiked = true;
			});
		};

		$scope.unlikePost = function(){
			postDetailService.unlike().success(function(){
				$scope.post.isLiked = false;
			});
		};
	}
]);

//Xu ly truong hop vao chi tiet bai viet ma bai viet do chua dc duyet hay chua dc publish