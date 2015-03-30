app.controller('trangCaNhanCtrl', ['$scope', 'Auth', '$modal', 'trangCaNhanService'
	, function($scope, Auth, $modal, trangCaNhanService) {

	
	//User hien dang dc xem thong tin, authenticatedUser la user chung thuc
	$scope.currentUser = trangCaNhanService.user;
	console.log("currentUser", $scope.currentUser);
	
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

	$scope.showChangePasswordModal = function(){

		var modalInstance = $modal.open({
			templateUrl: 'appJS/trangCaNhan/modals/_editPassword.html',
			controller: 'editPasswordCtrl',
			size: '',
		});
		
		modalInstance.result.then(function(updatedUser) {
			//angular.copy(updatedUser, $scope.currentUser);
		});
	};
}]);