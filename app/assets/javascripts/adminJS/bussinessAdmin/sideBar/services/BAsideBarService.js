app.factory('BAsideBarService', ['$http', function($http) {
	var o = {
		branches: [],
	};

	o.get_list_branches = function(){
		var url = "/branches/list_branch_names.json";
		return $http.get(url).success(function(data){
			angular.copy(data, o.branches);
		});

	};

	return o;
}])