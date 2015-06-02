bussinessAdmin.controller('assetCtrl', ['$scope', 'assetService', 'Flash', '$modal', function($scope, assetService, Flash, $modal) {

  for (var i = 0; i < $scope.assets.length; i++) {
    for (var j = 0; j < $scope.categories.length; j++) {
      if ($scope.assets[i].asset_category_id.$oid == $scope.categories[j]._id.$oid)
        $scope.assets[i].asset_category = $scope.categories[j];
    };
  };

  $scope.OpenDeleteAssetModal = function (asset) {

    var deleteAsset = $modal.open({
      templateUrl: 'deleteAsset.html',
      controller: 'deleteAssetCtrl',
      size: 'sm'
    });

    deleteAsset.result.then(function () {
      $scope.deleteAsset(asset);
    }, function () {

    });
  };

  $scope.deleteAsset = function(asset){
    assetService.destroy(asset._id.$oid).success(function(){
      Flash.create('success', "Đã xóa sân " + asset.name, 'myalert');

      setTimeout(function(){
        $scope.$apply(function(){
         var index = $scope.assets.indexOf(asset);
         $scope.assets.splice(index, 1);
       });
      }, 500);
    }).error(function(){
     Flash.create('danger', "Xảy ra lỗi khi xóa sân " + $scope.selectedAsset.name, 'myalert');
   });
  };


  //new asset ----------------------------------------
  $scope.show_new_edit_asset = false;
  $scope.open_new = function(){

    $scope.isnew = true;
    $scope.asset = {
      asset_category: $scope.categories[0]
    };

    if($scope.show_new_edit_asset){
      $('.fa-minus').addClass('fa-plus');
      $('.fa-minus').removeClass('fa-minus ');
    }else{
      $('.fa-plus').addClass('fa-minus');
      $('.fa-plus').removeClass('fa-plus');
    }
    $scope.show_new_edit_asset = !$scope.show_new_edit_asset;
  }

  $scope.save = function(){

    assetService.create({
      name: $scope.asset.name,
      description: $scope.asset.description,
      branch_id: $scope.branch._id.$oid,
      asset_category_id: $scope.asset.asset_category._id.$oid
    }).success(function(data){

      $scope.assets.push(data);
      Flash.create('success', "Thêm mới thành công " + $scope.asset.name, 'myalert');
      $scope.close();
    })
    .error(function(){
      Flash.create('danger', "Thêm mới thất bại " + $scope.asset.name, 'myalert');
    });
  };

  //edit ---------------------------------------------------------------
  $scope.open_edit = function(asset){
    $scope.isnew = false;
    $scope.asset = asset;
    $scope.show_new_edit_asset = true;
  }

  $scope.save_edit = function(){

    assetService.update({
      _id: $scope.asset._id,
      name: $scope.asset.name,
      description: $scope.asset.description,
      branch_id: $scope.branch._id.$oid,
      asset_category_id: $scope.asset.asset_category._id.$oid
    })

    .success(function(){
     Flash.create('success', "Cập nhật thành công " + $scope.asset.name, 'myalert');
     $scope.close();
   })

    .error(function(){
     Flash.create('danger', "Cập nhật thất bại " + $scope.asset.name, 'myalert');
   });
  };
  //----

  $scope.close = function(){
    $scope.show_new_edit_asset = false;
  }

}]);

bussinessAdmin.controller('deleteAssetCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss(false);
  };
});