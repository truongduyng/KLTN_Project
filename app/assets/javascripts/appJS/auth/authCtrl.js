app.controller('authCtrl', ['$scope', 'Auth', '$state', '$modal', '$rootScope', 'Flash', 'userService', function($scope, Auth, $state, $modal, $rootScope, Flash, userService) {

		$scope.user = {};

		$scope.close_modal = function() {
			$scope.$close();
		};

		$scope.open_signup_onsignin = function() {
			$scope.close_modal();
			$scope.open_signup();
		};

		$scope.login = function() {
			Auth.login($scope.user).then(function(user) {

				$scope.close_modal();
				userService.currentUser = user;
				$state.reload();

			}, function() {
				$scope.error = "Email hoặc mật khẩu không đúng. Vui lòng thử lại!";
			});
		};

		$scope.register = function() {
			Auth.register($scope.user).then(function() {

				$scope.close_modal();
				userService.currentUser = user;
				$state.reload();

			}, function(e) {
				$scope.error = "what error";
			});
		};
	}
	]);
