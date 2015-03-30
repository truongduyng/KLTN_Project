// app.controller('trangCaNhanCtrl', ['$scope', 'Auth', '$modal', 'trangCaNhanService', 
//  '$location','authenUser', function($scope, Auth, $modal, trangCaNhanService, $location, authenUser) {


// 	//User hien dang dc xem thong tin, authenticatedUser la user chung thuc
// 	$scope.currentUser = trangCaNhanService.user;

// 	//Show modal cho chinh sua profile
// 	$scope.showEditProfileModal = function() {

// 		var modalInstance = $modal.open({
// 			templateUrl: 'appJS/trangCaNhan/modals/_editProfile.html',
// 			controller: 'editProfileCtrl',
// 			size: '',
// 			resolve: {
// 				currentUser: function() {
// 					console.log("currentUser in resolve", $scope.currentUser);
// 					return $scope.currentUser;
// 				}
// 			}
// 		});
// 		//Thanh cong thi cap nhat currentUser
// 		modalInstance.result.then(function(updatedUser) {
// 			angular.copy(updatedUser, $scope.currentUser);
// 		});
// 	};

// 	//Show modal cho chinh sua password
// 	$scope.showChangePasswordModal = function() {

// 		var modalInstance = $modal.open({
// 			templateUrl: 'appJS/trangCaNhan/modals/_editPassword.html',
// 			controller: 'editPasswordCtrl',
// 			size: '',
// 		});

// 		modalInstance.result.then(function(updatedUser) {
// 			//angular.copy(updatedUser, $scope.currentUser);
// 		});
// 	};

// 	//Flag de kiem tra trang dc load lan dau
// 	$scope.isInit = true;
// 	//Doi tuong searchObj chung cho tat ca controller con
// 	$scope.searchObj = {};
// 	//Khoi tao module khi load trang
// 	angular.copy($location.search(), $scope.searchObj);
// 	if ($scope.searchObj.module) {
// 		selectModule($scope.searchObj.module);
// 	}
	
// 	//Khi chon thay doi module
// 	$scope.onTabSelect = function(selectedModule) {
// 		//Neu chon tab thi reset page ve null
// 		if(!$scope.isInit){
// 			$scope.searchObj.page = null;
// 		}
// 		$scope.isInit= false;
// 		$scope.searchObj.module = selectedModule;
// 		$location.search($scope.searchObj);
// 		selectModule(selectedModule);
// 	}

// 	//Lua chon module theo ten
// 	function selectModule(moduleName) {
// 		//Neu chuyen module thi reset page ve 1
// 		if (moduleName == 'bai-viet-ca-nhan') {
// 			$scope.isBaiVietCaNhanModule = true;
// 		}
// 		if (moduleName == 'bai-viet-yeu-thich') {
// 			$scope.isBaiVietYeuThichModule = true;
// 		}
// 		if (moduleName == 'thong-bao') {
// 			$scope.isThongBaoModule = true;
// 		}
// 		if (moduleName == 'quan-ly-ve') {
// 			$scope.isQuanLyVeModule = true;
// 		}
// 	};

// 	//User dang chung thuc va dang xem trang ca nhan cua chinh minh hoac ai do
// 	$scope.authenUser = authenUser;
// 	//Kiem tra lieu nguoi dung hien tai co phai dang xem trang ca nhan cua chinh ho hay xem ai do xem trang cua ho
// 	if($scope.authenUser != null && $scope.authenUser._id.$oid == $scope.currentUser._id.$oid){
// 		$scope.permission = {
// 			all: true,
// 		};
// 	}else{
// 		$scope.permission = {
// 			all: false,
// 		};
// 	}
// }]);

app.controller('trangCaNhanCtrl', ['$scope', 'Auth', '$modal', 'trangCaNhanService', 
 '$location','authenUser', function($scope, Auth, $modal, trangCaNhanService, $location, authenUser) {

 	

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
					console.log("currentUser in resolve", $scope.currentUser);
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
		if (moduleName == 'thong-bao') {
			$scope.isThongBaoModule = true;
		}
		if (moduleName == 'quan-ly-ve') {
			$scope.isQuanLyVeModule = true;
		}
	};

	//User dang chung thuc va dang xem trang ca nhan cua chinh minh hoac ai do
	$scope.authenUser = authenUser;
	//Kiem tra lieu nguoi dung hien tai co phai dang xem trang ca nhan cua chinh ho hay xem ai do xem trang cua ho
	if($scope.authenUser != null && $scope.authenUser._id.$oid == $scope.currentUser._id.$oid){
		$scope.permission = {
			all: true,
		};
	}else{
		$scope.permission = {
			all: false,
		};
	}
}]);

//Lam sao de reset page cho phu hop
//Lam sao de lua chon chi nhung trang published
//Xu ly hien thi progressbar
//Doi voi tab thong bao va tab quan ly ve ko can phai resolve truoc vao controller thi moi load