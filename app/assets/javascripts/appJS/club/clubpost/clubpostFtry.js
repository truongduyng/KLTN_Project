app.factory('clubpostFtry', ['$http', function($http) {
  var o = {
  };

  o.create = function(club_id, postclub) {
    return $http.post("/clubs/"+ club_id +"/club_posts.json", postclub);
  };

  o.update = function(club_id, postclub, deletedPhotos) {
    return $http.put("/clubs/"+ club_id +"/club_posts/"+ postclub._id.$oid+".json", {content: postclub.content, deleted_photos: deletedPhotos});
  };

  o.delete = function(club_id, postclub) {
    return $http.delete("/clubs/"+ club_id +"/club_posts/"+ postclub._id.$oid+".json");
  };

  o.like = function(club_post){
    return $http.put("/club_posts/"+ club_post._id.$oid +"/like.json");
  }

  o.unlike = function(club_post){
    return $http.put("/club_posts/"+ club_post._id.$oid +"/unlike.json");
  }

  o.follow = function(club_post){
    return $http.put("/club_posts/"+ club_post._id.$oid +"/follow.json")
  }

  o.unfollow = function(club_post){
    return $http.put("/club_posts/"+ club_post._id.$oid +"/unfollow.json")
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