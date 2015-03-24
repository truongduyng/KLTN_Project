app.controller('navCtrl', ['$scope', 'Auth', '$http', function($scope, Auth, $http) {
	$scope.signedIn = Auth.isAuthenticated;
	$scope.logout = Auth.logout;

	Auth.currentUser()
		.then(function(user) {
			$scope.user = user;
		}, function(error) {
	});

	$scope.$on('devise:new-session', function(e, user) {
		$scope.user = user;
	});

	$scope.$on('devise:new-registration', function(e, user) {
		$scope.user = user;
	});

	$scope.$on('devise:login', function(e, user) {
		$scope.user = user;
	});

	$scope.$on('devise:logout', function(e, user) {
		$scope.user = {};
	});

	$scope.onLogin = function(){
		console.log("on Login");
		$scope.$emit("onLogin");
	};
	
	$scope.onRegister = function(){
		console.log("on register");
		$scope.$emit("onRegister");
	};

	
	

}]);