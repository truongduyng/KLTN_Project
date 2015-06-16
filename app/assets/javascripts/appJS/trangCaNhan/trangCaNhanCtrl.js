app.controller('trangCaNhanCtrl', ['$scope', 'Auth', '$modal', 'trangCaNhanService',
	'$location', 'authenUser', 'FileUploader', '$cookies',
	function($scope, Auth, $modal, trangCaNhanService, $location, authenUser, FileUploader, $cookies) {
		//User hien dang dc xem thong tin, authenticatedUser la user chung thuc
		$scope.currentUser = trangCaNhanService.user;
		//Show modal cho chinh sua profile
		$scope.showEditProfileModal = function() {

			var modalInstance = $modal.open({
				templateUrl: 'appJS/trangCaNhan/modals/_editProfile.html',
				controller: 'editProfileCtrl',
				size: '',
				resolve: {
					currentUser: function() {
						return $scope.currentUser;
					}
				}
			});
			//Thanh cong thi cap nhat currentUser
			modalInstance.result.then(function(updatedUser) {
				angular.copy(updatedUser, $scope.currentUser);
			});
		};

		//Show modal cho chinh sua password
		$scope.showChangePasswordModal = function() {

			var modalInstance = $modal.open({
				templateUrl: 'appJS/trangCaNhan/modals/_editPassword.html',
				controller: 'editPasswordCtrl',
				size: '',
			});

			modalInstance.result.then(function(updatedUser) {
				//angular.copy(updatedUser, $scope.currentUser);
			});
		};


		//Khi chon thay doi module
		$scope.onTabSelect = function(selectedModule) {
			selectModule(selectedModule);
		}

		//Lua chon module theo ten
		function selectModule(moduleName) {
			//Neu chuyen module thi reset page ve 1
			if (moduleName == 'bai-viet-ca-nhan') {
				$scope.isBaiVietCaNhanModule = true;
			}
			if (moduleName == 'bai-viet-yeu-thich') {
				$scope.isBaiVietYeuThichModule = true;
			}
		};

		//User dang chung thuc va dang xem trang ca nhan cua chinh minh hoac ai do
		$scope.authenUser = authenUser;
		//Kiem tra lieu nguoi dung hien tai co phai dang xem trang ca nhan cua chinh ho hay xem ai do xem trang cua ho
		if ($scope.authenUser != null && $scope.authenUser._id.$oid == $scope.currentUser._id.$oid) {
			$scope.permission = {
				all: true,
			};
		} else {
			$scope.permission = {
				all: false,
			};
		}

		//Cho modal upload avatar
		$scope.showChangeAvatarModal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'appJS/trangCaNhan/modals/_changeAvatar.html',
				controller: 'changeAvatarCtrl',
				size: '',
			});

			modalInstance.result.then(function(updatedUser) {
				angular.copy(updatedUser, $scope.currentUser);
				$scope.currentUser.avatar = null;
				$scope.currentUser.avatar = updatedUser.avatar;
			});
		};

	}
]);
