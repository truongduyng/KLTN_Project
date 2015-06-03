app.controller('clubCtrl',['$scope', '$modal', function($scope, $modal){

  $scope.opennewclub = function(){
    var newclubmodal = $modal.open({
      templateUrl: 'newclub.html',
      controller: 'newclubmodalCtrl',
      animation: false,
      windowClass: 'newclubmodal'
    });
  }

}]);

app.controller('newclubmodalCtrl', function($modalInstance){

});