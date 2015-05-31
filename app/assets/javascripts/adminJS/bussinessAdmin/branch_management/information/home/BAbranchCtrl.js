bussinessAdmin.controller('BAbranchCtrl', ['$scope', 'logoFilter', '$location', '$state',
	'BAbranchService', '$modal',
	function($scope, logoFilter, $location, $state, branchService, $modal) {

	//Su kien khi load map thanh cong
	$scope.$on('mapInitialized', function(event, map) {
		//Do su kien mapInitialized duoc goi trong nhieu nest view con nen phai xem xet cho hop ly ko thoi bi loi
		if(map.onstate != 'home'){
			return;
		}

		var marker = createMarker(map.branch.coordinates[1], map.branch.coordinates[0], "notKnow");
		marker.setMap(map);
		map.setCenter(marker.getPosition());
	});

	function createMarker(lat, lng, image) {

		var position = new google.maps.LatLng(lat, lng);
		//Gan anh cho html layout cua marker
		$("#customMarker").find('.img-avatar').attr("src", logoFilter(image)).html();
		//Lay html
		var HtmlLayout = $("#customMarker").html();
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
					}],
					branches: [function(){
						return _.without($scope.branches, branch);
					}]
				}
			});
			//Thanh cong thi xoa chi nhanh ra khoi hien thi
			modalInstance.result.then(function(){
				var index = $scope.branches.indexOf(branch);
				$scope.branches.splice(index, 1);
			});
	};

}]);


bussinessAdmin.controller('BAdeleteBranchCtrl',
 ['$scope', 'branch', 'branches', '$modalInstance', 'BAbranchService',
 function($scope, branch, branches, $modalInstance, branchService) {
	$scope.branch = branch;
	//Chuyen ds branches thanh dang name,value cho de hien thi
	$scope.branches = _.map(branches, function(item){
		return {
			name: item.name,
			value: item._id.$oid,
		}
	});
	//Them tuy chon all vao danh sach chon
	$scope.branches.splice($scope.branches.length,0, {
		name: 'Xóa tất cả sân cùng chi nhánh',
		value: 'all',
	});
	//Khoi tao gia tri mac dinh
	$scope.selectedChoice = $scope.branches[0].value;

	//Xoa chi nhanh
	$scope.deleteBranch = function(){
		branchService.destroy($scope.branch, $scope.selectedChoice).success(function(){
			 $modalInstance.close(branch);
		});
	};
}]);
