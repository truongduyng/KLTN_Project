app.controller('editPostCtrl', ['$scope', 'editPostService', 'FileUploader', 'Flash', '$http', '$cookies', '$state', '$rootScope',
	function($scope, editPostService, FileUploader, Flash, $http, $cookies, $state, $rootScope) {
		$scope.post = editPostService.post;

		$scope.uploader = new FileUploader();
		//filter for image
		$scope.uploader.filters.push({
			name: 'imageFilter',
			fn: function(item, options) {
				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			}
		});

		$scope.onPost = function() {
			editPostService.update($scope.post, $scope.deletedPhotos)
				.success(function(data) {
					$scope.post.id = data._id.$oid;
					if (!$scope.uploader.queue || $scope.uploader.queue.length == 0) {
						onPostComplete();
					}
					$scope.uploader.uploadAll();

				}).error(function(data, status) {
					if (status != '401') {
							Flash.create("danger", "Lỗi xảy ra khi post, bạn vui lòng thử lại");
					}
				});
		};

		//Callback cua ham uploader.uploadAll()
		$scope.uploader.onCompleteAll = function() {
			onPostComplete();
		};

		function onPostComplete() {
			$scope.post.title = "";
			$scope.post.body = "";
			$scope.post.photos.splice(0, $scope.post.photos.length);
			$scope.uploader.clearQueue();

			if($scope.post.status.name == 'Từ chối'){
				//Khi bai viet da dc duyet va bi tu choi thi ko thong bao nhu ben duoi
			}else{
				Flash.create("success", "Bài viết của bạn đã được cập nhật thành công, chúng tôi sẽ duyệt và thông báo tới bạn sớm nhất có thể");
			}

			$state.go("chiTietBaiViet", {
				id: $scope.post.id,
			})
		};

		$scope.uploader.onBeforeUploadItem = function(file) {
			file.headers = {
				'X-CSRF-TOKEN': $cookies.get('XSRF-TOKEN'),
			};
			file.url = "/posts/" + $scope.post._id.$oid + '/add_photo.json';
		};


		$scope.removeImage = function(photo){
			if($scope.deletedPhotos == null){
				$scope.deletedPhotos = [];
			}
			//Luu lai 1 mang id cua nhung tam anh can xoa
			$scope.deletedPhotos.splice(0,0, photo._id.$oid);
			//Xoa bo nho ra de khoi hien thi
			var index = $scope.post.photos.indexOf(photo);
			$scope.post.photos.splice(index, 1);
		};
	}
]);

//Xu ly trang do login rui moi dc vao
//Xu ly not found