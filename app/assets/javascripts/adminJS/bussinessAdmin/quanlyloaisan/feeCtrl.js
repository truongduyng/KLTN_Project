bussinessAdmin.controller('feeCtrl', ['$scope', function ($scope) {

	$scope.price = 0;
	$scope.begin_time = "12:00am";
	$scope.end_time = "12:00am";

	$scope.addFee = function(){
			if($scope.newCategory.fees == null){
				$scope.newCategory.fees = [];
			}
			$scope.newCategory.fees.push({
				begin_time: $scope.begin_time,
				end_time: $scope.end_time,
				price: $scope.price
			});
	        console.log($scope.newCategory.fees);
			$scope.begin_time = "12:00am";
			$scope.end_time = "12:00am";
			$scope.price = 0;

	};	

	$scope.removeFee = function(fee){
		var index = $scope.newCategory.fees.indexOf(fee);
		if(index > -1){
			$scope.newCategory.fees.splice(index, 1);
		}
	};

}]);