app.controller('venueDetailCtrl', ['$scope', 'venueDetailService', function ($scope, venueDetailService) {
		$scope.venue = venueDetailService.venue;
		
		$scope.showImage = function(photo) {
			var modalInstance = $modal.open({
				templateUrl: 'showImageModal.html',
				controller: 'showImageModalCtrl',
				size: 'lg',
				resolve: {
					photo: function() {
						return photo;
					},
					listPhotos: function() {
						return $scope.venue.photos;
					}
				}
			});

		};

}]);