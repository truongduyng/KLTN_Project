filters.filter("shortContent", [function() {
	return function(content, length) {
		var words = content.split(" ");
		console.log("words: ", words);
		if (words.length > length) {
			var result = "";
			for (var i= 0; i < length; i++) {
				result = result + " " + words[i];
			}
			result = result + " ...";
		} else {
			result = content;
		}
		return result;
	};
}]);