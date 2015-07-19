app.factory('tagService', ['$http', function($http) {
	var o = {
		tags:[]
	};


	o.index = function(){
		var url = "/tags.json";
		var promise = $http.get(url).success(function(data){
			angular.copy(data, o.tags);
		});
		return promise;
	}

	o.addInterest = function(tag){
		var url = "/custom_users/add_interest.json?tag_id=" + tag._id.$oid;
		var promise = $http.put(url);
		return promise;
	};

	o.deleteInterest = function(tag){
		var url = "/custom_users/delete_interest.json?tag_id=" + tag._id.$oid;
		var promise = $http.put(url);
		return promise;
	};

	

	return o;
}]);