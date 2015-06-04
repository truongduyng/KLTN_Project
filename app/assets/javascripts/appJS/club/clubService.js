services.factory('clubs',['$http', function($http){
  var o = {
    clubs: [],
  };

  o.index = function(){
    return $http.get('/clubs.json').success(function(results){
      o.clubs = results;
    })
  }

  o.create = function(club){
    return $http.post('clubs.json', club).success(function(result){
      o.clubs.push(result);
    })
    .error(function(){

    })
  }

  return o;
}]);