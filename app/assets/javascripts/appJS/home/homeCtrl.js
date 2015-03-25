app.controller('homeCtrl', ['$scope', '$http', function($scope, $http){

	var handler = Gmaps.build('Google');
	geocoder = new google.maps.Geocoder();
	var markers = [];
	handler.buildMap({ provider: {maxZoom: 17},internal: {id: 'map'} }, function(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(displayOnMap,denylocation);
		}
		else
		{
			$http.get("/search/").success(function(data){
				markers = handler.addMarkers(data);
				handler.getMap().setZoom(10);
				handler.map.centerOn(markers[0]);
			});
		}
	});

	function denylocation(err) {
		$http.get("/search").success(function(data){
			markers = handler.addMarkers(data);
			handler.bounds.extendWith(markers);
			handler.fitMapToBounds();
		});
	};

	function displayOnMap(position){
		var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {		
				if (results[1]) {
					$http.get("/search/"+results[1].formatted_address).success(function(data){
						markers = handler.addMarkers(data);
						handler.bounds.extendWith(markers);
						handler.fitMapToBounds();
					});
				}
			} else {
				// alert("Geocoder failed due to: " + status);
			}
		});
	};

	google.maps.event.addListener(handler.getMap(), 'idle', function() { 
		geocoder.geocode({'latLng': handler.getMap().getCenter()}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {		
				if (results[1]) {
					$http.get("/search/"+results[1].formatted_address).success(function(data){
						markers = [];
						markers = handler.addMarkers(data);
						console.log(markers);
					});
				}
			} else {
				// alert("Geocoder failed due to: " + status);
			}
		});
	});
}]);

