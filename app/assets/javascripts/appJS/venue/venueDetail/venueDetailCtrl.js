app.controller('venueDetailCtrl', ['$scope', 'venueDetailService'
	, function ($scope, venueDetailService) {
		$scope.venue = venueDetailService.venue;
		
}]);