app.controller('thongBaoCtrl', ['$scope', 'thongBaoService'
	, function ($scope, thongBaoService) {
		$scope.notificationChange = thongBaoService.notificationChange;
		$scope.targetObject = thongBaoService.notificationChange.target_object;
}]);