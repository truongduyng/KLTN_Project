app.controller('SAduyetBaiVietCtrl', ['$scope', 'SAduyetBaiVietService',
	function($scope, duyetBaiVietService) {

		$scope.posts = duyetBaiVietService.posts;
		//Cau hinh pagination
		$scope.pageConfig = {};
		angular.copy($scope.$root.rootPageConfig, $scope.pageConfig);
		$scope.pageConfig.total = duyetBaiVietService.total;

		$scope.addedPosts = [];
		initIsChecked();

		$scope.onAddPost = function(post) {
			// console.log(post);
			// console.log("isChecked:", post.isChecked, "title:", post.title);
			if (post.isChecked == true) {
				$scope.addedPosts.splice($scope.addedPosts.length, 0, post);
			} else {
				removePostFromAddedPosts(post);
			}
		};

		$scope.onIgnore = function(post) {
			removePostFromAddedPosts(post);
			// post.isChecked = false;
			//Do moi thu load theo phan trang nen ko cung doi tuong, do do phai tim no theo id
			for (var i = 0; i < $scope.posts.length; i++) {
				if ($scope.posts[i]._id.$oid == post._id.$oid) {
					$scope.posts[i].isChecked = false;
					console.log("title: ", $scope.posts[i].title);
					break;
				}
			};
		};


		$scope.acceptPost = function(post) {
			duyetBaiVietService.accept(post).success(function(data) {
				var index = $scope.addedPosts.indexOf(post);
				$scope.addedPosts.splice(index, 1);
				// //Duyet het tat ca post trong 1 trang, thi giam so trang xuong boi 1
				// if($scope.posts.length == 0){
				// 	$scope.pageConfig.total = $scope.pageConfig.total - $scope.pageConfig.pageSize;
				// 	$scope.pageConfig.currentPage--;
				// }
			});
		};

		$scope.denyPost = function(post) {
			duyetBaiVietService.deny(post).success(function(data) {
				var index = $scope.addedPosts.indexOf(post);
				$scope.addedPosts.splice(index, 1);
			});
		};

		var request = null;
		$scope.isLoadingPost = false;
		$scope.onPageSelected = function(content, page) {
			if (request) {
				request.cancel();
			}
			$scope.isLoadingPost = true;
			request = duyetBaiVietService.get_posts(page, $scope.pageConfig.pageSize);
			request.promise.success(function() {
				$scope.isLoadingPost = false;
				//Duyet kiem tra thu nhung post moi load, post nao da co trong addedPost
				initIsChecked();
				$scope.posts.forEach(function(post) {
					for (var i = 0; i < $scope.addedPosts.length; i++) {
						if ($scope.addedPosts[i]._id.$oid == post._id.$oid) {
							post.isChecked = true;
							break;
						}
					}
				});
				//Do khi duyet so bai viet da dc duyet co the giam nen phai gan lai total
				$scope.pageConfig.total = duyetBaiVietService.total;
			}).error(function() {
				// $scope.isLoadingPost = false;
			});
		};

		function initIsChecked() {
			$scope.posts.forEach(function(post) {
				post.isChecked = false;
			});
		}

		//Giup loai bo nhung post da them trong danh sach addedPost chinh xac dua vao id
		function removePostFromAddedPosts(post) {
			var index = -1;
			for (var i = 0; i < $scope.addedPosts.length; i++) {
				if ($scope.addedPosts[i]._id.$oid == post._id.$oid) {
					index = i;
					break;
				}
			}
			$scope.addedPosts.splice(index, 1);
		};
	}
]);