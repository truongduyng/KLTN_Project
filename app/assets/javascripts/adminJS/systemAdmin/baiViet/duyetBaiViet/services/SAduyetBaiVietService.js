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
			//Neu du lieu lay ve ma ko co, nhung total >= 1, suy ra load lai tu trang 1. Xu ly 
			//truong hop khi ma da xu ly het du lieu o trang 1, va du lieu chi con 1 trang, khi do ko the lay
			//dc du lieu o trang 2, do du lieu trang 2 h thanh trang 1
			if(data.posts.length == 0 && data.total >= 1){
				o.get_posts(1, per_page);
			}
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