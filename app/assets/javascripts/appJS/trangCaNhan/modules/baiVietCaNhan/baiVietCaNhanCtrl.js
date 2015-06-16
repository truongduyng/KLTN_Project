app.controller('baiVietCaNhanCtrl', ['$scope', 'baiVietCaNhanService', '$state', '$location', '$stateParams', '$anchorScroll', 'Flash',
	function($scope, baiVietCaNhanService, $state, $location, $stateParams, $anchorScroll, Flash) {


		$scope.pageConfig = {};
		//Lay cau hinh page tu rootScope
		angular.copy($scope.$root.rootPageConfig, $scope.pageConfig);
		$scope.pageConfig.total = baiVietCaNhanService.total;
		$scope.posts = baiVietCaNhanService.posts;
		var request = null;

		$scope.onPageSelected = function(data, page) {

			$scope.posts.splice(0, $scope.posts.length);
			$scope.isLoading = true;
			//Huy request neu no chua load xong va tao request moi
			if (request != null) {
				request.cancel("chuyển trang");
			}

			request = baiVietCaNhanService.index($stateParams.username, page, $scope.pageConfig.pageSize);
			request.promise.success(function() {
				$scope.isLoading = false;
			});
		};


		//Xoa bai viet
		$scope.deletePost =function(post){
			baiVietCaNhanService.deletePost(post).success(function(){
				Flash.create('success', "Bạn đã xóa bài viết thành công", 'myalert');
				$scope.pageConfig.total = baiVietCaNhanService.total;
			}).error(function(){
				Flash.create('danger', "Lỗi xảy ra khi xóa bài viết, bạn vui lòng thử lại", 'myalert');
			});
		};

		//Tim kiem (cai dat sau)
		$scope.searchType = 'Tên bài viết';
		$scope.search = function() {
			console.log("in search.", $scope.textSearch, $scope.searchType);
			if (request != null) {
				request.cancel("chuyển trang");
			}
			if ($scope.searchType == 'Hiển thị tất cả') {
				$scope.posts.splice(0, $scope.posts.length);
				$scope.isLoading = true;
				$scope.pageConfig.currentPage = 1;
				request = baiVietCaNhanService.index($stateParams.username, 1, $scope.pageConfig.pageSize);
				request.promise.success(function() {
					$scope.isLoading = false;
				});
			}
		};

	}
]);