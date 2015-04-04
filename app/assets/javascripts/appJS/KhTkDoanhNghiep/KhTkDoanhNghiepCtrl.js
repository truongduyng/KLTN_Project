app.controller('KhTkDoanhNghiepCtrl', ['$scope', 'currentUser', 'geocodingService',
	function($scope, currentUser, geocodingService) {

		$scope.currentUser = currentUser;
		//Bat su kien load map thanh cong
		$scope.$on('mapInitialized', function(event, map) {
			$scope.map = map;
		});

		$scope.bussinessRequest = {};
		$scope.address = ""; //Dia chi cho tim vi tri

		$scope.onSearchPosition = function() {
			geocodingService.latLngForAddress($scope.address).then(function(position) {
				setMarker(position);
			}, function() {
				$scope.error = "Không thể tìm kiếm vị trí bạn muốn tìm. Bạn vui lòng thử lại";
			});
		};

		$scope.onSearchCurrentPosition = function() {
			geocodingService.currentPosition().then(function(position) {
				setMarker({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			}, function(error) {
				$scope.error = "Không thể lấy vị trí hiện tại của bạn";
			});
		};

		function createMarker(lat, lng) {
			var position = new google.maps.LatLng(lat, lng);
			var image = $scope.currentUser.avatar.url;
			var HtmlLayout =
				"<div  style='position: relative; width:100px; height:100px;'>" + "<img style='display:block; left:15px; top:7px; position:absolute; z-index:10s' class='img-circle width='70px' height='70px'" + "src='" + image + "' >" + "<img style='display:block;z-index: 100;'' width='100px' height='100px'" + "src='/assets/application/placeholder/marker_layout.png'></div>";
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
	}
]);