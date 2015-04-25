app.controller('bookingCtrl', ['$scope', '$http','$location','$stateParams', function($scope, $http, $location, $stateParams){
  console.log($stateParams.branch_url);
}]);