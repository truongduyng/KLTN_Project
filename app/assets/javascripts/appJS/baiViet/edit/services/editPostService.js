app.factory('editPostService', ['$http', function ($http) {
	var o = {};

	o.edit = function(id){
		var promise = $http.get("/posts/" + id + "/edit.json").success(function(data){
			o.post = data;
		});
		return promise;
	};

	o.update = function(post, deletedPhotos){
		var id = post._id.$oid;
		var promise = $http.put("/posts/" + id + ".json", {
			post: post,
			deleted_photos: deletedPhotos,
		}).success(function(data){
			angular.copy(data, o.post)
		});
		return promise;
	};

	return o;
}])