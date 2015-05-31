filters.filter("vnd", [function(){
	return function(price){
		if(price){
			return price.toString() + ".000" + " VND"
		}else{
			return null;
		}

	};
}]);