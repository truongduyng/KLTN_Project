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

//Con sai o cho luu bai viet, do chuyen published thanh published?
// 6C:71:D9:1D:A6:2F
// EC:55:F9:E4:B4:31
// 78:24:AF:E9:9E:83
// 58:94:6B:B7:93:B0	

