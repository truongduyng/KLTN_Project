app.controller('editProfileCtrl', ['$scope', 'currentUser', 'trangCaNhanService', '$modalInstance',
	function($scope, currentUser, trangCaNhanService, $modalInstance) {
		$scope.user = {};
		$scope.gender = ["Nam", 'Nữ'];
		angular.copy(currentUser, $scope.user);
		console.log("in editProfileCtrl", $scope.user);

		$scope.update = function() {
			trangCaNhanService.editProfile($scope.user).success(function(data) {
				$scope.$root.$broadcast("onChangeUserProfile", data);
				$modalInstance.close(data);
			});
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}
]);

//Con loi cho chon nam nu ko dc, uc che, server hinh nhu cung bi loi