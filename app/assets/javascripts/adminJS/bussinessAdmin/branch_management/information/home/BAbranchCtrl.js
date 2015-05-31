bussinessAdmin.controller('BAbranchCtrl', ['$scope', 'logoFilter', '$location', '$state',
	'BAbranchService', '$modal',
	function($scope, logoFilter, $location, $state, branchService, $modal) {

	// $scope.branches = bussinessService.bussiness.branches;
	// console.log("branches: ", $scope.branches);

	console.log("branch: ", $scope.branch);


	//Su kien khi load map thanh cong
	$scope.$on('mapInitialized', function(event, map) {
		console.log("map.onstate", map.onstate);
		//Do su kien mapInitialized duoc goi trong nhieu nest view con nen phai xem xet cho hop ly ko thoi bi loi
		if(map.onstate != 'home'){
			return;
		}

		var marker = createMarker(map.branch.coordinates[1], map.branch.coordinates[0], "notKnow");
		marker.setMap(map);
		map.setCenter(marker.getPosition());
	});

	function createMarker(lat, lng, image) {
		console.log("lat:", lat);
		var position = new google.maps.LatLng(lat, lng);
		//Gan anh cho html layout cua marker
		$("#customMarker").find('.img-avatar').attr("src", logoFilter(image)).html();
		//Lay html
		var HtmlLayout = $("#customMarker").html();
		console.log("htmlLayout: ", HtmlLayout);
		var marker = new RichMarker({
			position: position,
			flat: true,
			content: HtmlLayout,
		});
		return marker;
	};


	// //cho chinh sua
	// //Khoi tao isEdit mac dinh cho tat ca branch
	// _.each($scope.branches, function(item){
	// 	item.isEdit = false;
	// });
	$scope.branch.isEdit = false;

	//Chinh sua 1 branch
	$scope.onEdit = function(branch){
		//Luu giu ban goc cua branch, neu ma ko save thi phuc hoi lai
		branch.origin = {};
		angular.copy(branch, branch.origin);
		branch.isEdit = true;
	};

	//save branch
	$scope.saveEdittedBranch = function(branch){
		branch.iSaving = true;
		console.log("updated branch: ", branch);
		branchService.update(branch).success(function(){
			branch.isSaving = false;
		});
	};

	//Bo chinh sua 1 branch
	$scope.cancelEdit= function(branch){
		//Phuc hoi lai branch ban dau, do ko save
		angular.copy(branch.origin, branch);
		branch.isEdit = false;
	};

	$scope.onDeleteBranch = function(branch) {
			var modalInstance = $modal.open({
				templateUrl: 'deleteBranchModal.html',
				controller: 'BAdeleteBranchCtrl',
				size: '',
				resolve:{
					branch: [function(){
						return branch;
					}]
				}
			});
			//Thanh cong thi xoa chi nhanh ra khoi hien thi
			modalInstance.result.then(function(branch){
				console.log("Xoa thanh cong chi nhanh: ", branch.name);
				$scope.$root.$broadcast("onDeleteBranchEvent",{
					id: branch._id.$oid,
				});
				$state.go("home");
				
			});
	};

}]);


bussinessAdmin.controller('BAdeleteBranchCtrl',
 ['$scope', 'branch', '$modalInstance', 'BAbranchService',
 function($scope, branch, $modalInstance, branchService) {
	$scope.branch = branch;
	//Xoa chi nhanh
	$scope.deleteBranch = function(){
		branchService.destroy($scope.branch).success(function(){
			 $modalInstance.close(branch);
		});
	};
}]);
