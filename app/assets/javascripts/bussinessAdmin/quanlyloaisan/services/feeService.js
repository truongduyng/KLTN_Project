bussinessAdmin.factory('feeService', ['$http', function($http) {
	var o = {

	};
	
	o.create = function(assest_category_id,fee) {
		return $http.post("/assest_categories/" + assest_category_id + "/fees.json", fee)
			.then(function(response) {
				console.log(response);
			}, function(response) {
				console.log(response);
			});;
	};

	o.destroy = function(assest_category_id, id){
		return $http.delete("/assest_categories/" + assest_category_id + "/fees/" + id + ".json", fee)
			.then(function(response) {
				console.log(response);
			}, function(response) {
				console.log(response);
			});;
	};
	
	return o;
}])