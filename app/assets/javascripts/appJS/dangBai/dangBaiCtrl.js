app.controller('dangBaiCtrl', ['$scope', 'postService', 'FileUploader',
	'Flash', '$http', '$cookies', '$state', 'tagService',
	function($scope, postService, FileUploader, Flash, $http, $cookies, $state, tagService) {
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
			//gan tags cho post
			console.log("tags: ", $scope.tags);
			$scope.post.tag_ids = _.map($scope.tags, function(tag){
				return tag._id.$oid;
			});
			console.log("post: ", $scope.post);
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
						Flash.create("danger", "Lỗi xảy ra khi post, bạn vui lòng thử lại", 'myalert');
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
			Flash.create("success", "Bài viết của bạn đã được đăng thành công, chúng tôi sẽ duyệt và thông báo tới bạn sớm nhất có thể", 'myalert');
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


		$scope.onShowFileDialog = function() {
			console.log("on onShowFileDialog");
			$("#addImageInput").click();
		};


		//cho tags
		// $scope.tags = [{
		// 		text: 'Tag1'
		// 	},

		// 	{
		// 		text: 'Tag2'
		// 	},

		// 	{
		// 		text: 'Tag3'
		// 	}

		// ];
		$scope.tags = [];
		$scope.listTags = tagService.tags;
		$scope.loadTags = function() {
			return $scope.listTags;
		};

		// $scope.loadTags = function(query) {

		// 	return [

		// 		{
		// 			"text": "Tag1"
		// 		},

		// 		{
		// 			"text": "Tag2"
		// 		},

		// 		{
		// 			"text": "Tag3"
		// 		},

		// 		{
		// 			"text": "Tag4"
		// 		},

		// 		{
		// 			"text": "Tag5"
		// 		},

		// 		{
		// 			"text": "Tag6"
		// 		},

		// 		{
		// 			"text": "Tag7"
		// 		},

		// 		{
		// 			"text": "Tag8"
		// 		},

		// 		{
		// 			"text": "Tag9"
		// 		},

		// 		{
		// 			"text": "Tag10"
		// 		}

		// 	]


		// };
	}
]);