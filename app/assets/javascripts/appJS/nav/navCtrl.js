app.controller('navCtrl', ['$scope', 'Auth', '$http', 'notificationService', function($scope, Auth, $http, notificationService) {
	$scope.signedIn = Auth.isAuthenticated;
	$scope.logout = Auth.logout;

	Auth.currentUser()
		.then(function(user) {
			$scope.user = user;
			//Load notification
			loadNofification();
		}, function(error) {});

	$scope.$on('devise:new-session', function(e, user) {
		$scope.user = user;
	});

	$scope.$on('devise:new-registration', function(e, user) {
		$scope.user = user;
	});

	$scope.$on('devise:login', function(e, user) {
		$scope.user = user;
	});

	$scope.$on('devise:logout', function(e, user) {
		$scope.user = {};
	});

	$scope.onLogin = function() {
		console.log("on Login");
		$scope.$emit("onLogin");
	};

	$scope.onRegister = function() {
		console.log("on register");
		$scope.$emit("onRegister");
	};

	//Load notification
	loadNofification = function() {
		notificationService.index().success(function() {
			//$scope.notifications = [];
			//Chuyen notification ve dang chuan cho hien thi
			// var notificationTmps = _.map(notificationService.notifications, function(item){
			// 	var obj = {};
			// 	if(item.notification_category.name == "Duyệt bài viết"){
			// 		var post = item.notification.notificable;
			// 		obj.message = 'Bài viết ' + post.title + " của bạn đã được duyệt và đăng.";
			// 		obj.notification_category = "Duyệt bài viết";
			// 		obj.target_id = post._id.$oid;
			// 		obj.created_at = item.created_at;
			// 	}
			// 	return obj;
			// });
			// angular.copy(notificationTmps, $scope.notifications);
			// console.log("notificationTmps: ", notificationTmps);
			$scope.notifications = notificationService.notifications;
		});
	};


	$scope.onWatched = function(notification){
		console.log("on watched: ", notification);
		notificationService.watched(notification);
		//Cho day danh dau notification da xem
	};

}]);

//Khi vao bam vao de xem thi set tat ca cac notification thanh loaded