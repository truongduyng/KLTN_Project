app.controller('SAduyetBaiVietCtrl', ['$scope', 'SAduyetBaiVietService', '$modal',
	function($scope, duyetBaiVietService, $modal) {

		$scope.posts = duyetBaiVietService.posts;
		//Cau hinh pagination
		$scope.pageConfig = {};
		angular.copy($scope.$root.rootPageConfig, $scope.pageConfig);
		$scope.pageConfig.total = duyetBaiVietService.total;

		$scope.addedPosts = [];
		initIsChecked();

		$scope.search = function(){
			return duyetBaiVietService.get_posts($scope.text_search, null, null);
		}

		$scope.ontogglePost = function(post) {
			//Neu trang thai la 'Them' thi them no vao ds xem chi tiet
			if (post.isChecked == true) {
				$scope.addedPosts.splice($scope.addedPosts.length, 0, post);
			} else {
				//Neu trang thai la 'Bo' thi xoa no khoi danh sach xem chi tiet
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
					break;
				}
			};
		};

		//Post dc duyet
		$scope.acceptPost = function(post) {
			duyetBaiVietService.accept(post).success(function(data) {
				var index = $scope.addedPosts.indexOf(post);
				$scope.addedPosts.splice(index, 1);
				for (var i = 0; i < $scope.posts.length; i++) {
					if ($scope.posts[i]._id.$oid == post._id.$oid) {
						$scope.posts[i].isChecked = false;
						$scope.posts.splice(i, 1);
						break;
					}
				};
			});
		};

		//Post ko dc duyet, bi tu choi boi admin
		$scope.denyPost = function(post) {
			duyetBaiVietService.deny(post).success(function(data) {
				var index = $scope.addedPosts.indexOf(post);
				$scope.addedPosts.splice(index, 1);
				for (var i = 0; i < $scope.posts.length; i++) {
					if ($scope.posts[i]._id.$oid == post._id.$oid) {
						$scope.posts[i].isChecked = false;
						$scope.posts.splice(i, 1);
						break;
					}
				};
			});
		};

		//Xu ly phan trang
		var request = null;
		$scope.isLoadingPost = false;
		$scope.onPageSelected = function(content, page) {
			//Khi ma co yeu trang moi thi neu co request trong trang cu thi cancel no
			if (request) {
				request.cancel();
			}
			$scope.isLoadingPost = true;
			request = duyetBaiVietService.get_posts(null, page, $scope.pageConfig.pageSize);
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

		//Khoi tao isChecked cho moi post, mac dinh no ko dc them vao ds xem chi tiet
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

		$scope.showImage = function(post, photo) {
			var modalInstance = $modal.open({
				templateUrl: 'angularJSComponents/show_image_modal/show_image_modal.html',
				controller: 'showImageModalCtrl',
				size: 'lg',
				resolve: {
					photo: function() {
						return photo;
					},
					listPhotos: function() {
						return post.photos;
					}
				}
			});
		};
	}
]);
