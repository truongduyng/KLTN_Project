bussinessAdmin.controller('homeCtrl', ['$scope', '$http', 'bussinessService', 'user'
	, function($scope, $http, bussinessService, user) {

	//Persisted information
	$scope.user = user;
	$scope.user.bussiness = bussinessService.bussiness;

	//bussiness for edit
	$scope.bussiness = {};
	angular.copy(bussinessService.bussiness, $scope.bussiness);

	//Function
	$scope.editBussiness = function() {
		console.log("call editBussiness functions");
		bussinessService.update($scope.bussiness)
			.then(function(response) {
				angular.copy(bussinessService.bussiness, $scope.bussiness);
				$scope.$broadcast("event:onTabChange", 'profile');
				$('html, body').animate({
					scrollTop: $("#informationPos").offset().top
				});

				console.log(response);
			}, function(error) {
				console.log(error);
			});


	};

	$scope.clear = function(){
		//Clear du lieu
		console.log("on clear");
		angular.copy(bussinessService.bussiness, $scope.bussiness);
		$('html, body').animate({
					scrollTop: $("#informationPos").offset().top
				});
	};


}]);