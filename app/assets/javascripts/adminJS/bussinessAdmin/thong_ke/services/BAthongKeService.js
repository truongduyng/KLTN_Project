app.factory('BAthongKeService', ['$http', function ($http) {
	var o = {
		branchesData: {},
		thongKeTheoNgayTrongTuan :{},
	};

	o.getThongKeTheoNgayTrongTuan = function(from, to){
		var url = "/bussinesses/thong_ke_theo_ngay_trong_tuan.json";
		var params = "?from=" + from + "&to=" + to;
		console.log("in getThongKeTheoNgayTrongTuan()");
		return $http.get(url + params).success(function(data){
			angular.copy(data, o.thongKeTheoNgayTrongTuan);
		}).error(function(error){
			console.log(error);
		});
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

	//Get ngay dau tuan
	o.getMonday = function(d) {
		d = new Date(d);
		var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}
	return o;
}])