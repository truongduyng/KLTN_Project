app.factory('statusFtry', ['$http', function($http) {
  var o = {
    statuses:{
    },
  };

  o.create = function(status) {
    return $http.post("/statuses.json", status).success(function(data) {
        console.log(data);
      }).error(function(data) {
        console.log(data);
      });
  };

  return o;
}])