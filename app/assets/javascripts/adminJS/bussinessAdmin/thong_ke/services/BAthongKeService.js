app.factory('BAthongKeService', ['$http', function ($http) {
	var o = {
		branchesData: {}
	};

	o.getThongKeToanDoanhNghiep = function(toMonth, toYear){
		var url = "/bussinesses/thong_ke_toan_doanh_nghiep.json";
		var params = "?toMonth=" + toMonth.toString() + "&toYear=" + toYear.toString();
		console.log("in getThongKeToanDoanhNghiep()");
		return $http.get(url + params).success(function(data){
			angular.copy(data, o.branchesData);
		}).error(function(error){
			console.log(error);
		});

		// $http.get(url).
		//{'chi nhanh 1': [], chi nhanh 2}
		//{chi nhanh: [chi nhanh 1, chi nhanh 2, chi nhanh 3], doanh_thu: [[], [], []]}
	};
	return o;
}])