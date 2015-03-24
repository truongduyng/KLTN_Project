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


}]);

//Xu ly truong hop vao chi tiet bai viet ma bai viet do chua dc duyet hay chua dc publish