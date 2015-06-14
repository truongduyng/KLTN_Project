app.controller('thongBaoCtrl', ['$scope', 'thongBaoService'
	, function ($scope, thongBaoService) {
		$scope.notificationChange = thongBaoService.notificationChange;
		$scope.targetObject = thongBaoService.notificationChange.target_object;

		//1 so dang thong bao khac nhau
		$scope.notificationCategory  = {
			denyPost: false,
			acceptRequestBussiness: false,
			denyRequestBussiness: false,
		};

		//De thay doi mau alert tuy theo thong bao la thanh cong hay that bai
		$scope.isDanger = false;
		if($scope.notificationChange.notification_category.name == 'Từ chối bài viết'){
			$scope.isDanger = true;
			$scope.notificationCategory.denyPost = true;
		}
		if($scope.notificationChange.notification_category.name == 'Chấp nhận yêu cầu kích hoạt tài khoản doanh nghiệp'){
			$scope.notificationCategory.acceptRequestBussiness = true;
		}

		if($scope.notificationChange.notification_category.name == 'Từ chối yêu cầu kích hoạt tài khoản doanh nghiệp'){
			$scope.isDanger = true;
			$scope.notificationCategory.denyRequestBussiness = true;
		}
		// if($scope.notificationChange.notification_category.name == 'Từ chối bài viết'){
		// 	$scope.isDanger = true;
		// }

}]);