app.factory('SAduyetBaiVietService', ['$http', function ($http) {
	var o ={
		posts:[],
		total: 0,
	};

	o.get_posts = function(){
		var url = "/system_admin_posts.json";
		return $http.get(url).success(function(data){
			angular.copy(data.posts, o.posts);
			o.total = data.total;
		});
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