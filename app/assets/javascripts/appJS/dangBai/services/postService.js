app.factory('postService', ['$http', '$upload', function($http, $upload) {
	var o = {};
	var index = 0;
	o.create = function(post) {
		return $http.post("/posts.json", post)
			.success(function(data) {
				console.log(data);
			}).error(function(data) {
				console.log(data);
			});
	};

	// o.add_photo = function(photo, post) {
	// 	//Push anh placeholder cho thay dang upload
	// 	post.photos.push({
	// 		image: '/assets/application/placeholder/spinner.gif',
	// 		index: index,
	// 		isUploading: true,
	// 	});

	// 	var promise =  $upload.upload({
	// 		url: '/posts/add_photo',
	// 		file: photo,
	// 		fields: {
	// 			'index': index,
	// 		}
	// 	});
	// 	index = index + 1;
	// 	return promise;
	// };

	// o.delete_photo = function(id) {
	// 	return $http.delete("/posts/delete_photo/" + id + ".json")
	// 		.success(function(data) {
	// 			console.log(data);
	// 		}).error(function(data) {
	// 			console.log(data);
	// 		});
	// };

	o.add_photo = function(photo, post) {
		//Push anh placeholder cho thay dang upload
		post.photos.push({
			image: '/assets/application/placeholder/spinner.gif',
			index: index,
			isUploading: true,
		});

		var promise =  $upload.upload({
			url: '/photos',
			file: photo,
			fields: {
				'index': index,
			}
		});

		index = index + 1;
		return promise;
	};


	o.delete_photo = function(id) {
		return $http.delete("/photos/" + id + ".json")
			.success(function(data) {
				console.log(data);
			}).error(function(data) {
				console.log(data);
			});
	};

	return o;
}])