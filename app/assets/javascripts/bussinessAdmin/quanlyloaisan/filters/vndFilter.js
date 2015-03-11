filters.filter("vnd", [function(){
	return function(price){
		return price.toString() + ".000" + " VND"
	};
}]);