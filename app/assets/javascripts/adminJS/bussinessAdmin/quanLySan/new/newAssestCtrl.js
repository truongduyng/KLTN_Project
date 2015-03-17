bussinessAdmin.controller('newAssestCtrl'
	, ['$scope', 'assestService', 'branches', 'categories', '$state', 'flash'
	, function ($scope, assestService, branches, categories, $state, flash) {
		console.log("in newAssestCtrl");
		
		if(categories == null || categories.length <= 0){
			flash.error = "Bạn vui lòng thêm loại sân trước";
			$state.go("quanlyloaisan");
		}

		$scope.branches = branches;
		$scope.categories = categories;
		
		$scope.assest = {
			branch_id: $scope.branches[0]._id.$oid,
			assest_category_id: $scope.categories[0]._id.$oid,
		};

		$scope.selectedCategory = $scope.categories[0];

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
			assestService.create($scope.assest).success(function(){
				flash.success = "Thêm mới thành công " + $scope.assest.name;
				$state.go("quanLySan");
			})
			.error(function(){
				flash.error = "Thêm mới thất bại " + $scope.assest.name;
				$state.go("quanLySan");
			});
		};
		$scope.goBack = function(){
			$state.go("quanLySan");
		};

		
}]);