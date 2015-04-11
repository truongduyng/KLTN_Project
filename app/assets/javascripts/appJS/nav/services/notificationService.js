// app.factory('notificationService', ['$http', function($http) {
// 	var o = {
// 		notifications: [],
// 		newNotificationsCount: 0,
// 	};

// 	o.index = function() {
// 		var url = "/notifications.json";
// 		return $http.get(url).success(function(data) {
// 			//Gan mang notification vao service
// 			_.each(data.notifications, function(notification){
// 				notification.trigger_users = notification.trigger_users.reverse();
// 			});
// 			angular.copy(data.notifications, o.notifications);
// 			//Dem so luong notification moi
// 			o.newNotificationsCount = data.new_notifications_count;
// 		});
// 	};

// 	// o.watched = function(){

// 	// };
// 	// o.loaded = function(){

// 	// };
	
// 	o.watched = function(notification){
// 		var id = notification._id.$oid;
// 		var url = "/notifications/" + id +  "/watched.json";
// 		var promise = $http.put(url).success(function(){
// 			notification.watched = true;
// 		});
// 		return promise;
// 	};

// 	//Danh dau 1 mang cac notification la da load va ko con new
// 	o.loaded = function(notificationIds){
// 		var url = "/notifications/loaded.json";
// 		var promise = $http.put(url, {
// 			notification_ids: notificationIds,
// 		}).success(function(data){
// 			//Gan tat ca nofication la new = false
// 			_.each(o.notifications, function(item){
// 				item.is_new = false;
// 			});
// 			//Cap nhat so luong new bang 0
// 			o.newNotificationsCount = 0;
// 		});
// 		return promise;
// 	};


// 	// o.watched = function(notificationIds){
// 	// 	var url = "/notifications/watched.json";
// 	// 	var promise = $http.put(url,{
// 	// 		notification_ids: notificationIds,
// 	// 	});
// 	// 	return promise;
// 	// };

// 	// //Danh dau 1 mang cac notification la da load va ko con new
// 	// o.loaded = function(notificationIds){
// 	// 	var url = "/notifications/loaded.json";
// 	// 	var promise = $http.put(url, {
// 	// 		notification_ids: notificationIds,
// 	// 	}).success(function(data){
// 	// 		//Gan tat ca nofication la new = false
// 	// 		_.each(o.notifications, function(item){
// 	// 			item.is_new = false;
// 	// 		});
// 	// 		//Cap nhat so luong new bang 0
// 	// 		o.newNotificationsCount = 0;
// 	// 	});
// 	// 	return promise;
// 	// };

// 	return o;
// }])


app.factory('notificationService', ['$http', function($http) {
	var o = {
		notifications: [],
		newNotificationsCount: 0,
	};

	o.index = function() {
		var url = "/notifications.json";
		return $http.get(url).success(function(data) {
			// //Gan mang notification vao service
			// _.each(data.notifications, function(notification){
			// 	notification.trigger_users = notification.trigger_users.reverse();
			// });
		
			angular.copy(data.notifications, o.notifications);
			//Dem so luong notification moi
			o.newNotificationsCount = data.new_notifications_count;
		});
	};

	o.watched = function(){

	};
	o.loaded = function(){

	};
	
	// o.watched = function(notification){
	// 	var id = notification._id.$oid;
	// 	var url = "/notifications/" + id +  "/watched.json";
	// 	var promise = $http.put(url).success(function(){
	// 		notification.watched = true;
	// 	});
	// 	return promise;
	// };

	// //Danh dau 1 mang cac notification la da load va ko con new
	// o.loaded = function(notificationIds){
	// 	var url = "/notifications/loaded.json";
	// 	var promise = $http.put(url, {
	// 		notification_ids: notificationIds,
	// 	}).success(function(data){
	// 		//Gan tat ca nofication la new = false
	// 		_.each(o.notifications, function(item){
	// 			item.is_new = false;
	// 		});
	// 		//Cap nhat so luong new bang 0
	// 		o.newNotificationsCount = 0;
	// 	});
	// 	return promise;
	// };


	return o;
}])