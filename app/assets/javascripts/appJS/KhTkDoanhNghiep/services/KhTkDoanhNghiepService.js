app.factory('KhTkDoanhNghiepService', ['$http', function($http) {
	var o = {
		bussinessRequest:{

		},
	};

	o.create = function(bussinessRequest) {
		var url = "/bussiness_requests.json";
		var promise = $http.post(url, bussinessRequest);
		return promise;
	};

	o.show = function(id){
		var url = "/bussiness_requests/" + id + ".json";
		var promise = $http.get(url).success(function(data){
			angular.copy(data, o.bussinessRequest)
		});
		return promise;
	};
	return o;
}]);