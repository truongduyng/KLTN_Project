app.factory('reviewService', ['$http', function($http) {

  var o = {
    reviews: [],
  };

  o.index = function(venue) {
    var venue_id = venue._id.$oid;
    var url = "/venues/" + venue_id + "/" + "reviews.json";
    var promise = $http.get(url).success(function(data){
      angular.copy(data, o.reviews);
    }); 
    return promise;
  };

  o.create = function(venue, review) {
    var venue_id = venue._id.$oid;
    var url = "/venues/" + venue_id + "/" + "reviews.json";
    var promise = $http.post(url, {
      content: review.content,
    }).success(function(data) {
      var newReview = {};
      angular.copy(data, newReview);
      o.reviews.splice(o.reviews.length, 0, newReview);
    });
    return promise;
  };

  o.update = function(venue, review) {
    var venue_id = venue._id.$oid;
    var id = review._id.$oid;
    var url = "/venues/" + venue_id + "/" + "reviews/" + id + ".json";
    var promise = $http.put(url, {
      content: review.content,
    }).success(function(data) {
      angular.copy(data, review);
    });
    return promise;
  };

  o.destroy = function(venue, review) {
    var venue_id = venue._id.$oid;
    var id = review._id.$oid;
    var url = "/venues/" + venue_id + "/" + "reviews/" + id  + ".json";
    var promise = $http.delete(url).success(function(){
      o.reviews.splice(o.reviews.indexOf(review), 1);
    });
    return promise;
  };

  return o;
}]);