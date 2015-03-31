app.factory('listPostService', ['$http', function($http) {
	var o = {
		posts: [],
	};

	//get post theo page
	o.get_all = function(page) {
		var url = "/posts.json";
		var query = "?page=" + page;
		var promise = $http.get(url + query).success(function(data) {
			angular.copy(data, o.posts);
		});
		return promise;
	};
	return o;
}]);