app.controller('listPostCtrl', ['$scope', 'listPostService', 'Auth', function($scope, listPostService, Auth) {

	$scope.posts = listPostService.posts;

	$scope.currentPage = 1;
	$scope.isBusy = false;
	$scope.isEnd = false;

	$.each($('div.post-item'), function(index, item){
    console.log(item);
  });

  console.log($('div.post-item').attr('class'));

	$scope.loadMore = function(){
		if($scope.isEnd){
			return;
		}

		$scope.currentPage = $scope.currentPage + 1;

		$scope.isBusy = true;
		listPostService.get_all($scope.currentPage).success(function(data){

			if(data == null || data.length == 0){
				$scope.isEnd = true;
			}

			$scope.isBusy = false;
		}).error(function(){

			$scope.isBusy = false;
			$scope.currentPage--;
		});
	};
}]);
