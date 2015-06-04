bussinessAdmin.factory('feeService', ['$http', function($http) {
	var o = {

	};

	o.create = function(assest_category_id,fee) {
		return $http.post("/assest_categories/" + assest_category_id + "/fees.json", fee)
			.success(function(data){

			})
			.error(function(error){
				console.log(error);
			});
	};


	o.destroy = function(assest_category_id, id){
		return $http.delete("/assest_categories/" + assest_category_id + "/fees/" + id + ".json")
			.success(function(data){
			})
			.error(function(error){
				console.log(error);
			});
	};

	return o;
}]);