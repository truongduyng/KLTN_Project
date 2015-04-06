bussinessAdmin.controller('BAbranchCtrl', ['$scope', 'bussinessService', 'logoFilter', '$location', '$state', 
	'BAbranchService',
	function($scope, bussinessService, logoFilter, $location, $state, branchService) {
	$scope.branches = bussinessService.bussiness.branches;
	console.log("branches: ", $scope.branches);

	//Su kien khi load map thanh cong
	$scope.$on('mapInitialized', function(event, map) {
		console.log("map.onstate", map.onstate);
		//Do su kien mapInitialized duoc goi trong nhieu nest view con nen phai xem xet cho hop ly ko thoi bi loi
		if(map.onstate != 'home'){
			return;
		}
		var marker = createMarker(map.branch.latitude, map.branch.longitude, $scope.bussiness.user.avatar.url);
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


	//cho chinh sua
	//Khoi tao isEdit mac dinh cho tat ca branch
	_.each($scope.branches, function(item){
		item.isEdit = false;
	});

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
	}
}]);