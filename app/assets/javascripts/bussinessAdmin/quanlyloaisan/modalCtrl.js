bussinessAdmin.controller('modalCtrl', ['$scope', 
	'assestCategoryService',
	 'feeService', function($scope, assestCategoryService, feeService) {
	
	$scope.showDeleteCategoryModal = false;
	$scope.showAddPriceModal = false;
	$scope.showDeletePriceModel = false;
	$scope.toogleModalDeleteCategory = function() {
		$scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
	};

	$scope.toogleAddPriceModel = function(category) {
		$scope.showAddPriceModal = !$scope.showAddPriceModal;
		$scope.selectedCategory = category;
	};

	$scope.toogleDeletePriceModal = function(category, fee) {
		$scope.selectedFee = fee;
		$scope.selectedCategory = category;
		$scope.showDeletePriceModel = !$scope.showDeletePriceModel;
	};

	//Cho modal delete price
	$scope.deletePrice = function() {
		if ($scope.selectedFee == null || $scope.selectedCategory == null) {
			return;
		}
		var fee = $scope.selectedFee;
		var category = $scope.selectedCategory;
		feeService.destroy(category._id.$oid, fee._id.$oid)
			.success(function() {
				var index = category.fees.indexOf(fee);
				category.fees.splice(index, 1);
				$scope.selectedCategory = null;
				$scope.selectedFee = null;
				$scope.showDeletePriceModel = !$scope.showDeletePriceModel;
			})
			.error(function() {
				$scope.showDeletePriceModel = !$scope.showDeletePriceModel;
			});
	};

	$scope.cancelDeletePrice = function() {
		$scope.showDeletePriceModel = !$scope.showDeletePriceModel;
	};
	//end Cho modal delete price

	//Cho modal them gia
	$scope.addPrice = function() {
		var category = $scope.selectedCategory;
		var newFee = $scope.newFee;
		if (category == null) {
			return;
		}
		feeService
			.create(category._id.$oid, newFee)
			.success(function(data) {
				if (category.fees == null) {
					category.fees = [];
				}
				category.fees.push(data);
				//reset data
				$scope.newFee.begin_time = "12:00am";
				$scope.newFee.end_time = "12:00am";
				$scope.newFee.price = 0;
				$scope.showAddPriceModal = !$scope.showAddPriceModal;
			})
			.error(function() {
				$scope.showAddPriceModal = !$scope.showAddPriceModal;
			});
	};
	//end Cho modal them gia
}]);