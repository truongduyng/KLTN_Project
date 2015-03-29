app.controller('mapCtrl', ['$scope', '$http', 'Auth', function($scope, $http, Auth){

	Auth.currentUser().then(function(user) {
		$scope.username = user.username;
	}, function(error) {
		$scope.username = "User"
	});

	var geocoder = new google.maps.Geocoder();
	var bounds = new google.maps.LatLngBounds();

	var map;
	var mapOptions = {
		zoom: 5,
		maxZoom: 18,
		center: new google.maps.LatLng(16.0667, 108.2333)
	};
	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(displayOnMap);
	}

	google.maps.event.addListener(map, 'idle', function() { 
		geocoder.geocode({'latLng': map.getCenter()}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {		
				if (results[1]) {
					markers = [];
					$http.get("/search/"+results[1].formatted_address).success(function(data){
						// markers = handler.addMarkers(data);
					});
				}
			} else {
				// alert("Geocoder failed due to: " + status);
			}
		});
	});

	function displayOnMap(position){
		var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		setUserMarker(map,latlng)
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {		
				if (results[1]) {
					$http.get("/search/"+results[1].formatted_address).success(function(data){
						setMarkers(map,data)
						map.fitBounds(bounds);
					});
				}
			} else {
				// alert("Geocoder failed due to: " + status);
			}
		});
	};

	function setMarkers(map, data){
		for (var i=0;i< data.length; i++) {
			var image = {
				url: data[i].picture,
				size: new google.maps.Size(56, 56),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(28,56)
			};
			var shape = {
				coords: [1, 1, 1, 56, 56, 56, 56 , 1],
				type: 'poly'
			};
			var myLatLng = new google.maps.LatLng(data[i].lat,data[i].lng);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image,
				shape: shape,
				title: data[i].name,
				zIndex: i
			});
			bounds.extend(marker.getPosition());
		}
	}

	function setUserMarker(map, latlng){
		var image = {
			url: "http://i.imgur.com/a06y4s3.png", //#scope.user.avatar
			size: new google.maps.Size(56, 56),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(28,56)
		};
		var shape = {
			coords: [1, 1, 1, 56, 56, 56, 56 , 1],
			type: 'poly'
		};
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: image,
			shape: shape,
			title: $scope.username,
			zIndex: 999999
		});
		return marker;
	}
}]);

