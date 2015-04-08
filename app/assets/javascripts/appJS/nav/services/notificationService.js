app.factory('notificationService', ['$http', function($http) {
	var o = {
		notifications: []
	};

	o.index = function() {
		var url = "/notifications.json";
		return $http.get(url).success(function(data) {
			angular.copy(data, o.notifications);
		});
	};

	o.watched = function(notification){
		var id = notification._id.$oid;
		var url = "/notifications/" + id +  "/watched.json";
		var promise = $http.put(url).success(function(){
			notification.watched = true;
		});
		return promise;
	};

	return o;
}])