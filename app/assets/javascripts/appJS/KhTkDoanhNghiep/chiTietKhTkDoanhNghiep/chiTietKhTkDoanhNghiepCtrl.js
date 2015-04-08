app.controller('chiTietKhTkDoanhNghiepCtrl', ['$scope', 'KhTkDoanhNghiepService', 'logoFilter'
	, function ($scope,KhTkDoanhNghiepService, logoFilter) {
		$scope.bussinessRequest = KhTkDoanhNghiepService.bussinessRequest;
		//Cho mau cua label
		$scope.isDanger = true;
		if($scope.bussinessRequest.status.name == 'Đã duyệt'){
			$scope.isDanger = false;
		}


		//Su kien khi load map thanh cong
		$scope.$on('mapInitialized', function(event, map) {
			var marker = createMarker(map.item.latitude, map.item.longitude, map.item.user.avatar.url);
			marker.setMap(map);
			console.log("marker: ", marker);
			map.setCenter(marker.getPosition());
		});

		function createMarker(lat, lng, image) {
			var position = new google.maps.LatLng(lat, lng);
			//Gan anh cho html layout cua marker
			$("#customMarker").find('.img-avatar').attr("src", logoFilter(image)).html();
			//Lay html
			var HtmlLayout =  $("#customMarker").html();
			var marker = new RichMarker({
				position: position,
				flat: true,
				content: HtmlLayout,
			});
			return marker;
		};
}]);