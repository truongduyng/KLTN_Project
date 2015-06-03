angular.module('sportaBussinessAdmin').controller('headerCtrl', ['$scope','Auth', function ($scope, Auth) {
	Auth.currentUser().then(function(user){
    $scope.user= user;
  })
}]);