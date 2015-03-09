app.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	$scope.message = "This is message";
	$http.get("/check/trungnguyenhuu.json")
		.succcess(function(data, status){
			alert("Ok");
		})
		.error(function(data, static){
			alert("error");
		});

}]);