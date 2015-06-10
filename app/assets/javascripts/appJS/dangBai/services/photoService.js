app.factory('photoService', ['$http', function($http) {
	var o = {};


	o.destroy = function(id) {
		return $http.delete("/photos/" + id + ".json")
			.success(function(data) {
				console.log(data);
			}).error(function(data) {
				console.log(data);
			});
	};
	return o;
}]);