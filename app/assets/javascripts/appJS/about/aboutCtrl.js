app.controller('aboutCtrl', ['$scope', function($scope){
  $scope.$on('$viewContentLoaded',function(event){
    $('#sidebar').css({display: 'none'});
    $('#sidebar').removeClass('col-sm-2');
    $('#main-content').removeClass('col-sm-10');
    $('#main-content').addClass('col-sm-12');
  });
}]);