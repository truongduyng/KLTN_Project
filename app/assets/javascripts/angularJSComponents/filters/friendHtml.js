filters.filter("friendHmtl", [function() {
	return function(likes, number_of_remains) {
		$likes.forEach(function(like) {
			var p = "<p class='text-tooltip'>" + like.user.username + "</p>";
			likesHtmlTmp = likesHtmlTmp + p;
		});
		if (number_of_remains >= 1) {
			likesHtmlTmp = likesHtmlTmp + 'và ' + number_of_remains + " người khác";
		}
		return likesHtmlTmp;
	};
}]);