app.controller('BAthongKeCtrl', ['$scope', 'BAthongKeService', function($scope, thongKeService) {
	console.log("in BAthongKeCtrl: ", Date.today().next().friday());

	//Series la cac chi nhanh, labels la theo thang
	months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
	var now = new Date();
	var currentMonth = now.getMonth() + 1;

	$scope.bussiness = {
		labels: months.slice(0, currentMonth),
		series: thongKeService.branchesData.chi_nhanh,
		data: thongKeService.branchesData.doanh_thu,
	};

	$scope.from = thongKeService.getMonday(new Date());
	$scope.to = thongKeService.getSunday(new Date());

	$scope.thongKeTheoNgayTrongTuan = thongKeService.thongKeTheoNgayTrongTuan;

	$scope.isLoading = false;
	$scope.previousWeek = function() {
		$scope.isLoading = true;
		//Neu ko phai la ngay thu 2, thi last 2 lan moi ve ngay thu 2 tuan truoc
		if (!$scope.from.is().monday()) {
			$scope.from.last().monday();
		}
		$scope.from.last().monday();
		$scope.to.last().sunday();
		console.log("from: ", $scope.from);
		console.log("to: ", $scope.to);

		thongKeService.getThongKeTheoNgayTrongTuan($scope.from, $scope.to)
			.success(function() {
				$scope.isLoading = false;
			}).error(function() {
				$scope.isLoading = false;
			});
	};

	$scope.nextWeek = function() {
		$scope.isLoading = true;
		$scope.from.next().monday();
		//Neu ko phai la ngay chu nhat thi next 2 lan moi toi chu nhat tuan toi
		if (!$scope.to.is().sunday()) {
			$scope.to.next().sunday();
		}
		$scope.to.next().sunday();

		console.log("from: ", $scope.from);
		console.log("to: ", $scope.to);
		thongKeService.getThongKeTheoNgayTrongTuan($scope.from, $scope.to)
			.success(function() {
				$scope.isLoading = false;
			}).error(function() {
				$scope.isLoading = false;
			});
	};

	$scope.options ={
		barShowStroke : true,
		barStrokeWidth : 2,
		barValueSpacing : 25,
		multiTooltipTemplate: function(label){
			return label.datasetLabel + ': ' + thongKeService.vndFilter(label.value);
		}
	};
}]);


//2 bieu do:
//bieu do 1: doanh thu toan doanh nghiep theo thang, hien thi den thang hien tai, uu diem
//giup so sanh dc giua cac chi nhanh va so sanh theo cac thang
//doanh thu cua 1 chi nhanh, giup so sanh hieu suat hoat dong cua cac san trong 1 chi nhanh theo tung theo