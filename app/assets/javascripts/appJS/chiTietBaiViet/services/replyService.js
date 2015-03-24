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


	return o;
}])