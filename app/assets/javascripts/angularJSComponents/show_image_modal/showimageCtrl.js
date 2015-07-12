app.controller('showImageModalCtrl', ['$scope', 'listPhotos', 'photo', '$modalInstance', function($scope, listPhotos, photo, $modalInstance){

  $scope.listPhotos = listPhotos;
  $scope.photo = photo;
  var currentIndex = $scope.listPhotos.indexOf(photo);

  $scope.previous = function() {

    if (currentIndex >= 1) {
      currentIndex--;
    } else {
      currentIndex = $scope.listPhotos.length - 1;
    }
    $scope.photo = $scope.listPhotos[currentIndex];
  };

  $scope.next = function() {

    if (currentIndex < $scope.listPhotos.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    $scope.photo = $scope.listPhotos[currentIndex];
  };

}]);