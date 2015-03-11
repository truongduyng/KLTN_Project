services.factory('informationService', ['$http', function($http) {
	// function InformationService() {
	// 	this.information = {};
	// 	this.get = function() {
	// 		$http.get("informations/show")
	// 			.then(function(response) {
	// 				console.log(response);
	// 				console.log(this);
					//	what is 'this' in get function
	// 				angular.copy(response.data, this.information);
	// 			});
	// 	};
	// };

	//return new InformationService();

	var o = {
		information: {},
	};

	o.get = function() {
		return $http.get("informations/show")
			.then(function(response) {
				angular.copy(response.data, o.information);
			});
	};

	o.edit = function(information){
		return $http.post("infomations/edit", information)
			.then(function(response){
				angular.copy(response.data, o.information);
			});
	};


	//For test
	o.test = {
		data: "String Ok"
	};
	o.testWatch = function(){
		o.test.data = o.test.data + "Stirng lallalaa";

	};
	return o;
}])