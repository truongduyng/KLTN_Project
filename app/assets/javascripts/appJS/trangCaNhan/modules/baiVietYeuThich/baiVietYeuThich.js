app.controller('baiVietYeuThichCtrl', ['$scope', function($scope) {
	
	$scope.pageConfig = $scope.$root.pageConfig;
	//Lay trang hien tai tu tham so query
	if ($scope.searchObj.page) {
		$scope.pageConfig.currentPage = $scope.searchObj.page;
	}
	$scope.pageConfig.total = baiVietCaNhanService.total;

	$scope.onPageSelected = function(data, page) {
		$scope.searchObj.page = page;
		$location.search($scope.searchObj);
		baiVietCaNhanService.index($stateParams.username, page, $scope.pageConfig.pageSize);
	};

	$scope.posts = baiVietCaNhanService.posts;


}]);