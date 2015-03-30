app.factory('baiVietYeuThichService', ['$http', '$q', function($http, $q) {
	var o = {
		posts: [],
		total: 0,
	};

	o.get = function(username, page, per_page) {
		var url = "/posts/" + username + "/get_favorite_posts_by_username.json";
		var query = "?page=" + page + "&per_page=" + per_page;

		var canceller = $q.defer();
		var cancel = function(reason) {
			canceller.resolve(reason);
		};
		console.log("baiVietYeuThichService");
		var promise = $http.get(url + query, {
			timeout: canceller.promise
		}).success(function(data) {
			console.log("baiVietYeuThichService on success");
			angular.copy(data.posts, o.posts);
			o.total = data.total;
		});
		return {
			promise: promise,
			cancel: cancel,
		};
	};

	return o;
}]);