app.factory('baiVietCaNhanService', ['$http',function($http) {
	var o = {
		posts:[],
	};

	//get all tat ca bai  viet
	o.index = function(username, page, per_page){
		console.log("in baiVietCaNhanService", username);
		var url = "/posts/" +  username + "/get_posts_by_username.json";
		var query = "?page=" + page + "&per_page=" + per_page;
		return $http.get(url + query).success(function(data){
			angular.copy(data.posts, o.posts);
			o.total = data.total;
		});
	};

	return o;
}])