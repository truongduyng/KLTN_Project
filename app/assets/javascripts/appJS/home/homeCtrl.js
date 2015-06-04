app.controller('homeCtrl', ['$scope', '$http', 'FileUploader', '$interval', '$state', '$location', '$anchorScroll', 'Auth', function($scope, $http, FileUploader, $interval, $state, $location, $anchorScroll, Auth) {

  $scope.signedIn = Auth.isAuthenticated;

  $scope.scrollTo = function() {
    $location.hash("listPost");
    $anchorScroll();
  };

  $scope.message = "This is message";

  // $state.go("chiTietBaiViet");
  var csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  $scope.uploader = new FileUploader({
    headers: {
      'X-CSRF-TOKEN': csrf_token // X-CSRF-TOKEN is used for Ruby on Rails Tokens
    },
    url: "/photos",
    formData: [{
      name: 'Huu Trung',
      age: 21,
    }, {
      first: 'huu',
      last: 'trung'
    }],
    //autoUpload: true,
  });

  //filter for image
  $scope.uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/ , options) {
      console.log(item);
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  $scope.onClearQueue = function() {
    console.log("on clear queue");
    $scope.uploader.clearQueue();
  };

  $scope.onCancelItem = function(item) {
    console.log("on cancel item");
    $scope.uploader.cancelItem(item);
  };
  var index = 0;

  // When a file is added to the queue, settings from FileUpload are copied to FileItem.
  // So any changes to FileUpload options made after a file has been added to the queue will have no effect
  $scope.uploader.onBeforeUploadItem = function(item) {
    var data = {
      index: index,
    };
    index++;
    if (!item.formData) {
      item.formData = [];
    }
    item.formData.push(data);

  };

  $scope.onUploadAll = function() {
    $scope.uploader.uploadAll();
  };

  $scope.uploader.onAfterAddingFile = function(file) {
    console.log("on after adding file", file);
  };

  //Test google map

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
    console.log("map: ", $scope.map);
  });

  $scope.clickMarker = function() {
    console.log("on click marker");
    $scope.map.markers[0].setAnimation(google.maps.Animation.BOUNCE);
  };
}
]);

