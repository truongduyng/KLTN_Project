app.controller('searchCtrl', ['$scope', '$http','$state', 'branches', 'posts', 'listPostService', 'mapFtry', function($scope, $http, $state, branches, posts, listPostService, mapFtry){

  listPostService.posts = posts.data;
  $scope.branches = branches.data;

  $scope.$on('mapInitialized', function(e, map) {

    mapFtry.map = map;
    $scope.map = mapFtry.map;
    mapFtry.setMarkers(mapFtry.map, $scope.branches);
    mapFtry.map.fitBounds(mapFtry.bounds);

    google.maps.event.addListener(map, 'idle', (function(map) {
      return function(){
        mapFtry.map = map;
        var latlng = mapFtry.map.getCenter();
        mapFtry.markers = [];
        mapFtry.bounds = new google.maps.LatLngBounds();

        $http.get("/search/"+latlng.A+"/"+latlng.F+"/"+$scope.distance).success(function(data){
          $scope.branches = data;
          mapFtry.setMarkers(mapFtry.map,data);
        });
      }})(map));

    google.maps.event.addListener(map, 'bounds_changed', (function(map) {
      return function(){
        mapFtry.map = map;
        $scope.distance = mapFtry.getsearchingdistance();
      }})(map));
  });

}]);