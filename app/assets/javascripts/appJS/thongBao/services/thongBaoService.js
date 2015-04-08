app.factory('thongBaoService', ['$http', function ($http) {
	var o ={
		notificationChange: {

		}
	};
	// o.getTargetObject = function(id){

	// };

	// o.getNotificationCategory = function(id){

	// };

	o.getNotificationChange = function(id){
		var url ="/notifications/" + id + ".json";

		var promise  = $http.get(url).success(function(data){
			angular.copy(data, o.notificationChange);
		});
		return promise;
	};
	return o;
}])