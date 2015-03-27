filters.filter("fullname", [function(){
	return function(firstname, lastname){
		return firstname + " " + lastname;
	};
}]);