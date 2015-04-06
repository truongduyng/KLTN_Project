bussinessAdmin.controller('BAbranchCtrl', ['$scope', 'bussinessService', 'logoFilter', '$location', '$state', 
	function($scope, bussinessService, logoFilter, $location, $state) {
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
}]);