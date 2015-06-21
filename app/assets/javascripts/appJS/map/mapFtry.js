app.factory('mapFtry', ['$http', function($http) {
  var o = {
    branches: [],
    image: {
      url: null,
      size: new google.maps.Size(56, 56),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(28,56)
    },
    shape: {
      coords: [1, 1, 1, 56, 56, 56, 56 , 1],
      type: 'poly'
    }
  };

  return o;
}]);
