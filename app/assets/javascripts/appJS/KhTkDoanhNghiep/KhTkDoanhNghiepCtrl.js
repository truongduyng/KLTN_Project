app.controller('KhTkDoanhNghiepCtrl', ['$scope', 'currentUser', function($scope, currentUser) {
	$scope.currentUser = currentUser;
	
	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
		google.maps.event.addListener(map, 'click', function(event) {
			console.log(event);
			createMarker(event.latLng, map);
		});
	});

	function createMarker(position, map) {
		var image = $scope.currentUser.avatar.url;
		var HtmlLayout =
			"<div  style='position: relative; width:100px; height:100px;'>" + "<img style='display:block; left:15px; top:7px; position:absolute; z-index:10s' class='img-circle width='70px' height='70px'" + "src='" + image + "' >" + "<img style='display:block;z-index: 100;'' width='100px' height='100px'" + "src='/assets/application/placeholder/marker_layout.png'></div>";
		var marker = new RichMarker({
			position: position,
			map: map,
			draggable: true,
			flat: true,
			content: HtmlLayout,
		});
		google.maps.event.addListener(marker, 'dragend', function() {
			$scope.position = marker.getPosition();
		});
		return marker;
	};
}]);