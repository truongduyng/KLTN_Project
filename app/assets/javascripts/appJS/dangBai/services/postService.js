app.factory('postService', ['$http', function($http) {
	var o = {
		post:{

		},
	};

	o.create = function(post) {
		return $http.post("/posts.json", post)
			.success(function(data) {
				console.log(data);
			}).error(function(data) {
				console.log(data);
			});
	};


	return o;
}])