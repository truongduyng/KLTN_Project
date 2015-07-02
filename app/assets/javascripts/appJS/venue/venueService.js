app.factory('VenueService', ['$http', function($http) {
  var o = {
    venue:{}
  };

  o.create = function(venue) {
    return $http.post("/venues.json", venue)
      .success(function(data) {
        angular.copy(data, o.venue);
        angular.copy(data, venue);
      }).error(function(data) {
        console.log(data);
      });
  };

  o.show = function(id){
    var url = "/venues/" + id + ".json";
    return $http.get(url).success(function(data){
      angular.copy(data, o.venue)
    });
  };

  o.destroy = function(venue){
    var id = venue._id.$oid;
    var url = "/venues/" + id + ".json";
    return $http.delete(url);
  };

  return o;
}]);