app.controller('homeCtrl', ['$scope', '$http', 'FileUploader', '$interval', '$state', '$location', '$anchorScroll', 'Auth', function($scope, $http, FileUploader, $interval, $state, $location, $anchorScroll, Auth) {

  $scope.scrollTo = function() {
    $location.hash("listPost");
    $anchorScroll();
  };

}]);

