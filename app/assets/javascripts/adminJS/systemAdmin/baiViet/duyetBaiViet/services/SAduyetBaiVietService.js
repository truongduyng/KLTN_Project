app.factory('SAduyetBaiVietService', ['$http', '$q', function ($http, $q) {
	var o ={
		posts:[],
		total: 0,
	};

	o.get_posts = function(page, per_page){
		var url = "/system_admin_posts.json";
		var query = "?page=" + page + "&per_page=" + per_page;

		var canceller = $q.defer();
		var cancel = function(reason) {
			canceller.resolve(reason);
		};
		var promise = $http.get(url + query,{
			timeout: canceller.promise
		}).success(function(data){
			angular.copy(data.posts, o.posts);
			o.total = data.total;
		});
		return {
			promise: promise,
			cancel: cancel,
		};
	};	

	//chap nhap post gan thanh published
	o.accept = function(post){
		var id = post._id.$oid;
		var url ="/system_admin_posts/" + id + "/accept.json";
		return $http.put(url).success(function(data){
			var index = o.posts.indexOf(post);
			o.posts.splice(index, 1);
		});
	};

	o.deny = function(post){
		var id = post._id.$oid;
		var url ="/system_admin_posts/" + id + "/deny.json";
		return $http.put(url).success(function(data){
			var index = o.posts.indexOf(post);
			o.posts.splice(index, 1);
		});
	}
	return o;
}])