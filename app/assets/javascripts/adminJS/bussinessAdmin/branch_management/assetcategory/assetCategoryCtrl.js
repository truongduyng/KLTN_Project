bussinessAdmin.controller('assetCategoryCtrl', ['$scope', '$http', 'assetCategoryService', '$state', 'feeService', 'Flash', 'vndFilter', 'dateFilter', '$modal',
  function($scope, $http, assetCategoryService, $state, feeService, Flash, vndFilter, dateFilter, $modal) {

    $scope.open_new = function(){
      var assetCategory_new = $modal.open({
        templateUrl: "adminJS/bussinessAdmin/branch_management/assetcategory/_new.html",
        controller: "newassetcategoryCtrl",
        size: 'lg',
        resolve:{
          branch: function(){
            return $scope.branch;
          }
        }
      });
      assetCategory_new.result.then(function (cate) {
        $scope.categories.push(cate);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

  //Modal cho xoa loai hang san
  $scope.deleteCategory = function(category) {
    assetCategoryService.destroy(category)
    .success(function() {
      var index = $scope.categories.indexOf(category);
      $scope.categories.splice(index, 1);
      Flash.create('success', "Xóa thành công loại sân: " + category.name, 'myalert');
    })
    .error(function() {

      Flash.create('success', "Lỗi xảy ra khi xóa loại sân : " + category.name + ". Vui lòng thử lại" , 'myalert');
    });
  };

}
]);