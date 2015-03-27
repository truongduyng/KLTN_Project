filters.filter("notKnow", [function(){
	return function(args){
		if(args == null || args == 'undefined' || !args.trim()){
			return 'Không biết'
		}else{
			return args;
		}
	};
}]);