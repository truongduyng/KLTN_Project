services.factory('branchService', ['$http', function($http) {
	var o = {
		branches: [],
	};
	o.index = function() {
		return $http.get("/branches.json")
			.success(function(data) {
				angular.copy(data, o.branches);
				console.log(data);
			})
			.error(function(data) {
				console.log(data);
			});
	};

	return o;
}]);