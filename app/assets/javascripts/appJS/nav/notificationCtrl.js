app.controller('notificationCtrl', ['$scope', 'notificationService', 'Auth',
	function($scope, notificationService, Auth) {

		Auth.currentUser().then(function(user) {
				$scope.user = user;
				$scope.loadNotifications();
				$scope.registerNotification();
			});
		//Cho thay dang load notification
		$scope.isLoading = false;
		$scope.loadNotifications = function() {
			$scope.isLoading = true;
			notificationService.index().success(function() {
				$scope.isLoading = false;
				$scope.notifications = notificationService.notifications;
				$scope.newNotificationsCount = notificationService.newNotificationsCount;
			}).error(function(){
				$scope.isLoading = false;
			});
		};

		//Cho luoc do csdl trigger_users
		$scope.onWatched = function(notification) {
			notificationService.watched(notification);
		};

		//Danh dau tat ca notification la dc dc load va xem boi nguoi dung
		$scope.onDisplayNotifications = function() {
			//B1: Kiem tra thu co notification_change moi hay ko
			var hasNewNotification = _.some($scope.notifications, function(item) {
				return item.is_new;
			});
			//B2: Neu co moi goi ham danh dau va chuyen doi no thanh cu
			if (hasNewNotification) {
				notificationService.boNew().success(function() {
					$scope.newNotificationsCount = notificationService.newNotificationsCount;
				});
			}
		};

		//Dung websocket de cap nhat realtime
		var dispatcher = null;
		var user_channel = null;
		$scope.registerNotification = function() {
			// B2: Dk channel private cho user, de cap nhat notification
			dispatcher = new WebSocketRails('128.199.176.52/websocket');

			dispatcher.on_open = function(data) {

			};

			user_channel = dispatcher.subscribe_private($scope.user._id.$oid, function(user) {
				// success callback
				// console.log("on subscribe_private success:", user);
				// console.log(user._id.$oid + "Has joined the channel");
			}, function(reason) {
				// failure callback
				console.log("on subscribe_private fail");
				console.log("Authorization failed because " + reason.message);
			});

			//B3: Bind den su thich hop va lang nghe
			//Su kien khi co 1 notification moi
			user_channel.bind("on_new_notification", function(newNotification) {
				//B1: Chuyen string thanh json object
				newNotification = JSON.parse(newNotification);
				//B2: Khi ma notification_change dc hien thi realtime thi danh dau no la da dc load
				notificationService.loaded(newNotification);
				//B3: Cap nhat giao dien
				$scope.$apply(function() {
					$scope.notifications.splice(0, 0, newNotification);
					$scope.newNotificationsCount++;
				});
				//B4: Hien thi ket qua ra console
				// console.log("on newNotification: ", newNotification);
			});
			//Su kien khi 1 notification thay doi: vi du 1 notification change chua dc xem
			//va no cap nhat trigger
			user_channel.bind("on_update_notification", function(updatedNotification) {
				//B1: Chuyen string thanh json object
				updatedNotification = JSON.parse(updatedNotification);
				//B3: Cap nhat giao dien
				$scope.$apply(function() {
					_.find($scope.notifications, function(item) {
						if (item._id.$oid == updatedNotification._id.$oid) {
							angular.copy(updatedNotification, item);
							return true;
						}
					});
				});
				//B4: Hien thi ket qua ra console
				// console.log("on updatedNotification: ", updatedNotification);
			});


		};
	}
]);

//Chuyen den dung cai vi tri cua doi tuong gay ra thong bao
//Cuon xuong de load nhieu notification
//Hine thi tat ca notification
