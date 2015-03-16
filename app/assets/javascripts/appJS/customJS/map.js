$(document).ready(function($) {
	handler = Gmaps.build('Google');
	handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
		if(navigator.geolocation)
			navigator.geolocation.getCurrentPosition(displayOnMap);
	});
	function displayOnMap(position){
		var marker = handler.addMarker({
			lat: position.coords.latitude,
			lng: position.coords.longitude
		});
		handler.map.centerOn(marker);
	};
});