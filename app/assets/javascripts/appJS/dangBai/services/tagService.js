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
	return o;
}]);