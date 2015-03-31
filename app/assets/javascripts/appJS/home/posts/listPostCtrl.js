app.controller('listPostCtrl', ['$scope', 'listPostService', function($scope, listPostService) {
	$scope.posts = listPostService.posts;
}]);