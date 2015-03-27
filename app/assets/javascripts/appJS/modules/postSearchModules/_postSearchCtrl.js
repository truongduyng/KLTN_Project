app.controller('postSearchCtrl', ['$scope', function ($scope) {
	$scope.message = "this is message";
	$scope.onClick = function(){
		console.log("you are searching");
		$scope.message = "clicked";
	};


}]);