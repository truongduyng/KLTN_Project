app.controller('KhTkDoanhNghiepCtrl', ['$scope', 'currentUser', 'geocodingService',
	'KhTkDoanhNghiepService', 'Flash', '$state',
	function($scope, currentUser, geocodingService, KhTkDoanhNghiepService, Flash, $state) {

		$scope.currentUser = currentUser;
		//Bat su kien load map thanh cong
		$scope.$on('mapInitialized', function(event, map) {
			$scope.map = map;
		});

		$scope.bussinessRequest = {};
		$scope.address = ""; //Dia chi cho tim vi tri

		$scope.onSearchPosition = function() {
			$scope.isFinding = true;
			geocodingService.latLngForAddress($scope.address).then(function(position) {
				$scope.isFinding = false;
				$scope.error = "";
				setMarker(position);
			}, function() {
				$scope.isFinding = false;
				$scope.error = "Không thể tìm kiếm vị trí bạn muốn tìm. Bạn vui lòng thử lại";
				Flash.create("danger", "Không thể tìm kiếm vị trí bạn muốn tìm. Bạn vui lòng thử lại", 'myalert');
			});
		};

		$scope.onSearchCurrentPosition = function() {
			// $scope.isFinding = true;
			geocodingService.currentPosition().then(function(position) {
				//$scope.isFinding = false;
				$scope.error = "";
				setMarker({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			}, function(error) {
				// $scope.isFinding = false;
				$scope.error = "Không thể lấy vị trí hiện tại của bạn";
				Flash.create("danger", "Không thể lấy vị trí hiện tại của bạn",'myalert');
			});
		};

		function createMarker(lat, lng) {
			// console.log(document.getElementById("customMarker").outerHTML);
			var position = new google.maps.LatLng(lat, lng);
			var image = $scope.currentUser.avatar.url;
			// var HtmlLayout =
			// 	"<div  style='position: relative; width:100px; height:100px;'>" + "<img style='display:block; left:15px; top:7px; position:absolute; z-index:10s' class='img-circle width='70px' height='70px'" + "src='" + image + "' >" + "<img style='display:block;z-index: 100;'' width='100px' height='100px'" + "src='application/placeholder/marker_layout.png'></div>";
			var HtmlLayout = document.getElementById("customMarker").innerHTML;
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
			$scope.bussinessRequest.latitude = position.lat;
			$scope.bussinessRequest.longitude = position.lng;
			//Bo marker cu
			if (marker) {
				marker.setMap(null);
			}
			//Tao ra marker tai vi tri moi
			marker = createMarker(position.lat, position.lng);
			marker.setMap($scope.map);
			$scope.map.setCenter(marker.getPosition());
			$scope.map.setZoom(15);
			//Dang ki su kien dragend cho marker de lay vi tri moi
			google.maps.event.addListener(marker, 'dragend', function() {
				$scope.bussinessRequest.latitude = marker.getPosition().lat();
				$scope.bussinessRequest.longitude = marker.getPosition().lng();
				console.log("bussinessRequest: ", $scope.bussinessRequest);
			});
		};


		////Reserve geocoding
		// geocodingService.addressFromLocation(10.739211296648074, 106.71831607818604).then(function(address){
		// 	console.log("success:", address);
		// }, function(error){
		// 	console.log("error:", error);
		// });


		$scope.sendBussinessRequest = function() {
			console.log("bussinessRequest: ", $scope.bussinessRequest);
			KhTkDoanhNghiepService.create($scope.bussinessRequest).success(function(bussinessRequest) {
				Flash.create("success", 'Yêu cầu kích hoạt tài khoản doanh nghiệp của bạn đã được gửi. Chúng tôi sẽ duyệt và thông báo bạn sớm nhất có thể', 'myalert');
				angular.copy({}, $scope.bussinessRequest);
				var username = $scope.currentUser.username;
				$state.go("chiTietKhTkDoanhNghiep", {
					id: bussinessRequest._id.$oid,
				});
				// $state.go("trangCaNhan", {
				// 	username: username,
				// });

			}).error(function(error) {
				Flash.create("danger", "Lỗi xảy ra khi gửi yêu cầu. Bạn vui lòng thử lại",'myalert');
			});
		};


		// //Moi them vo chua test. :-)
		// //Gan form vao scope hien tai
		// $scope.$watch('bussinessRequestForm', function(newValue, oldValue, scope) {
		// 	$scope.bussinessRequestForm = newValue;
		// });
		// //Theo doi neu branch.address thay doi thi cap nhat $scope.address neu no ko dirty
		// $scope.$watch('bussinessRequest.address', function(newValue, oldValue, scope) {
		// 	console.log("new value:", newValue);
		// 	if (!$scope.address) {
		// 		$scope.address = '';
		// 	}
		// 	//Neu address ko dirty thi lay no la gia tri cua branch.address
		// 	if (!$scope.bussinessRequestForm.addressForPosition.$dirty) {
		// 		$scope.address = newValue;
		// 	}

		// });

	}
]);