app.controller('authCtrl', ['$scope', 'Auth', '$state', '$modal', '$rootScope', 'Flash',
	function($scope, Auth, $state, $modal, $rootScope, Flash) {

		$scope.user = {};

		$scope.close_modal = function() {
			$scope.$close();
		};

		$scope.open_signup_onsignin = function() {
			$scope.close_modal();
			$scope.open_signup();
		};

		$scope.login = function() {
			Auth.login($scope.user).then(function() {

				$scope.close_modal();
				$scope.error = "";
				$state.reload();

			}, function() {
				$scope.error = "Email hoặc mật khẩu không đúng. Vui lòng thử lại!";
			});
		};

		$scope.register = function() {
			Auth.register($scope.user).then(function() {

				$scope.close_modal();
				$state.reload();

			}, function(e) {
				$scope.error = "what error";
			});
		};
	}
	]);
