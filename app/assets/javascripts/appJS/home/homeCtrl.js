app.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	handler = Gmaps.build('Google');
	var markers;
	handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
		return $http.get("/search/").success(function(data){

			markers = handler.addMarkers(data);
			// handler.getMap().setZoom(15);
			// handler.map.centerOn(markers[1]);
			handler.bounds.extendWith(markers);
			handler.fitMapToBounds();
		});
	});	
		// if(navigator.geolocation)
		// 	navigator.geolocation.getCurrentPosition(displayOnMap);
		// });

	// function displayOnMap(position){
	// 	// var marker = handler.addMarker({
	// 	// 	lat: position.coords.latitude,
	// 	// 	lng: position.coords.longitude,
	// 	// 	picture: {
	// 	// 		url: "http://i.imgur.com/r0L47hQ.png",
	// 	// 		width:  96,
	// 	// 		height: 96
	// 	// 	},
	// 	// 	infowindow: "hello!"
	// 	// });
	// 	handler.getMap().setZoom(5);
	// 	handler.map.centerOn(markers);
	// };
}]);

