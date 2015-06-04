services.factory('clubs',['$http', function($http){
  var o = {
    clubs: [],
  };

  o.create = function(club){
    return $http.post('clubs.json', club).success(function(result){
      console.log(result);
    })
    .error(function(){

    })
  }

  return o;
}]);