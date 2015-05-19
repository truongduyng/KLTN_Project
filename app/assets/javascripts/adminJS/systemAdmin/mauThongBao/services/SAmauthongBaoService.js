app.factory('SAmauThongBaoService', ['$http',function($http) {

	var o = {
		notificationCategories: [],
	};

	o.getAllNotificationTemplates = function(){
		var url = "/notification_categories.json";
		var promise = $http.get(url).success(function(data){
			angular.copy(data, o.notificationCategories);
			console.log(o.notificationCategories);
		});
		return promise;
	};

	o.update = function(nc, content){
		var url = "/notification_categories/" + nc._id.$oid + ".json";
		console.log("content: ", content);
		var promise = $http.put(url, {
			content: content
		}).success(function(){
			nc.notification_template.content = content;
		});

		return promise;
	};

	return o;
}]);