app.controller('authCtrl', ['$scope', 'Auth', '$state', '$rootScope', 'Flash',
	function($scope, Auth, $state, $rootScope, Flash) {


		$scope.user = {};
		$scope.login = function() {
			console.log("on login");
			Auth.login($scope.user).then(function() {
				$scope.showLoginModal = false;
				$scope.error = "";
			}, function() {
				Flash.create("danger", 'Email hoặc password bạn nhập không hợp lệ');
			});
		};

		$scope.register = function() {
			Auth.register($scope.user).then(function() {
				console.log("on register succesfully");
				$scope.showRegisterModal = false;
			}, function() {
				Flash.create("danger",'Lỗi xảy ra, bạn vui lòng thử lại');
			});
		};

		$scope.showLoginModal = false;
		$scope.showRegisterModal = false;
		
		$rootScope.$on('onLogin', function(event){
			$scope.showLoginModal = true;
		});

		$rootScope.$on('onRegister', function(event){
			$scope.showRegisterModal = true;
		});

		$scope.toRegister = function(){
				$scope.showLoginModal = false;
			    $scope.showRegisterModal = true;
		};
		
		$scope.toLogin = function(){
				$scope.showLoginModal = true;
			    $scope.showRegisterModal = false;
		};

		//Cho nhung hoat dong yeu cau login
		$rootScope.$on('onRequireLogin', function(){
			$scope.showLoginModal = true;
			Flash.create("info", 'Bạn cần đăng nhập để thực hiện chức năng này');
		});



	}
]);