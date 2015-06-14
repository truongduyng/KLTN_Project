app.factory('replyService', ['$http', function($http) {
	var o = {

	};

	o.index = function(comment) {
		var comment_id = comment._id.$oid;
		var url = "/comments/" + comment_id + "/replies.json";
		return $http.get(url).success(function(data) {

			if (comment.replies == null) {
				comment.replies = [];
			}

			angular.copy(data, comment.replies);
			console.log("replies", comment.replies);
		});
	};


	o.create = function(comment, reply) {
		var comment_id = comment._id.$oid;
		var url = "/comments/" + comment_id + "/replies.json";
		var promise = $http.post(url, reply).success(function(data) {
			if (comment.replies == null) {
				comment.replies = [];
			}
			comment.replies.splice(0, 0, data);
			//Cap nhat reply_count
			comment.reply_count++;
		});
		return promise;
	};


	o.destroy = function(comment, reply) {
		var comment_id = comment._id.$oid;
		var id = reply._id.$oid;
		var url = "/comments/" + comment_id + "/replies/" + id + ".json";
		return $http.delete(url).success(function(data) {
			var index = comment.replies.indexOf(reply);
			comment.replies.splice(index, 1);
		});
	};

	o.update = function(comment, reply) {
		var comment_id = comment._id.$oid;
		var id = reply._id.$oid;
		var url = "/comments/" + comment_id + "/replies/" + id + ".json";
		return $http.put(url, reply).success(function(data) {
			angular.copy(data, reply);
		});
	};


	o.like = function(comment, reply) {
		var comment_id = comment._id.$oid;
		var id = reply._id.$oid;
		var url = "/comments/" + comment_id + '/replies/' + id + "/like.json";
		return $http.put(url).success(function(data) {
			if (reply.likes == null) {
				reply.likes = [];
			}
			reply.likes.splice(0, 0, data);
			reply.like_count++;
		});
	};

	o.unlike = function(comment, reply) {
		var comment_id = comment._id.$oid;
		var id = reply._id.$oid;
		var url = "/comments/" + comment_id + '/replies/' + id + "/unlike.json";
		return $http.put(url).success(function(data) {
			if (reply.likes == null) {
				reply.likes = [];
			}
			var index = reply.likes.indexOf(data);
			reply.likes.splice(index, 1, data);
			reply.like_count--;
		});
	};



	o.getKFirstLike = function(comment, reply, k) {
		var comment_id = comment._id.$oid;
		var id = reply._id.$oid;
		var url = "/comments/" + comment_id + '/replies/' + id + "/get_k_first_like/" + k + '.json';
		return $http.get(url).success(function(data) {
			reply.likes = data.likes;
			reply.number_of_remains = data.number_of_remains;
			reply.like_count = reply.likes.length + reply.number_of_remains;
		});
	};

	o.getAllLikes = function(comment, reply){
		var comment_id = comment._id.$oid;
		var id = reply._id.$oid;
		var url = "/comments/" + comment_id + '/replies/' + id + "/get_all_likes.json";
		return $http.get(url);
	};

	return o;
}]);