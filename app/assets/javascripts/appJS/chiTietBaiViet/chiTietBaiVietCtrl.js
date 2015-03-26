//5510dcd56875751cdb030000
app.controller('chiTietBaiVietCtrl', ['$scope', 'postDetailService', 'Flash',
	'currentUser', 'userService', '$state', '$modal', '$rootScope',
	function($scope, postDetailService, Flash, currentUser, userService, $state, $modal, $rootScope) {


	$rootScope.$on('$stateChangeStart', function() {
		console.log('showImageModalCtrl routeChangeStart');
	});
	$rootScope.$on('$stateChangeSuccess', function() {
		console.log('showImageModalCtrl stateChangeSuccess');
	});


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
		
		$scope.likesHtml = "<p>Đang tải...</p>";
		$scope.getKFirstLikes = function(){
			$scope.likesHtml = "<p>Đang tải...</p>";
			//Tai du lieu khi chua tai
			postDetailService.getKFirstLike(5).success(function(){
				//Tao ra html de hien thi nhieu nhat la 5 nguoi va so luong nguoi khac
				var likesHtmlTmp ="";
				$scope.post.likes.forEach(function(like){
					var p = "<p class='text-tooltip'>" + like.user.username  + "</p>";
					likesHtmlTmp = likesHtmlTmp + p;
				});
				if($scope.post.number_of_remains >= 1){
					likesHtmlTmp = likesHtmlTmp + 'và ' +   $scope.post.number_of_remains + " người khác";
				}
				$scope.likesHtml = likesHtmlTmp;
			});
		};


		///Hien thi modal show like cua post
		$scope.showAllLikes = function() {
			var modalInstance = $modal.open({
				templateUrl: 'showAllLikesModal.html',
				controller: 'showAllLikesCtrl',
				size: '',
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




app.controller('showAllLikesCtrl', ['$scope', 'postDetailService', function($scope, postDetailService) {
	
	$scope.isLoading = true;
	postDetailService.getAllLikes().success(function(data){
		$scope.allLikes = data;
		$scope.isLoading = false;

	}).error(function(data){
		$scope.isLoading = false;
	});
}]);


//Xu ly truong hop vao chi tiet bai viet ma bai viet do chua dc duyet hay chua dc publish
//Lay 5 ket qua dau tien va so luong
//Dugn filter dua vao danh sach likes, so luong like con lai va chuyen no thanh html de tai su dung code
//De hien thi tat ca like thi them thuoc tinh all like vao post va load no trong resolve cua modal
//Lam directive cho onerror cua anh va chuyen no thanh anh placeholder tuong ung (avater thi thanh logo cua sporta, anh khac hien thi anh bi hong ma dep)
//tooltip dismiss after display


//HIen thi tat ca like
//Hien thi times ago
//Cho phep chi nguoi so huu truy cap
//Cho phep chinh sua
//Hien thi dung phan khi chua publish