app.controller('venueDetailCtrl', ['$scope', 'VenueService', '$modal', 'Flash', 'logoFilter',
	'$state', 'currentUser',
	function($scope, VenueService, $modal, Flash, logoFilter, $state, currentUser) {

		$scope.signedIn = currentUser;

		$scope.currentUser = currentUser;
		//Update tinh trang user de xet cac quyen them xoa sua
		$scope.$on('devise:new-session', function(e, user) {
			angular.copy(user, $scope.currentUser);
			$state.reload();
		});

		$scope.$on('devise:new-registration', function(e, user) {
			angular.copy(user, $scope.currentUser);
			$state.reload();
		});

		$scope.$on('devise:login', function(e, user) {
			angular.copy(user, $scope.currentUser);
			$state.reload();
		});

		$scope.$on('devise:logout', function(e, user) {
			angular.copy(user, $scope.currentUser);
		});


		$scope.venue = VenueService.venue;

		$scope.showImage = function(photo) {
			var modalInstance = $modal.open({
				templateUrl: 'showImageModal.html',
				controller: 'showImageModalCtrl',
				size: 'lg',
				resolve: {
					photo: function() {
						return photo;
					},
					listPhotos: function() {
						return $scope.venue.photos;
					}
				}
			});
		}

		//Su kien khi load map thanh cong
		$scope.$on('mapInitialized', function(event, map) {
			console.log("mapInitialized");
			//Lay anh dai dien cho marker, lua chon 1 trong nhung tam anh nguoi dung up
			var avatar = "application/placeholder/sporta_icon.png";
			if (map.item.photos != null && map.item.photos.length >= 1) {
				avatar = map.item.photos[0].image.thumb.url;
			}

			var marker = createMarker(map.item.coordinates[1], map.item.coordinates[0], avatar);
			marker.setMap(map);
			map.setCenter(marker.getPosition());
		});

		function createMarker(lat, lng, image) {
			var position = new google.maps.LatLng(lat, lng);
			//Gan anh cho html layout cua marker
			$("#customMarker").find('.img-avatar').attr("src", logoFilter(image)).html();
			//Lay html
			var HtmlLayout = $("#customMarker").html();
			var marker = new RichMarker({
				position: position,
				flat: true,
				content: HtmlLayout,
			});
			return marker;
		};

		//Xoa venue
		$scope.onDeleteVenue = function() {
			VenueService.destroy($scope.venue).success(function() {
				Flash.create('success', "Xóa thành công chia sẻ địa điểm chơi thể thao", 'myalert');
				$state.go("home");
			});
		};


		// cho rating
		$scope.rate = {
			level: $scope.venue.your_rate_level,
			max: 5,
			status: 'Trung bình',
			overStar: null,
		};
		$scope.onHoveringRate = function(value) {
			$scope.rate.overStar = value;
			if (value == 1) {
				$scope.rate.status = 'Kém';
			}
			if (value == 2) {
				$scope.rate.status = 'Trung bình';
			}
			if (value == 3) {
				$scope.rate.status = 'Khá tốt';
			}
			if (value == 4) {
				$scope.rate.status = 'Tốt';
			}
			if (value == 5) {
				$scope.rate.status = 'Tuyệt vời';
			}
		};

		$scope.$watch('rate.level', function(newValue, oldValue, scope) {
			console.log("on watch rate level");
			if (newValue != oldValue) {
				console.log("on  rate level change");
				$scope.onRating();
			}

		});


		$scope.onRating = function() {

			VenueService.rating($scope.venue, $scope.rate);
		};
	}
]);