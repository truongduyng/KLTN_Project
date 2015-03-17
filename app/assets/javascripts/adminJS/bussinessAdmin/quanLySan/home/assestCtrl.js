bussinessAdmin.controller('assestCtrl', ['$scope', 'assestService',
 'branchService', 'flash', function($scope, assestService, branchService, flash) {

	
	$scope.showDeleteAssestModal = false;
	$scope.showDeleteAssestCategoryModal = false;
	
	$scope.toogleDeleteAssestModal = function(category, assest){
		assest.showDeleteAssestModal = !assest.showDeleteAssestModal;
		$scope.selectedAssest = assest;
		$scope.currentCategory = category;
	};

	$scope.toogleDeleteAssestCategoryModal = function(){
		$scope.showDeleteAssestCategoryModal = !$scope.showDeleteAssestCategoryModal;	
	};

	$scope.assestsByCategory = assestService.assestsByCategory;

	$scope.deleteAssest = function(){
		assestService.destroy($scope.selectedAssest._id.$oid).success(function(){
			
			$scope.selectedAssest.showDeleteAssestModal = !$scope.selectedAssest.showDeleteAssestModal;
			flash.success = "Đã xóa sân " + $scope.selectedAssest.name;
			
			setTimeout(function(){
				$scope.$apply(function(){
					var index = $scope.currentCategory.assests.indexOf($scope.selectedAssest);
					$scope.currentCategory.assests.splice(index, 1);
					$scope.selectedAssest = null;
					$scope.currentCategory = null;
				});
			}, 500);
			
		}).error(function(){
			flash.error = "Xảy ra lỗi khi xóa sân " + $scope.selectedAssest.name;
			$scope.selectedAssest = null;
			$scope.currentCategory = null;
		});
	};
}]);