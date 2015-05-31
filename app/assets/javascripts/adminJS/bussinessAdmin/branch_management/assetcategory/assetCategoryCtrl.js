bussinessAdmin.controller('assetCategoryCtrl', ['$scope', '$http', 'assetCategoryService', '$state', 'feeService', 'Flash', 'vndFilter', 'dateFilter', '$modal',
  function($scope, $http, assetCategoryService, $state, feeService, Flash, vndFilter, dateFilter, $modal) {

    $scope.open_new = function(){
      var assetCategory_new = $modal.open({
        templateUrl: "adminJS/bussinessAdmin/branch_management/assetcategory/_new.html",
        controller: "modalCtrl",
        size: 'lg',
        resolve:{
          branch: function(){
            return $scope.branch;
          }
        }
      });
    }

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
      Flash.success = "Xóa thành công giá: " + "Từ:" + dateFilter(fee.begin_time, 'shortTime') +
      '=>' + dateFilter(fee.end_time, 'shortTime') + ', giá: ' + vndFilter(fee.price);
      $scope.selectedCategory = null;
      $scope.selectedFee = null;
      $scope.showDeletePriceModel = !$scope.showDeletePriceModel;

    })
    .error(function() {
      Flash.error = "Lỗi xảy ra khi xóa giá. Vui lòng thử lại"
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
    Flash.success = "Thêm thành công giá cho loại sân: " + category.name;
    $scope.showAddPriceModal = !$scope.showAddPriceModal;
  })
    .error(function() {
      Flash.error = "Lỗi thêm giá cho loại sân: " + category.name;
      $scope.newFee.begin_time = "12:00am";
      $scope.newFee.end_time = "12:00am";
      $scope.newFee.price = 0;
      $scope.showAddPriceModal = !$scope.showAddPriceModal;
    });
  };
  //end Cho modal them gia

  //Modal cho xoa loai hang san
  $scope.deleteCategory = function(category) {
    assetCategoryService.destroy(category)
    .success(function() {
      var index = $scope.categories.indexOf(category);
      $scope.categories.splice(index, 1);
      Flash.success = "Xóa thành công loại sân: " + category.name;
      $scope.selectedCategory = null;
      $scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
    })
    .error(function() {
      $scope.selectedCategory = null;
      Flash.success = "Lỗi xảy ra khi xóa loại sân : " + category.name + ". Vui lòng thử lại";
      $scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
    });
  };

  $scope.cancelDeleteCategory = function() {
    $scope.selectedCategory = null;
    $scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
  };
}
]);