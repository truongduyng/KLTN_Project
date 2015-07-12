app.controller('neworeditassetcategoryCtrl', ['$scope', 'assetCategoryService', 'feeService', 'Flash', 'branch', 'assetCategory', 'tickets', '$modalInstance', function($scope, assetCategoryService, feeService, Flash, branch, assetCategory, tickets, $modalInstance) {

  if (assetCategory) {
    $scope.newCategory = assetCategory;
    if ($scope.newCategory.fees == null){
      $scope.newCategory.fees = [];
    }
    $scope.isnew = false;
    $scope.time_list = [];
  }else {
    $scope.newCategory = {
      fees: [],
    };
    $scope.isnew = true;
    $scope.time_list = [];
    for (var i = tickets.change_time_to_float(branch.begin_work_time); i <= tickets.change_time_to_float(branch.end_work_time); i+=0.5) {
      $scope.time_list.push(tickets.hourtoview(i));
    };

    $scope.begin_time = $scope.time_list[0];
    $scope.end_time = $scope.time_list[2];
    $scope.price = null;
  }

  $scope.createAssetCategory = function() {

    if($scope.time_list.length > 1){
      Flash.create('danger', 'Bạn cần thêm giá phí cho toàn bộ thời gian hoạt động.', 'myalert');
      return false;
    }

    assetCategoryService.create({name: $scope.newCategory.name, short_desc: $scope.newCategory.short_desc, branch_id: branch._id.$oid, fees: $scope.newCategory.fees})

    .success(function(data) {
      var message = '<strong>Bingo!</strong>Thêm mới thành công loại sân: ' + $scope.newCategory.name;
      Flash.create('success', message, 'myalert');
      $modalInstance.close(data);
    })

    .error(function() {
      var message = "Lỗi xảy ra khi thêm mới loại sân: " + $scope.newCategory.name + ". Vui lòng thử lại";
      Flash.create('danger', message, 'myalert');
      $modalInstance.dismiss('cancel');
    });
  };

  $scope.addFee = function(){

    if($scope.price == null || $scope.price == ''){
      Flash.create('danger', 'Chưa thêm giá phí', 'myalert');
      return false;
    }

    if(tickets.change_time_to_float($scope.begin_time) >= tickets.change_time_to_float($scope.end_time)){
      Flash.create('danger', 'Giờ kết thúc phải lớn hơn giờ bắt đầu!', 'myalert');
      return false;
    }

    $scope.newCategory.fees.push({
      begin_time: $scope.begin_time,
      end_time: $scope.end_time,
      price: $scope.price
    });

    for (var i = tickets.change_time_to_float($scope.begin_time); i < tickets.change_time_to_float($scope.end_time); i+=0.5) {
      $scope.time_list.splice($scope.time_list.indexOf(tickets.hourtoview(i)),1);
    }

    $scope.begin_time = $scope.end_time;
    $scope.end_time = String(parseInt($scope.end_time.split(":")[0]) + 1) + ":" + $scope.end_time.split(":")[1];
    $scope.price = null;
  };

  $scope.removeFee = function(fee){
    var index = $scope.newCategory.fees.indexOf(fee);
    if(index > -1){
      $scope.newCategory.fees.splice(index, 1);
      for (var i = tickets.change_time_to_float(fee.begin_time); i <= tickets.change_time_to_float(fee.end_time); i+=0.5) {
        if($scope.time_list.indexOf(tickets.hourtoview(i)) < 0){
          $scope.time_list.push(tickets.hourtoview(i));
        }
      }
      $scope.time_list.sort(function(a,b){ return tickets.change_time_to_float(a) - tickets.change_time_to_float(b)});
    }
  };

  $scope.updateAssetCategory = function(){

    if($scope.time_list.length > 1){
      Flash.create('danger', 'Bạn cần thêm giá phí cho toàn bộ thời gian hoạt động.', 'myalert');
      return false;
    }

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