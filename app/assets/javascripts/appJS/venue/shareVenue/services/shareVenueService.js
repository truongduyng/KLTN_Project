app.factory('shareVenueService', ['$http', function($http) {
	var o = {
		venue:{}
	};

	o.create = function(venue) {
		return $http.post("/venues.json", venue)
			.success(function(data) {
				angular.copy(data, o.venue);
				angular.copy(data, venue);
			}).error(function(data) {
				console.log(data);
			});
	};

	return o;
}]);