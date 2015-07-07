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
			days = ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật'];
			result = {
				title: from.toDateString() + " --> " + to.toDateString(),
				labels: days,
				series: data.chi_nhanh,
				data: data.doanh_thu,
			};
			angular.copy(result, o.thongKeTheoNgayTrongTuan);

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
		if(!d.is().monday()){
			d.last().monday();
		}
		return d;
		// d = new Date(d);
		// var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		// return new Date(d.setDate(diff));
	}

	//GEt ngay cuoi tuan
	o.getSunday = function(d){
		if(!d.is().sunday()){
			d.next().sunday();
		}
		return d;
	}

	o.vndFilter = function(price){
		//1 => 1.000 VND
		//20 => 20.000 VND
		//200 => 200.000 VND
		price = price.toString();
		if(price.length >=1 && price.length <= 3){
			price = price + ".000" + " VND"; 
			return price;
		}

		//0 => 0 
		//1000 => 1.000.000 VND
		//10000 => 10.000.000 VND
		//100000 => 100.000.000 VND
		// if(price.length == 4){
		// 	price = price.slice(0, 1) + "." + price.slice(1, price.length) + ".000" + "VND";
		// 	return price;
		// }
		// if(price.length == 5){
		// 	price = price.slice(0, 2) + "." + price.slice(2, 2+3) + ".000" + "VND";
		// 	return price;
		// }
		// if(price.length == 6){
		// 	price = price.slice(0, 3) + "." + price.slice(3, 3+3) + ".000" + "VND";
		// 	return price;
		// }
		if(price.length == 1 && price == '0'){
			return price + ".000" + " VND";
		}
		if(price.length >= 4 && price.length <= 6){
			price = price.slice(0, price.length - 3) + "." + price.slice(price.length - 3, price.length) + ".000" + " VND";
			return price;
		}

		//1000000 => 1.000.000.000 VND
		//10000000 => 10.000.000.000 VND
		//100000000 => 100.000.000.000 VND
		if(price.length == 7){
			price = price.slice(0,1) + "." + price.slice(1, 3) + "." + price.slice(1 + 3, 3) + ".000" + " VND";
			return price;
		}
		if(price.length == 8){
			price = price.slice(0,2) + "." + price.slice(2,3) + "." + price.slice(2 + 3, 3) + ".000" + " VND";
			return price;
		}
		
	}

	function chuyenDoanhThuSangVND(doanhThu){
		doanhThu =  _.map(doanhThu, function(array){
			array = _.map(array, function(item){
				item = vndFilter(item);
				console.log("chuyen: ", item);
				return item;
			});
			console.log("array dc chuyen: ", array);
			return array;
		});

		console.log("Doanh thu: ", doanhThu);
		return doanhThu;
	};
	return o;
}])