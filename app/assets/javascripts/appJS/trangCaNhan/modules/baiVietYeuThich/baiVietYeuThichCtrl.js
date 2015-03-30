// app.controller('baiVietYeuThichCtrl', ['$scope', 'baiVietYeuThichService', '$stateParams', function($scope, baiVietYeuThichService, $stateParams) {

// 	$scope.pageConfig = {};
// 	angular.copy($scope.$root.rootPageConfig, $scope.pageConfig);
// 	//Lay trang hien tai tu tham so query
// 	if ($scope.searchObj.page) {
// 		$scope.pageConfig.currentPage = $scope.searchObj.page;
// 	}

// 	$scope.posts = baiVietYeuThichService.posts;
// 	$scope.pageConfig.total = baiVietYeuThichService.total;

// 	$scope.onPageSelected = function(data, page) {
// 		$scope.searchObj.page = page;
// 		$location.search($scope.searchObj);
// 		baiVietYeuThichService.get($stateParams.username, page, $scope.pageConfig.pageSize);
// 	};



// }]);

app.controller('baiVietYeuThichCtrl', ['$scope', 'baiVietYeuThichService', '$stateParams', function($scope, baiVietYeuThichService, $stateParams) {

	$scope.pageConfig = {};
	angular.copy($scope.$root.rootPageConfig, $scope.pageConfig);
	//Lay trang hien tai tu tham so query
	$scope.posts = baiVietYeuThichService.posts;
	$scope.pageConfig.total = baiVietYeuThichService.total;
	var request = null;

	$scope.onPageSelected = function(data, page) {
		$scope.posts.splice(0, $scope.posts.length);
		$scope.isLoading = true;
		//Huy request neu no chua load xong va tao request moi
		if (request != null) {
			request.cancel("chuyển trang");
		}

		request = baiVietYeuThichService.get($stateParams.username, page, $scope.pageConfig.pageSize);
		request.promise.success(function() {
			$scope.isLoading = false;
		});
	};

}]);