app.controller('baiVietCaNhanCtrl', ['$scope', 'baiVietCaNhanService','$state', '$location', '$stateParams',
	function($scope, baiVietCaNhanService, $state, $location, $stateParams) {

		$scope.pageConfig = $scope.$root.pageConfig;

		var searchObj = $location.search();
		if(searchObj.page){
			$scope.pageConfig.currentPage = searchObj.page;
		}
		$scope.pageConfig.total = baiVietCaNhanService.total;
		
		$scope.onPageSelected = function(data, page){
			console.log("on page selected", page);
			$location.search({
				page: page,
			});
			baiVietCaNhanService.index($stateParams.username, page, $scope.pageConfig.pageSize);
		};

		$scope.posts = baiVietCaNhanService.posts;
		
		$scope.reload = function(){
			$state.reload();
		};
	}
]);