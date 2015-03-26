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


	o.like = function(){
		var id = o.post._id.$oid;
		var url = "/posts/" + id + "/like.json";
		return $http.put(url).success(function(data){
			if(o.post.likes == null){
				o.post.likes = [];
			}
			o.post.likes.splice(0, 0, data);
			o.post.like_count++;
		});
	};

	o.unlike = function(){
		var id = o.post._id.$oid;
		var url = "/posts/" + id + "/unlike.json";
		return $http.put(url).success(function(data){
			if(o.post.likes == null){
				o.post.likes = [];
			}
			var index = o.post.likes.indexOf(data);
			o.post.likes.splice(index, 1, data);
			o.post.like_count--;
		});
	};

	o.getKFirstLike = function(k){
		var id = o.post._id.$oid;
		var url = "/posts/" + id + "/get_k_first_like/" + k +  ".json";
		return $http.get(url).success(function(data){
			o.post.likes = data.likes;
			o.post.number_of_remains = data.number_of_remains;
			o.post.like_count = o.post.likes.length + o.post.number_of_remains;
		});
	};

	o.getAllLikes = function(){
		var id = o.post._id.$oid;
		var url = "/posts/" + id + "/get_all_likes.json";
		return $http.get(url);
	};

	return o;
}]);