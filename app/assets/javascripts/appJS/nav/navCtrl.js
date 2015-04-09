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
			$scope.notifications = notificationService.notifications;
			$scope.newNotificationsCount = notificationService.newNotificationsCount;
		});
	};

	////PHan Cu 
	// $scope.onWatched = function(notification){
	// 	console.log("on watched: ", notification);
	// 	notificationService.watched(notification);
	// };

	// //Khi clich de xem notification thi danh dau is_new = false
	// $scope.onDisplayNotifications = function(){

	// 	//Lay array notifications isnew = true;
	// 	 var newNotifactions = _.filter($scope.notifications, function(item){
	// 			return item.is_new;
	// 		});
	// 	 //Lay 1 mang id cua cac new notifications
	// 	 var notificationIds = _.map(newNotifactions, function(item){
	// 	 		return item._id.$oid;
	// 	 });
	// 	 //Chi cap nhat neu co notification moi
	// 	 if(notificationIds.length >= 1){
	// 	 	 notificationService.loaded(notificationIds).success(function(){
	// 	 	 	$scope.newNotificationsCount = notificationService.newNotificationsCount;
	// 	 	 });
	// 	 }
	// 	 console.log("on display notifications: ", notificationIds);
	// };

	// $scope.onWatched = function(notification){
	// 	console.log("on watched: ", notification);
	// 	notificationService.watched(notification);
	// };

	// //Khi clich de xem notification thi danh dau is_new = false
	// $scope.onDisplayNotifications = function(){

	// 	//Lay array notifications isnew = true;
	// 	 var newNotifactions = _.filter($scope.notifications, function(item){
	// 			return item.is_new;
	// 		});
	// 	 //Lay 1 mang id cua cac new notifications
	// 	 var notificationIds = _.map(newNotifactions, function(item){
	// 	 		return item._id.$oid;
	// 	 });
	// 	 //Chi cap nhat neu co notification moi
	// 	 if(notificationIds.length >= 1){
	// 	 	 notificationService.loaded(notificationIds).success(function(){
	// 	 	 	$scope.newNotificationsCount = notificationService.newNotificationsCount;
	// 	 	 });
	// 	 }
	// 	 console.log("on display notifications: ", notificationIds);
	// };

}]);

//Khi vao bam vao de xem thi set tat ca cac notification thanh loaded

//Su dung multiview de resolve user khi load nav, xem nav nhu 1 ui-view