app.controller('sidebarCtrl',['$scope', '$modal', function($scope, $modal){

  $scope.opennewclub = function(){
    var newclubmodal = $modal.open({
      templateUrl: 'appJS/sidebar/_new_club.html',
      controller: 'newclubmodalCtrl'
      // animation: false
      // windowClass: 'newclubmodal'
    });
  }

}]);

app.controller('newclubmodalCtrl', function($scope, $modalInstance){

});