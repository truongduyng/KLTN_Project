bussinessAdmin.controller('editAssestCategoryCtrl', 
	['$scope', '$state', 'assestCategoryService', 'assestCategory', 'flash'
	, function ($scope, $state, assestCategoryService, assestCategory, flash) {
		$scope.newCategory = assestCategory;

		$scope.updateAssestCategory = function(){
			assestCategoryService
				.update($scope.newCategory)
				.success(function(){
					flash.success = "Cập nhật thành công loại sân: " + $scope.newCategory.name;
					$state.go("quanlyloaisan");
				})
				.error(function(){
					flash.error = "Lỗi xảy ra khi cập nhật loại sân: " + $scope.newCategory.name + ". Vui lòng thử lại";
					$state.go("quanlyloaisan");
				});
		};


		$scope.goBack = function(){
			$state.go("quanlyloaisan");
		};
}]);