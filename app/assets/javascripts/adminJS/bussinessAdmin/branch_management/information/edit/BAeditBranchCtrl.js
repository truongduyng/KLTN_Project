bussinessAdmin.controller('BAeditBranchCtrl', ['$scope', 'geocodingService', 'logoFilter',
	'BAbranchService', '$state',
 function($scope, geocodingService, logoFilter, branchService, $state) {
	//Dia chi cho tim kiem vi tri
	$scope.address = "";
	
	//Gan form vao scope hien tai
	$scope.$watch('newBranchAddressForm', function(newValue, oldValue, scope) {
		$scope.newBranchAddressForm = newValue;
	});

	//Theo doi neu branch.address thay doi thi cap nhat $scope.address neu no ko dirty
	$scope.$watch('branch.address', function(newValue, oldValue, scope) {
		console.log("newBranchAddressForm:", $scope.newBranchAddressForm.address.$dirty);
		if (!$scope.address) {
			$scope.address = '';
		}
		//Neu address ko dirty thi lay no la gia tri cua branch.address
		if (!$scope.newBranchAddressForm.address.$dirty) {
			$scope.address = newValue;
		}
			
	});

	//Bat su kien load map thanh cong
	$scope.$on('mapInitialized', function(event, map) {
		if(map.onstate != 'chinhSuaChiNhanh'){
			return;
		}
		$scope.map = map;
		//Danh dau marker tai vi tri cua branch
		setMarker({
			lat: $scope.branch.coordinates[1],
			lng: $scope.branch.coordinates[0],
		});
	});

	$scope.onSearchPosition = function() {
		$scope.isFinding = true;
		geocodingService.latLngForAddress($scope.address).then(function(position) {
			$scope.isFinding = false;
			$scope.error = "";
			setMarker(position);
		}, function() {
			$scope.isFinding = false;
			$scope.error = "Không thể tìm kiếm vị trí bạn muốn tìm. Bạn vui lòng thử lại";
			// Flash.create("danger", "Không thể tìm kiếm vị trí bạn muốn tìm. Bạn vui lòng thử lại");
		});
	};

	$scope.onSearchCurrentPosition = function() {
		geocodingService.currentPosition().then(function(position) {
			$scope.error = "";
			setMarker({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		}, function(error) {
			// $scope.isFinding = false;
			$scope.error = "Không thể lấy vị trí hiện tại của bạn";
			// Flash.create("danger", "Không thể lấy vị trí hiện tại của bạn");
		});
	};

	function createMarker(lat, lng, image) {
		var position = new google.maps.LatLng(lat, lng);
		//Lay html
		$("#customMarker").find('.img-avatar').attr("src", logoFilter(image)).html();
		var HtmlLayout = $("#customMarker").html();
		var marker = new RichMarker({
			position: position,
			draggable: true,
			flat: true,
			content: HtmlLayout,
		});
		return marker;
	};

	var marker = null;
	function setMarker(position) {
		$scope.branch.latitude = position.lat;
		$scope.branch.longitude = position.lng;
		//Bo marker cu
		if (marker) {
			marker.setMap(null);
		}
		//Tao ra marker tai vi tri moi
		marker = createMarker(position.lat, position.lng, "notKnow");
		marker.setMap($scope.map);
		$scope.map.setCenter(marker.getPosition());
		$scope.map.setZoom(17);
		//Dang ki su kien dragend cho marker de lay vi tri moi	
		google.maps.event.addListener(marker, 'dragend', function() {
			$scope.branch.latitude = marker.getPosition().lat();
			$scope.branch.longitude = marker.getPosition().lng();
			console.log("new branch: ", $scope.branch);
		});
	};


	// $scope.isSaving = false;

	// $scope.createBranch = function(){
	// 	$scope.isSaving = true;
	// 	console.log("new branch: ", $scope.branch);
	// 	branchService.create($scope.branch).success(function(){
	// 		$scope.isSaving = false;
	// 		$scope.branches.splice(0, 0, $scope.branch);
	// 		$state.go("home");
	// 	}).error(function(error){
	// 		$scope.isSaving = false;
	// 	});

	// };

}]);