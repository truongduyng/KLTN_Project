services.factory('assetService', ['$http', function($http) {

  var o = {
    assets: []
  };

  o.show = function(id){
    return $http.get("/assets/" + id + ".json").success(function(data){
      console.log(data);
    }).error(function(data){
      console.log(data);
    })
  };

  o.create = function(asset) {
    return $http.post("/assets.json", asset)
    .success(function(data) {
      o.assets.push(data);
    })
    .error(function(data) {
     console.log(data);
   });
  };

  o.update = function(asset) {
    return $http.put("/assets/" + asset._id.$oid + ".json", asset)
    .success(function(data) {
     for (var i = 0; i < o.assets.length; i++) {
       if (o.assets[i]._id.$oid == data._id.$oid)
        o.assets[i] = data;
    };
  })
    .error(function(data) {
     console.log(data);
   });
  };

  o.destroy = function(id) {
    return $http.delete("/assets/" + id + ".json")
    .success(function(data) {

    })
    .error(function(data) {
    });
  };

  return o;

}]);