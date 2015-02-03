app.controller('authCtrl', ['$scope', 'Auth', '$state',
 function($scope, Auth, $state){
 	$scope.login = function(){
 		Auth.login($scope.user).then(function(){
	 		$('#login-modal').modal('toggle');
	 		//$state.go('home');
	 	}, function(){
	 		alert("error");
	 	});
 	};

  	$scope.register = function(){
  		Auth.register($scope.user).then(function(){
	 		$('#register-modal').modal('toggle');
	 		//$state.go('home');
	 	},  function(){
	 		alert("error");
	 	});
  	};
  	


 	$scope.reloadPage = function(){
 		$state.reload();
 		alert("reload");
 	};

 	$scope.scrollToTop = function(){

 	};
}]);