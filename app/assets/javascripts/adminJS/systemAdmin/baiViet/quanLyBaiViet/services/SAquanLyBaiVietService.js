app.factory('SAquanLyBaiVietService', ['$http', '$q', function($http, $q) {
	var o = {
		posts: [],
		total: 0,
	};

	o.get_posts = function(text_search, page, per_page) {

		if(text_search){
			var url = "system_admin_posts/get_accept_and_deny_posts/"+text_search+".json";
		}else{
			var url = "system_admin_posts/get_accept_and_deny_posts.json" + "?page=" + page + "&per_page=" + per_page;
		}

		var canceller = $q.defer();
		var cancel = function(reason) {
			canceller.resolve(reason);
		};
		var promise = $http.get(url, {
			timeout: canceller.promise
		}).success(function(data) {
			angular.copy(data.posts, o.posts);
			o.total = data.total;
		});
		return {
			promise: promise,
			cancel: cancel,
		};
	};

	//chap nhap post gan thanh published
	o.accept = function(post) {
		var id = post._id.$oid;
		var url = "/system_admin_posts/" + id + "/accept.json";
		return $http.put(url).success(function(data) {
			var index = o.posts.indexOf(post);
			angular.copy(data, post);
		});
	};

	o.deny = function(post) {
		var id = post._id.$oid;
		var url = "/system_admin_posts/" + id + "/deny.json";
		return $http.put(url).success(function(data) {
			var index = o.posts.indexOf(post);
			angular.copy(data, post);
		});
	}
	return o;
}]);