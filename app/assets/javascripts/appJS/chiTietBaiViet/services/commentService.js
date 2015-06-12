app.factory('commentService', ['$http', function($http) {
	var o = {
		target_object:{}
	};

	o.create = function(comment) {
		comment_param = {comment: comment, target_object: o.target_object};
		return $http.post("/comments.json", comment_param);
	};

	o.destroy = function(comment) {
		var id = comment._id.$oid;
		return $http.delete("/comments/" + id + ".json");
	};

	o.update = function(comment) {
		var id = comment._id.$oid;
		return $http.put("/comments/" + id + ".json", comment);
	};

	o.like = function(comment) {
		var id = comment._id.$oid;
		var url = '/comments/' + id + "/like.json";
		return $http.put(url).success(function(data) {
			if (comment.likes == null) {
				comment.likes = [];
			}
			comment.likes.splice(0, 0, data);
			comment.like_count++;
		});
	};

	o.unlike = function(comment) {
		var id = comment._id.$oid;
		var url = '/comments/' + id + "/unlike.json";
		return $http.put(url).success(function(data) {
			if (comment.likes == null) {
				comment.likes = [];
			}
			var index = comment.likes.indexOf(data);
			comment.likes.splice(index, 1, data);
			comment.like_count--;
		});
	};


	o.getKFirstLike = function(comment, k){
		var id = comment._id.$oid;
		var url = "/comments/" + id + "/get_k_first_like/" + k +  ".json";
		return $http.get(url).success(function(data){
			comment.likes = data.likes;
			comment.number_of_remains = data.number_of_remains;
			comment.like_count = comment.likes.length + comment.number_of_remains;
		});
	};


	o.getAllLikes = function(comment){

		var id = comment._id.$oid;
		var url = '/comments/' + id + "/get_all_likes.json";
		return $http.get(url);
	};

	return o;
}]);