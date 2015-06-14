app.factory('venueDetailService', ['$http',function ($http) {
	var o ={
		venue: {},
	};

	o.show = function(id){
		var url = "/venues/" + id + ".json";
		return $http.get(url).success(function(data){
			angular.copy(data, o.venue)
		});
	};

	o.destroy = function(venue){
		var id = venue._id.$oid;
		var url = "/venues/" + id + ".json";
		return $http.delete(url);
	};

	return o;
}])