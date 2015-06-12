app.factory('clubpostFtry', ['$http', function($http) {
  var o = {
  };

  o.create = function(club_id, postclub) {
    return $http.post("/clubs/"+ club_id +"/club_posts.json", postclub).success(function(data) {
      }).error(function(data) {
        console.log(data);
      });
  };

  o.like = function(post){
    return $http.put("/club_posts/"+ post._id.$oid +"/like.json");
  }

  o.unlike = function(post){
    return $http.put("/club_posts/"+ post._id.$oid +"/unlike.json");
  }

  return o;
}])