app.controller('baiVietCaNhanCtrl', ['$scope', 'baiVietCaNhanService','$state', '$location', '$stateParams',
	function($scope, baiVietCaNhanService, $state, $location, $stateParams) {

		$scope.pageConfig = {};
		//Lay cau hinh page tu rootScope
		angular.copy($scope.$root.rootPageConfig, $scope.pageConfig);
		//Lay trang hien tai tu tham so query
		if($scope.searchObj.page){
			$scope.pageConfig.currentPage = $scope.searchObj.page;
		}
		$scope.pageConfig.total = baiVietCaNhanService.total;
	
		$scope.onPageSelected = function(data, page){
			$scope.searchObj.page = page;
			$location.search($scope.searchObj);
			baiVietCaNhanService.index($stateParams.username, page, $scope.pageConfig.pageSize);
		};

		$scope.posts = baiVietCaNhanService.posts;
		
		$scope.reload = function(){
			$state.reload();
		};
	}
]);