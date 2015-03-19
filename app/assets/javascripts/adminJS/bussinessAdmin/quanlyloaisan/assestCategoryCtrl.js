bussinessAdmin
	.controller('assestCategoryCtrl', ['$scope', '$http', 'assestCategoryService', '$state', 'feeService', 'flash', 'vndFilter', 'dateFilter',
		function($scope, $http, assestCategoryService, $state, feeService, flash, vndFilter, dateFilter) {

			$scope.showDeleteCategoryModal = false;
			$scope.showAddPriceModal = false;
			$scope.showDeletePriceModel = false;
			$scope.toogleModalDeleteCategory = function(category) {
				$scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
				$scope.selectedCategory = category;
			};

			$scope.toogleAddPriceModel = function(category) {
				$scope.showAddPriceModal = !$scope.showAddPriceModal;
				$scope.selectedCategory = category;
			};

			$scope.toogleDeletePriceModal = function(category, fee) {
				$scope.selectedFee = fee;
				$scope.selectedCategory = category;
				$scope.showDeletePriceModel = !$scope.showDeletePriceModel;
			};

			//Cho modal delete price
			$scope.deletePrice = function() {
				if ($scope.selectedFee == null || $scope.selectedCategory == null) {
					return;
				}
				var fee = $scope.selectedFee;
				var category = $scope.selectedCategory;
				feeService.destroy(category._id.$oid, fee._id.$oid)
					.success(function() {
						var index = category.fees.indexOf(fee);
						category.fees.splice(index, 1);
						flash.success = "Xóa thành công giá: " + "Từ:" + dateFilter(fee.begin_time, 'shortTime') +
							'=>' + dateFilter(fee.end_time, 'shortTime') + ', giá: ' + vndFilter(fee.price);
						$scope.selectedCategory = null;
						$scope.selectedFee = null;
						$scope.showDeletePriceModel = !$scope.showDeletePriceModel;

					})
					.error(function() {
						flash.error = "Lỗi xảy ra khi xóa giá. Vui lòng thử lại"
						$scope.showDeletePriceModel = !$scope.showDeletePriceModel;
					});
			};

			$scope.cancelDeletePrice = function() {
				$scope.showDeletePriceModel = !$scope.showDeletePriceModel;
			};
			//end Cho modal delete price

			//Cho modal them gia
			$scope.addPrice = function() {
				var category = $scope.selectedCategory;
				var newFee = $scope.newFee;
				if (category == null) {
					return;
				}
				feeService
					.create(category._id.$oid, newFee)
					.success(function(data) {
						if (category.fees == null) {
							category.fees = [];
						}
						category.fees.push(data);
						//reset data
						$scope.newFee.begin_time = "12:00am";
						$scope.newFee.end_time = "12:00am";
						$scope.newFee.price = 0;
						flash.success = "Thêm thành công giá cho loại sân: " + category.name;
						$scope.showAddPriceModal = !$scope.showAddPriceModal;
					})
					.error(function() {
						flash.error = "Lỗi thêm giá cho loại sân: " + category.name;
						$scope.newFee.begin_time = "12:00am";
						$scope.newFee.end_time = "12:00am";
						$scope.newFee.price = 0;
						$scope.showAddPriceModal = !$scope.showAddPriceModal;
					});
			};
			//end Cho modal them gia

			//Modal cho xoa loai hang san
			$scope.deleteCategory = function() {
				var category = $scope.selectedCategory;
				assestCategoryService
					.destroy(category)
					.success(function() {
						var index = $scope.categories.indexOf(category);
						$scope.categories.splice(index, 1);
						flash.success = "Xóa thành công loại sân: " + category.name;
						$scope.selectedCategory = null;
						$scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
					})
					.error(function() {
						$scope.selectedCategory = null;
						flash.success = "Lỗi xảy ra khi xóa loại sân : " + category.name + ". Vui lòng thử lại";
						$scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
					});
			};

			$scope.cancelDeleteCategory = function() {
				$scope.selectedCategory = null;
				$scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
			};
			//End Modal cho xoa loai hang san

			$scope.categories = assestCategoryService.categories;
			$scope.newCategory = {
				fees: [],
			};

			$scope.newFee = {
				begin_time: "12:00am",
				end_time: "12:00am",
				price: 0,
			};

			$scope.createAssestCategory = function() {
				assestCategoryService
					.create($scope.newCategory)
					.success(function() {
						flash.success = "Thêm mới thành công loại sân: " + $scope.newCategory.name;
						$state.go("quanlyloaisan");
					})
					.error(function() {
						flash.error = "Lỗi xảy ra khi thêm mới loại sân: " + $scope.newCategory.name + ". Vui lòng thử lại";
						$state.go("quanlyloaisan");
					});
			};


			// $scope.deleteAssestCategory = function(assestCategory) {
			// 	assestCategoryService
			// 		.destroy(assestCategory)
			// 		.success(function() {
			// 			var index = $scope.categories.indexOf(assestCategory);
			// 			$scope.categories.splice(index, 1);

			// 		})
			// 		.error(function(){

			// 		});
			// };

			$scope.goBack = function() {
				$state.go("quanlyloaisan");
			};
		}
	]);