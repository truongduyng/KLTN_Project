//Filter nay giup hien thi anh logo cua sporta neu link cua anh la empty
filters.filter("logo", [function(){
	return function(source){
		if(source == null || !source.trim()){
			return "/assets/application/placeholder/sporta_icon.png";
		}else{
			return source;
		}
	};
}]);