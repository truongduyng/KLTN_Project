//Filter nay giup hien thi ten dua vao doi tuong user, cho tai su dung code
//Tam thoi la hien thi bang username, ve sau can hien thi cai khac thi chi can thay doi dinh dang 
//trong filter nay
filters.filter("displayName", [function(){
	return function(user){
		return user.username;
	};
}]);