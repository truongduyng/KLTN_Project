app.controller('navCtrl', ['$scope', 'Auth', '$http', function($scope, Auth, $http) {
	$scope.signedIn = Auth.isAuthenticated;
	$scope.logout = Auth.logout;

	Auth.currentUser()
		.then(function(user) {
			$scope.user = user;
		}, function(error) {
			console.log("My error");
			console.log(error);
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

	$scope.onTestClick = function(){
		// $http.post("/check/trungnguyen1huu.json",{}, {
		// 	params: {
		// 		firstname: 'trung',
		// 		lastname: 'huu',
		// 		email: 'trung_nh93@yahoo.com'
		// 	}
		// }).success(function(data, status, header, config) {
		// 	alert(data.isUnique + ", " + status);
		// }).error(function(data, static) {
		// 	alert("error");
		// });
		
		
		// $http({
		// 	method: 'PUT',
		// 	url: '/check/trungnguyen1huu.json',
		// 	data:{
		// 		firstname: 'trung',
		// 		lastname: 'huu',
		// 		email: 'trung_nh93@yahoo.com'
		// 	}
		// });

		// $http({
		// 	method: 'PUT',
		// 	url: '/check/trungnguyen1huu.json',
		// 	data: {userss: {
		// 		hi: {
		// 			user:{
		// 				name: 'trung',
		// 				age: 21,
		// 			},

		// 		},
		// 		age: 10,
		// 	}
		// 	}
		// });
	};

}]);