app.factory('listPostService', ['$http', function($http) {
	var o = {
		posts: [],
	};

	//get post theo page, phu vu cho load more
	o.get_all = function(page) {
		var url = "/posts.json";
		var query = "?page=" + page;
		var promise = $http.get(url + query).success(function(data) {
			//vi load more nen giu lai du lieu cu, do do them du lieu moi vao cuoi mang
			data.forEach(function(item){
				o.posts.splice(o.posts.length, 0, item);
			});
		});
		return promise;
	};
	return o;
}]);