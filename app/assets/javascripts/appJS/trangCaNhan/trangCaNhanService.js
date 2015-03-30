app.factory('trangCaNhanService', ['$http', function($http) {
	var o = {
		user:{},
	};
	
	o.show = function(username){
		var url = "/custom_users/" + username + ".json";
		return $http.get(url).success(function(data){
			angular.copy(data, o.user);
		});
	};

	
	o.editProfile = function(user) {
		var id = user._id.$oid;
		var url = "/custom_users/" + id + ".json";
		return $http.put(url, user);
	};

	//password la doi tuong gom current_password, new_password va password_confirmation
	o.changePassword = function(password){
		var url = "/custom_users/change_password.json";
		var promise = $http.put(url, password);
		return promise;
	};

	
	return o;
}])