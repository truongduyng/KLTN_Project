app.factory('listPostService', ['$http', function($http) {
	var o = {
		posts: [],
	};

	o.get_all = function(page) {
		var url = "/posts.json";
		var query = "?page=" + page;
		return $http.get(url + query).success(function(data) {

			if (page == 1){
				o.posts = data;
			}else{
				data.forEach(function(item){
					o.posts.push(item);
				});
			}
		});

	};
	return o;
}]);


