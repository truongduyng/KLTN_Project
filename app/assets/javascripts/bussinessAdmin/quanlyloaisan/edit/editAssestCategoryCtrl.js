bussinessAdmin.controller('editAssestCategoryCtrl', 
	['$scope', '$state', 'assestCategoryService', 'assestCategory'
	, function ($scope, $state, assestCategoryService, assestCategory) {
		$scope.newCategory = assestCategory;

		$scope.updateAssestCategory = function(){
			assestCategoryService
				.update($scope.newCategory)
				.then(function(){
					$state.go("quanlyloaisan");
				});
		};


		$scope.goBack = function(){
			$state.go("quanlyloaisan");
		};
}]);