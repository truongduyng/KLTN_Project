app.controller('dangBaiCtrl', ['$scope', 'postService', 'flash', '$q',
	function($scope, postService, flash, $q) {
		//  flash.error = "That bai nek";
		// // // flash.success = "Thanh cong nek";
		$scope.post = {
			photos: []
		};
		$scope.isUploadFinish = true;
		$scope.onPost = function() {
			console.log($scope.post);
			postService.create($scope.post)
				.success(function() {
					$scope.post.title = '';
					$scope.post.body = '';
					angular.copy([], $scope.post.photos);
					flash.success = 'Bài viết của bạn đã được đăng thành công, chúng tôi sẽ duyệt và thông báo tới bạn sớm nhất có thể';
				})
				.error(function(data) {
					console.log(data);
					flash.error = "Lỗi xảy ra khi post, bạn vui lòng thử lại";
				});
		};


		//Add file moi thi upload no len
		$scope.$watch('file', function(newValue) {
			console.log("on watch file");
			console.log(newValue);
			$scope.upload(newValue);
		});

		// $scope.upload = function(file) {
		// 	console.log(file);
		// 	if (file) {
		// 		$upload.upload({
		// 			url: '/photos',
		// 			file: file,
		// 		}).progress(function(evt) {

		// 		}).success(function(data, status, headers, config) {
		// 			console.log("on success upload");
		// 			console.log(data);
		// 			//Upload thanh cong dua no vao photos cua post
		// 			$scope.post.photos.push({
		// 				id: data._id.$oid,
		// 				image: data.image.large_thumb.url,
		// 			});
		// 		}).error(function() {
		// 			console.log("error on upload");
		// 		});
		// 	}
		// };

		// $scope.upload = function(file) {
		// 	console.log(file);
		// 	if (file) {
		// 		$upload.upload({
		// 			url: '/posts/add_photo',
		// 			file: file,
		// 		}).progress(function(evt) {

		// 		}).success(function(data, status, headers, config) {
		// 			console.log("on success upload");
		// 			console.log(data);
		// 			//Upload thanh cong dua no vao photos cua post
		// 			$scope.post.photos.push({
		// 				id: data._id.$oid,
		// 				image: data.image.large_thumb.url,
		// 			});
		// 		}).error(function() {
		// 			console.log("error on upload");
		// 		});
		// 	}
		// };

		$scope.upload = function(file) {
			if (file) {
				var deferred = $q.defer();
				$scope.isUploadFinish = false;
				console.log(postForm);
				postService.add_photo(file, $scope.post)
					.progress(function(evt) {
					}).success(function(data, status, headers, config) {
						console.log("on success upload");
						console.log(data);
						
						//Upload xong thi thay the anh placeholder bang anh da upload
						$scope.post.photos.forEach(function(photo){
							if(photo.index == data.index){
								photo.id = data._id.$oid;
								photo.image = data.image.image.large_thumb.url;
								photo.isUploading = false;
								return;
							}
						});

						//Kiem tra xem tat ca tam anh da dc upload het chua
						var isFinished = true;
						$scope.post.photos.forEach(function(photo){
							if(photo.isUploading){
								isFinished = false;
							}
						});
						
						if(isFinished){
							$scope.isUploadFinish = true;
						};
					}).error(function(data) {
						console.log("error on upload");
						//Xoa anh placeholder ma o vi tri anh loi
						var errorPhoto;
						$scope.post.photos.forEach(function(photo){
							if(photo.index == data.index){
								errorPhoto = photo;
							}
						});
						var index = $scope.post.photos.indexOf(errorPhoto);
						$scope.post.photos.splice(index, 1);
					});

			}
		};

		$scope.removeImage = function(photo) {
			var id = photo.id;
			postService.delete_photo(id).success(function() {
				var index = $scope.post.photos.indexOf(photo);
				$scope.post.photos.splice(index, 1);
			});
		};

		function clear() {
			if (!$scope.photos.empty()) {
				$scope.photos.each(function(photo) {
					photoService.destroy(photo.id);
				});
			}
		};
	}
]);

//HIen thi qua trinh upload photo
//Chua upload xong photo chua dc dang bang cach set form invalid
//Chuyen button khi dang post thanh disable dung bootstrap
//Khi ma chua dang nhap thi ko dc lam
//Chinh sua lai flash cho hop ly
//Khi ma upload anh nhung post roi trang thi xoa het tat ca anh da up