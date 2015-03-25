//5510dcd56875751cdb030000
app.controller('chiTietBaiVietCtrl', ['$scope', 'postDetailService', 'Flash',
	'currentUser', 'userService', '$state', '$modal',
	function($scope, postDetailService, Flash, currentUser, userService, $state, $modal) {

		angular.copy(currentUser, userService.currentUser);

		$scope.currentUser = userService.currentUser;
		$scope.post = postDetailService.post;


		//Update tinh trang user de xet cac quyen them xoa sua
		$scope.$on('devise:new-session', function(e, user) {
			angular.copy(user, userService.currentUser);
			$state.reload();
		});

		$scope.$on('devise:new-registration', function(e, user) {
			angular.copy(user, userService.currentUser);
			$state.reload();
		});

		$scope.$on('devise:login', function(e, user) {
			angular.copy(user, userService.currentUser);
			$state.reload();
		});

		$scope.$on('devise:logout', function(e, user) {
			angular.copy({}, userService.currentUser);
		});


		$scope.likePost = function() {
			postDetailService.like().success(function() {
				$scope.post.isLiked = true;
			});
		};

		$scope.unlikePost = function() {
			postDetailService.unlike().success(function() {
				$scope.post.isLiked = false;
			});
		};


		$scope.showImage = function(photo) {
			var modalInstance = $modal.open({
				templateUrl: 'showImageModal.html',
				controller: 'showImageModalCtrl',
				size: 'lg',
				resolve: {
					photo: function() {
						return photo;
					},
					listPhotos: function() {
						return $scope.post.photos;
					}
				}
			});

		};
	}
]);


//Cho modal show anh
app.controller('showImageModalCtrl', ['$scope', 'listPhotos', 'photo', '$interval',
	function($scope, listPhotos, photo, $interval) {
		$scope.listPhotos = listPhotos;
		$scope.photo = photo;
		var currentIndex = $scope.listPhotos.indexOf(photo);

		$scope.previous = function() {
			console.log("in previous");
			if (currentIndex >= 1) {
				currentIndex--;
			} else {
				currentIndex = $scope.listPhotos.length - 1;
			}
			$scope.photo = $scope.listPhotos[currentIndex];
		};

		$scope.next = function() {
			
			if (currentIndex < $scope.listPhotos.length - 1) {
				currentIndex++;
			} else {
				currentIndex = 0;
			}
			$scope.photo = $scope.listPhotos[currentIndex];
		};

	}
]);
//Xu ly truong hop vao chi tiet bai viet ma bai viet do chua dc duyet hay chua dc publish