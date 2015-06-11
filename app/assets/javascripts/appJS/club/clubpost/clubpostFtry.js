app.factory('clubpostFtry', ['$http', function($http) {
  var o = {
  };

  o.index = function(club_id){
    return $http.get("/clubs/"+ club_id +"/club_posts.json");
  }

  o.create = function(club_id, postclub) {
    return $http.post("/clubs/"+ club_id +"/club_posts.json", postclub).success(function(data) {
      }).error(function(data) {
        console.log(data);
      });
  };

  return o;
}])