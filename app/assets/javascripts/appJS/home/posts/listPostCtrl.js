app.controller('listPostCtrl', ['$scope', 'listPostService', 'Auth', function($scope, listPostService, Auth) {

	$scope.posts = listPostService.posts;

	$scope.currentPage = 1;
	$scope.isBusy = false;
	$scope.isEnd = false;

	$scope.loadMore = function() {
		if ($scope.isEnd) {
			return;
		}

		$scope.currentPage = $scope.currentPage + 1;

		$scope.isBusy = true;
		listPostService.get_all($scope.currentPage).success(function(data) {
			if (data == null || data.length == 0) {
				$scope.isEnd = true;
			}
			$scope.isBusy = false;
			console.log("listPostService.posts: ", listPostService.posts);
		}).error(function() {
			$scope.isBusy = false;
			$scope.currentPage--;
		});
	};

	$scope.$on('onChangeInterestEvent', function(event, data) {
		console.log("catch onChangeInterestEvent");
		$scope.currentPage = 0;
		$scope.isEnd = false;
		$scope.loadMore();

	});

}]);