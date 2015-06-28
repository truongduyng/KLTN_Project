app.controller('tabCtrl', ['$scope', function ($scope) {
	$scope.tabSelected = 'profile';
	$scope.changeTab = function(tab) {
		$scope.tabSelected = tab;
	}

	$scope.$on('event:onTabChange', function(event, tabSelected){
		$scope.changeTab(tabSelected);
	});

}]);