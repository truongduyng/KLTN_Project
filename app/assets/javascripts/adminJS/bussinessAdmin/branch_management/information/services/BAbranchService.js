bussinessAdmin.factory('BAbranchService', ['$http', function($http) {
	var o = {};

	o.create = function(branch) {
		var url = "/branches.json";
		var promise = $http.post(url, {
			name: branch.name,
			phone: branch.phone,
			address: branch.address,
			latitude: branch.latitude,
			longitude: branch.longitude,
			url_alias: branch.url_alias,
		}).success(function(data) {
			angular.copy(data, branch);
		});
		return promise;
	};


	o.update = function(branch) {
		var id = branch._id.$oid;
		var url = "/branches/" + id + ".json";
		var promise = $http.put(url, {
			name: branch.name,
			phone: branch.phone,
			address: branch.address,
			latitude: branch.latitude,
			longitude: branch.longitude,
		}).success(function(data) {
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