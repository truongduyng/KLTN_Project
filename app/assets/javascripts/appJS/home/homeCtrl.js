app.controller('homeCtrl', ['$scope', '$http', function($scope, $http){

	var handler = Gmaps.build('Google');
	handler.buildMap({ internal: {id: 'map'} }, function(){
		if(navigator.geolocation)
			navigator.geolocation.getCurrentPosition(displayOnMap);
	});

	function displayOnMap(position){
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.log(results);
				if (results[1]) {
					console.log(results[1].formatted_address);
					$http.get("/search/"+results[1].formatted_address).success(function(data){
						markers = handler.addMarkers(data);
						handler.getMap().setZoom(16);
						handler.map.centerOn(markers[0]);
					});
				}
			} else {
				alert("Geocoder failed due to: " + status);
			}
		});
	};
}]);

