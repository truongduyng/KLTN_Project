app.controller('mapCtrl', ['$scope', '$http', 'Auth', 'mapFtry', function($scope, $http, Auth, mapFtry){

  Auth.currentUser().then(function(user) {
    $scope.username = user.username;
  }, function(error) {
    $scope.username = "User"
  });

  $scope.image = mapFtry.image;
  $scope.shape = mapFtry.shape;

  $scope.markers = mapFtry.markers;
  $scope.infowindow = mapFtry.infowindow;

  $scope.bounds = mapFtry.bounds;
  // $scope.geocoder = new google.maps.Geocoder();

  $scope.$on('mapInitialized', function(e, map) {
    mapFtry.map = map;
    $scope.map = mapFtry.map;

    google.maps.event.addListener(map, 'idle', (function(map) {
      return function(){
        mapFtry.map = map;
        var latlng = mapFtry.map.getCenter();
        mapFtry.markers = [];
        mapFtry.bounds = new google.maps.LatLngBounds();
        $http.get("/search/"+latlng.A+"/"+latlng.F+"/"+$scope.distance).success(function(data){
          mapFtry.setMarkers(mapFtry.map,data);
        });
      }})(map));

    google.maps.event.addListener(map, 'bounds_changed', (function(map) {
      return function(){
        mapFtry.map = map;
        $scope.distance = mapFtry.getsearchingdistance();
      }})(map));

  });

  $scope.callbackFunc = function(){
    $scope.map.setZoom(17);
    var latlng = $scope.map.getCenter();

    if (!$scope.distance){
      $scope.distance = 2;
    }

    setUserMarker($scope.map,latlng);
    $http.get("/search/"+latlng.A+"/"+latlng.F+"/"+$scope.distance).success(function(data){
      if (data != null) {
        mapFtry.setMarkers($scope.map,data);
      };
    });
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

