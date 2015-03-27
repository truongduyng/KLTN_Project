app.factory('baiVietCaNhanService', ['$http',function($http) {
	var o = {
		posts:[],
	};

	//get all tat ca bai  viet
	o.index = function(username){
		console.log("in baiVietCaNhanService", username);
		var url = "/posts/" +  username + "/get_posts_by_username.json";
		return $http.get(url).success(function(data){
			angular.copy(data, o.posts);
		});
	};

	return o;
}])