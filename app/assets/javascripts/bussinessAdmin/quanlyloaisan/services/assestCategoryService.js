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

	o.create = function(assest_category) {
		return $http.post('/assest_categories.json', assest_category)
			.success(function(data){
				console.log(data);
			})
			.error(function(error){
				console.log(error);
			});
	};

	o.show = function(id) {
		return $http.get("/assest_categories/" + id + ".json")
			.then(function(response) {
				return response.data;
				console.log(response);
			});
	};

	o.update = function(assestCategory) {
		var id = assestCategory._id.$oid;
		console.log(assestCategory);

		return $http.put("/assest_categories/" + id + ".json", assestCategory)
			.success(function(data){
				console.log(data);
			})
			.error(function(error){
				console.log(error);
			});
	}

	o.destroy = function(assestCategory) {
		var id = assestCategory._id.$oid;
		return $http.delete("/assest_categories/" + id + ".json")
			.success(function(data){
				console.log(data);
			})
			.error(function(error){
				console.log(error);
			});

	};
	
	return o;
}])