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
			.then(function(response) {

				console.log(response);
			}, function(response) {
				console.log(response);
			});
	};

	o.show = function(id) {
		return $http.get("/assest_categories/" + id + ".json")
			.then(function(response) {
				return response.data;
				console.log(response);
			}, function(response) {
				console.log(response);
			});
	};

	o.update = function(assestCategory) {
		var id = assestCategory._id.$oid;
		console.log(assestCategory);

		return $http.put("/assest_categories/" + id + ".json", assestCategory)
			.then(function(response) {
				console.log(response);
			}, function(response) {
				console.log(response);
			});
	}

	o.destroy = function(assestCategory) {
		var id = assestCategory._id.$oid;
		return $http.delete("/assest_categories/" + id + ".json", assestCategory)
			.then(function(response) {
				console.log(response);
			}, function(response) {
				console.log(response);
			});

	};
	
	return o;
}])