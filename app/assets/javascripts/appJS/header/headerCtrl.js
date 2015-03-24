app.controller('headerCtrl', ['$scope', '$http', function($scope, $http){
	$scope.searchbranch = function(){
		handler = Gmaps.build('Google');
		handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
			return $http.get("/search/" + $scope.query).success(function(data){
				var markers = handler.addMarkers(data);
				// handler.getMap().setZoom(17);
				// handler.map.centerOn(markers[0]);
				handler.bounds.extendWith(markers);
				handler.fitMapToBounds();
			});
		});	
	};
}]);