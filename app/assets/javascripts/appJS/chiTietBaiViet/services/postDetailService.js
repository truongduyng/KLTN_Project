app.factory('postDetailService', ['$http', function($http) {
	var o = {
		post: {},
	};

	o.show = function(id) {
		var promise = $http.get("/posts/" + id + ".json").success(function(data) {
			angular.copy(data, o.post);
		});
		return promise;
	};

	o.addComment = function(comment) {
		var promise =
			$http.post("/posts/" + o.post._id.$oid + "/comments.json", comment)
			.success(function(data) {
				if (o.post.comments == null) {
					o.post.comments = [];
				}
				o.post.comments.splice(0, 0, data);

			});
		return promise;
	};

	o.deleteComment = function(comment) {
		var id = comment._id.$oid;
		var post_id = o.post._id.$oid;
		return $http.delete("/posts/" + post_id + "/comments/" + id + ".json")
			.success(function() {
				var index = o.post.comments.indexOf(comment);
				o.post.comments.splice(index, 1);
			});
	};

	o.editComment = function(comment) {
		var id = comment._id.$oid;
		var post_id = o.post._id.$oid;
		return $http.put("/posts/" + post_id + "/comments/" + id + ".json", comment)
			.success(function(data) {
				angular.copy(data, comment);
			});
	};
	return o;
}]);