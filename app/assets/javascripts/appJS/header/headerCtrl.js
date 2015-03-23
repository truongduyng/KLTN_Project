app.controller('headerCtrl', ['$scope', '$http', function($scope, $http){
	$scope.searchbranch = function(){
		console.log($scope.query);
		handler = Gmaps.build('Google');
		handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
			return $http.get("/search/" + $scope.query).success(function(data){
				console.log("/search/" + $scope.query+ "thanh pho Ho Chi Minh");
				var markers = handler.addMarkers(data);
				console.log(markers);
				handler.bounds.extendWith(markers);
				handler.fitMapToBounds();
			});
		});	
	};
}]);