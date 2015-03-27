app.controller('editPasswordCtrl', ['$scope', 'trangCaNhanService', 'Flash', '$modalInstance', function($scope, trangCaNhanService, Flash, $modalInstance) {

	$scope.changePassword = function() {
		var password = {
			current_password: $scope.currentPassword,
			password: $scope.password,
			password_confirmation: $scope.confirmationPassword,
		};

		console.log("password", password);
		trangCaNhanService.changePassword(password).success(function(data) {
			Flash.create("success", "Thay đổi mật khẩu thành công");
			// $modalInstance.close(data);
		}).error(function(data) {
			Flash.create("danger", "Thay đổi mật khẩu thất bại. Bạn vui lòng thử lại");
		});

		
	};
}]);