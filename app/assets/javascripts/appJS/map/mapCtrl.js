app.controller('mapCtrl', ['$scope', '$http', 'Auth', function($scope, $http, Auth){

	Auth.currentUser().then(function(user) {
		$scope.username = user.username;
	}, function(error) {
		$scope.username = "User"
	});

	var geocoder = new google.maps.Geocoder();
	var bounds = new google.maps.LatLngBounds();
	var image = {
		url: null,
		size: new google.maps.Size(56, 56),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(28,56)
	};
	var shape = {
		coords: [1, 1, 1, 56, 56, 56, 56 , 1],
		type: 'poly'
	};

	var map;
	var markers = [];
	var infowindow = new google.maps.InfoWindow({
		maxWidth: 160
	});
	var mapOptions = {
		zoom: 5,
		maxZoom: 18,
		disableDefaultUI: true,
		center: new google.maps.LatLng(16.0667, 108.2333)
	};
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	//================================================
	function SearchBox() {
		var searchTextBox = $('<form><input type="text" id="GeoSearch" class="form-control" placeholder = "dia chi" style= "width: 250px; margin-bottom: 5px; font-size: 14px;" ng-model = "query_address" ng-submit= "search_address()"/></form>');
		var div = $('<div class="geoSearchBox"></div>').append(searchTextBox);
		return div.get(0);
	}
	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(new SearchBox());

	$scope.search_address= function(){
		alert("dsadas");
	};
	//================================================
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(displayOnMap, function(){
			alert("Khong xac dinh duoc vi tri cua ban");
		});
	}

	google.maps.event.addListener(map, 'idle', function() { 
		geocoder.geocode({'latLng': map.getCenter()}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {		
				if (results[1]) {
					markers = [];
					$http.get("/search/"+results[1].formatted_address).success(function(data){
						// markers = [];
						setMarkers(map,data);
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
		for (var i=0; i<data.length; i++) {
			image.url = data[i].picture;
			var myLatLng = new google.maps.LatLng(data[i].lat,data[i].lng);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image,
				shape: shape,
				title: data[i].name,
				zIndex: i+1
			});

			google.maps.event.addListener(marker,"click",(function(marker,i){
				return function(){
					infowindow.setContent('<div id="info-window"><a href="'+data[i].url+'">'+data[i].name+'</a><br><span>'+data[i].address.substring(0,20)+'...</span></div>');
					infowindow.open(map,marker);
					map.setCenter(marker.getPosition());
				}
			})(marker,i));

			markers.push(marker);
			bounds.extend(marker.getPosition());
		}
	}

	function setUserMarker(map, latlng){
		image.url = "http://i.imgur.com/a06y4s3.png"; //#scope.user.avatar
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: image,
			shape: shape,
			title: $scope.username,
			zIndex: 1
		});
		google.maps.event.addListener(marker,"click",(function(marker){
			return function(){
				infowindow.setContent($scope.username);
				infowindow.open(map,marker);
				map.setCenter(marker.getPosition());
			}
		})(marker));
	}
}]);

