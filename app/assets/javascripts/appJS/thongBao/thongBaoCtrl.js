app.controller('thongBaoCtrl', ['$scope', 'thongBaoService'
	, function ($scope, thongBaoService) {
		$scope.notificationChange = thongBaoService.notificationChange;
		$scope.targetObject = thongBaoService.notificationChange.target_object;
		
		//De thay doi mau alert tuy theo thong bao la thanh cong hay that bai
		$scope.isDanger = false;
		if($scope.notificationChange.notification_category.name == 'Từ chối bài viết'){
			$scope.isDanger = true;
		}

}]);