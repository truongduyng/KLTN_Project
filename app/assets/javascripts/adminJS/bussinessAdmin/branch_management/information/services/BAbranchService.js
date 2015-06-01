bussinessAdmin.factory('BAbranchService', ['$http', function($http) {
	var o = {};

	o.create = function(branch) {
		console.log(branch);
		var url = "/branches.json";
		var promise = $http.post(url, branch).success(function(data) {
			angular.copy(data, branch);
		});
		return promise;
	};


	o.update = function(branch) {
		var id = branch._id.$oid;
		var url = "/branches/" + id + ".json";
		var promise = $http.put(url, branch).success(function(data) {
			angular.copy(data, branch);
		});

		return promise;
	}

	o.destroy = function(branch){
		var id = branch._id.$oid;
		var url ="/branches/" + id + ".json";
		var promise = $http.delete(url).success(function(data){
		});
		return promise;
	}

	return o;
}])