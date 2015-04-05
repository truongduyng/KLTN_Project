app.controller('SAduyetDoanhNghiepCtrl', ['$scope', 'SAduyetDoanhNghiepService', 'logoFilter',
	function($scope, duyetDoanhNghiepService, logoFilter) {
		$scope.message = "this is message";

		$scope.bussinessRequests = duyetDoanhNghiepService.bussinessRequests;
		console.log("bussinessRequests", $scope.bussinessRequests);
		//Cau hinh pagination
		$scope.pageConfig = {};
		angular.copy($scope.$root.rootPageConfig, $scope.pageConfig);
		$scope.pageConfig.total = duyetDoanhNghiepService.total;

		$scope.addedBussinessRequests = [];

		initIsChecked();

		$scope.ontoggleBussinessRequest = function(bussinessRequest) {
			//Neu trang thai la 'Them' thi them no vao ds xem chi tiet
			if (bussinessRequest.isChecked == true) {
				$scope.addedBussinessRequests.splice($scope.addedBussinessRequests.length, 0, bussinessRequest);
			} else {
				//Neu trang thai la 'Bo' thi xoa no khoi danh sach xem chi tiet
				removeBussinessRequestFromDetail(bussinessRequest);
			}
		};

		$scope.onIgnore = function(bussinessRequest) {
			removeBussinessRequestFromDetail(bussinessRequest);
			//Do moi thu load theo phan trang nen ko cung doi tuong, do do phai tim no theo id
			_.find($scope.bussinessRequests, function(item, index) {
				if (item._id.$oid == bussinessRequest._id.$oid) {
					item.isChecked = false;
					return true;
				}
			});
		};

		//Chap nhan 1 bussiness request
		$scope.acceptBussinessRequest = function(bussinessRequest) {
			duyetDoanhNghiepService.accept(bussinessRequest).success(function(data) {
				var index = $scope.addedBussinessRequests.indexOf(bussinessRequest);
				$scope.addedBussinessRequests.splice(index, 1);
				_.find($scope.bussinessRequests, function(item, index) {
					if (item._id.$oid == bussinessRequest._id.$oid) {
						$scope.bussinessRequests.splice(index, 1);
						return true;
					}
				});
			});
		};

		//TU choi 1 yeu cau bussiness request
		$scope.denyBussinessRequest = function(bussinessRequest) {
			duyetBaiVietService.deny(bussinessRequest).success(function(data) {
				var index = $scope.addedBussinessRequests.indexOf(bussinessRequest);
				$scope.addedBussinessRequests.splice(index, 1);
				_.find($scope.bussinessRequests, function(item, index) {
					if (item._id.$oid == bussinessRequest._id.$oid) {
						$scope.bussinessRequests.splice(index, 1);
						return true;
					}
				});
			});
		};

		//Xu ly phan trang
		var request = null;
		$scope.isLoading = false;
		$scope.onPageSelected = function(content, page) {
			//Khi ma co yeu trang moi thi neu co request trong trang cu thi cancel no
			if (request) {
				request.cancel();
			}
			$scope.isLoading = true;
			request = duyetDoanhNghiepService.getBussinessRequests(page, $scope.pageConfig.pageSize);
			request.promise.success(function() {
				$scope.isLoading = false;
				//Duyet kiem tra thu nhung item moi load, item nao da co trong danh sach xem chi tiet
				initIsChecked();
				_.each($scope.bussinessRequests, function(item) {
					_.find($scope.addedBussinessRequests, function(item2) {
						if (item._id.$oid == item2._id.$oid) {
							item.isChecked = true;
							return true;
						}
					});

				});
				//Do khi duyet so yeu cau da dc duyet co the giam nen phai gan lai total
				$scope.pageConfig.total = duyetDoanhNghiepService.total;
			}).error(function() {});
		};

		//Khoi tao isChecked cho moi item, mac dinh no ko dc them vao ds xem chi tiet
		function initIsChecked() {
			$scope.bussinessRequests.forEach(function(bussinessRequest) {
				bussinessRequest.isChecked = false;
			});
		}

		//Giup loai bo nhung item da them trong danh sach chi tiet chinh xac dua vao id
		function removeBussinessRequestFromDetail(bussinessRequest) {
			_.find($scope.addedBussinessRequests, function(item, index) {
				if (item._id.$oid == bussinessRequest._id.$oid) {
					$scope.addedBussinessRequests.splice(index, 1);
					return true;
				}
			});
		};


		//Su kien khi load map thanh cong
		$scope.$on('mapInitialized', function(event, map) {
			var marker =createMarker(map.item.latitude, map.item.longitude, map.item.user.avatar.url);
			marker.setMap(map);
			map.setCenter(marker.getPosition());
		});

		function createMarker(lat, lng, image) {
			var position = new google.maps.LatLng(lat, lng);
			//Gan anh cho html layout cua marker
			$("#customMarker").find('.img-avatar').attr("src", image).html();
			//Lay html
			var HtmlLayout =  $("#customMarker").html();
			var marker = new RichMarker({
				position: position,
				draggable: true,
				flat: true,
				content: HtmlLayout,
			});
			return marker;
		};

		// var marker = null;

		// function setMarker(position) {
		// 	$scope.bussinessRequest.latitude = position.lat;
		// 	$scope.bussinessRequest.longitude = position.lng;
		// 	//Bo marker cu
		// 	if (marker) {
		// 		marker.setMap(null);
		// 	}
		// 	//Tao ra marker tai vi tri moi
		// 	marker = createMarker(position.lat, position.lng);
		// 	marker.setMap($scope.map);
		// 	$scope.map.setCenter(marker.getPosition());
		// 	$scope.map.setZoom(15);
		// 	//Dang ki su kien dragend cho marker de lay vi tri moi	
		// 	google.maps.event.addListener(marker, 'dragend', function() {
		// 		$scope.bussinessRequest.latitude = marker.getPosition().lat();
		// 		$scope.bussinessRequest.longitude = marker.getPosition().lng();
		// 		console.log("bussinessRequest: ", $scope.bussinessRequest);
		// 	});
		// };
	}
]);