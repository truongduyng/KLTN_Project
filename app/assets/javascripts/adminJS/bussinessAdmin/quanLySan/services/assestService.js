services.factory('assestService', ['$http',
	function($http) {

		var o = {
			assestsByCategory: [],
		};

		o.getAssestsByCategory = function() {
			return $http.get("/assests/get-assests-by-category.json")
				.success(function(data) {
					angular.copy(data, o.assestsByCategory);
					console.log(data);
				})
				.error(function(data) {
					console.log(data);
				});
		};

		o.show = function(id){
			return $http.get("/assests/" + id + ".json").success(function(data){
				console.log(data);
			}).error(function(data){
				console.log(data);
			})
		};

		o.create = function(assest) {
			return $http.post("/assests.json", assest)
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log(data);
				});
		};

		o.update = function(assest) {
			return $http.put("/assests/" + assest._id.$oid + ".json", assest)
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log(data);
				});
		};

		o.destroy = function(id) {
			return $http.delete("/assests/" + id + ".json")
				.success(function(data) {
					console.log(data);
				})
				.error(function(data) {
					console.log(data);
				});
		};


		return o;
	}
]);