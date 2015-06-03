app.controller('dangBaiCtrl', ['$scope', 'postService', 'flash', '$q', 'FileUploader',
 'Flash','$http','$cookies', '$state',
	function($scope, postService, flash, $q, FileUploader, Flash, $http, $cookies, $state) {

		$scope.post = {};
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
			postService.create($scope.post)
				.success(function(data) {
					$scope.post.id = data._id.$oid;
					if (!$scope.uploader.queue || $scope.uploader.queue.length == 0) {
						onPostComplete();
					}
					$scope.uploader.uploadAll();

				}).error(function(data, status) {
					if (status == '401') {
						$scope.$emit("onRequireLogin");
					} else {
						Flash.create("danger", "Lỗi xảy ra khi post, bạn vui lòng thử lại");
					}
				});
		};

		$scope.uploader.onCompleteAll = function() {
			onPostComplete();
		};

		function onPostComplete() {
			$scope.post.title = "";
			$scope.post.body = "";
			$scope.uploader.clearQueue();
			Flash.create("success", "Bài viết của bạn đã được đăng thành công, chúng tôi sẽ duyệt và thông báo tới bạn sớm nhất có thể");
			Flash.pause();
			$state.go("chiTietBaiViet", {
				id: $scope.post.id,
			})
		};

		$scope.uploader.onBeforeUploadItem = function(file) {
			file.headers = {
				'X-CSRF-TOKEN': $cookies.get('XSRF-TOKEN'),
			};
			file.url = "/posts/" + $scope.post.id + '/add_photo.json';
		};

	}
]);