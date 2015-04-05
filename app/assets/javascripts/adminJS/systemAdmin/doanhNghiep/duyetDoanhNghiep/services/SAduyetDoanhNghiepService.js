app.factory('SAduyetDoanhNghiepService', ['$http', '$q', function($http, $q) {

	var o = {
		bussinessRequests: [],
		total: 0,
	};

	o.getBussinessRequests = function(page, per_page) {

		var url = "/system_admin_bussiness_requests.json";
		var query = "?page=" + page + "&per_page=" + per_page;

		var canceller = $q.defer();
		var cancel = function(reason) {
			canceller.resolve(reason);
		};

		var promise = $http.get(url + query, {
			timeout: canceller.promise
		}).success(function(data) {
			angular.copy(data.bussiness_requests, o.bussinessRequests);
			o.total = data.total;
			//Neu du lieu lay ve ma ko co, nhung total >= 1, suy ra load lai tu trang 1. Xu ly 
			//truong hop khi ma da xu ly het du lieu o trang 1, va du lieu chi con 1 trang, khi do ko the lay
			//dc du lieu o trang 2, do du lieu trang 2 h thanh trang 1
			if (data.bussiness_requests.length == 0 && data.total >= 1) {
				o.getBussinessRequests(1, per_page);
			}
		});
		return {
			promise: promise,
			cancel: cancel,
		};
	};

	//Chap nhan 1 yeu cau bussiness
	o.accept = function(bussinessRequest) {
		var id = bussinessRequest._id.$oid;
		var url = "/system_admin_bussiness_requests/" + id + "/accept.json";
		return $http.put(url).success(function(data) {
			_.find(o.bussinessRequests, function(item, index) {
				if (item._id.$oid == bussinessRequest._id.$oid) {
					o.bussinessRequests.splice(index, 1);
					return true;
				}
			});
		});
	};

	//Tu choi 1 yeu cau bussiness
	o.deny = function(bussinessRequest) {
		var id = bussinessRequest._id.$oid;
		var url = "/system_admin_bussiness_requests/" + id + "/deny.json";
		return $http.put(url).success(function(data) {
			_.find(o.bussinessRequests, function(item, index) {
				if (item._id.$oid == bussinessRequest._id.$oid) {
					o.bussinessRequests.splice(index, 1);
					return true;
				}
			});
		});
	}
	return o;
}]);