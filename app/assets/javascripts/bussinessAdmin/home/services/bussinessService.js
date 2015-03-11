services.factory('bussinessService', ['$http', function($http) {

	var o = {
		bussiness: {},
	};
	console.log("line 1");
	o.get = function() {
		console.log("in get");
		return $http.get("bussinesses/show")
			.then(function(response) {
				angular.copy(response.data, o.bussiness);
			});
	};

	o.update = function(bussiness) {
		return $http.put("bussinesses/update", bussiness)
			.then(function(response) {
				angular.copy(response.data, o.bussiness);
			});
	};

	return o;
}]);