app.controller('baiVietYeuThichCtrl', ['$scope', 'baiVietYeuThichService', '$stateParams', 'Flash', function($scope, baiVietYeuThichService, $stateParams, Flash) {

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

		request = baiVietYeuThichService.get($stateParams.username, null, page, $scope.pageConfig.pageSize);
		request.promise.success(function() {
			$scope.isLoading = false;
		});
	};

	$scope.unfavorite = function(post){
		baiVietYeuThichService.unfavorite(post).success(function(){
			$scope.pageConfig.total = baiVietYeuThichService.total;
			Flash.create('success',"Đã bỏ bài viết " + post.title + " ra khỏi danh sách yêu thích", 'myalert');
		});
	};

	$scope.search_fav = function() {

		$scope.isLoading = true;
			//Huy request neu no chua load xong va tao request moi
			if (request != null) {
				request.cancel("chuyển trang");
			}

			request = baiVietYeuThichService.get($stateParams.username, $scope.textSearch_fav, null, null);
			request.promise.success(function() {
				$scope.isLoading = false;
			});
		};

	}]);