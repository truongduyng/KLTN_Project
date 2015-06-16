app.factory('baiVietCaNhanService', ['$http', '$q', function($http, $q) {
	var o = {
		posts: [],
	};

	//get all tat ca bai  viet
	o.index = function(username, page, per_page) {

		var url = "/posts/" + username + "/get_posts_by_username.json";
		var query = "?page=" + page + "&per_page=" + per_page;

		//promise de huy request
		var canceller = $q.defer();
		var cancel = function(reason) {
			canceller.resolve(reason);
		};
		var promise = $http.get(url + query, {
			timeout: canceller.promise
		}).success(function(data) {
			angular.copy(data.posts, o.posts);
			o.total = data.total;
		}).error(function(data) {});

		return {
			promise: promise,
			cancel: cancel,
		};
	};

	o.deletePost = function(post) {
		var id = post._id.$oid;
		var url = "/posts/" + id + '.json';
		return $http.delete(url).success(function() {
			var index = o.posts.indexOf(post);
			o.posts.splice(index,1);
			o.total--;
		});
	}
	return o;
}])