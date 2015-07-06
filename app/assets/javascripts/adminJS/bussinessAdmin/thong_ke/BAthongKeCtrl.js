app.controller('BAthongKeCtrl', ['$scope', 'BAthongKeService', function($scope, thongKeService) {
	console.log("in BAthongKeCtrl");


	// $scope.labels = ['Chi nhanh 1', 'Chi nhanh 2', 'Chi nhanh 3', 'Chi nhanh 4', 'Chi nhanh 5', ];
	// $scope.series = ['Doanh thu'];
	// $scope.data = [
	// 	[65, 59, 80, 81, 56]
	// ];



	//Series la cac chi nhanh, labels la theo thang
	months = ['Tháng 1', 'Tháng 2','Tháng 3', 'Tháng 4', 'Tháng 5','Tháng 6', 'Tháng 7', 'Tháng 8','Tháng 9', 'Tháng 10','Tháng 11', 'Tháng 12'];
	var now = new Date();
	var currentMonth = now.getMonth() + 1; 
	$scope.bussiness = {
		labels: months.slice(0, currentMonth),
		series: thongKeService.branchesData.chi_nhanh,
		data: thongKeService.branchesData.doanh_thu,
	};
	


	// $scope.labels = 
	// $scope.series = ['Chi nhanh 1', 'Chi nhanh 2', 'Chi nhanh 3', 'Chi nhanh 4', 'Chi nhanh 5'];
	// $scope.data = [
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// ];

	//Doanh thu
	//Chi nhanh, asset, ve
	//Time: month, year

	// //Doanh thu theo chi nhanh
	// $scope.branch = {
	// 	labels: ['Tháng 1', 'Tháng 2','Tháng 3', 'Tháng 4', 'Tháng 5','Tháng 6', 'Tháng 7', 'Tháng 8','Tháng 9', 'Tháng 10','Tháng 11', 'Tháng 12'],
	// 	series: ['Sân bóng đá 1', 'Sân bóng đá 2', 'Sân bóng đá 3', 'Sân bóng đá 4', 'Sân bóng đá 5'],
	// 	data: [[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60],
	// 	[65, 59, 80, 81, 56, 60, 65, 59, 80, 81, 56, 60]],
	// }


}]);


//2 bieu do:
//bieu do 1: doanh thu toan doanh nghiep theo thang, hien thi den thang hien tai, uu diem
//giup so sanh dc giua cac chi nhanh va so sanh theo cac thang
//doanh thu cua 1 chi nhanh, giup so sanh hieu suat hoat dong cua cac san trong 1 chi nhanh theo tung theo