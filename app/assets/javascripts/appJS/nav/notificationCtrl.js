app.controller('notificationCtrl', ['$scope', 'notificationService', 'Auth',
	function($scope, notificationService, Auth) {

		Auth.currentUser()
			.then(function(user) {
				$scope.user = user;
				$scope.loadNotifications();
				$scope.registerNotification();
			});

		$scope.loadNotifications = function() {
			notificationService.index().success(function() {
				$scope.notifications = notificationService.notifications;
				$scope.newNotificationsCount = notificationService.newNotificationsCount;
			});
		};

		//Cho luoc do csdl trigger_users 
		$scope.onWatched = function(notification) {
			console.log("on watched: ", notification);
			notificationService.watched(notification);
		};

		//Khi clich de xem notification thi danh dau is_new = false
		$scope.onDisplayNotifications = function() {
			//Lay array notifications isnew = true;
			var newNotifactions = _.filter($scope.notifications, function(item) {
				return item.is_new;
			});
			//Lay 1 mang id cua cac new notifications
			var notificationIds = _.map(newNotifactions, function(item) {
				return item._id.$oid;
			});
			//Chi cap nhat neu co notification moi
			if (notificationIds.length >= 1) {
				notificationService.loaded(notificationIds).success(function() {
					$scope.newNotificationsCount = notificationService.newNotificationsCount;
				});
			}
			console.log("on display notifications: ", notificationIds);
		};

		//Dung websocket de cap nhat realtime
		var dispatcher = null;
		var user_channel = null;
		$scope.registerNotification = function() {
			// B2: Dk channel private cho user, de cap nhat notification
			dispatcher = new WebSocketRails('localhost:3000/websocket');
			dispatcher.on_open = function(data) {
				console.log('Connection has been established: ', data);
			};

			user_channel = dispatcher.subscribe_private($scope.user._id.$oid, function(user) {
				// success callback
				console.log("on subscribe_private success:", user);
				console.log(user._id.$oid + "Has joined the channel");
			}, function(reason) {
				// failure callback
				console.log("on subscribe_private fail");
				console.log("Authorization failed because " + reason.message);
			});

			//B3: Bind den su thich hop va lang nghe
			//Su kien khi co 1 notification moi
			user_channel.bind("on_new_notification", function(newNotification) {
				newNotification = JSON.parse(newNotification);
				console.log("on newNotification: ", newNotification);
				$scope.$apply(function() {
					$scope.notifications.splice(0, 0, newNotification);
					$scope.newNotificationsCount++;
				});
			});
			//Su kien khi 1 notification thay doi: vi du 1 notification change chua dc xem
			//va no cap nhat trigger
			user_channel.bind("on_update_notification", function(updatedNotification) {
				updatedNotification = JSON.parse(updatedNotification);
				console.log("on updatedNotification: ", updatedNotification);
				$scope.$apply(function() {
					_.find($scope.notifications, function(item) {
						if (item._id.$oid == updatedNotification._id.$oid) {
							angular.copy(updatedNotification, item);
							return true;
						}
					});
				});
			});

			// //
			// post_channel = dispatcher.subscribe('post');
			// post_channel.bind("on_post", function(notificationChange){
			// 	console.log("on post channel bind: ", notificationChange);
			// });

		};
	}
]);