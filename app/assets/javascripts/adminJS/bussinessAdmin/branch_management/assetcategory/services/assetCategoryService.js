services.factory('assetCategoryService', ['$http', function($http) {
  var o = {
    categories: [],
  };

  o.index = function() {
    return $http.get('/assest_categories.json')
    .then(function(response) {
      angular.copy(response.data, o.categories);
      return response;
    });
  };

  o.create = function(assest_category) {
    return $http.post('/asset_categories.json', assest_category)
    .success(function(data){
      o.categories.push(data);
    })
    .error(function(error){
      console.log(error);
    });
  };

  o.show = function(id) {
    return $http.get("/asset_categories/" + id + ".json")
    .then(function(response) {
      console.log(response);
      return response.data;
    });
  };

  o.update = function(assetCategory) {
    var id = assestCategory._id.$oid;
    console.log(assestCategory);

    return $http.put("/asset_categories/" + id + ".json", assetCategory)
    .success(function(data){
      console.log(data);
    })
    .error(function(error){
      console.log(error);
    });
  }

  o.destroy = function(assetCategory) {
    var id = assetCategory._id.$oid;
    return $http.delete("/asset_categories/" + id + ".json")
    .success(function(data){
      console.log(data);
    })
    .error(function(error){
      console.log(error);
    });

  };

  return o;
}])