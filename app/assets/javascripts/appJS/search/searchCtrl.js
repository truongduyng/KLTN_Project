app.controller('searchCtrl', ['$scope', '$http','$state', 'results', 'listPostService', 'mapFtry', function($scope, $http, $state, results, listPostService, mapFtry){

  listPostService.posts = results.data.posts;
  $scope.branches = results.data.branches;
  $scope.clubs = results.data.clubs;

  $scope.$on('mapInitialized', function(e, map) {

    mapFtry.map = map;
    mapFtry.markers = [];
    mapFtry.bounds = new google.maps.LatLngBounds();
    $scope.map = mapFtry.map;

    mapFtry.setMarkers(mapFtry.map, $scope.branches);
    mapFtry.map.fitBounds(mapFtry.bounds);

    google.maps.event.addListener(map, 'idle', (function(map) {
      return function(){
        mapFtry.map = map;
        var latlng = mapFtry.map.getCenter();
        mapFtry.markers = [];
        mapFtry.bounds = new google.maps.LatLngBounds();

        $http.get("/search_map/"+latlng.A+"/"+latlng.F+"/"+$scope.distance).success(function(data){
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

  $scope.showresult = function(branch){
    if (branch.isvenue) {
      $state.go('venueDetail', {id: branch.url});
    }else{
      $state.go('booking', {branch_url_alias: branch.url});
    }

    $scope.search_query = "";
  }

  $scope.showclub = function(club){
    $state.go('club', {club_id: club.id.$oid, club_post_id: null});
  }

}]);