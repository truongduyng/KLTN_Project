services.factory('bussinessService', ['$http', function($http) {

	var o = {
		bussiness: {},
	};

	o.get = function() {
		return $http.get("bussinesses/show")
			.then(function(response) {
				angular.copy(response.data, o.bussiness);
			});
	};

	o.update = function(bussiness) {
		return $http.put("bussinesses/update", bussiness)
			.then(function(response) {
				console.log(response);
				angular.copy(response.data, o.bussiness);
			});
	};

	return o;
}]);