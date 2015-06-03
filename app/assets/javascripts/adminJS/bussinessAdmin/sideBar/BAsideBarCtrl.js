bussinessAdmin.controller('BAsideBarCtrl', ['$scope', 'BAsideBarService', function ($scope, sideBarService) {
	$scope.isLoadingBranches = true;
	sideBarService.get_list_branches().success(function(data){
		$scope.isLoadingBranches = false;
	});
	$scope.branches = sideBarService.branches;


	//Lang nghe su kien khi branch bi delete
	$scope.$on('onDeleteBranchEvent', function(event, data){
		// console.log("onDeleteBranchEvent in sidebar");
		// console.log("data: ", data);
		_.find($scope.branches, function(item, index){
			console.log("item: ", item);
			if(item._id.$oid == data.id){
				$scope.branches.splice(index, 1);
				return true;
			}
		});
	});

	//Lang nghe su kien khi them moi 1 branch
	$scope.$on('onAddNewBranchEvent', function(event, data){
		console.log("data in onAddNewBranchEvent: ", data);
		$scope.branches.splice($scope.branches.length, 0, data);
	});
}]);