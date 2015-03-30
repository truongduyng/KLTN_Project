app.factory('baiVietYeuThichService', ['$http', function($http) {
	var o = {
		posts: [],
		total: 0,
	};

	o.get = function(username, page, per_page) {
		var url = "/posts/" + username + "/get_favorite_posts_by_username.json";
		var query = "?page=" + page + "&per_page=" + per_page;
		return $http.get(url + query).success(function(data) {
			angular.copy(data.posts, o.posts);
			o.total = data.total;
		});
	};

	return o;
}])