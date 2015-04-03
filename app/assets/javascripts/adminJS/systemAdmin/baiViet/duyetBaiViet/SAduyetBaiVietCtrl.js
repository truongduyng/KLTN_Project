app.controller('SAduyetBaiVietCtrl', ['$scope', 'SAduyetBaiVietService',
	function($scope, duyetBaiVietService) {
		
		$scope.posts = duyetBaiVietService.posts;
		//Cau hinh pagination
		$scope.pageConfig = {};
		angular.copy($scope.$root.rootPageConfig, $scope.pageConfig);
		$scope.pageConfig.total = duyetBaiVietService.total;

		$scope.addedPosts = [];
		$scope.posts.forEach(function(post) {
			post.isChecked = false;
		});

		$scope.onAddPost = function(post) {
			// console.log(post);
			// console.log("isChecked:", post.isChecked, "title:", post.title);
			if (post.isChecked == true) {
				$scope.addedPosts.splice($scope.addedPosts.length, 0, post);
			} else {
				var index = $scope.addedPosts.indexOf(post);
				$scope.addedPosts.splice(index, 1);
			}
		};

		$scope.onIgnore = function(post) {
			console.log("bo qua click");
			post.isChecked = false;
			var index = $scope.addedPosts.indexOf(post);
			$scope.addedPosts.splice(index, 1);
		};

		$scope.acceptPost = function(post){
			duyetBaiVietService.accept(post).success(function(data){
				var index = $scope.addedPosts.indexOf(post);
				$scope.addedPosts.splice(index, 1);
			});
		};

		$scope.denyPost = function(post){
			duyetBaiVietService.deny(post).success(function(data){
				var index = $scope.addedPosts.indexOf(post);
				$scope.addedPosts.splice(index, 1);
			});
		};

		var request = null;
		$scope.isLoadingPost = false;
		$scope.onPageSelected = function(content, page){
			if(request){
				request.cancel();
			}
			$scope.isLoadingPost = true;
			request = duyetBaiVietService.get_posts(page, $scope.pageConfig.pageSize);
			request.promise.success(function(){
				$scope.isLoadingPost = false;
			}).error(function(){
				// $scope.isLoadingPost = false;
			});
		};


	}
]);