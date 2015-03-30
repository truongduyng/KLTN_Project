app.controller('changeAvatarCtrl', ['$scope', 'FileUploader', '$cookies', '$modalInstance'
	, function($scope, FileUploader, $cookies, $modalInstance) {
	//Cho anh avatar
	$scope.uploader = new FileUploader();
	$scope.myImage = '';
	$scope.myCroppedImage = '';

	//Save cropped image lam avatar
	$scope.save = function(){
		var blob = dataURItoBlob($scope.myCroppedImage);
		//Add blob vao uploader
		$scope.uploader.addToQueue(blob);
		//Tien hanh upload
		$scope.uploader.uploadAll();
	};

	//Callback duoc goi truoc khi upload
	$scope.uploader.onBeforeUploadItem = function(file) {
		file.headers = {
			'X-CSRF-TOKEN': $cookies['XSRF-TOKEN'],
		};
		file.url = "/custom_users/change_avatar.json";
	};
	//Callback khi upload hoan tat
	$scope.uploader.onSuccessItem  = function(item, data, status, headers){
		//Vi duong dan avatar.url co the giong nhau nen do do src cua img ko thay doi, do do ng-src ko load lai
		//anh, vi the gan paramter vao cuoi link cua image de thay doi no, de ng-src load lai no
		//http://stackoverflow.com/questions/18235169/understanding-angularjs-ng-src
		data.avatar.url = data.avatar.url + "?" + new Date().getTime();
		$modalInstance.close(data);
	};

	//Chuyen dataUri thanh Blob de upload
	function dataURItoBlob(dataURI) {
		var binary = atob(dataURI.split(',')[1]);
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], {
			type: mimeString
		});
	};
}]);