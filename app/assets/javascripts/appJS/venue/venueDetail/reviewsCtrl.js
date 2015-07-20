app.controller('reviewsCtrl', ['$scope', 'reviewService', function($scope, reviewService) {
	$scope.isLoading = true;
	$scope.isCreating = false;
	$scope.reviews = reviewService.reviews;
	$scope.newReview = {
		content: '',
	};

	reviewService.index($scope.venue).success(function() {
		$scope.isLoading = false;
		//khoi tao gia tri mac dinh cho nhung reviews
		_.each($scope.reviews, function(review) {
			review.isEditted = false;
			review.isEditting = false;
		})
	});



	$scope.addReview = function() {
		console.log("venue: ", $scope.venue);
		console.log("newreview: ", $scope.newReview);
		$scope.isCreating = true;
		reviewService.create($scope.venue, $scope.newReview).success(function() {
			$scope.isCreating = false;
			$scope.newReview.content = "";
		});
	};

	//chi mo form chinh sua
	$scope.onEditReview = function(review) {
		review.isEditted = true;
	};

	// gui yeu cau len server
	$scope.editReview = function(review) {
		review.isEditting = true;
		reviewService.update($scope.venue, review).success(function() {
			review.isEditted = false;
			review.isEditting = false;
		});
	};

	$scope.deleteReview = function(review) {
		reviewService.destroy($scope.venue, review);
	};
}]);