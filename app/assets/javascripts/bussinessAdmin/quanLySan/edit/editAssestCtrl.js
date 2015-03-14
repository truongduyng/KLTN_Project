bussinessAdmin.controller('editAssestCtrl', ['$scope', 'assestService', 'assest', 'branches', 'categories',
 '$state', 'flash', function($scope, assestService, assest, branches, categories, $state, flash) {
	$scope.assest = assest;
	$scope.branches = branches;
	$scope.categories = categories;

	
	$scope.$watch('assest.assest_category_id', function(newValue, oldValue, scope) {
		$scope.categories.forEach(function(category){
			if(category._id.$oid == newValue){
				$scope.selectedCategory = category;
				return;
			}
		});
	});

	$scope.save = function(){
		console.log($scope.assest);
		assestService.update($scope.assest)
		.success(function(){
			flash.success = "Cập nhật thành công " + $scope.assest.name;
			$state.go("quanLySan");
		})
		.error(function(){
			flash.error = "Cập nhật thất bại " + $scope.assest.name;
			$state.go("quanLySan");
		});
	};

	$scope.goBack = function(){
		$state.go("quanLySan");
	};


}]);