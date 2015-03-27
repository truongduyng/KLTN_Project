app.controller('baiVietCaNhanCtrl', ['$scope', 'baiVietCaNhanService','$state',
	function($scope, baiVietCaNhanService, $state) {
		$scope.posts = baiVietCaNhanService.posts;


		$scope.reload = function(){
			$state.reload();
		};
	}
]);