app.controller('mapCtrl', ['$scope', '$timeout', '$http', 'Auth', function($scope, $timeout, $http, Auth){

  Auth.currentUser().then(function(user) {
    $scope.username = user.username;
  }, function(error) {
    $scope.username = "User"
  });

  $scope.image = {
    url: null,
    size: new google.maps.Size(56, 56),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(28,56)
  };
  $scope.shape = {
    coords: [1, 1, 1, 56, 56, 56, 56 , 1],
    type: 'poly'
  };

  $scope.markers =[];
  $scope.infowindow = new google.maps.InfoWindow({
    maxWidth: 160
  });
  $scope.bounds = new google.maps.LatLngBounds();
  $scope.geocoder = new google.maps.Geocoder();

  $scope.$on('mapInitialized', function(e, map) {
    google.maps.event.addListener(map, 'idle', function() {
      var latlng = map.getCenter();
      markers = [];
      $http.get("/search/"+latlng.k+"/"+latlng.D).success(function(data){
        console.log(data);
        setMarkers(map,data);
      });
    });
  });

  $scope.search_address = function(){
    alert($scope.query_address);
  };

  $scope.showcurrentposition = function(){
    $scope.map.setZoom(14);
    var latlng = $scope.map.getCenter();
    setUserMarker($scope.map,latlng)
    $http.get("/search/"+latlng.k+"/"+latlng.D).success(function(data){
      setMarkers($scope.map,data)
      $scope.map.fitBounds($scope.bounds);
    });
  };

function setMarkers(map, data){
  for (var i=0; i < data.length; i++) {
    $scope.image.url = data[i].picture;
    var myLatLng = new google.maps.LatLng(data[i].lat,data[i].lng);
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: $scope.image,
      shape: $scope.shape,
      title: data[i].name,
      zIndex: i+1
    });

    google.maps.event.addListener(marker,"click",(function(marker,i){
      return function(){
       $scope.infowindow.setContent('<div id="info-window"><a href="'+data[i].url+'">'+data[i].name+'</a><br><span>'+data[i].address.substring(0,20)+'...</span></div>');
       $scope.infowindow.open(map,marker);
       map.setCenter(marker.getPosition());
     }
   })(marker,i));
    $scope.markers.push(marker);
    $scope.bounds.extend(marker.getPosition());
  }
};

function setUserMarker(map, latlng){
    $scope.image.url = "http://i.imgur.com/a06y4s3.png"; //#scope.user.avatar
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: $scope.image,
      shape: $scope.shape,
      title: $scope.username,
      zIndex: 1
    });
    google.maps.event.addListener(marker,"click",(function(marker){
      return function(){
        $scope.infowindow.setContent($scope.username);
        $scope.infowindow.open(map,marker);
        map.setCenter(marker.getPosition());
      }
    })(marker));
  }
}]);

