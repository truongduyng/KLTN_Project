bussinessAdmin.controller('modalCtrl', ['$scope', 'assetCategoryService', 'feeService', 'Flash', 'branch', function($scope, assetCategoryService, feeService, Flash, branch) {

  $scope.newCategory = {
    fees: [],
  };
  $scope.createAssestCategory = function() {
    console.log({name: $scope.newCategory.name, short_desc: $scope.newCategory.short_desc, branch_id: branch._id.$oid, fees: $scope.newCategory.fees});
    assetCategoryService.create({name: $scope.newCategory.name, short_desc: $scope.newCategory.short_desc, branch_id: branch._id.$oid, fees: $scope.newCategory.fees})
    .success(function() {
      Flash.success = "Thêm mới thành công loại sân: " + $scope.newCategory.name;
      $scope.$close();
    })
    .error(function() {
      Flash.error = "Lỗi xảy ra khi thêm mới loại sân: " + $scope.newCategory.name + ". Vui lòng thử lại";
      $scope.$close();
    });
  };

  $scope.price = null;
  $scope.time_list = "0:00 0:30 1:00 1:30 2:00 2:30 3:00 3:30 4:00 4:30 5:00 5:30 6:00 6:30 7:00 7:30 8:00 8:30 9:00 9:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00 22:30 23:00 23:30".split(" ");
  $scope.begin_time = "12:00";
  $scope.end_time = "12:00";

  $scope.close_modal = function(){
    $scope.$close();
  }

  $scope.addFee = function(){
    $scope.newCategory.fees.push({
      begin_time: $scope.begin_time,
      end_time: $scope.end_time,
      price: $scope.price
    });
    console.log($scope.newCategory.fees);
    $scope.begin_time = "12:00";
    $scope.end_time = "12:00";
    $scope.price = null;
  };

  $scope.removeFee = function(fee){
    var index = $scope.newCategory.fees.indexOf(fee);
    if(index > -1){
      $scope.newCategory.fees.splice(index, 1);
    }
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