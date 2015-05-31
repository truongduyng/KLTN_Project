bussinessAdmin.controller('BAsideBarCtrl', ['$scope', 'BAsideBarService', function ($scope, sideBarService) {
	$scope.isLoadingBranches = true;
	sideBarService.get_list_branches().success(function(data){
		$scope.isLoadingBranches = false;
		console.log("branches in scope:", $scope.branches);
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
}]);