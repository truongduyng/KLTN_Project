app.factory('KhTkDoanhNghiepService', ['$http', function($http) {
	var o = {};

	o.create = function(bussinessRequest) {
		var url = "/bussiness_requests.json";
		var promise = $http.post(url, bussinessRequest);
		return promise;
	};
	return o;
}]);