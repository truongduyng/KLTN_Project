app.controller('listPostCtrl', ['$scope', 'listPostService', 'Auth', function($scope, listPostService, Auth) {

	$scope.posts = listPostService.posts;
	console.log("before currentPage: ", $scope.currentPage);
	$scope.currentPage = 1;
	console.log("after currentPage: ", $scope.currentPage);
	$scope.isBusy = false;
	$scope.isEnd = false;


	$scope.loadMore = function(){
		console.log("$scope:", $scope);
		//Ko con du lieu de load thi ko load nua. (Khac phuc infinite-scroll-disabled='isBusy || isEnd'
			//khong hoat dong khi isEnd = true trong 1 so truong hop ????)
		console.log("$scope.isEnd:", $scope.isEnd);
		if($scope.isEnd){
			return;
		}

		$scope.currentPage = $scope.currentPage + 1;
		console.log("currentPage: ", $scope.currentPage);
		$scope.isBusy = true;
		listPostService.get_all($scope.currentPage).success(function(data){
			console.log("data: ", data.length);
			if(data == null || data.length == 0){
				$scope.isEnd = true;
				console.log("isEnd: ", $scope.isEnd);
			}
			$scope.isBusy = false;
		}).error(function(){

			$scope.isBusy = false;
			console.log("get fails: currentPage decrease");
			$scope.currentPage--;
		});
	};
}]);

// app.controller('listPostCtrl', ['$scope', 'listPostService', 'Auth', function($scope, listPostService, Auth) {

// 	$scope.posts = listPostService.posts;
// 	console.log("before currentPage: ", $scope.currentPage);
// 	$scope.currentPage = 1;
// 	console.log("after currentPage: ", $scope.currentPage);
// 	$scope.isBusy = false;
// 	$scope.isEnd = false;
// 	$scope.status = {
// 		currentPage: 1,
// 		isBusy: false,
// 		isEnd: false,
// 	}

// 	$scope.loadMore = function(){
// 		//Ko con du lieu de load thi ko load nua. (Khac phuc infinite-scroll-disabled='isBusy || isEnd'
// 			//khong hoat dong khi isEnd = true trong 1 so truong hop ????)
// 		console.log("$scope.status.isEnd:", $scope.status.isEnd);
// 		if($scope.status.isEnd){
// 			return;
// 		}

// 		$scope.currentPage = $scope.currentPage + 1;
// 		console.log("currentPage: ", $scope.currentPage);
// 		$scope.isBusy = true;
// 		listPostService.get_all($scope.currentPage).success(function(data){
// 			console.log("data: ", data.length);
// 			if(data == null || data.length == 0){
// 				$scope.isEnd = true;
// 				$scope.status.isEnd = true;
// 				console.log("isEnd: ", $scope.status.isEnd);
// 			}
// 			$scope.isBusy = false;
// 		}).error(function(){

// 			$scope.isBusy = false;
// 			console.log("get fails: currentPage decrease");
// 			$scope.currentPage--;
// 		});
// 	};
// }]);