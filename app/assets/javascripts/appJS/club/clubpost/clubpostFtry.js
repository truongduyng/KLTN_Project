app.factory('clubpostFtry', ['$http', function($http) {
  var o = {
  };

  o.create = function(club_id, postclub) {
    return $http.post("/clubs/"+ club_id +"/club_posts.json", postclub).success(function(data) {
      }).error(function(data) {
        console.log(data);
      });
  };

  o.update = function(club_id, postclub, deletedPhotos) {
    return $http.put("/clubs/"+ club_id +"/club_posts/"+ postclub._id.$oid+".json", {content: postclub.content, deleted_photos: deletedPhotos}).success(function(data) {
      }).error(function(data) {
        console.log(data);
      });
  };

  o.like = function(club_post){
    return $http.put("/club_posts/"+ club_post._id.$oid +"/like.json");
  }

  o.unlike = function(club_post){
    return $http.put("/club_posts/"+ club_post._id.$oid +"/unlike.json");
  }

  o.getKFirstLikes = function(club_post, number){
    return $http.get("/club_posts/"+ club_post._id.$oid +"/get_k_first_like/" + number+ ".json");
  }

  o.getAllLikes = function(club_post){
    var url = "/club_posts/" + club_post._id.$oid + "/get_all_likes.json";
    return $http.get(url);
  };

  return o;
}])