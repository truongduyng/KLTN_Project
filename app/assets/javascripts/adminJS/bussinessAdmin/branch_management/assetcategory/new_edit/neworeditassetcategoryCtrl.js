bussinessAdmin.controller('neworeditassetcategoryCtrl', ['$scope', 'assetCategoryService', 'feeService', 'Flash', 'branch', 'assetCategory', function($scope, assetCategoryService, feeService, Flash, branch, assetCategory) {

  if (assetCategory) {
    $scope.newCategory = assetCategory;
    if ($scope.newCategory.fees == null)
      $scope.newCategory.fees = [];
    $scope.isnew = false;
  }else {
    $scope.newCategory = {
      fees: [],
    };
    $scope.isnew = true;
  }

  $scope.time_list = "0:00 0:30 1:00 1:30 2:00 2:30 3:00 3:30 4:00 4:30 5:00 5:30 6:00 6:30 7:00 7:30 8:00 8:30 9:00 9:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00 22:30 23:00 23:30 24:00".split(" ");

  $scope.begin_time = "7:00";
  $scope.end_time = "8:00";
  $scope.price = null;

  $scope.createAssetCategory = function() {

    assetCategoryService.create({name: $scope.newCategory.name, short_desc: $scope.newCategory.short_desc, branch_id: branch._id.$oid, fees: $scope.newCategory.fees})

    .success(function(data) {
      var message = '<strong>Bingo!</strong>Thêm mới thành công loại sân: ' + $scope.newCategory.name;
      Flash.create('success', message, 'myalert');
      $scope.$close(data);
    })

    .error(function() {
      var message = "Lỗi xảy ra khi thêm mới loại sân: " + $scope.newCategory.name + ". Vui lòng thử lại";
      Flash.create('danger', message, 'myalert');
      $scope.$close();

    });
  };

  $scope.close_modal = function(){
    $scope.$close();
  }

  $scope.addFee = function(){
    $scope.newCategory.fees.push({
      begin_time: $scope.begin_time,
      end_time: $scope.end_time,
      price: $scope.price
    });

    $scope.begin_time = $scope.end_time;
    $scope.end_time = String(parseInt($scope.end_time.split(":")[0]) + 1) + ":" + $scope.end_time.split(":")[1];
    $scope.price = null;
  };

  $scope.removeFee = function(fee){
    var index = $scope.newCategory.fees.indexOf(fee);
    if(index > -1){
      $scope.newCategory.fees.splice(index, 1);
    }
  };

  $scope.updateAssetCategory = function(){
    assetCategoryService.update($scope.newCategory)

    .success(function(data){
      Flash.create('success', "Cập nhật thành công loại sân: " + $scope.newCategory.name, 'myalert');
      $scope.$close(data);
    })

    .error(function(){
      Flash.create('danger', "Lỗi xảy ra khi cập nhật loại sân: " + $scope.newCategory.name + ". Vui lòng thử lại", 'myalert');
      $scope.$close();
    });
  };
}]);