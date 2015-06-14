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

				$scope.$close();
				$scope.error = "";
				$state.reload();

			}, function() {
				$scope.error = "Email hoac password khong hop le";
			});
		};

		$scope.register = function() {
			Auth.register($scope.user).then(function() {

				$scope.$close();
				$state.reload();

			}, function(e) {
				console.log(e)
				$scope.error = "what error";
			});
		};
	}
	]);


// <<<<<<< HEAD
// app.controller('authCtrl', ['$scope', 'Auth', '$state', '$rootScope', 'Flash',
// 	function($scope, Auth, $state, $rootScope, Flash) {

// 		// console.log("state", $state);
// 		$scope.user = {};

// 		$scope.login = function() {
// 			Auth.login($scope.user).then(function() {
// 				$scope.showLoginModal = false;
// 				$scope.error = "";
// 				$state.reload();
// 				//Neu login truc tiep tren trang, ko dung modal thi tro ve trang home
// 				if ($state.current.name == "login") {
// 					$state.go("home");
// 				}
// 				//Neu sau login can load lai trang (vi du vao 1 trang yeu cau login, thi do event.preventDefault();
// 				//ngan chan hoat dong cua trang nen phai load lai trang)
// 				// if($scope.isRequireReload){
// 				// 	$scope.isRequireReload = false;
// 				// 	$state.reload();
// 				// }
// 			}, function() {
// 				Flash.create("danger", 'Email hoặc password bạn nhập không hợp lệ');
// 			});
// 		};

// 		$scope.register = function() {
// 			Auth.register($scope.user).then(function() {
// 				console.log("on register succesfully");
// 				$scope.showRegisterModal = false;
// 				if ($state.current.name == "register") {
// 					$state.go("home");
// 				}
// 			}, function() {
// 				Flash.create("danger", 'Lỗi xảy ra, bạn vui lòng thử lại');
// 			});
// 		};

// 		$scope.showLoginModal = false;
// 		$scope.showRegisterModal = false;

// 		$rootScope.$on('onLogin', function(event) {
// 			$scope.showLoginModal = true;
// 		});

// 		$rootScope.$on('onRegister', function(event) {
// 			$scope.showRegisterModal = true;
// 		});

// 		$scope.toRegister = function() {
// 			$scope.showLoginModal = false;
// 			$scope.showRegisterModal = true;
// 		};

// 		$scope.toLogin = function() {
// 			$scope.showLoginModal = true;
// 			$scope.showRegisterModal = false;
// 		};

// 		//Cho nhung hoat dong yeu cau login, do hoat dong nen ko can phai reload page
// 		$rootScope.$on('onRequireLogin', function() {
// 			$scope.showLoginModal = true;
// 			$scope.isRequireReload = true;
// 			Flash.create("info", 'Bạn cần đăng nhập để thực hiện chức năng này');
// 		});



// 		// //Cho nhung trang yeu cau login
// 		// $rootScope.$on('onRequireLoginWithReload', function(event){
// 		// 	//console.log(stateName);
// 		// 	$scope.showLoginModal = true;
// 		// 	//Bien de xet co can reload page hay ko
// 		// 	$scope.isRequireReload = true;
// 		// 	Flash.create("info", 'Bạn cần đăng nhập để thực hiện chức năng này');
// 		// });

// 	}
// ]);

