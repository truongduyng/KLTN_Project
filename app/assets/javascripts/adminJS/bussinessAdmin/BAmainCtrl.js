app.controller('BAmainCtrl', ['$scope', function($scope) {
	//Cau hinh pageConfig chung
	$scope.$root.rootPageConfig = {
		currentPage: 1,
		pageSize: 5,
		total: 0,
		adjacent: 2,
		dots: '...',
		'scroll-top': true,
		'hide-if-empty': true,
		'ul-class': 'pagination',
		'active-class': 'active',
		'disabled-class': 'disabled',
		'show-prev-next': true,
	};
}]);