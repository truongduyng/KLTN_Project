services.factory('assestCategoryService', ['$http', function($http) {
	var o = {
		categories: [],

	};

	o.index = function() {
		$http.get('/assest_categories.json')
			.then(function(response) {
				angular.copy(response.data, o.categories);
			});
	};
	
	o.create = function(assest_category){
		return $http.post('/assest_categories.json', assest_category)
			.then(function(response){
				console.log(response);
			}, function(response){
				console.log(response);
			});
	};

	return o;
}])