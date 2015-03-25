app.factory('commentService', ['$http', function($http) {
	var o = {};

	o.like = function(post, comment) {
		var post_id = post._id.$oid;
		var id = comment._id.$oid;
		var url = "/posts/" + post_id  + '/comments/' + id + "/like.json";
		return $http.put(url).success(function(data) {
			if (comment.likes == null) {
				comment.likes = [];
			}
			comment.likes.splice(0, 0, data);
			comment.like_count++;
		});
	};

	o.unlike = function(post, comment) {
		var post_id = post._id.$oid;
		var id = comment._id.$oid;
		var url = "/posts/" + post_id  + '/comments/' + id + "/unlike.json";
		return $http.put(url).success(function(data) {
			if (comment.likes == null) {
				comment.likes = [];
			}
			var index = comment.likes.indexOf(data);
			comment.likes.splice(index, 1, data);
			comment.like_count--;
		});
	};
	return o;
}]);