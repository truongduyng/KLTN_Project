app.controller('listPostCtrl', ['$scope', 'listPostService', function($scope, listPostService) {
	$scope.posts = listPostService.posts;
	$scope.currentPage = 1;
	$scope.isBusy = false;
	$scope.isEnd = false;
	$scope.loadMore = function(){
		console.log("on load More");
		$scope.currentPage++;
		$scope.isBusy = true;
		listPostService.get_all($scope.currentPage).success(function(data){
			console.log("on load More success");
			if(data == null || data.length == 0){
				$scope.isEnd = true;
			}
			$scope.isBusy = false;
		}).error(function(){
			console.log("on load More error");
			$scope.isBusy = false;
			$scope.currentPage--;
		});
	};
}]);